# Worklog

## 2026-11-15 — milestone 1: fondamenta e identità

### Mandato e verifiche preliminari

Lettura integrale di `AGENTS.md` e `docs/MVP.md`. Scope autorizzato: una sola milestone, una sola sessione, nessun worktree, merge, rebase o deployment. I due documenti vincolanti restano invariati.

Comandi iniziali:

```powershell
git status --short
git branch --show-current
git branch -avv
git remote -v
git fetch origin
git rev-list --left-right --count develop...origin/develop
git ls-remote --heads origin feature/mvp-foundation
git switch -c feature/mvp-foundation develop
node --version
npm --version
```

Esito: working tree pulito, branch iniziale `develop`, locale e remoto entrambi `9ddecc1`, confronto `0 0`, nessun branch di lavoro preesistente locale o remoto. Creato `feature/mvp-foundation` da `develop`. Non sono stati aggiornati altri branch. Node **22.16.0**, npm **10.9.2**.

### Scaffold e dipendenze

Consultati documentazione Qwik e registry npm per versioni stabili e compatibilità. Usato lo scaffold ufficiale **create-qwik 1.20.4**, template `empty` con routing Qwik City:

```powershell
$scaffoldPath = Join-Path $env:TEMP 'radice-qwik-foundation-20261115'
npx --yes create-qwik@1.20.4 empty $scaffoldPath
```

Trasferiti soltanto `src`, `public`, `.gitignore`, `.prettierignore`, `eslint.config.js`, `package.json`, `qwik.env.d.ts`, `tsconfig.json` e `vite.config.ts`, controllando prima le destinazioni. La cartella `src` preesistente era vuota; nessun file preesistente è stato sovrascritto. Non copiati `.vscode` o README generico; nessun `git init`. Il progetto temporaneo può rimanere nel percorso indicato, fuori dalla repository; nessuna pulizia di altri progetti è stata effettuata.

```powershell
npm install
npm run qwik add cloudflare-pages
npm install -D '@tailwindcss/vite@4.3.5' 'tailwindcss@4.3.5' 'wrangler@4.162.0' 'eslint@^9' 'typescript-eslint@latest' '@types/node@^22'
npm ci
```

Il comando di integrazione Cloudflare è quello ufficiale e modifica solo file locali; confermata l’applicazione dello scaffold nel terminale. Nessun login. Il template suggeriva Wrangler 3: sostituito con **4.162.0**, compatibile con Node disponibile, e rimosso il suo script remoto `deploy` dal progetto. Tailwind 4 integrato mediante plugin Vite ufficiale. Rimossi `undici` e plugin CSS modules diretti non usati; mantenuto il necessario allo scaffold. Dipendenze risolte e lockfile npm versionati.

Versioni finali principali: Qwik/Qwik City/eslint-plugin-qwik **1.20.4**, Vite **7.3.7**, TypeScript **5.4.5**, Tailwind/plugin **4.3.5**, Wrangler **4.162.0**, ESLint **9.39.5**, typescript-eslint **8.72.2**. TypeScript strict; runtime JSX Qwik. Nessuna dipendenza React introdotta.

### Implementazione e motivazioni

