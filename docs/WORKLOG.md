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

## 2026-11-15 — Milestone 4A, collaudo visuale e funzionale

Questa sezione registra il primo tratto della 4A. I risultati recuperati dopo la richiesta di nuova connessione e il successivo arresto esclusivo sono nel paragrafo finale «Integrazione 4A — connessione dedicata e verifica esclusiva». Per lo stato cumulativo usare QA_CHECKLIST, senza considerare i primi residui come ancora tutti aperti.

### Mandato, baseline e metodo

Letti AGENTS, MVP, BRAND_DIRECTION e il worklog completo, poi documentazione e sorgenti pertinenti. Branch esistente `feature/mvp-foundation`, working tree inizialmente pulito, baseline **`b470451`**. `git fetch origin` e `git rev-list --left-right --count HEAD...origin/feature/mvp-foundation`: **0/0**. Nessun nuovo branch, worktree o subagente. Specifiche e configurazione servizi preservate.

Usata la skill locale Wrangler per il runtime del progetto; consultati documentazione ufficiale Pages per lo sviluppo locale, help/configurazione installati e advisory delle dipendenze. La lettura iniziale di `npm exec -- wrangler pages dev --help` ha mostrato l’help npm anziché inoltrare il flag; i comandi di esecuzione restano gli script del progetto già verificati, senza installare una versione globale. Nessun aggiornamento delle dipendenze.

Prima build sulla baseline, avvio locale, riproduzione di un difetto, arresto del runtime, correzione e nuova build. Riavviato Wrangler solo dopo completamento della build corretta, su `127.0.0.1:8790`, versione **4.162.0**. Le prove visuali e funzionali usano il Worker Pages e gli asset di produzione, non il server Vite di sviluppo. I metadati CF_PAGES stampati all’avvio identificano la baseline Git perché i commit sono successivi al collaudo; la build contiene le correzioni locali poi versionate nei due commit sotto.

### Difetti riproducibili corretti

1. **Controlli del configuratore nascosti alla prima modifica.** Caricamento diretto a 1440: `display:block`, circa 650 px di larghezza per i controlli. Dopo L 180 → 201: prezzo 513,99 € corretto ma `display:none`, larghezza zero. Nel browser, scripting abilitato e regola `.config-controls, .config-actions { display:none!important }` attiva dentro `noscript`. Qwik ricrea i figli durante il rendering reattivo: lo stile diventa operativo. Rimossa la regola inline, mantenuto il testo noscript, aggiunto il medesimo intento al CSS globale sotto `@media (scripting: none)`. Nessun task client aggiunto o cambiamento alla formula. Verifica successiva: controlli visibili dopo modifiche, cambio prodotto e reset. Cattura difetto `test-results/m4a-before-hidden-controls.png`.
2. **CTA Materiali obsoleta.** Il link al configuratore parlava ancora di «anteprima», contraddicendo lo strumento già disponibile. Testo corretto in «Prova essenze e finiture nel configuratore», stessa destinazione e stesso layout. Nessun ampliamento editoriale effettuato.

Nessun altro intervento applicativo: niente restyling generale, nuove funzionalità, formula diversa, backend o asset aggiunti.

### Verifiche effettive e limiti

| Verifica | Esito / evidenza |
| --- | --- |
| TypeScript strict | `npm run typecheck`, codice 0 sul codice corretto |
| ESLint | `npm run lint`, codice 0, zero warning ammessi |
| Formattazione | `npm run fmt.check`, codice 0 |
| Build produzione | `npm run build`, codice 0; client, server SSR, typecheck e lint |
| Modello e componenti Qwik | **15/15**; include vuoti, decimali, reset completo e clipboard simulata |
| HTTP su Wrangler | **14/14**; sei rotte SSR con contenuto e metadati senza JS client, configurazione iniziale, 404, link/frammenti e immagini locali |
| Ripresa sul browser di produzione | Modifica L 180 → 200: 512,52 €, riepilogo/schema aggiornati; reset di questa modifica torna a 483,18 €. Libreria frassino/opaca: 884,74 €; madia noce/pigmentato: 1.300,41 € |
| Vincoli nel browser | Nove coppie min/max controllate, 18 estremi accettati, 18 adiacenti rifiutati; errori visibili e copia disabilitata. Gestori del bundle Qwik reale, non modello importato nel test |
| Responsive numerico | **12** combinazioni restituite: sei rotte × 1440/768; HTTP 200, un H1, nessun overflow del documento o elemento main oltre i bordi |
| Screenshot rivisti | **17** finali: sei a 1440, sei a 768, cinque a 390; tutte tranne Contatti mobile. Controllati gerarchia, spaziature, immagini, testo e CTA. Nessun taglio orizzontale evidente nelle cinque catture mobili |
| Contrasto token solidi | Noce/carta 12,76; noce/betulla 10,51; bruno/carta 5,87; bruno/betulla 4,84; rame scuro/carta 5,83; rame scuro/betulla 4,80. Non audit completo di ogni stato o trasparenza |
| Audit dipendenze | **12 segnalazioni, 8 moderate/4 high**, codice audit 1; analisi in DEPENDENCY_AUDIT, nessun fix forzato |
| File protetti | Nessun diff per AGENTS, MVP, package/lockfile, adapter e Wrangler |

