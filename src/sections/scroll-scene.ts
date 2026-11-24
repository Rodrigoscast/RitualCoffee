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
  const images = panels.map((panel) => panel.querySelector<HTMLImageElement>("img")!);
  const vapor = section.querySelector<HTMLElement>(".gallery-vapor")!;
  let trigger: ScrollTrigger | undefined;
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    section.classList.add("is-directed");
    gsap.set(panels.slice(1), { clipPath: "circle(0% at 52% 58%)" });
    gsap.set(images.slice(1), { scale: 1.12 });
    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: () => "top " + getComputedStyle(section).scrollMarginTop,
        end: () => "+=" + Math.round(window.innerHeight * 2.5),
        pin: true,
        scrub: 0.35,
        invalidateOnRefresh: true,
        onUpdate(self) {
          onIndex(Math.min(2, Math.round(self.progress * 2)));
        },
      },
    });
    trigger = timeline.scrollTrigger;
    // Each image emerges as a growing coffee-crema ripple. The vapor
    // briefly veils the seam while the preceding photograph recedes.
    timeline
      .to(images[0], { scale: 1.08, duration: 1 }, 0)
      .to(panels[1], { clipPath: "circle(120% at 52% 58%)", duration: 1 }, 0)
      .to(images[1], { scale: 1, duration: 1 }, 0)
      .fromTo(vapor, { opacity: 0, xPercent: -28 }, { opacity: 0.62, xPercent: 2, duration: 0.28 }, 0.09)
      .to(vapor, { opacity: 0, xPercent: 29, duration: 0.47 }, 0.36)
      .to(images[1], { scale: 1.08, duration: 1 }, 1)
      .to(panels[2], { clipPath: "circle(120% at 52% 58%)", duration: 1 }, 1)
      .to(images[2], { scale: 1, duration: 1 }, 1)
      .fromTo(vapor, { opacity: 0, xPercent: -28 }, { opacity: 0.62, xPercent: 2, duration: 0.28 }, 1.09)
      .to(vapor, { opacity: 0, xPercent: 29, duration: 0.47 }, 1.36);
    ScrollTrigger.refresh();
    return () => {
      trigger = undefined;
      section.classList.remove("is-directed");
      onIndex(0);
    };
  });
  return {
    goTo(index) {
      if (!trigger) return false;
      gsap.to(window, {
        scrollTo: { y: trigger.start + (trigger.end - trigger.start) * index / 2, autoKill: true },
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
