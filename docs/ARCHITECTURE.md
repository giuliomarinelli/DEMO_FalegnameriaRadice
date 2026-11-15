# Architettura — milestone 3

## Richiesta e rendering

Qwik City gestisce il routing file-based e il rendering SSR. La prima richiesta attraversa il middleware ufficiale Cloudflare Pages, risolve la rotta, genera l’HTML con `renderToStream` e restituisce contenuti e metadati. Il browser carica CSS, immagini locali e i moduli Qwik necessari alle interazioni. L’apertura del menu usa `component$`, `useSignal` ed eventi QRL `onClick$`; nessuna idratazione React.

Le navigazioni sono link HTML ordinari: ogni destinazione è richiedibile direttamente. Anche a JavaScript disabilitato, il contenuto resta nel documento e il menu mobile è espanso dalla media query `scripting: none` nei browser che la supportano. Il footer mantiene comunque tutti i collegamenti.

Non esistono API business, database, account, form di invio, servizi font esterni, analitiche o pagamenti. I testi dimostrativi risiedono nel codice. Le Pages Functions sono esclusivamente il runtime SSR consentito dalla specifica.

## Struttura

```text
adapters/cloudflare-pages/vite.config.ts  adapter ufficiale, build SSR, ssg: { include: [], exclude: ["*"] }
public/                                 favicon, robots, direttive cache
src/
  components/
    brand/                              marchio originale riutilizzato
    router-head/                        metadati della rotta e canonical opzionale
    section-intro/                      apertura comune delle pagine interne
    furniture-drawing/                  tre schemi originali SVG, illustrativi
    configuration-drawing/              schema SVG derivato dalla configurazione
    furniture-configurator/             controlli e riepilogo reattivi Qwik
    project-card/                       scheda sintetica del concept
    material-swatches/                  campionario con link alle essenze
    site-header/                        navigazione e disclosure mobile
    site-footer/                        navigazione secondaria e disclaimer
  lib/site.ts                           navigazione, helper DocumentHead, origine pubblica
  lib/catalog.ts                        dati demo di concept, essenze e finiture
  lib/configurator.ts                   validazione, tariffe, calcolo e riepilogo puri
  media/                                sorgente fotografica con licenza documentata
  routes/
    layout.tsx                          skip link, header, main, footer
    index.tsx                           homepage
    lavorazioni/index.tsx
    portfolio/index.tsx
    materiali/index.tsx
    configuratore/index.tsx
    contatti/index.tsx
    404.tsx                             pagina sconosciuta
  entry.cloudflare-pages.tsx            middleware Pages
  entry.ssr.tsx                         renderToStream, lingua italiana
  entry.dev.tsx                         entrypoint standard dello scaffold
  entry.preview.tsx                     entrypoint standard Node, non usato per validare Pages
  root.tsx                              QwikCityProvider, head, RouterOutlet
  global.css                            Tailwind 4, token e pochi stili dedicati
tests/ssr.test.mjs                       integrazione HTTP sulla produzione locale
tests/configurator.test.mjs              test del modello deterministico
tests/configurator.component.test.mjs    eventi dei componenti Qwik nel DOM di test
tests/prepare-components.mjs             optimizer ufficiale per i soli test
tsconfig.tests.json                     compilazione locale nei risultati ignorati
vite.config.ts                          plugin Qwik City, Qwik, Tailwind e alias TS
wrangler.jsonc                          output Pages, runtime locale, nessun binding
```

`entry.dev.tsx` è il file convenzionale dello scaffold; i comandi pubblicati avviano `vite --mode ssr`. La verifica di accettazione usa **Wrangler sulla build**, non l’entrypoint di sviluppo o il preview Node.

## Artefatti

`npm run build` usa il coordinatore ufficiale `qwik build`: typecheck, client, server e lint. L’adapter produce `dist/_worker.js`, piano delle rotte, `_routes.json` e asset client in `dist/build` e `dist/assets`. `ssg: { include: [], exclude: ["*"] }` disabilita la generazione delle pagine statiche; un eventuale `404.html` tecnico dell’adapter non sostituisce SSR. `dist/`, `server/` e le cache non sono versionati. Il piccolo `_worker.js` importa i moduli nella cartella `server/`: mantenerla accanto a `dist/` fino al bundling Wrangler. Non trasferire solo `dist/` come sito statico.