- Routing Qwik City con `/`, `/lavorazioni/`, `/portfolio/`, `/materiali/`, `/configuratore/`, `/contatti/` e pagina 404. Le rotte interne forniscono introduzioni credibili e percorsi funzionanti, non i cataloghi estesi della milestone 2.
- Layout comune con landmark, skip link, header, menu mobile, footer e disclaimer persistente. `component$`, `useSignal`, QRL e `useLocation` per disclosure e rotta attiva; link HTML reali per ogni destinazione.
- Homepage editoriale: marchio originale ad anelli, palette carta/verde/terracotta, grandi titoli serif, fotografia di materia e studio cromatico originale in CSS. Font di sistema, senza richieste a servizi font.
- Fotografia di Tim Schmidbauer scaricata localmente dopo verifica della pagina e della licenza Unsplash gratuita. Attribuzione e distinzione da lavori Radice; fonte in `docs/ASSETS.md`. Import Qwik `?jsx` per generare varianti responsive e `srcset`.
- Configuratore esplicitamente in preparazione: nessun prezzo, input, formula o riepilogo. Contatti senza email, telefono, form o invio.
- Metadati SSR italiani per ogni rotta, Open Graph e `noindex, nofollow`. Canonical opzionale da origine pubblica di build `VITE_SITE_ORIGIN`, senza inventare un dominio. `robots.txt` impedisce il crawling richiesto ai motori, non costituisce protezione Access.
- Adapter ufficiale con `ssr: true` e `ssg: { include: [], exclude: ["*"] }`; entrypoint Pages e `renderToStream`. Configurazione Wrangler solo locale/output, nessun binding o secret, telemetria disattivata.
- Test d’integrazione essenziale in Node: richiesta HTTP diretta delle sei rotte, contenuti e metadati già presenti senza JS, navigazione, configuratore inattivo, 404, asset e artefatti SSR. Nessuna suite artificiale per componenti presentazionali.
- Creati README, architettura, deployment/riproduzione/rollback, case study e registro asset.

### Problemi incontrati e correzioni

- PowerShell richiede virgolette per gli scope npm `@...`; corretto il primo comando di interrogazione del registry, senza modifiche applicative.
- Il CLI di integrazione richiede un TTY: un tentativo senza terminale interattivo ha restituito `ERR_TTY_INIT_FAILED`, quindi è stato eseguito in TTY e completato. Non si trattava di un errore del runtime Cloudflare.
- Alcuni avvii successivi del processo PowerShell hanno restituito un errore ambientale di accesso negato; i comandi sono proseguiti in `cmd.exe`, senza modificare configurazioni del sistema.
- Il lint iniziale ha segnalato due `qwik/jsx-img`: le immagini da percorso pubblico sono state convertite a import locali `?jsx`, mantenendo i controlli del lint e ottenendo varianti responsive.
- Il typecheck della ricostruzione ha rilevato che i componenti immagine `?jsx` non accettano `width`/`height` espliciti: rimossi i due attributi, perché le dimensioni sono generate automaticamente dal plugin; il ritaglio resta gestito dal CSS.
- `npm ci` è terminato con codice 0 e un warning Windows `EPERM` nella pulizia di un pacchetto opzionale sharp per WebContainers. Nessuna cancellazione manuale o modifica ai permessi; la verifica finale usa i pacchetti nativi della piattaforma corrente.
- La configurazione iniziale `ssg: null`, pur accettata dal typecheck, in Qwik City 1.20.4 salta anche il packaging e non genera `_worker.js`: diagnosticato nel codice installato dell’adapter condiviso. Sostituita con inclusioni vuote ed esclusione globale, conservando il packaging ufficiale ma nessuna pagina pubblica prerenderizzata. Il primo avvio Wrangler senza Worker è stato arrestato e non è usato come evidenza SSR.
- La prima build è stata ricostruita dopo l’integrazione immagini, per evitare di usare artefatti client precedenti con un server aggiornato. Fanno fede soltanto le verifiche finali sotto.

### Verifica finale

| Verifica | Esito effettivo |
| --- | --- |
| `npm ci` | PASS, codice 0; warning opzionale EPERM e audit descritti sotto |
| `npm run typecheck` / `build.types` | PASS, TypeScript strict |
| `npm run lint` | PASS, nessun errore o warning ammesso (`--max-warnings 0`) |
| `npm run fmt.check` | PASS |
| `npm run build` | PASS: client, server SSR, typecheck e lint |
| `npm test` sul runtime Pages di produzione locale | PASS, **10/10**, nessun test saltato |
| Artefatti | `_worker.js`, `_routes.json`, chunk server e client, cinque WebP responsive, CSS; solo `404.html` tecnico, nessun HTML delle sei pagine pubbliche |
| HTTP SSR diretto | Tutte e sei le rotte HTTP 200 con H1, contenuto significativo, titolo, descrizione, lingua e disclaimer nel primo HTML; percorso sconosciuto HTTP 404 |
| Browser Playwright, responsive | Sei rotte × cinque larghezze (**30 controlli**, 320/390/768/1024/1440 px), HTTP 200, un H1, nessun overflow orizzontale |
| Ispezione visiva | Screenshot rivisti: homepage 1440 × 1000, homepage 390 × 844, Materiali a 768 px; immagine caricata e ritaglio coerente |
| Interazione verificata | Attivazione DOM del menu: apertura/chiusura, testo e `aria-expanded` aggiornati, navigazione visibile/nascosta; skip link porta il focus al `main`; focus visibile osservato di 3 px |
| Console browser | Nessun errore o warning applicativo osservato |
| Specifiche e Git | `AGENTS.md` e `docs/MVP.md` invariati; controllo whitespace eseguito prima del commit |