Le misure del browser distinguono viewport impostato e area utile: 1440/768/390 con scrollbar da 15 px producono PNG larghi 1425/753/375. Non equivalgono a dispositivi mobili reali. Nei primi controlli due immagini lazy non erano ancora caricate; per le catture si è modificato **solo il DOM di test** a `loading=eager` e attesa la decodifica con un limite temporale. Le foto sono poi visibili nelle catture riviste e disponibili via HTTP. Caricamento lazy su scroll naturale ancora da provare manualmente: non corretto un presunto asset rotto senza evidenza.

La prova interattiva usa fill/selectOption nel browser e `element.click()` nel DOM per radio/reset, quindi verifica anche il resume e i QRL del bundle reale. **Non è un’accettazione di mouse/tastiera nativi.** Dopo la correzione il campo ha focus e rettangolo visibile, ma il probe temporaneo non rileva keydown per ArrowUp/Tab; un clic Playwright rimane nell’attesa di visibilità/stabilità. Non aggiunti handler o modifiche al focus per compensare il connettore. La routine dei limiti registra 70 asserzioni riuscite, poi un timeout di attesa nel ripristino dell’ultima misura; la lettura successiva mostra nuovamente misure valide e prezzo corrente. Non conteggiata come suite browser interamente passata; i successivi passi vuoto/decimale e reset completo rimangono senza conferma browser conclusiva. Restano coperti dai test locali distinti.

Durante la sesta cattura a 390 (Contatti), `page.screenshot` restituisce timeout dopo 5000 ms, dopo il caricamento dei font. **Interrotta l’automazione senza retry della cattura né tentativi a 320**, come richiesto. Nessun reset del browser condiviso, browser CLI alternativo, input nativo sostitutivo o modifica delle impostazioni di sistema. I cinque PNG mobili precedenti sono completi (`IEND`) e rivisti; la routine non ha restituito il report numerico finale di quella larghezza. La matrice 24/24 non è dichiarata superata.

Residui espliciti: tutte le rotte a 320; Contatti a 390; 404 visuale; percorso completo di tastiera; menu mobile interattivo nella 4A; clipboard reale; errori vuoto/decimale e reset completo nel browser; caricamento lazy naturale e browser con JS disabilitato. Nessuna nuova prova Safari/screen reader o certificazione WCAG. Le prove di M1/M2 sono storiche e non sostituiscono queste verifiche.

### Riproduzione ed evidenze

```powershell
git status --short
git branch --show-current
git fetch origin
git rev-list --left-right --count HEAD...origin/feature/mvp-foundation
npm run typecheck
npm run lint
npm run fmt.check
npm run build
npm run serve -- --port 8790
```

Da un secondo terminale, con runtime attivo:

```powershell
$env:TEST_BASE_URL = 'http://127.0.0.1:8790'
npm test
Remove-Item Env:TEST_BASE_URL
npm audit --json > test-results/m4a-npm-audit.json
$auditExit = $LASTEXITCODE
Write-Output "npm audit exit code: $auditExit"
npm ls sharp zod minimatch vite-imagetools --all
```

L’audit ha codice 1 per le segnalazioni, mentre build/test hanno codice 0. L’albero distingue sharp **0.34.5** (Qwik City → vite-imagetools) da **0.35.5** (Wrangler → miniflare), Zod **3.25.48** e minimatch **10.2.6** nella catena typescript-eslint. Verificati advisory e percorsi locali: immagini elaborate a build time, nessun upload; nessun validatore Zod/action o pattern glob ricevuto dall’applicazione. La sola etichetta devDependencies non è usata come prova di assenza nel Worker. La ricerca di nomi nei chunk è una verifica indicativa, non una prova formale. I downgrade suggeriti dall’audit non sono remediation compatibili collaudate. I dettagli e le fonti sono in DEPENDENCY_AUDIT; nessuna segnalazione dichiarata risolta.