## Design e accessibilità

Palette noce `#38271D`, betulla `#E9DCC5`, rame `#B66B40` e salvia `#7C8065`, con carta e varianti testuali per contrasto. Marchio ad anelli conservato; serif e sans di sistema. Tailwind governa layout e stati; CSS dedicato a texture, campioni, hero, disclosure responsive e preferenze di movimento. Le quattro foto locali passano dall’import Qwik `?jsx`, che genera varianti e `srcset` a build time. Hero eager ad alta priorità, immagini successive lazy. Licenze in [ASSETS](ASSETS.md), sistema visivo in [BRAND_DIRECTION](BRAND_DIRECTION.md).

`catalog.ts` mantiene dati mock senza stato applicativo: tre concept, tre essenze e tre finiture. `FurnitureDrawing` rende schemi SVG originali accessibili, senza servizi esterni. I campioni sono link ai dettagli materiali, senza selezione. Il portfolio ha sezioni con anchor stabili; tutte le destinazioni rimangono nelle sei rotte previste. Le FAQ usano `details`/`summary` nativi, funzionanti senza JavaScript.

HTML italiano, landmark semantici, un H1 per pagina, alt descrittivi, skip link, `focus-visible`, menu con `aria-controls`/`aria-expanded`, indicazione della rotta attiva e rispetto di `prefers-reduced-motion`. Il menu è una normale disclosure di navigazione, senza focus trap. Non è introdotta una libreria componenti: sono condivisi solo marchio, shell e apertura delle pagine, dove esiste riuso concreto.

## Metadati e configurazione pubblica

Ogni file di rotta esporta un `DocumentHead`. Titoli, descrizioni e Open Graph vengono renderizzati da `RouterHead`. Canonical opzionale da `VITE_SITE_ORIGIN` a build time: si usa solo origine più pathname, escludendo query e frammenti. Nessun dominio presunto o localhost pubblicato come canonical. Tutte le pagine sono `noindex, nofollow` per la demo. Questi metadati non sono autenticazione né protezione Access.

TypeScript è strict e usa il runtime JSX `@builder.io/qwik`. Il valore convenzionale `jsx: react-jsx` seleziona la trasformazione automatica TypeScript e **non** introduce React: `jsxImportSource` punta a Qwik.

## Limiti intenzionali

Le sei pagine hanno contenuti dimostrativi completi, senza attività commerciali reali. Il configuratore è una simulazione locale: nessun ordine, invio, persistenza, controllo strutturale o valore commerciale. SSR, adapter, routing, entrypoint, configurazione hosting e dipendenze della foundation restano invariati. Il deployment richiede una richiesta separata del proprietario.

## Configuratore reattivo

`FurnitureConfigurator` usa `useStore` per la bozza testuale, `useComputed$` per validazione, stima e riepilogo, `useSignal` per gli annunci e la copia. Gli eventi QRL aggiornano soltanto lo stato locale; nessuna action, loader o API business. Radio, select e input numerici sono nativi. Misure invalide sospendono prezzo, schema e copia. Cambiare prodotto ripristina le sue dimensioni, il reset ripristina tutte le scelte. La Clipboard API ha una alternativa manuale readonly.

Il dominio puro `configurator.ts` è l’unica fonte delle tariffe e dei limiti. Calcola voci monetarie in centesimi; gli esempi indipendenti sono nei test. `ConfigurationDrawing` riceve solo una configurazione validata e rende uno schema SVG con proporzioni, essenza e finitura. Formula, assunzioni e flusso completo in [CONFIGURATOR](CONFIGURATOR.md).

L’HTML SSR include già la simulazione iniziale completa da 483,18 €. `noscript` spiega che le modifiche richiedono JavaScript e nasconde i controlli; la stima iniziale rimane leggibile. Nessun accesso a `navigator` durante il rendering server: la clipboard è invocata solo nell’evento browser.

I test distinguono modello puro, componenti con optimizer e DOM ufficiali Qwik, e HTTP su produzione Pages. `tsconfig.tests.json` e il preparatore scrivono soltanto in `test-results`, esclusa da Git. Nessuna nuova dipendenza o modifica alla toolchain di produzione. La simulazione DOM non sostituisce una verifica di ripresa e layout nel browser: limiti effettivi nel worklog.
