import { useEffect, useRef, useState } from "react";
import { Icon } from "../components/Marks";
import type { GalleryDirector } from "./scroll-scene";

const photographs = [
  ["ambiente", "Luz da manhã no balcão da cafeteria", "O balcão"],
  ["preparo", "Mãos do barista preparando o café coado", "O preparo"],
  ["extracao", "Fios de espresso caindo na xícara", "A extração"],
] as const;

export function Gallery() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const director = useRef<GalleryDirector | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let disposed = false;
    let detach: (() => void) | undefined;
    const el = rail.current!;

    function updateRail() {
      if (director.current) return;
      const figures = Array.from(el.querySelectorAll<HTMLElement>("figure"));
      const stops = figures.map((figure) => figure.offsetLeft - figures[0].offsetLeft);
      const closest = stops.reduce(
        (best, stop, i) =>
          Math.abs(stop - el.scrollLeft) < Math.abs(stops[best] - el.scrollLeft)
            ? i
            : best,
        0,
      );
      setActive(closest);
    }

    async function setup() {
      const { directGallery } = await import("./scroll-scene");
      if (!disposed) {
        const controller = directGallery(section.current!, setActive);
        director.current = controller;
        detach = () => {
          controller.revert();
          director.current = null;
        };
      }
    }

    void setup();
    const observer = new ResizeObserver(updateRail);
    observer.observe(el);
    el.addEventListener("scroll", updateRail, { passive: true });
    return () => {
      disposed = true;
      detach?.();
      observer.disconnect();
      el.removeEventListener("scroll", updateRail);
    };
  }, []);

  function step(direction: number) {
    const next = Math.max(0, Math.min(photographs.length - 1, active + direction));
    if (director.current?.goTo(next)) return;
    const el = rail.current!;
    const figures = Array.from(el.querySelectorAll<HTMLElement>("figure"));
    const left = figures[next].offsetLeft - figures[0].offsetLeft;
    el.scrollTo({
      left,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    setActive(next);
  }

  return (
    <section className="section gallery" id="casa" ref={section} tabIndex={-1}>
      <p className="eyebrow rule reveal">A casa</p>
      <div className="gallery-heading reveal">
        <h2>
          Por dentro <em>da Ritual.</em>
        </h2>
        <div className="gallery-controls">
          <span className="gallery-count" aria-live="off">
            {String(active + 1).padStart(2, "0")} / 03
          </span>
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              className="icon-btn"
              disabled={dir < 0 ? active === 0 : active === photographs.length - 1}
              aria-label={dir < 0 ? "Foto anterior" : "Próxima foto"}
              aria-controls="fotos"
              onClick={() => step(dir)}
            >
              <Icon name="arrow" />
            </button>
          ))}
        </div>
      </div>
      <div
        className="photo-rail reveal reveal-fade"
        ref={rail}
        id="fotos"
        role="region"
        aria-label="Fotografias da cafeteria. Role para avançar entre as três cenas."
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            step(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {photographs.map(([id, alt, label], index) => (
          <figure key={id} className="gallery-panel" data-active={index === active}>
            <img
              src={"/images/" + (id === "preparo" ? "preparo-hd" : id) + ".webp"}
              loading="lazy"
              alt={alt}
              width={id === "preparo" ? 1863 : 621}
              height={id === "preparo" ? 1863 : 621}
            />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
        <div className="gallery-vapor" aria-hidden="true" />
      </div>
      <p className="gallery-scroll-hint" aria-hidden="true">Role para descobrir ↓</p>
    </section>
  );
}
