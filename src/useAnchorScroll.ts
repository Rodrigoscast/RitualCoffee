import { useEffect } from "react";

export function useAnchorScroll() {
  useEffect(() => {
    let tween: { kill(): void } | null = null;
    let request = 0;
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    function stop() {
      request++;
      tween?.kill();
      tween = null;
    }

    async function navigate(id: string, focusTarget: boolean) {
      const element = document.getElementById(id);
      if (!element) return;
      const target: HTMLElement = element;
      const currentRequest = ++request;
      const destination = () =>
        target.getBoundingClientRect().top + window.scrollY -
        (parseFloat(getComputedStyle(target).scrollMarginTop) || 0);

      function finish() {
        tween = null;
        if (focusTarget) {
          if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
          target.focus({ preventScroll: true });
        }
      }

      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        stop();
        window.scrollTo({ top: destination(), behavior: "instant" });
        finish();
        return;
      }

      const [{ default: gsap }, { ScrollToPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollToPlugin"),
      ]);
      if (currentRequest !== request) return;
      gsap.registerPlugin(ScrollToPlugin);
      tween?.kill();
      const top = Math.max(0, destination());
      const distance = Math.abs(top - window.scrollY);
      tween = gsap.to(window, {
        scrollTo: { y: top, autoKill: true },
        duration: Math.min(1.3, Math.max(0.58, distance / 2800)),
        ease: "power2.inOut",
        overwrite: "auto",
        onComplete: finish,
        onInterrupt() { tween = null; },
      });
    }

    function clicked(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.classList.contains("skip")) return;
      const id = decodeURIComponent(anchor.hash.slice(1));
      if (!document.getElementById(id)) return;
      event.preventDefault();
      if (location.hash !== anchor.hash) history.pushState(null, "", anchor.hash);
      void navigate(id, true);
    }

    function restored() {
      void navigate(decodeURIComponent(location.hash.slice(1)) || "inicio", false);
    }

    document.addEventListener("click", clicked);
    window.addEventListener("popstate", restored);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    return () => {
      stop();
      history.scrollRestoration = previousRestoration;
      document.removeEventListener("click", clicked);
      window.removeEventListener("popstate", restored);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);
}