Per riprodurre da un nuovo checkout usare prima `npm ci`; non necessario in questa sessione, senza cambiamenti a dipendenze/lockfile. Procedura browser completa, con valori attesi e PASS/FAIL/NON ESEGUITO, in **QA_CHECKLIST**: eseguibile dal proprietario senza chat o strumenti agente.

Evidenze ignorate in `test-results`: `m4a-build.log`, `m4a-tests.log`, `m4a-npm-audit.json`, `m4a-browser-results.json`, 17 PNG finali e cattura pre-fix; `m4a-evidence-manifest.json` registra dimensioni e SHA-256 dei 23 file di evidenza. Le catture non sono trasferite dal push. Il report versionato conserva copertura, metodo e risultati. Arrestato il solo Wrangler di questa demo con `x` dopo i test, senza fermare altri servizi.

### Documentazione e consegna

Creati **CONTENT_AUDIT.md** (ogni pagina, necessità di contenuti, proposte e motivazioni), **QA_CHECKLIST.md** (copertura ed esecuzione manuale residua), **DEPENDENCY_AUDIT.md** (catene, rilevanza, fonti e riproduzione). Aggiornati README, ARCHITECTURE, CONFIGURATOR, DEPLOYMENT, CASE_STUDY e questo registro. Nessuna proposta editoriale viene avviata automaticamente.

Commit atomici sul solo branch di lavoro:

- **`3eeead1` — `fix: keep configurator controls visible after Qwik updates`**, componente e CSS della correzione.
- **`859c1b1` — `fix: describe the active configurator in the materials CTA`**, solo copy del link obsoleto.
- `docs: record sequential Playwright QA evidence and remaining checks`, report e documenti aggiornati, compresa l’integrazione seguente; SHA ricavabile con `git log -3 --oneline`.

Per ciascuno `git -c commit.gpgsign=false commit -F <messaggio-in-test-results>`, senza modifiche permanenti alla configurazione. Invio esclusivamente con `git push origin feature/mvp-foundation`, senza force; verifica finale con `git status --short`, `git diff --check` e confronto HEAD/origin atteso 0/0. Rollback con commit inversi delle sole modifiche desiderate, seguito da build e test, senza reset/merge/rebase.

La 4A termina con i residui dichiarati e la procedura alternativa richiesta. Nessun deployment, login, provisioning o modifica a Cloudflare, DNS, Access, secrets, CI o billing. Nessuna milestone successiva avviata.

### Integrazione 4A — connessione dedicata e verifica esclusiva

**Stato cumulativo aggiornato; nessun nuovo bug applicativo dopo le due correzioni già registrate.** Il proprietario ha prima richiesto una nuova connessione MCP per completare le prove, poi disposto una fase esclusiva e sequenziale, limitata ai soli casi mancanti. Le due fasi sono distinte sotto; non si attribuiscono alla fase esclusiva prove già eseguite prima dell’ultima istruzione.

#### Risultati recuperati prima della fase esclusiva

- Richiesta al server MCP di un contesto isolato: errore di protocollo `Target.createBrowserContext: Not allowed`. Nessun aggiramento o browser alternativo. Una nuova scheda dedicata della demo ha invece risposto. Un successivo problema di clic fuori viewport è stato diagnosticato con `innerWidth/innerHeight` a zero nella nuova scheda; dopo impostazione esplicita a 1440 × 1000, il clic nativo sul reset funziona. Sono condizioni del browser di test, non bug applicativi.
- **68/68 asserzioni native completate** sul bundle Pages: radio con `check`, input con `fill`, select con `selectOption`, reset con clic Playwright. Verificati i nove limiti, i 18 estremi con prezzo esatto calcolato indipendentemente, 18 adiacenti rifiutati, errori visibili, copia disabilitata, vuoto e decimale, reset completo di tutte le opzioni e dimensioni, controlli ancora visibili. Risultato `complete:true` conservato, non una deduzione dai test unitari.
- **Tastiera effettivamente recuperata:** ArrowUp da 200 a 201 cm aggiorna a 513,99 €; Tab passa da larghezza ad altezza, Shift+Tab torna a larghezza. A 390: Tab sullo skip link, outline 3 px, Invio trasferisce focus al main; Tab percorre marchio e menu, Invio apre la navigazione (`aria-expanded=true`), Tab/Invio seguono Lavorazioni. Il percorso completo di radio/select/misure/reset/copia da sola tastiera rimane senza esito conclusivo: la relativa chiamata è stata interrotta.
- Una prima asserzione nativa leggeva i limiti immediatamente dopo il cambio prodotto, prima dell’aggiornamento Qwik. Conservato il risultato parziale con 8 asserzioni riuscite e fallimento «table width bounds». Corretta **l’attesa del test**, verificando limiti e prezzo aggiornati prima del passo successivo; la routine da 68 casi passa senza cambiare codice applicativo.
- Recuperato **Contatti a 390** tramite una richiesta di screenshot MCP dedicata. PNG completo, poi rivisto localmente: immagine, testi, FAQ, crediti e footer nei contenitori. Ora **18 screenshot finali** (6 × 1440, 6 × 768, 6 × 390), oltre al PNG del difetto iniziale. Rimangono 12 misure DOM responsive già restituite a 1440/768; non dichiarata matrice numerica 24/24.
- L’ultima routine destinata a completare i viewport è stata interrotta dall’utente. Nel client non è più disponibile la cella (`exec cell 92 not found`) e non risultano PNG a 320. Nessun passo senza risultato viene contato come superato. Durante un tentativo di salvataggio, il VM del tool ha rifiutato `import()` con `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`: limite dell’ambiente del test, non errore del sito. Le evidenze sono state salvate dal workspace, senza modificare il prodotto.