Runtime effettivamente collaudato: **Wrangler 4.162.0 / workerd locale** su `http://127.0.0.1:8790`, avviato in TTY. Nessuna data di compatibilità retrocessa segnalata. Il primo processo sulla porta 8788 aveva dato timeout anche sugli asset: arrestato e riavviato su porta alternativa, senza cambiare rete o fermare altri servizi; non attribuita una causa non dimostrata. Il successivo comando riproducibile `npm run serve -- --port 8790` funziona e i 10 test sono stati rieseguiti su questo processo. La porta di default è 8788, configurata nel file Wrangler, così l’override non duplica un’opzione CLI (Wrangler rifiuta due `--port`).

Per riprodurre l’esito HTTP nella stessa configurazione, terminale 1:

```powershell
npm ci
npm run build
npm run serve -- --port 8790
```

Terminale 2:

```powershell
$env:TEST_BASE_URL = 'http://127.0.0.1:8790'
npm test
Remove-Item Env:TEST_BASE_URL
```

Il test considera gli attributi `q:head` dei titoli e i CSS che Qwik incorpora direttamente nell’HTML mantenendo `data-src`; le prime aspettative troppo rigide sono state corrette dopo ispezione dell’HTML reale. Le richieste HTTP non eseguono alcuno script. Il ramo canonical senza origine configurata è verificato; il test opzionale con dominio di esempio documentato non è stato eseguito.

**Limiti del browser:** il connettore ha rifiutato `browser.newContext` (`Target.createBrowserContext: Not allowed`), quindi non è stata eseguita una sessione separata con JavaScript disabilitato. Gli invii Playwright di tasti non hanno prodotto eventi `keydown` nella pagina, verificato con listener temporaneo di diagnostica: la prova da tastiera fisica non è dichiarata superata. Anche un click automatico ha dato timeout; menu e skip link sono quindi verificati con attivazioni DOM, che sono una simulazione funzionale e non una prova di input reale. Focus e semantica sono presenti; prima della successiva accettazione eseguire manualmente il percorso tastiera descritto nel deployment. Nessuna sostituzione con input nativo o modifica delle impostazioni del browser.

Screenshot ed eventuali catture locali sono sotto `test-results/` e `.playwright-mcp/`, esclusi da Git. Nessun log debug Wrangler o materiale sensibile viene versionato. Queste verifiche locali non dimostrano un deployment remoto, compatibilità Safari o un audit completo WCAG.

### Dipendenze: limite noto

L’installazione segnala **12 vulnerabilità transitive (8 moderate, 4 high)** e deprecazioni di pacchetti ereditati dallo scaffold. L’audit iniziale identifica catene Qwik City → `vite-imagetools` → `sharp`, Qwik City → `zod`, e strumenti ESLint → `minimatch`. Non applicato `npm audit fix --force`: il suggerimento di downgrade Qwik City a `0.0.128` è incompatibile con lo stack stabile richiesto. Non introdotti override di major transitive non collaudati. Il sito non accetta immagini o dati business dall’utente; questo limita i percorsi applicativi esposti, senza dichiarare risolte le segnalazioni. Riesaminare gli aggiornamenti upstream prima di un deployment futuro. ESLint 9, compatibile col plugin Qwik attuale, è segnalato come non più supportato dal registry.

### Git e perimetro finale

Consegna organizzata in due commit atomici sul solo `feature/mvp-foundation`:

