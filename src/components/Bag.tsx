import { useEffect, useRef, useState } from "react";
import { useAnimate } from "motion/react-mini";
import { coffees, money, type Coffee } from "../data/coffee";
import { Icon } from "./Marks";

export type Quantities = Partial<Record<Coffee["id"], number>>;
type Props = {
  open: boolean;
  close: () => void;
  items: Quantities;
  change: (id: Coffee["id"], qty: number) => void;
  clear: () => void;
};
export function Bag({ open, close, items, change, clear }: Props) {
  const [dialog, animate] = useAnimate<HTMLDialogElement>();
  const dismissing = useRef(false);
  const [receipt, setReceipt] = useState("");
  const total = coffees.reduce(
    (sum, c) => sum + c.price * (items[c.id] || 0),
    0,
  );
  const finish = () => {
    setReceipt(String(Date.now()).slice(-6));
    clear();
  };
  useEffect(() => {
    const node = dialog.current!;
    if (!open) return;
    setReceipt("");
    dismissing.current = false;
    node.showModal();
    node.style.removeProperty("transform");
    const enter = window.matchMedia("(prefers-reduced-motion: no-preference)")
      .matches
      ? animate(
          node,
          { transform: ["translateX(100%)", "translateX(0px)"] },
          { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
        )
      : undefined;
    document.body.classList.add("locked");
    return () => {
      enter?.stop();
      node.close();
      document.body.classList.remove("locked");
    };
  }, [open, animate, dialog]);
  function dismiss() {
    const node = dialog.current;
    if (!node?.open || dismissing.current) return;
    dismissing.current = true;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      close();
      return;
    }
    void animate(
      node,
      { transform: [getComputedStyle(node).transform, "translateX(100%)"] },
      { duration: 0.15, ease: [0.32, 0.72, 0, 1] },
    ).then(() => {
      if (node.open && dismissing.current) close();
    });
  }
  function browse() {
    close();
    requestAnimationFrame(() => {
      document.getElementById("cardapio")?.focus();
      location.hash = "cardapio";
    });
  }
  function updateQuantity(id: Coffee["id"], qty: number) {
    change(id, qty);
    if (qty === 0)
      requestAnimationFrame(() =>
        dialog.current
          ?.querySelector<HTMLButtonElement>(
            ".stepper button, .bag-message .button",
          )
          ?.focus(),
      );
  }
  return (
    <dialog
      ref={dialog}
      className="bag-dialog"
      aria-labelledby="bag-title"
      onCancel={(e) => {
        e.preventDefault();
        dismiss();
      }}
      onClick={(e) => {
        if (
          e.target === dialog.current &&
          e.clientX < dialog.current.getBoundingClientRect().left
        )
          dismiss();
      }}
    >
      <div className="bag-head">
        <h2 id="bag-title">Sua sacola</h2>
        <button
          className="icon-btn"
          aria-label="Fechar sacola"
          onClick={() => dismiss()}
        >
          <Icon name="close" />
        </button>
      </div>
      {receipt ? (
        <div className="bag-message" role="status">
          <Icon name="check" />
          <p className="eyebrow">Simulação #{receipt}</p>
          <h3>Pedido demonstrativo criado</h3>
          <p>
            Seu ritual está montado. Esta experiência de portfólio simula o
            pedido até aqui.
          </p>
          <button className="button dark" onClick={browse}>
            Começar novo pedido
          </button>
        </div>
      ) : total === 0 ? (
        <div className="bag-message">
          <Icon name="bag" />
          <h3>Sua sacola está vazia.</h3>
          <p>Escolha um café para montar seu ritual.</p>
          <button className="button dark" onClick={browse}>
            Explorar o cardápio
          </button>
        </div>
      ) : (
        <>
          <ul className="bag-items">
            {coffees
              .filter((c) => items[c.id])
              .map((c) => (
                <li key={c.id}>
                  <img
                    src={"/images/" + c.id + ".webp"}
                    alt=""
                    width="76"
                    height="76"
                  />
                  <div>
                    <h3>{c.name}</h3>
                    <small>{money(c.price)} por unidade</small>
                    <div className="stepper">
                      <button
                        aria-label={"Diminuir " + c.name}
                        onClick={() =>
                          updateQuantity(c.id, (items[c.id] || 1) - 1)
                        }
                      >
                        −
                      </button>
                      <span>{items[c.id]}</span>
                      <button
                        aria-label={"Aumentar " + c.name}
                        onClick={() =>
                          updateQuantity(c.id, (items[c.id] || 0) + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item-end">
                    <b>{money(c.price * (items[c.id] || 0))}</b>
                    <button
                      onClick={() => updateQuantity(c.id, 0)}
                      aria-label={"Remover " + c.name}
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
          </ul>
          <div className="bag-end">
            <div className="total" aria-live="polite" aria-atomic="true">
              <span>Total</span>
              <strong>{money(total)}</strong>
            </div>
            <p>Pedido ilustrativo, sem cobrança ou envio.</p>
            <button className="button dark" onClick={finish}>
              Finalizar simulação
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