Risultati recuperati in `test-results/m4a-reconnection-results.json`, inclusi gli esiti parziali e null per la routine senza risultato. Lo script effettivamente eseguito dei 68 casi è `test-results/m4a-native-boundaries.js`. Queste risorse sono ignorate da Git; il report versionato ne registra risultati e metodo. Non sono state ripetute nella fase esclusiva.

#### Ultima fase esclusiva: preflight riuscito, blocco prima dei test

1. Riletti `docs/WORKLOG.md`, `docs/DEPLOYMENT.md` e regole operative; branch ancora `feature/mvp-foundation`, HEAD `859c1b1`. Le modifiche documentali presenti sono quelle autorizzate della 4A e di questa stessa sessione, non lavoro di terzi.
2. Riutilizzato esclusivamente Wrangler locale già avviato da questa sessione, porta **8790**, override documentato della porta base 8788. Nessun nuovo processo duplicato e nessun servizio altrui arrestato. `Invoke-WebRequest http://127.0.0.1:8790/configuratore/ -UseBasicParsing -TimeoutSec 10`: **HTTP 200**, HTML con **483,18 €**, prima di ogni nuova chiamata Playwright di questa fase.
3. Inviata una sola richiesta iniziale MCP: **`browser_tabs({action:"list"})`** per individuare la scheda dedicata prima di controllare URL/viewport. Nessuna risposta restituita; richiesta annullata nel client. Non è stato possibile selezionare/verificare la scheda, perciò **nessuna nuova sequenza funzionale o responsive è iniziata**. Nessun retry o ulteriore richiesta di connessione dopo il blocco, in conformità all’ultima istruzione.
4. **Rettifica dell’attribuzione precedente:** la richiesta è rimasta senza esito in questa sessione ed è stata annullata dal client. Questo non dimostra un guasto o un blocco del servizio MCP. La precedente classificazione come «accesso al servizio/connessione MCP bloccato» era una conclusione non supportata. L’applicazione rispondeva via HTTP; nessuna causa del mancato esito è stata accertata. Un’operazione interrotta lato client non prova né il completamento né l’annullamento della corrispondente operazione lato server.
5. Arrestato con `x` il **solo Wrangler della sessione**, processo di esecuzione 48569, con messaggio `Shutting down local server` e uscita 0. Non riavviati, terminati o riconfigurati processi browser condivisi. Nessuna ulteriore chiamata Playwright attiva nel client di questa sessione; non si può confermare la chiusura dell’ultima scheda o lo stato del servizio senza una risposta MCP. Non vengono inviate altre richieste: il collaudo cessa e la sessione successiva può riprendere l’uso esclusivo secondo il coordinamento del proprietario.

**Casi ancora mancanti:** sei rotte a 320; 404 visuale; intero percorso da tastiera nel configuratore; clipboard reale e rifiuto del permesso nel browser; lazy loading con scroll naturale; browser con JS disabilitato. Safari e screen reader restano fuori dalle prove completate. Le verifiche di vincoli/vuoti/decimali/reset e skip link/menu sopra sono ora concluse e non vanno ripetute senza un cambiamento o una nuova regressione.