1. **`6ba79e7` — `feat: establish Qwik City SSR foundation and Radice identity`**: applicazione, adapter, strumenti, lockfile, test HTTP e attribuzioni asset.
2. **`docs: record foundation architecture and SSR validation`**: README e quattro documenti di architettura, riproduzione, case study e worklog. L’identificativo è ricavabile con `git log -2 --oneline`.

Per entrambi, firma disattivata esclusivamente mediante `git -c commit.gpgsign=false commit -F <file-messaggio-locale>`. Il file di messaggio è sotto `test-results/`, escluso da Git. Il primo tentativo con messaggio inline è stato rifiutato dal parsing del terminale senza creare commit; usato poi `-F` per conservare esattamente il testo.

Comando di invio autorizzato: `git push -u origin feature/mvp-foundation`. Verifica dell’allineamento: `git rev-list --left-right --count HEAD...origin/feature/mvp-foundation` deve restituire `0 0`, con `git status --short` vuoto. Nessuna modifica permanente alla configurazione Git, nessun force push. `develop`, `preview`, `master`, CI e servizi remoti rimangono fuori dalle modifiche di questa milestone. Un push Git del branch non costituisce deployment Cloudflare.

Milestone successive non avviate. Il prossimo lavoro, solo su nuova istruzione, è completare pagine e contenuti della milestone 2. Configuratore completo riservato alla 3; audit esteso e preparazione finale alla 4. Il proprietario conserva il controllo di qualsiasi pubblicazione e configurazione Cloudflare.

### Fonti tecniche consultate

- https://qwik.dev/docs/getting-started/
- https://qwik.dev/docs/deployments/cloudflare-pages/
- https://qwik.dev/docs/integrations/tailwind/
- https://qwik.dev/docs/integrations/image-optimization/
- https://developers.cloudflare.com/pages/functions/local-development/
- https://unsplash.com/license
- Pagina specifica della fotografia e fonte di download in `docs/ASSETS.md`.

Le istruzioni locali applicate per l’hosting sono le skill `cloudflare` e `wrangler`; la configurazione remota non è stata eseguita.

## 2026-11-15 — milestone 2: identità materica e contenuti

### Mandato e stato iniziale

Lettura integrale di `AGENTS.md`, `docs/MVP.md` e dei documenti della foundation (README, architettura, deployment, case study, asset e worklog). Per istruzione esplicita, lavoro sul branch esistente `feature/mvp-foundation`, senza creare altri branch o worktree. Nessun subagente.

```powershell
git status --short
git branch --show-current
git log -3 --oneline
git fetch origin
git rev-list --left-right --count HEAD...origin/feature/mvp-foundation
```

Working tree inizialmente pulito; HEAD `06e3ad3`, allineamento remoto `0 0`. Nessuna modifica utente imprevista. Specifiche vincolanti preservate; nessun merge, rebase o modifica agli altri branch.

### Direzione e contenuti realizzati

- Palette richiesta: noce `#38271D`, betulla `#E9DCC5`, rame `#B66B40`, salvia `#7C8065`. Verde bosco rimosso dai token e dai componenti; aggiornati anche favicon e theme-color. Conservato il marchio ad anelli.
- Texture carta CSS originale, hero scuro, fotografia ravvicinata, sezioni immersive e composizione da quaderno. Serif di sistema e testi funzionali senza font esterni. Varianti di rame e bruno per testi piccoli leggibili; rapporti dei colori solidi calcolati e documentati.
- Homepage completa con bottega, tre studi, materiali, rifinitura e accesso all’anteprima.
- Lavorazioni: famiglie di arredo, metodo in quattro passaggi, giunzioni, bordi e superficie.
- Portfolio: Convivio (tavolo), Intervallo (libreria), Sponda (madia), con disegni SVG originali, dimensioni L × P × H, essenza, finitura, dettaglio e contesto. Concept dimostrativi, non lavori reali, esecutivi o verifiche strutturali.
- Materiali: noce, rovere e frassino; tre finiture con descrizioni, campioni illustrativi, osservazione della superficie e note sulla cura. Nessuna prestazione certificata o essenza attribuita arbitrariamente alle fotografie.
- Configuratore: presentazione di sola lettura di tipologie, materiali, significato delle tre misure e finiture. Nessun input, selezione apparente, formula, prezzo, riepilogo copiabile o invio. Milestone 3 non avviata.
- Contatti: domande utili per pensare un progetto, trasparenza sulla bottega immaginaria, quattro FAQ native e crediti. Nessun recapito inventato, modulo o messaggio raccolto.

