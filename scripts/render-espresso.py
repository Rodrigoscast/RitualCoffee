"""Bake the opening take from the photographed ceramic and its projected depth.

The saucer, cup wall and liquid use separate surfaces. All coordinates below
are normalized to the original square product photograph (handle at right).
Requires Pillow, NumPy, OpenCV and FFmpeg (set FFMPEG to override the executable).
"""
from pathlib import Path


import cv2
import os
import subprocess
import numpy as np
from PIL import Image


def ellipse(u, v, cx, cy, a, b, tilt):
    x, y = u - cx, v - cy
    return ((x + tilt * y) / a) ** 2 + ((y - tilt * x) / b) ** 2


def bake(size, target):
    source = np.array(Image.open("public/images/hero.webp").convert("RGBA")
                      .resize((size, size), Image.Resampling.LANCZOS))
    v, u = np.mgrid[:size, :size].astype("float32") / (size - 1)
    # Reproject the glazed wall and saucer at slightly different depths.
    body = ellipse(u, v, .47, .43, .273, .34, -.10)
    depth = .17 * np.sqrt(np.maximum(0, 1 - body)) + .06 * (v - .55)
    handle = ellipse(u, v, .84, .26, .125, .185, .30)
    depth += .045 * np.maximum(0, 1 - handle)
    # The coffee sits below the ceramic lip and keeps moving after it settles.
    x, y = u - .472, v - .320
    radius = np.sqrt(ellipse(u, v, .472, .320, .225, .133, -.15))
    liquid = np.clip((1 - radius) * 10, 0, 1)
    rim = np.exp(-((np.sqrt(ellipse(u,v,.47,.283,.277,.180,-.15))-1)/.024)**2)
    count = 32
    # Encode color separately from the still silhouette so browsers can use a
    # small, inter-frame-compressed video regardless of alpha-video support.
    edge = cv2.distanceTransform((source[:,:,3] > 240).astype("uint8"), cv2.DIST_L2, 3)
    interior = np.clip(edge / (.035 * size), 0, 1)
    encoder = subprocess.Popen([os.getenv("FFMPEG","ffmpeg"), "-hide_banner", "-loglevel", "error", "-y",
        "-f", "image2pipe", "-framerate", "24", "-vcodec", "mjpeg", "-i", "pipe:0",
        "-vf","scale=iw:ih,format=yuv420p", "-c:v","libvpx","-b:v","900k","-crf","9",
        "-an",str(target)],stdin=subprocess.PIPE)
    for frame in range(count):
        t = frame / (count - 1)
        yaw = .29 * np.exp(-4*t) * np.cos(5.5*t) * (1-t)
        swirl = .56 * np.sin(t*6.8) * np.exp(-2.8*t) * (1-t) * liquid
        ripple = .008 * np.sin(19*radius - 12*t) * np.sin(t*np.pi) * liquid * (1-t)
        sample_x = (u - depth*yaw - y*swirl*1.6 + x*ripple) * (size-1)
        sample_y = (v + .06*yaw*(u-.46) + x*swirl*.60 + ripple) * (size-1)
        sample_x = u*(size-1) + (sample_x-u*(size-1))*interior
        sample_y = v*(size-1) + (sample_y-v*(size-1))*interior
        pixels = cv2.remap(source, sample_x.astype(np.float32), sample_y.astype(np.float32), cv2.INTER_LINEAR)
        gleam = 32 * rim * np.exp(-((u-(.23+.54*t))/.082)**2) * np.sin(t*np.pi)
        pixels[:, :, :3] = np.clip(pixels[:, :, :3] + gleam[:,:,None], 0, 255)
        success, jpeg = cv2.imencode(".jpg", cv2.cvtColor(pixels, cv2.COLOR_RGBA2BGR), [cv2.IMWRITE_JPEG_QUALITY, 96])
        if not success:
            raise RuntimeError("Could not prepare frame")
        encoder.stdin.write(jpeg.tobytes())
    encoder.stdin.close()
    if encoder.wait():
        raise RuntimeError("FFmpeg failed to encode the shot")


if __name__ == "__main__":
    for size, variant in [(700,"desktop"), (480,"mobile")]:
        bake(size, Path(f"public/images/espresso-{variant}.webm"))