Nessuna modifica al codice applicativo in questa integrazione: **typecheck, lint, 15 test locali, 14 HTTP e build già superati sul medesimo codice non sono stati rieseguiti inutilmente**. Aggiornati report e worklog per distinguere prove concluse e residui, anziché aggiungere funzionalità o modificare il browser per superare il blocco. Solo controlli documentali/Git prima del commit. `AGENTS.md`, MVP, dipendenze, adapter e servizi invariati; nessun merge, rebase o deployment.

Evidenze aggiornate: `m4a-exclusive-preflight.json` registra il preflight HTTP e il blocco all’inventario schede; il manifest finale contiene **28 artefatti** con SHA-256, compresi risultati recuperati, cattura Contatti e script locali. Controllati i link relativi dei 12 documenti Markdown, nessun file mancante; `git diff --check` senza errori. Dopo fetch il branch ha due commit locali e nessun commit remoto mancante (2/0 prima del commit documentale), nessuna divergenza. Diff nullo del codice applicativo rispetto a `859c1b1` e dei documenti protetti rispetto alla baseline.

### Rettifica e completamento delle prove browser — 15 novembre 2026

**Ritiro esplicito della conclusione sul servizio MCP.** Avevo attribuito richieste senza esito e timeout di singole operazioni a un guasto/blocco del servizio, senza averne accertato la causa. Era un errore di attribuzione, non un fatto dimostrato. La registrazione precedente del mancato risultato rimane; non autorizza quella diagnosi. Rettificati anche README, architettura, deployment, case study e report QA perché non propaghino la conclusione non supportata.

#### Preparazione e metodo corretto

Branch `feature/mvp-foundation`, baseline documentale `f543046`, working tree inizialmente pulito. Riletti regole, MVP, worklog e procedura. Il runtime 8790 era stato correttamente arrestato nella fase precedente; avviato soltanto quello della demo con `npm run serve -- --port 8790`, sessione locale 16917. `Invoke-WebRequest http://127.0.0.1:8790/configuratore/ -UseBasicParsing -TimeoutSec 10`: HTTP 200 e stima iniziale 483,18 € nell’HTML, prima delle chiamate browser.

La richiesta MCP di una nuova scheda dedicata è riuscita. Impostati e verificati URL, viewport e stato della pagina prima delle sequenze. Nessun nuovo contesto o processo browser, restart del servizio o modifica delle impostazioni condivise. Non ripetuti i 68 casi nativi già conclusi.

Le prime nuove catture includevano ancora timeout dopo «fonts loaded», sia nello script aggregato sia in singole chiamate di screenshot. Non li ho trattati come prova di guasto generale. Corretto il metodo operativo: comandi MCP dedicati; attesa del testo aggiornato dopo gli eventi Qwik; per le catture, font pronti, immagini portate nel viewport e decodificate, scroll esplicito, due frame `requestAnimationFrame`, poi screenshot. Le catture complete successive sono riuscite. Questo successo non accerta retroattivamente una causa unica di ogni timeout: non viene inventata una diagnosi del servizio.

#### Prove mancanti effettivamente concluse

| Caso | Evidenza osservata |
| --- | --- |
| Sei rotte a 320 × 800 | Sei JSON con URL/viewport esatti, `clientWidth=scrollWidth=320`, un H1, zero elementi main fuori bordo; tutte le immagini caricate. Campi del configuratore larghi 272 px |
| Visuale a 320 | Sei PNG integrali salvati e rivisti. Nessun taglio orizzontale o sovrapposizione; header/menu su due righe, testi e input nei contenitori. Nessun bug nuovo da correggere |
| Matrice cumulativa | **24 screenshot integrali**: sei rotte × 1440/768/390/320. **18 misure DOM** delle pagine pubbliche (1440/768/320); non dichiarate 24 misure numeriche |
| Lazy loading | Scroll tramite rotella sulla home a 320; foto successiva caricata con attributo `loading=lazy` invariato. Nelle altre pagine immagini portate nel viewport e decodificate senza forzarle a eager |
| 404 | HTTP 404 atteso, titolo/H1/contenuto corretti, nessun overflow a 320, PNG rivisto; clic nativo su «Torna alla homepage» raggiunge `/`. Console: sola risposta HTTP 404 attesa, non eccezione JS applicativa |
| Tastiera completa nel configuratore a 390 | Skip link/Invio/main, Tab alla radio, ArrowRight → Libreria, Tab/ArrowDown → Frassino e Trasparente opaca; passaggio sul link Materiali, Tab al campo L, Ctrl+A e digitazione 100 → **904,59 €**. Focus visibile 3 px |
| Errore e reset da tastiera | Tab a H, Ctrl+A e 0 → errore 80–220, prezzo assente e copia disabilitata. Tab attraversa P e raggiunge reset, Invio → tavolo/rovere/olio naturale, 180/75/90, **483,18 €**, zero errori |
| Copia reale da tastiera | Tab al pulsante copia, Spazio → conferma solo dopo API reale risolta. Permesso write `granted`, read `prompt`; nessuna modifica ai permessi |
| Incolla reale | Ctrl+V in un textarea QA temporaneo della pagina: **11/11** controlli su intestazione, versione, tipo, essenza, finitura, misure, tre fattori, totale e disclaimer. Campo immediatamente rimosso; nessun servizio esterno o nuova funzione di prodotto |
| Fallback nel browser | Rifiuto `NotAllowedError` simulato nella sola Clipboard API della pagina; campo readonly con prezzo corrente **512,52 €**, disclaimer, nessuna falsa conferma. Proprietà originale ripristinata nel `finally`. Non è revoca reale di un permesso browser |

