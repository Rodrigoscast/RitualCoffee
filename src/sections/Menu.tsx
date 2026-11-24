import { useState } from "react";
import { coffees, money, type Coffee } from "../data/coffee";
import { Icon } from "../components/Marks";

export function Menu({ add }: { add: (c: Coffee) => void }) {
  const [selected, setSelected] = useState(0);
  const coffee = coffees[selected];
  return (
    <section
      id="cardapio"
      tabIndex={-1}
      className="section menu"
      data-drink={coffee.id}
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
            onClick={() => setSelected(i)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="product">
        <div className="product-photo reveal">
          <img
            key={coffee.id}
            src={"/images/" + coffee.id + ".webp"}
            loading="lazy"
            alt={coffee.name + " da casa servido em mesa de pedra clara"}
          />
        </div>
        <div className="product-copy reveal" aria-live="polite" aria-atomic="true">
          <p className="eyebrow">
            {coffee.size} <span> / </span> {coffee.notes}
          </p>
          <h3>{coffee.name}</h3>
          <p>{coffee.description}</p>
          <small>{coffee.ingredients}</small>
          <div className="buy">
            <strong>{money(coffee.price)}</strong>
            <button className="button dark" onClick={() => add(coffee)}>
              <Icon name="bag" /> Adicionar à sacola
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