### Asset e struttura

Tre nuove fotografie Unsplash gratuite: Dominik Scythe (utensili), Elliott Ledain (rifinitura), Colin Watts (superficie), aggiunte alla fotografia della foundation. Verificate pagine e licenza prima del download; copie locali in `src/media`, attribuzioni e URL riproducibili in `docs/ASSETS.md`, crediti pubblici in Contatti. Le immagini non rappresentano Radice o i concept originali.

Download con `Invoke-WebRequest -Uri <URL-documentato-in-ASSETS> -OutFile src/media/<nome>.webp`. Varianti responsive tramite gli import Qwik `?jsx` già presenti nello stack; nessun hotlink o servizio immagini nel runtime.

`src/lib/catalog.ts` centralizza soltanto dati mock di concept, essenze e finiture. Nuovi componenti `FurnitureDrawing`, `ProjectCard`, `MaterialSwatches` per il riuso effettivo nelle pagine. Routing e layout Qwik City preservati. FAQ native `details`/`summary`, senza dipendenze. Nessun cambiamento a adapter, entrypoint SSR, configurazione Wrangler, lockfile o dipendenze.

Creato `docs/BRAND_DIRECTION.md`; aggiornati README, ARCHITECTURE, DEPLOYMENT, CASE_STUDY, ASSETS e questo registro. Procedure di avvio e rollback della foundation ancora valide. Per annullare la milestone usare commit inversi sul branch, quindi build e test; niente reset, merge o force push.

### Comandi e riproduzione

Dipendenze già installate dalla foundation, nessun install o aggiornamento necessario. Da un checkout pulito usare prima `npm ci` come nel README.

```powershell
npm run fmt
npm run typecheck
npm run lint
npm run fmt.check
npm run build
npm run serve -- --port 8790
```

Con runtime attivo, in un secondo terminale:

```powershell
$env:TEST_BASE_URL = 'http://127.0.0.1:8790'
npm test
Remove-Item Env:TEST_BASE_URL
```

Usato Wrangler locale **4.162.0**, build di produzione con adapter Pages ufficiale. Nessun login, account, provisioning, binding remoto o deployment. Arrestare il solo processo locale avviato per questa verifica con `Ctrl+C` (oppure `x` nel terminale interattivo Wrangler).

### Verifiche

| Verifica | Evidenza |
| --- | --- |
| TypeScript strict | `npm run typecheck`, codice 0 |
| ESLint | `npm run lint`, codice 0, nessun warning ammesso |
| Formattazione | `npm run fmt.check`, codice 0 |
| Produzione | `npm run build`, codice 0; client, server, typecheck e lint |
| HTTP sul runtime Pages | **14/14 test**, nessuno saltato |
| SSR | Tutte le sei rotte con contenuti significativi, H1 e metadati nel primo HTML, senza eseguire JS; 404 corretto |
| Contenuti nuovi | Tre schede e quote, note sulle giunzioni, essenze/finiture su entrambe le pagine; nessun controllo o prezzo nel configuratore |
| Collegamenti | Destinazioni locali e tutti i frammenti editoriali risolti, inclusi portfolio/materiali/metodo/crediti |
| Fotografie | Varianti responsive locali richieste via HTTP e corpi immagine letti, stato 200 e MIME WebP |
| Responsive | 30 controlli: sei rotte a 320/390/768/1024/1440 px, nessun overflow, un H1 per pagina |
| Ispezione visiva | Home desktop, configuratore mobile, portfolio tablet, Contatti desktop; controllati foto, disegni, titoli e spaziature |
| Comportamento | Menu mobile aperto/chiuso con aggiornamento aria-expanded; skip link sposta il focus al main; FAQ si espandono. Attivazioni DOM, non prova da tastiera fisica |
| Console | Nessun errore o warning applicativo osservato |

