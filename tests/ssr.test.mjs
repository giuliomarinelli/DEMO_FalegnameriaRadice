import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const base = process.env.TEST_BASE_URL || "http://127.0.0.1:8788";
console.log(`SSR target: ${base}`);
const pages = [
  ["/", "Il legno,", "Arredi su misura"],
  ["/lavorazioni/", "La misura giusta è la tua.", "Lavorazioni"],
  ["/portfolio/", "Forme da cui partire.", "Portfolio manufatti"],
  ["/materiali/", "Prima di tutto, il legno.", "Materiali e finiture"],
  [
    "/configuratore/",
    "Un’idea, nelle tue misure.",
    "Configuratore in preparazione",
  ],
  [
    "/contatti/",
    "Una bottega da immaginare.",
    "Contatti e informazioni sulla demo",
  ],
];

async function request(path) {
  return fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) });
}

test("the production adapter emits a Worker, client assets and no prerendered public pages", async () => {
  const worker = await readFile("dist/_worker.js", "utf8");
  assert.ok(worker.includes("export default"));
  assert.ok(worker.includes("fetch"));
  assert.ok(
    (await readFile("server/entry.cloudflare-pages.js", "utf8")).length > 1000,
  );
  assert.ok((await readdir("dist/build")).some((name) => name.endsWith(".js")));
  const files = await readdir("dist", { recursive: true });
  assert.equal(
    files.filter((name) => name.endsWith(".html") && name !== "404.html")
      .length,
    0,
  );
});

for (const [path, heading, title] of pages) {
  test(`direct HTTP SSR: ${path} includes content, metadata and working navigation`, async () => {
    const response = await request(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /text\/html/);
    const html = await response.text(); // No DOM, JavaScript execution or browser hydration.
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert.ok(
      main?.includes(heading),
      `Missing server-rendered heading: ${heading}`,
    );
    assert.equal((main.match(/<h1\b/g) || []).length, 1);
    assert.ok(
      html.match(/<title\b[^>]*>(.*?)<\/title>/)?.[1]?.startsWith(title),
    );
    assert.match(html, /<meta name="description" content="[^"]{40,}"/);
    assert.match(html, /<html[^>]*lang="it"/);
    assert.match(html, /name="robots" content="noindex, nofollow"/);
    assert.ok(
      html.includes("Azienda, informazioni e operazioni sono simulate."),
    );
    for (const [route] of pages)
      assert.ok(
        html.includes(`href="${route}"`),
        `Navigation missing ${route}`,
      );
    assert.ok(html.includes('href="#main-content"'));
    assert.ok(html.includes('id="main-content"'));
    // Without a configured public domain there must be no localhost canonical.
    if (!process.env.EXPECT_SITE_ORIGIN)
      assert.doesNotMatch(html, /rel="canonical"/);
    else
      assert.ok(
        html.includes(
          `href="${new URL(path, process.env.EXPECT_SITE_ORIGIN).href}"`,
        ),
      );
  });
}

test("the configurator remains an honest introduction with no business interaction", async () => {
  const html = await (await request("/configuratore/")).text();
  assert.ok(html.includes("Il configuratore non è ancora disponibile."));
  assert.doesNotMatch(html, /<(?:form|input|select|textarea)\b/);
});

test("an unknown direct route returns HTTP 404", async () => {
  const response = await request("/questa-rotta-non-esiste/");
  assert.equal(response.status, 404);
  assert.ok(
    (await response.text()).includes("Questa pagina non è in bottega."),
  );
});

test("locally served image, favicon and CSS return their actual media types", async () => {
  for (const [path, type] of [["/favicon.svg", "image/svg+xml"]]) {
    const response = await request(path);
    assert.equal(response.status, 200);
    assert.ok(response.headers.get("content-type").includes(type));
  }
  const html = await (await request("/")).text();
  const imagePath =
    html.match(/<img[^>]*src="([^"]+)"/i)?.[1] ??
    html.match(/<img[^>]*srcset="([^"\s,]+)/i)?.[1];
  assert.ok(
    imagePath,
    "Production HTML must reference a local optimized image",
  );
  assert.ok(imagePath.startsWith("/"));
  const image = await request(imagePath);
  assert.equal(image.status, 200);
  assert.match(image.headers.get("content-type"), /image\/webp/);
  // Qwik may inline small stylesheets and retain their built path in data-src.
  const cssPath = html.match(/(?:href|data-src)="([^"]+\.css)"/)?.[1];
  assert.ok(cssPath, "Production HTML must reference built styles");
  const css = await request(cssPath);
  assert.equal(css.status, 200);
  assert.match(css.headers.get("content-type"), /text\/css/);
});