I passaggi interattivi usano tasti/clic dei comandi MCP, senza dispatch di keydown sintetici o chiamate dirette alle funzioni del modello. Il primo checkpoint dopo ArrowRight osservava già la radio ma non ancora le misure aggiornate: la verifica successiva attende «Libreria su misura», quindi conferma L 96 e le opzioni. Non si confonde un checkpoint prima della ripresa Qwik con un errore del prodotto.

#### Confini specifici, senza attribuzioni generali al tool

- Tentato il solo setup di una prova browser senza JS tramite `browserContext.newCDPSession` sulla scheda dedicata. Risposta esatta: `Target.attachToBrowserTarget: Not allowed`. La sessione CDP non è stata creata, nessun comando di disabilitazione JS è stato eseguito e nessuna impostazione è cambiata. **Prova visuale browser senza JS non eseguita**; SSR senza esecuzione di script è già provato dai test HTTP. Questo rifiuto di una specifica operazione non significa «Playwright non funziona».
- Revoca reale del permesso clipboard non effettuata: distinguere scrittura/incolla reali dal rifiuto API simulato. Sono rimaste invariate le impostazioni del browser condiviso.
- Nessuna prova nuova Safari, screen reader o dispositivo mobile fisico; nessuna certificazione WCAG.

#### Evidenze, documentazione e chiusura

Nuove evidenze ignorate: sei `m4a-*-320-metrics.json`, `m4a-keyboard-product-focus.json`, `m4a-corrected-browser-results.json`, sei PNG integrali a 320, `m4a-404-320.png`, `m4a-404-console.log` e `m4a-copy-fallback-visible-390.png`. Conservati anche il viewport preliminare del portfolio e i risultati dei tentativi non conclusi. Aggiornato il manifest SHA-256; i dati non trasferiti dal push sono identificabili localmente, mentre il report versionato riporta risultati e riproduzione.

Riviste tutte le nuove immagini. Aggiornati QA_CHECKLIST, WORKLOG e i documenti che riportavano residui ormai conclusi; CONTENT_AUDIT mantiene solo proposte editoriali, senza applicarle. Nessun cambiamento al codice dell’app, alle dipendenze o alla formula. Typecheck, lint, 15 test locali, 14 HTTP e build già passati sul medesimo codice non sono stati ripetuti: in questa ripresa si sono eseguiti i controlli browser mancanti e quelli documentali/Git.

**Pulizia verificata:** chiusa soltanto la scheda Radice creata per questa ripresa; la scheda di connessione dell’estensione è rimasta intatta. Arrestato con `x` soltanto Wrangler della sessione 16917, uscita 0 e messaggio di shutdown. Nessun processo browser condiviso terminato o riconfigurato, nessun’altra chiamata Playwright dopo la chiusura. Non restano test di questa sessione in esecuzione nel client.

Consegna documentale atomica sul branch corrente, firma disattivata soltanto nel singolo comando `git -c commit.gpgsign=false commit -F <messaggio-locale>`, push solo a `feature/mvp-foundation`. Nessun merge, rebase, deployment o modifica infrastrutturale; AGENTS e MVP invariati. La milestone si ferma qui con i due residui specifici dichiarati, senza riclassificarli come guasto del servizio.

Controlli conclusivi di questa ripresa: 24 PNG della matrice presenti e terminati correttamente (`IEND`), nuove immagini riviste, manifest di **48 artefatti** con SHA-256; link dei 12 documenti Markdown verificati, nessun file mancante; `git diff --check` senza errori. Diff applicativo nullo rispetto a `f543046`, branch allineato prima del commit documentale. Nessun listener rimasto sulla porta locale 8790 dopo lo shutdown. Commit previsto: `docs: correct Playwright attribution and finish browser checks`.