Le foto lazy vengono ispezionate dopo il caricamento/decodifica, non contando come difetto uno screenshot acquisito prima del loro caricamento. Le catture stanno in `test-results/m2-*.png`, il log build in `test-results/milestone-2-build.log`, entrambi esclusi da Git. La suite HTTP legge direttamente l’HTML, quindi non dipende dalla disponibilità di un contesto browser con JS disabilitato.

### Correzioni e limiti

- Scelta una variante testuale scura del rame: il colore principale non raggiunge il rapporto necessario per piccoli testi sul chiaro. Scuro anche il bruno secondario per la betulla. Il calcolo dei token non è una certificazione WCAG completa.
- Aggiunto consumo dei corpi immagine al test asset, per evitare che le risposte fetch non lette mantengano aperte connessioni durante l’uscita del runner.
- Dopo ispezione tablet, le schede portfolio passano a due colonne solo da 1024 px e il foglio di disegno mantiene la sua altezza naturale; sotto questa soglia si leggono in sequenza.
- Nessuna nuova prova di input fisico da tastiera o Safari: restano i limiti del connettore descritti nella foundation. Semantica e focus CSS preservati; percorso manuale riproducibile nel deployment. Le attivazioni DOM sono dichiarate come simulazione funzionale.
- Audit dipendenze non rieseguito in questa milestone: le segnalazioni registrate nella foundation non sono dichiarate risolte. Dipendenze e lockfile invariati; nessuna remediation fuori scope.
- Nessuna prova di deployment remoto o modifica a DNS, Access, secrets, CI o billing.
- L’ultima acquisizione aggiuntiva del browser è rimasta bloccata durante la decodifica e poi anche sulle letture successive; interrotta senza modificare o riavviare il browser condiviso. Le 30 verifiche e le schermate salvate precedono l’ultimo ritocco di copy nella home e l’impaginazione tablet del portfolio. Build e 14 test HTTP sono stati rieseguiti sul contenuto finale; la ricattura visiva del portfolio aggiornato rimane da effettuare manualmente.

### Consegna Git e arresto

Commit atomici sul solo `feature/mvp-foundation`: **`689443b` — `feat: create material identity and complete Radice content`** per implementazione, test e fonti asset; **`docs: document Radice brand direction and milestone two validation`** per direzione di marca, documenti aggiornati e questo registro. Per ciascuno usato `git -c commit.gpgsign=false commit -F <file-messaggio-locale>`. File dei messaggi esclusi da Git in `test-results`. Push autorizzato: `git push origin feature/mvp-foundation`. Identificativo del commit documentale recuperabile con `git log -2 --oneline`.

Controlli finali: `git diff --check`, `git status --short`, confronto `HEAD...origin/feature/mvp-foundation` e diff nullo per `AGENTS.md` e `docs/MVP.md`. Nessuna modifica permanente alla configurazione Git. La milestone si ferma qui: il preventivo simulato e il riepilogo sono riservati alla successiva istruzione.

## 2026-11-15 — Milestone 3, configuratore di arredi

### Perimetro e situazione iniziale

Richiesta esplicita: rendere interattiva la presentazione esistente, proseguendo su `feature/mvp-foundation`, senza nuovo branch. Letti integralmente AGENTS, MVP e documenti della foundation/identità. Working tree iniziale pulito, HEAD `7782fb5`; dopo `git fetch origin`, confronto con `origin/feature/mvp-foundation` **0/0**. Nessun subagente, worktree, merge, rebase o modifica ad altri branch. AGENTS e MVP preservati.

### Implementazione e motivazioni

