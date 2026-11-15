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