## 2026-11-16 — Milestone 4B: materia, lavorazioni e orientamento

### Perimetro e stato iniziale

Letti AGENTS, MVP, BRAND_DIRECTION, CONTENT_AUDIT e il worklog, insieme alla documentazione della foundation. Working tree iniziale pulito; branch esistente `feature/mvp-foundation`, HEAD `c63fe76`. Eseguito `git fetch origin`: confronto con `origin/feature/mvp-foundation` a 0 commit avanti/0 indietro. Nessun nuovo branch, worktree o subagente.

L’istruzione 4B autorizza soltanto contenuti e orientamento nelle quattro pagine indicate. Nessuno strumento di testing browser, nessuna nuova suite E2E. Le catture della 4A rimangono evidenze storiche, senza attribuirle al contenuto aggiunto oggi.

### Interventi e motivazioni

- **Lavorazioni:** sostituita la spiegazione generica dei dettagli con un piccolo caso concettuale Convivio. Il passaggio ipotetico verso una finestra accanto al lato corto rende comprensibili il bordo smussato e i sostegni arretrati già descritti nel catalogo; non sono promessi passaggi verificati o prestazioni. Il nodo gamba–traverso riprende il tenone e mortasa esistente. SVG inline originale, con titolo, descrizione e legenda testuale; vista esplosa fuori scala, senza quote o indicazioni esecutive. La fotografia esistente resta attribuita e distinta dal concept. Il collegamento finale porta direttamente a `/portfolio/#convivio`.
- **Materiali:** due tabelle sintetiche confrontano le tre essenze e le tre finiture per tono, venatura e preferenza estetica. Nomi e caratteri visivi sono letti da `catalog.ts`, senza modificarlo; i brevi orientamenti aggiuntivi sono record editoriali tipizzati sugli ID esistenti nella sola rotta Materiali. Caption, intestazioni di colonna/riga e collegamenti alle schede rendono esplicita la struttura. Le tabelle si affiancano solo da `lg`; SVG fluido e assenza di larghezze rigide evitano requisiti di spazio aggiuntivi nel sorgente, senza dichiarare una verifica visuale eseguita.
- **Portfolio:** sostituita la sola etichetta della CTA già presente con «Prova il configuratore di arredi». Un solo invito nel main, nessuna aggiunta ripetitiva.
- **Contatti:** collegata la frase della FAQ sul preventivo alla stima nel configuratore, conservando l’avviso su cifre inventate, assenza di offerta e ordini.
- **Documentazione:** aggiornati CASE_STUDY, README, ARCHITECTURE, DEPLOYMENT e stato di attuazione del CONTENT_AUDIT; ASSETS registra provenienza originale del dettaglio SVG. Nessuna nuova fotografia o risorsa esterna.

Le sole modifiche applicative sono nelle quattro rotte editoriali. Diff nullo rispetto a `c63fe76` per AGENTS, MVP, catalogo, dominio/prezzi, componenti, rotta configuratore, test, package/lockfile, adapter, Vite e configurazione Wrangler. Prodotti, dimensioni consentite, opzioni, formula, stato reattivo e comportamento del configuratore restano invariati.

### Comandi e risultati effettivi

Dipendenze locali già presenti: nessuna reinstallazione, aggiornamento o modifica al lockfile. Formattate soltanto le quattro rotte con `npx --no-install prettier --write <file>`.

| Controllo | Risultato |
| --- | --- |
| `npm run typecheck` | Passato, uscita 0 |
| `npm run lint` | Passato, zero warning ESLint, uscita 0 |
| `npm run fmt.check` | Passato, uscita 0 |
| `npm run test.unit` | **15/15** test esistenti passati: modello e componenti Qwik con DOM di test ufficiale, nessun browser |
| `npm run build` | Passata, uscita 0; client e server SSR generati dall’adapter ufficiale |
| `npm run serve -- --port 8790` | Wrangler **4.162.0**, workerd locale su `127.0.0.1`, Worker compilato, nessun binding remoto |
| `TEST_BASE_URL=http://127.0.0.1:8790` + `npm run test.ssr` | **14/14** test esistenti passati: artefatti Worker/client, nessun HTML pubblico prerenderizzato, sei richieste dirette con H1/metadati, configurazione iniziale, 404, link/frammenti, immagini e tipi MIME |
| Controllo mirato HTTP dell’HTML 4B | Quattro HTTP 200; SVG con titolo/descrizione, avviso concept e link Convivio; due tabelle/caption e sei righe opzioni; ancore delle finiture; unica CTA nel main Portfolio; FAQ con link e disclaimer; nessun ID duplicato nelle quattro pagine |
| Collegamenti Markdown locali | **40** destinazioni leggibili, nessuna mancante al controllo |

