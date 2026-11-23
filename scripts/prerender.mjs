import { readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

// Ship the same initial page to browsers and crawlers before React hydrates it.
const vite = await createServer({
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
});
try {
  const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
  let html = await readFile("dist/index.html", "utf8");
  const stylesheet = html.match(/<link rel="stylesheet"[^>]+href="(\/assets\/[^"]+\.css)"[^>]*>/);
  if (stylesheet) {
    const css = await readFile('dist' + stylesheet[1], 'utf8');
    html = html.replace(stylesheet[0], () => '<style>' + css + '</style>');
  }
  const markup = renderToString(createElement(App));
  await writeFile(
    "dist/index.html",
    html.replace(
      '<div id="root"></div>',
      () => '<div id="root">' + markup + "</div>",
    ),
  );
} finally {
  await vite.close();
}
