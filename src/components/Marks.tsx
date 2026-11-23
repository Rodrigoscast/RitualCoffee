export function Mark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 42"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    >
      <path d="M3 28Q23 0 45 28M6 32Q24 10 42 32M9 36Q24 21 39 36M13 15l-2-4m9 0-1-6m8 5 1-7m7 10 3-5" />
    </svg>
  );
}
export function Brand() {
  return (
    <a href="#inicio" className="brand" aria-label="Ritual Coffee, início">
      <Mark />
      <span>
        Ritual <span className="brand-coffee">Coffee</span>
      </span>
    </a>
  );
}
export function Icon({
  name,
}: {
  name: "bag" | "down" | "arrow" | "close" | "menu" | "pin" | "check";
}) {
  const paths = {
    bag: "M5 8h14l1.2 13H3.8L5 8Zm3.5 0V6a3.5 3.5 0 0 1 7 0v2",
    down: "M12 4v15m-6-6 6 6 6-6",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    close: "m6 6 12 12M18 6 6 18",
    menu: "M3 8h18M3 16h18",
    pin: "M19 10c0 6-7 12-7 12S5 16 5 10a7 7 0 1 1 14 0Zm-4.5 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
    check: "m4 12 5 5L20 6",
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
