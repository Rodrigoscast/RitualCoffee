const stages = [
  {
    title: "Origem",
    line: "Tudo começa no grão.",
    detail: "O Catuaí amarelo amadurece nas montanhas do Sul de Minas.",
    photo: "graos",
  },
  {
    title: "Torra",
    line: "O calor revela o caráter.",
    detail: "Na torra média, o grão desenvolve notas de cacau e caramelo.",
    photo: "torra",
  },
  {
    title: "Extração",
    line: "Precisão em cada extração.",
    detail: "Moagem, água e tempo dão corpo ao espresso da casa.",
    photo: "extracao",
  },
];
export function Craft() {
  return (
    <section className="craft section" id="preparo">
      <p className="eyebrow rule">Do grão à xícara</p>
      <h2>
        A arte do <em>café.</em>
      </h2>
      <div className="craft-body">
        <div className="stages">
          {stages.map((s) => (
            <article key={s.title} className="stage reveal">
              <img
                src={"/images/" + s.photo + ".webp"}
                alt=""
                loading="lazy"
                width="600"
                height="380"
              />
              <div>
                <p className="eyebrow">{s.title}</p>
                <h3>{s.line}</h3>
                <p>{s.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
