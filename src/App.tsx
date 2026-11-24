import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Brand, Icon, Mark } from "./components/Marks";
import type { Quantities } from "./components/Bag";
import { coffees, money, visit, type Coffee } from "./data/coffee";
import { Gallery } from "./sections/Gallery";
import { Hero } from "./sections/Hero";
import { Menu } from "./sections/Menu";
import { Craft } from "./sections/Craft";
import { useAnchorScroll } from "./useAnchorScroll";

const Bag = lazy(() =>
  import("./components/Bag").then(({ Bag }) => ({ default: Bag })),
);

const links = [
  ["O ritual", "ritual"],
  ["Cardápio", "cardapio"],
  ["A casa", "casa"],
  ["Visite", "visite"],
];
function App() {
  useAnchorScroll();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bagLoaded, setBagLoaded] = useState(false);
  const [items, setItems] = useState<Quantities>({});
  const [notice, setNotice] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const navToggle = useRef<HTMLButtonElement>(null);
  const openingRunway = useRef<HTMLDivElement>(null);
  const count = Object.values(items).reduce((sum, n) => sum + (n || 0), 0);
  const close = useCallback(() => setOpen(false), []);
  const add = (c: Coffee) => {
    setItems((previous) => ({
      ...previous,
      [c.id]: (previous[c.id] || 0) + 1,
    }));
    setNotice(c.name + " na sacola · " + ((items[c.id] || 0) + 1) + " un.");
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setNotice(""), 2600);
  };
  function openBag() {
    setNotice("");
    setMenu(false);
    setBagLoaded(true);
    setOpen(true);
  }
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("seen");
            reveal.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    const runway = openingRunway.current!;
    let expandedHeight = 0;
    const updateHeader = () =>
      setScrolled(runway.getBoundingClientRect().bottom <= expandedHeight);
    const measureHeader = () => {
      expandedHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
      );
      updateHeader();
    };
    const openingResize = new ResizeObserver(measureHeader);
    openingResize.observe(runway);
    measureHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", measureHeader);
    return () => {
      clearTimeout(toastTimer.current);
      reveal.disconnect();
      openingResize.disconnect();
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", measureHeader);
    };
  }, []);
  return (
    <>
      <a className="skip" href="#cardapio">
        Ir para o cardápio
      </a>
      <header className={scrolled ? "scrolled" : ""}>
        <Brand />
        <nav
          aria-label="Principal"
          id="nav-links"
          className={menu ? "expanded" : ""}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setMenu(false);
              navToggle.current?.focus();
            }
          }}
        >
          {links.map(([label, id]) => (
            <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <button
            className="bag-link"
            onClick={openBag}
            aria-haspopup="dialog"
          >
            <Icon name="bag" />
            <span className="bag-label">Sacola</span>
            <span className="bag-count">{count}</span>
          </button>
          <button
            className="mobile-menu icon-btn"
            ref={navToggle}
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-controls="nav-links"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <div id="inicio" className="opening-runway" ref={openingRunway}>
        <div className="opening">
          <Hero />
        </div>
      </div>
      <main>
        <section className="manifesto section" id="ritual">
          <div className="manifesto-text reveal">
            <p className="eyebrow rule">O ritual</p>
            <h2>
              <span className="manifesto-line">
                <span>Cada xícara,</span>
              </span>{" "}
              <span className="manifesto-line">
                <em>um ritual.</em>
              </span>
            </h2>
            <p>
              Entre moer o grão e servir a primeira xícara, há um tempo que a
              gente faz questão de respeitar.
            </p>
            <p>
              Na Ritual, esse cuidado começa na escolha do café brasileiro e
              termina no balcão, com a xícara nas suas mãos.
            </p>
          </div>
          <figure className="manifesto-img reveal">
            <img
              src="/images/preparo-hd.webp"
              loading="lazy"
              width="1863"
              height="1863"
              alt="Mãos de barista vertendo água sobre um coador de cerâmica"
            />
            <figcaption>Preparo manual na Ritual Coffee</figcaption>
          </figure>
        </section>
        <Menu add={add} />
        <Craft />
        <Gallery />
        <section className="section order" id="pedido">
          <div>
            <p className="eyebrow rule">Pedido demonstrativo</p>
            <h2>
              Monte seu <em>pedido.</em>
            </h2>
            <p>
              Escolha as bebidas e ajuste as quantidades na sacola para simular
              seu pedido.
            </p>
            <button className="text-link" onClick={openBag}>
              <Icon name="bag" /> Ver sacola ({count})
            </button>
          </div>
          <ul>
            {coffees.map((c) => (
              <li key={c.id}>
                <img
                  src={"/images/" + c.id + ".webp"}
                  loading="lazy"
                  width="60"
                  height="60"
                  alt=""
                />
                <div>
                  <h3>{c.name}</h3>
                  <small>{c.size}</small>
                </div>
                <b>{money(c.price)}</b>
                <button
                  className="plus"
                  aria-label={"Adicionar " + c.name}
                  onClick={() => add(c)}
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className="section visit" id="visite">
          <div className="map reveal">
            <img
              src="/mapa.svg"
              loading="lazy"
              alt="Mapa ilustrado do bairro com a marca da Ritual Coffee"
            />
            <span>
              <Icon name="pin" />
              {visit.neighborhood}
            </span>
          </div>
          <div className="visit-info reveal">
            <p className="eyebrow rule">Visite a Ritual</p>
            <h2>
              Uma pausa na
              <br />
              <em>{visit.neighborhood}.</em>
            </h2>
            <p>{visit.city} · Localização ilustrativa</p>
            <dl>
              {visit.hours.map(([day, hours]) => (
                <div key={day}>
                  <dt>{day}</dt>
                  <dd>{hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <footer className="section">
        <div className="closing reveal">
          <div className="steam" aria-hidden="true">
            <i />
            <i />
          </div>
          <Mark />
          <h2>
            Seu próximo ritual
            <br />
            <em>começa aqui.</em>
          </h2>
          <a className="button caramel" href="#cardapio">
            Explorar o cardápio <Icon name="arrow" />
          </a>
        </div>
        <div className="footer-base">
          <Brand />
          <span>Conceito demonstrativo de portfólio</span>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </footer>
      <div
        className={"toast" + (notice ? " visible" : "")}
        onFocus={() => clearTimeout(toastTimer.current)}
        onBlur={() => {
          toastTimer.current = setTimeout(() => setNotice(""), 2600);
        }}
      >
        <span role="status">
          {notice}
        </span>
        {notice && (
          <button
            onClick={() => {
              document
                .querySelector<HTMLButtonElement>(".bag-link")
                ?.focus({ preventScroll: true });
              openBag();
            }}
          >
            Ver sacola
          </button>
        )}
      </div>
      {bagLoaded && (
        <Suspense fallback={null}>
          <Bag
            open={open}
            close={close}
            items={items}
            clear={() => setItems({})}
            change={(id, qty) =>
              setItems((prev) => ({ ...prev, [id]: Math.max(0, qty) }))
            }
          />
        </Suspense>
      )}
    </>
  );
}
export default App;