- Tre tipologie: tavolo, libreria, madia, con intervalli dimensionali specifici. Tre essenze e tre finiture riusano il catalogo della milestone 2. Il cambio di tipologia conserva essenza/finitura e ripristina le sue misure iniziali; il reset completo torna all’esempio tavolo/rovere/olio naturale.
- Modello puro in `src/lib/configurator.ts`: bozza testuale, validazione delle opzioni e delle misure, superficie equivalente, tariffe inventate e somma in centesimi. Le misure non valide non vengono corrette silenziosamente: prezzo, schema e copia vengono sospesi. Anche l’ingresso pubblico del calcolo ricontrolla le dimensioni.
- Formula `radice-demo-v1` spiegata nell’interfaccia, nel riepilogo copiato e in `docs/CONFIGURATOR.md`. Esempio iniziale: 1,86 m² equivalenti × 145 €/m² = 269,70 € di materiale; 180,00 € lavorazione; 33,48 € finitura; totale **483,18 €**. Cifre inventate, nessun valore commerciale; niente imposte, trasporto, montaggio o accessori nel modello.
- `FurnitureConfigurator` usa `useStore`, `useComputed$`, `useSignal` e gestori QRL. Stato locale, nessun loader/action/API business, storage o dipendenza aggiunta. Input nativi con label, fieldset/legend, aiuti e messaggi d’errore associati; regioni di stato e focus visibile.
- `ConfigurationDrawing` rende uno schema originale SVG dalle dimensioni validate, con forma, colore e finitura variabili. Nessun asset nuovo di terzi, fotografia invariata. Layout carta/betulla, accenti rame e noce; una colonna sotto il desktop, riepilogo affiancato e sticky sul desktop.
- Clipboard invocata soltanto da evento utente. Conferma dopo successo, nessuna conferma per un testo ormai cambiato; reset invalida richieste pendenti. API assente o permesso negato: testo readonly selezionabile per copia manuale. Nessun invio alla bottega.
- SSR include esempio iniziale completo, fattori, formula e metadati. `noscript` spiega il requisito JavaScript per le modifiche e nasconde i controlli inerti. Home e FAQ Contatti aggiornate per non descrivere il configuratore come futuro.
- Adapter Pages, entrypoint, routing, hosting, dipendenze e lockfile invariati. Nessun install o aggiornamento richiesto: dipendenze già presenti dalla foundation. Per un checkout nuovo rimane `npm ci`.

### Test e riproduzione

`test.unit` compila i file necessari con `tsconfig.tests.json` in `test-results/configurator`, poi l’optimizer Qwik ufficiale prepara i due componenti reali per `@builder.io/qwik/testing`. Condizione Node `development`, eventi QRL eseguiti nel DOM di test. Il preparatore non modifica i sorgenti o la build di produzione e non richiede nuove librerie. `npm test` esegue prima questi test, poi la suite HTTP.

```powershell
npm run fmt
npm run typecheck
npm run lint
npm run test.unit
npm run build
npm run serve -- --port 8790
```

Con build completata e runtime attivo, nel secondo terminale:

```powershell
$env:TEST_BASE_URL = 'http://127.0.0.1:8790'
npm test
Remove-Item Env:TEST_BASE_URL
npm run fmt.check
git diff --check
git diff --exit-code -- AGENTS.md docs/MVP.md package-lock.json adapters wrangler.jsonc
```

| Verifica effettivamente eseguita | Risultato |
| --- | --- |
| TypeScript strict | `npm run typecheck`, codice 0 |
| ESLint | `npm run lint`, codice 0, zero warning ammessi |
| Formattazione | `npm run fmt.check`, codice 0 |
| Modello puro | **11/11**: default, estremi/valori adiacenti di ogni misura, input malformati, ID sconosciuti/prototipo, 27 combinazioni, esempi indipendenti, arrotondamento, monotonia e riepilogo |
| Componenti Qwik | **4/4**: reattività misure/materiale/finitura, schema e fattori; cambio prodotto e limiti; errori, recupero e reset; copia riuscita, conferma obsoleta rimossa e fallback su permesso negato |
| Build produzione | `npm run build`, codice 0: client e server SSR, typecheck e lint |
| HTTP su produzione Pages locale | **14/14**, nessuno saltato, dopo riavvio del runtime sulla build finale |
| SSR senza JS client | Richieste dirette a tutte le sei rotte: testo significativo, H1, titolo, descrizione, navigazione; `/configuratore/` contiene 483,18 €, opzioni, controlli, fattori e disclaimer già nell’HTML |
| Artefatti e regressioni HTTP | `_worker.js`, piano rotte, asset client/server, nessuna pagina pubblica SSG; 404, link/frammenti e fotografie locali corretti |
| File protetti | Diff nullo per AGENTS, MVP, adapter, Wrangler e lockfile |

