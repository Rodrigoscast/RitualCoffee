import { useState } from "react";
import { coffees, money, type Coffee } from "../data/coffee";
import { Icon } from "../components/Marks";

export function Menu({ add }: { add: (c: Coffee) => void }) {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(1);
  const coffee = coffees[selected];
  const next = coffees[(selected + 1) % coffees.length];
  function choose(index: number, movement = index > selected ? 1 : -1) {
    if (index === selected) return;
    setDirection(movement);
    setSelected(index);
  }
  function step(movement: number) {
    choose((selected + movement + coffees.length) % coffees.length, movement);
  }
  return (
    <section
      id="cardapio"
      tabIndex={-1}
      className="section menu"
      data-drink={coffee.id}
      data-direction={direction > 0 ? "next" : "previous"}
    >
      <p className="eyebrow rule reveal">Cardápio da casa</p>
      <div className="section-title reveal">
        <h2>
          Escolha seu <em>café.</em>
        </h2>
        <span className="aside-note">Preços ilustrativos</span>
      </div>
      <div className="selector reveal" aria-label="Selecione uma bebida">
        {coffees.map((c, i) => (
          <button
            key={c.id}
            aria-pressed={i === selected}
            onClick={() => choose(i)}
          >
            <img
              src={"/images/" + c.id + ".webp"}
              alt=""
              loading="lazy"
              width="64"
              height="64"
            />
            {c.name}
          </button>
        ))}
      </div>
      <div className="product">
        <div className="product-photo reveal reveal-left">
          {coffees.map((c, index) => (
            <img
              key={c.id}
              data-active={index === selected}
              aria-hidden={index !== selected}
              src={"/images/" + c.id + ".webp"}
              loading="lazy"
              alt={c.name + " da casa servido em mesa de pedra clara"}
            />
          ))}
        </div>
        <div className="product-copy reveal reveal-right">
          <div aria-live="polite" aria-atomic="true">
            <div className="drink-details" key={coffee.id}>
              <p className="eyebrow">
                {coffee.size} <span> / </span> {coffee.notes}
              </p>
              <h3>{coffee.name}</h3>
              <p>{coffee.description}</p>
              <small>{coffee.ingredients}</small>
            </div>
          </div>
          <div className="buy">
            <strong>{money(coffee.price)}</strong>
            <button className="button dark" onClick={() => add(coffee)}>
              <Icon name="bag" /> Adicionar à sacola
            </button>
          </div>
          <div className="drink-navigation" aria-label="Navegação entre cafés">
            <button className="icon-btn drink-previous" onClick={() => step(-1)} aria-label="Café anterior">
              <Icon name="arrow" />
            </button>
            <span className="drink-count">
              {String(selected + 1).padStart(2, "0")} / {String(coffees.length).padStart(2, "0")}
            </span>
            <button className="drink-next" onClick={() => step(1)}>
              <span>
                <small>Próximo café</small>
                <strong>{next.name}</strong>
              </span>
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