Gli ultimi due controlli sono letture statiche e richieste `fetch` da Node, senza eseguire script del sito o utilizzare un browser. Lo script occasionale e i log sono in `test-results/`, ignorata da Git; non viene aggiunta alcuna suite o dipendenza. Log locali: `m4b-build.log`, `m4b-unit.log`, `m4b-ssr.log` (primo tentativo), `m4b-ssr-corrected.log` (esito valido), `m4b-content-http.json` (riepilogo dei controlli mirati). Non sono trasferiti dal push: comandi e risultati sono riportati qui per consentire la riproduzione.

Per riprodurre con PowerShell, dalla radice e senza un runtime precedente attivo:

```powershell
npm run typecheck
npm run lint
npm run fmt.check
npm run test.unit
npm run build
npm run serve -- --port 8790
```

Nel secondo terminale:

```powershell
$env:TEST_BASE_URL = 'http://127.0.0.1:8790'
npm run test.ssr
Remove-Item Env:TEST_BASE_URL
```

Le nuove parti si trovano nell’HTML di `/lavorazioni/`, `/materiali/`, `/portfolio/` e `/contatti/`; non occorre JavaScript per leggerle. Il test HTTP dei link include anche i nuovi frammenti. Concludere il runtime con `x` nel primo terminale.

### Anomalie osservate e limiti

- La prima esecuzione HTTP ha usato la porta **8788**, come dichiara il suo log, mentre Wrangler ascoltava su **8790**: 1 controllo artefatti passato, 13 richieste fallite con `fetch failed`. Il passaggio della variabile nel comando `cmd.exe` non aveva impostato il target previsto. Corretto il comando in `set TEST_BASE_URL=http://127.0.0.1:8790&&npm run test.ssr`: il log successivo conferma il target e **14/14** passati. Errore del comando di collaudo, nessuna correzione applicativa richiesta.
- Alcuni avvii di processi PowerShell tramite il runner hanno restituito `CreateProcess … Accesso negato (os error 5)`. Proseguito con `cmd.exe` esplicito, senza cambiare permessi o configurazioni del sistema. Nessun blocco residuo sulle verifiche richieste.
- La build emette warning `NO_COLOR`/`FORCE_COLOR`, messaggi `worker exit 1` e la nota dell’adapter sui cache header, ma conclude con uscita **0** e spunte client/server, typecheck e lint. Il Worker è poi compilato da Wrangler e supera i 14 test HTTP. I messaggi sono conservati nel log; non si deduce una causa non verificata né si forza un aggiornamento delle dipendenze.
- Nessuna nuova verifica visuale, responsive, tastiera o screen reader: gli strumenti browser sono esclusi da questa richiesta. Non vengono dichiarati risolti i residui specifici della 4A, né rieseguito l’audit dipendenze o il collaudo completo del configuratore nel browser. Nessun nuovo problema applicativo riproducibile rilevato dai controlli eseguiti.

### Consegna e rollback

Un commit atomico per contenuti e documentazione: `feat: enrich craft case and material guidance`, con firma disabilitata esclusivamente nel comando `git -c commit.gpgsign=false commit -F <messaggio-locale>`, quindi push esclusivo a `origin/feature/mvp-foundation`. Recuperare SHA e file con `git log -1 --stat`; nessun merge, rebase, force push, deployment o intervento Cloudflare. Arrestato con `x` soltanto il runtime della sessione 82424: messaggio di shutdown, uscita 0 e successiva richiesta HTTP con `ECONNREFUSED` sulla porta 8790. Nessun processo condiviso toccato.

Controlli conclusivi: `git diff --check` passato; confermati 40 collegamenti Markdown locali, nessun file inatteso o non tracciato e confronto remoto 0/0 prima del commit. Le 11 modifiche previste comprendono soltanto quattro rotte e sette documenti. I messaggi LF/CRLF riflettono la conversione Git già configurata e non comportano una modifica delle impostazioni.

Rollback riproducibile, soltanto se richiesto in futuro: con tree pulito sul branch di lavoro, `git revert <SHA-del-commit-4B>`, ripetere typecheck/lint/test/build e test HTTP locali, poi normale push dello stesso branch. Non usare reset o force push. La milestone termina qui; ulteriori contenuti, prove browser e pubblicazione richiedono un’istruzione separata.