Log locali non versionati: `test-results/milestone-3-build.log` e `test-results/milestone-3-tests.log`. Wrangler **4.162.0**, solo `127.0.0.1:8790`; nessun login, account, provisioning o comando remoto. Il `404.html` tecnico prodotto dall’adapter è atteso: le sei pagine pubbliche restano SSR.

### Correzioni durante lo sviluppo e limiti

- Il primo valore atteso del test della madia conteneva un errore aritmetico nella superficie: ricostruito a mano come 44.952 cm² e totale 1.300,41 €. Corretto il test, senza modificare la formula per adattarla a un valore errato.
- Il DOM ufficiale Qwik non è un browser completo: i risultati mancanti di query possono essere `undefined`, le NodeList non sono iterabili e il valore iniziale del select si verifica tramite l’opzione `selected`. Adattate le asserzioni alle API effettive; i sorgenti UI restano quelli reali compilati con optimizer. Eseguire solo JavaScript emesso da TypeScript non basta per provare gli eventi QRL.
- Eliminato un warning Qwik sul contenuto di `style` usando `dangerouslySetInnerHTML` esclusivamente con CSS costante dell’applicazione nel `noscript`, senza dati utente.
- Ricostruire con Wrangler già attivo ha prodotto un errore transitorio del watcher durante la pulizia di `dist/_worker.js`, poi recuperato. Arrestato e riavviato il solo runtime della demo sulla build conclusa prima della suite finale; documentata la sequenza sicura nel deployment.
- Due tentativi del connettore browser (navigazione e nuova scheda) sono rimasti senza risposta e sono stati interrotti. Nessun reset del browser condiviso, input nativo sostitutivo o arresto di altri servizi. **Nessuna nuova verifica visuale responsive, tastiera fisica, clipboard reale o ripresa Qwik nel browser di produzione completata in questa milestone.** I test DOM verificano la reattività e gli eventi dei componenti, non questi aspetti. Matrice manuale con valori attesi in DEPLOYMENT; limite aperto dichiarato, non contato come test superato.
- Nessuna nuova verifica Safari o audit completo WCAG. Nessun audit dipendenze rieseguito: le segnalazioni della foundation non vengono dichiarate risolte. Nessun deployment o modifica Cloudflare, DNS, Access, secrets, CI o billing.

### Documenti, consegna Git e arresto della milestone

Creato CONFIGURATOR per formula, assunzioni, architettura e test; aggiornati README, ARCHITECTURE, BRAND_DIRECTION, DEPLOYMENT, CASE_STUDY e questo registro. ASSETS invariato: nessuna risorsa esterna aggiunta. Rollback tramite commit inversi sul branch, seguito da build e test; baseline precedente `7782fb5`, nessun reset o force push.

Commit implementazione e test: **`a69fc1e` — `feat: add reactive furniture configurator with transparent demo pricing`**. Commit documentale separato: `docs: document configurator model and milestone three validation`. Usato per ciascuno `git -c commit.gpgsign=false commit -F <file-messaggio-locale>`; messaggi locali in `test-results`, nessuna modifica permanente Git. Push previsto esclusivamente con `git push origin feature/mvp-foundation`; verifica di consegna tramite `git status --short`, `git log -2 --oneline` e `git rev-list --left-right --count HEAD...origin/feature/mvp-foundation` (atteso 0/0 dopo push). Identificativo documentale recuperabile dal log senza autoriferimenti nel file.

La milestone 3 termina con questa consegna. La milestone 4 non viene avviata; rimangono espliciti i controlli browser descritti sopra. Arrestare con `x` o `Ctrl+C` soltanto Wrangler avviato per questa verifica.
