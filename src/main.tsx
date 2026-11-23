import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource/archivo-black/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource-variable/geist";
import "./style.css";
import App from "./App";

const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
