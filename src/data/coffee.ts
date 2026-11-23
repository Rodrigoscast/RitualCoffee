export const coffees = [
  {
    id: "espresso",
    name: "Espresso",
    price: 900,
    size: "40 ml",
    notes: "Cacau & caramelo",
    description:
      "Curto, encorpado e com uma crema dourada. O Catuaí amarelo do Sul de Minas encontra aqui sua expressão mais intensa.",
    ingredients: "Café especial e água filtrada.",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 1600,
    size: "160 ml",
    notes: "Doçura & espuma",
    description:
      "Uma camada generosa de espuma guarda a doçura do leite. Por baixo, o espresso da casa traz um final de chocolate.",
    ingredients: "Espresso e leite integral vaporizado.",
  },
  {
    id: "flat-white",
    name: "Flat White",
    price: 1500,
    size: "150 ml",
    notes: "Intenso & aveludado",
    description:
      "Um espresso duplo atravessa uma fina camada de microespuma. A textura é sedosa, com o café em primeiro plano.",
    ingredients: "Espresso duplo e leite integral vaporizado.",
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    price: 1800,
    size: "250 ml",
    notes: "Frutado & refrescante",
    description:
      "O tempo faz a extração a frio. Servido sobre gelo, revela notas frutadas e uma doçura suave a cada gole.",
    ingredients: "Café extraído a frio, água filtrada e gelo.",
  },
] as const;

export type Coffee = (typeof coffees)[number];
export const money = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );
export const visit = {
  neighborhood: "Vila Madalena",
  city: "São Paulo",
  hours: [
    ["Segunda a sexta", "8h às 19h"],
    ["Sábado e domingo", "9h às 18h"],
  ],
};
