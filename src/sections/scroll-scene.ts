import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export interface GalleryDirector {
  goTo(index: number): boolean;
  revert(): void;
}

export function directGallery(section: HTMLElement, onIndex: (index: number) => void): GalleryDirector {
  const panels = Array.from(section.querySelectorAll<HTMLElement>(".gallery-panel"));
  const rail = section.querySelector<HTMLElement>(".photo-rail")!;
  const track = section.querySelector<HTMLElement>(".gallery-track")!;
  const travel = () => Math.max(0, track.scrollWidth - rail.clientWidth);
  const stop = (index: number) => Math.min(travel(), panels[index].offsetLeft - panels[0].offsetLeft);
  let trigger: ScrollTrigger | undefined;
  let navigation: gsap.core.Tween | undefined;
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference) and (min-height: 540px)", () => {
    section.classList.add("is-directed");
    rail.scrollLeft = 0;
    const tween = gsap.to(track, {
      x: () => -travel(),
      ease: "none",
      onUpdate() {
        const position = -Number(gsap.getProperty(track, "x"));
        const closest = panels.reduce((best, _, index) =>
          Math.abs(stop(index) - position) < Math.abs(stop(best) - position) ? index : best, 0);
        onIndex(closest);
      },
      scrollTrigger: {
        trigger: section,
        start: () => "top " + getComputedStyle(section).scrollMarginTop,
        end: () => "+=" + Math.max(travel(), window.innerHeight * 1.25),
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });
    trigger = tween.scrollTrigger;
    ScrollTrigger.refresh();
    return () => {
      navigation?.kill();
      trigger = undefined;
      section.classList.remove("is-directed");
      onIndex(0);
    };
  });
  return {
    goTo(index) {
      if (!trigger) return false;
      navigation?.kill();
      navigation = gsap.to(window, {
        scrollTo: { y: trigger.start + (trigger.end - trigger.start) * stop(index) / Math.max(1, travel()), autoKill: true },
        duration: 0.68,
        ease: "power2.inOut",
        overwrite: "auto",
      });
      return true;
    },
    revert() {
      media.revert();
    },
  };
}

export function directOpening(root: HTMLElement) {
  const runway = root.closest<HTMLElement>(".opening-runway")!;
  const cup = root.querySelector<HTMLElement>(".cup-stage")!;
  const portal = root.querySelector<HTMLElement>(".espresso-portal")!;
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    runway.classList.add("in-motion");
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    // Measure in the unscaled layout, in the same coordinates as the photograph.
    const lip = () => ({
      x: cup.offsetLeft + cup.offsetWidth * 0.472,
      y: cup.offsetTop + cup.offsetHeight * 0.32,
    });
    const fullScale = () =>
      Math.hypot(
        Math.max(lip().x, root.clientWidth - lip().x) /
          (cup.offsetWidth * 0.245),
        Math.max(lip().y, root.clientHeight - lip().y) /
          (cup.offsetHeight * 0.12),
      ) * 1.14;
    // A rotated oval follows the perspective of the espresso surface.
    // Keeping each vertex in the same order lets GSAP morph it smoothly.
    const aperture = (scale: number) => {
      const center = lip();
      const rx = cup.offsetWidth * 0.245 * scale;
      const ry = cup.offsetHeight * 0.12 * scale;
      const rotation = -7 * Math.PI / 180;
      const points = Array.from({ length: 48 }, (_, index) => {
        const angle = index * Math.PI * 2 / 48;
        const x = rx * Math.cos(angle);
        const y = ry * Math.sin(angle);
        return `${(center.x + x * Math.cos(rotation) - y * Math.sin(rotation)).toFixed(2)}px ${(center.y + x * Math.sin(rotation) + y * Math.cos(rotation)).toFixed(2)}px`;
      });
      return `polygon(${points.join(", ")})`;
    };
    const mask = { scale: 1 };
    portal.style.clipPath = aperture(1);
    timeline
      .to(
        ".cup-camera",
        { scale: fullScale, ease: "power2.in", duration: 1 },
        0,
      )
      .to(
        ".hero-mark",
        { yPercent: -19, opacity: 0, duration: 0.49, ease: "power1.in" },
        0,
      )
      .to(
        [".hero-caption", ".hero-foot"],
        { autoAlpha: 0, y: -12, duration: 0.3 },
        0,
      )
      .to(
        ".foreground-bean",
        {
          xPercent: -140,
          yPercent: 220,
          rotation: 22,
          opacity: 0,
          duration: 0.48,
        },
        0,
      )
      .to(".vapor-plume", { opacity: 0, duration: 0.3 }, 0.04)
      .to(".set-light", { scale: 1.07, duration: 1, ease: "none" }, 0)
      .to(
        mask,
        {
          scale: fullScale,
          duration: 1,
          ease: "power2.in",
          onUpdate: () => {
            portal.style.clipPath = aperture(mask.scale);
          },
        },
        0,
      )
      .fromTo(
        portal,
        { opacity: 0 },
        { opacity: 1, duration: 0.42, ease: "sine.inOut" },
        0.2,
      );
    return () => {
      runway.classList.remove("in-motion");
      portal.style.removeProperty("clip-path");
    };
  });
  return () => media.revert();
}
