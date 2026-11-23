import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Icon } from "../components/Marks";
import { visit } from "../data/coffee";
import "./hero.css";

export function Hero() {
  const scene = useRef<HTMLElement>(null);
  const take = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = scene.current!;
    const film = take.current!;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let detach: (() => void) | undefined;
    let visible = true;
    let finished = false;
    function stopTake() {
      film.pause();
      film.classList.remove("playing");
    }
    function endTake() {
      finished = true;
      stopTake();
    }
    function showTake() {
      film.classList.add("playing");
    }
    function playback() {
      const active =
        visible &&
        !document.hidden &&
        !preference.matches &&
        root.dataset.still !== "true";
      root.classList.toggle("paused", !active);
      if (!active) {
        stopTake();
        return;
      }
      if (
        !finished &&
        window.scrollY < innerHeight * 0.12 &&
        film.canPlayType('video/webm; codecs="vp8"')
      ) {
        if (!film.hasAttribute("src"))
          film.src =
            "/images/espresso-" +
            (innerWidth <= 700 ? "mobile" : "desktop") +
            ".webm";
        void film.play().catch(stopTake);
      }
    }
    async function setup() {
      if (preference.matches || detach) return;
      const { directOpening } = await import("./scroll-scene");
      if (!disposed && !detach) detach = directOpening(root);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      playback();
    });
    observer.observe(root);
    film.addEventListener("playing", showTake);
    film.addEventListener("ended", endTake);
    document.addEventListener("visibilitychange", playback);
    root.addEventListener("ritual-playback", playback);
    const runway = root.closest<HTMLElement>(".opening-runway")!;
    function preferencesChanged() {
      runway.classList.toggle("directed", !preference.matches);
      playback();
      if (window.scrollY || location.hash) void setup();
    }
    const intentEvents = ["wheel", "touchstart", "keydown", "scroll"] as const;
    intentEvents.forEach((event) =>
      window.addEventListener(event, setup, { passive: true }),
    );
    preference.addEventListener("change", preferencesChanged);
    preferencesChanged();
    return () => {
      disposed = true;
      detach?.();
      observer.disconnect();
      stopTake();
      film.removeEventListener("playing", showTake);
      film.removeEventListener("ended", endTake);
      document.removeEventListener("visibilitychange", playback);
      root.removeEventListener("ritual-playback", playback);
      preference.removeEventListener("change", preferencesChanged);
      intentEvents.forEach((event) => window.removeEventListener(event, setup));
      runway.classList.remove("directed");
    };
  }, []);
  useEffect(() => {
    scene.current?.dispatchEvent(new Event("ritual-playback"));
  }, [paused]);

  function attract(event: PointerEvent<HTMLAnchorElement>) {
    if (
      event.pointerType !== "mouse" ||
      !matchMedia("(hover:hover) and (prefers-reduced-motion:no-preference)")
        .matches
    )
      return;
    const el = event.currentTarget,
      rect = el.getBoundingClientRect();
    el.style.setProperty(
      "--mx",
      ((event.clientX - rect.left) / rect.width - 0.5) * 13 + "px",
    );
    el.style.setProperty(
      "--my",
      ((event.clientY - rect.top) / rect.height - 0.5) * 8 + "px",
    );
  }
  return (
    <section
      className="hero"
      ref={scene}
      data-still={paused}
      aria-labelledby="hero-title"
    >
      <div className="set-light" aria-hidden="true" />
      <h1 className="hero-mark" id="hero-title" aria-label="Ritual Coffee">
        <span className="word-window" aria-hidden="true">
          {[..."RITUAL"].map((l, i) => (
            <span key={i} style={{ animationDelay: i * 42 + "ms" }}>
              {l}
            </span>
          ))}
        </span>
        <em aria-hidden="true">Coffee</em>
      </h1>
      <div
        className="cup-stage"
        role="img"
        aria-label="Espresso de crema dourada em cerâmica marfim sobre um pires, iluminado pela lateral."
      >
        <div className="cup-camera">
          <div className="contact-shadow" />
          <div className="cup-take">
            <img
              className="cup-poster"
              src="/images/hero.webp"
              srcSet="/images/hero-small.webp 540w, /images/hero-medium.webp 720w, /images/hero.webp 1050w"
              sizes="(max-width: 700px) 88vw, 48vw"
              width="1050"
              height="1050"
              fetchPriority="high"
              alt=""
            />
            <video
              ref={take}
              className="cup-film"
              muted
              playsInline
              preload="none"
              aria-hidden="true"
            />
          </div>
          <div className="vapor-plume" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <img
        className="foreground-bean"
        aria-hidden="true"
        src="/images/bean.webp"
        alt=""
      />
      <div className="hero-caption">
        <p className="eyebrow rule">Cafeteria de especialidade</p>
        <p className="opening-line">
          Todo dia merece <em>um ritual.</em>
        </p>
        <a
          className="magnet"
          href="#cardapio"
          onPointerMove={attract}
          onPointerLeave={(e) => {
            e.currentTarget.style.removeProperty("--mx");
            e.currentTarget.style.removeProperty("--my");
          }}
        >
          <span className="button caramel">
            Explorar o cardápio <Icon name="arrow" />
          </span>
        </a>
      </div>
      <div className="hero-foot">
        <a href="#ritual">
          <span className="down-ring">
            <Icon name="down" />
          </span>
          Role para explorar
        </a>
        <span className="hero-location">
          <Icon name="pin" />
          {visit.neighborhood}, {visit.city}
        </span>
        <button
          className="motion-switch"
          aria-label="Pausar animação ambiente"
          aria-pressed={paused}
          title={paused ? "Retomar animação" : "Pausar animação"}
          onClick={() => setPaused((v) => !v)}
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
            <path d={paused ? "m7 4 9 6-9 6z" : "M5 4h3v12H5zm7 0h3v12h-3z"} />
          </svg>
        </button>
      </div>
      <div className="espresso-portal" aria-hidden="true" />
    </section>
  );
}
