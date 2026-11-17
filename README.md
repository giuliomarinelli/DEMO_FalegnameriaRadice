# Falegnameria Radice

Sito dimostrativo per una falegnameria artigiana **fittizia**. Azienda, informazioni e operazioni sono simulate; nessun ordine, messaggio o preventivo commerciale.

Stato: **milestone 3**, configuratore interattivo sulle fondamenta Qwik City SSR e sull’identità noce/betulla/rame/salvia. Tavolo, libreria e madia con tre essenze, tre finiture, misure vincolate, disegno proporzionale e stima simulata aggiornata con dettaglio dei fattori. Reset e riepilogo copiabile, con alternativa manuale. La formula è deterministica e documentata; nessun dato viene salvato o inviato.

**Collaudo 4A:** corretto il difetto che nascondeva i controlli dopo una modifica Qwik. Completati 68 casi nativi, percorso da tastiera del configuratore, copia/incolla reali e 24 catture delle sei pagine a 1440/768/390/320 px. Rettificata la precedente attribuzione non dimostrata di un guasto a MCP. Prove effettive, simulazioni e residui specifici in [QA_CHECKLIST](docs/QA_CHECKLIST.md). Audit dipendenze ancora con 12 segnalazioni, analizzate senza aggiornamenti forzati.

**Contenuti 4B:** caso concettuale Convivio con dettaglio SVG originale in Lavorazioni, confronto estetico di essenze e finiture in Materiali, invito esplicito al configuratore nel Portfolio e collegamento alla stima nella FAQ Contatti. Nessuna modifica al configuratore. Verifiche locali e confini della consegna in [WORKLOG](docs/WORKLOG.md); nessun nuovo collaudo browser in questa milestone.

## Avvio locale

Prerequisiti: Node.js 22 da 22.12 (verificato con **22.16.0**) oppure Node 24; npm (verificato con **10.9.2**). Non servono account Cloudflare, login o credenziali.

```powershell
npm ci
npm run dev
```

Aprire l’URL locale mostrato da Vite (normalmente `http://127.0.0.1:5173`). Vite è la toolchain di Qwik City, con modalità SSR.

## Verifiche sulla produzione locale

```powershell
npm run typecheck
npm run lint
npm run fmt.check
npm run test.unit
npm run build
npm run serve
```

Lasciare `serve` attivo; in un secondo terminale nella repository:

```powershell
npm test
```

`npm run test.unit` esegue 11 test del modello e 4 dei componenti Qwik senza server. `npm test` li esegue insieme ai 14 test HTTP, per i quali servono **prima** build e runtime locale Pages su `http://127.0.0.1:8788`. Verifica artefatti, SSR delle sei pagine, configurazione iniziale, metadati, link, 404 e asset. Non avvia servizi remoti. `Ctrl+C` arresta i processi locali. Per un’altra porta usare `npm run serve -- --port 8790` e impostare `$env:TEST_BASE_URL = 'http://127.0.0.1:8790'` nel terminale dei test.

## Stack

Qwik e Qwik City **1.20.4**, Vite **7.3.7**, TypeScript **5.4.5** in modalità strict, Tailwind CSS **4.3.5**, adapter ufficiale `cloudflare-pages`, Wrangler **4.162.0**. Versioni risolte riproducibili in `package-lock.json`. Nessuna dipendenza React, database, autenticazione o backend business.

## Rotte

| Percorso | Contenuto |
| --- | --- |
| `/` | Atelier, fotografia immersiva, tre studi di arredo e materiali |
| `/lavorazioni/` | Famiglie di arredo, metodo, giunzioni, bordi e finitura |
| `/portfolio/` | Convivio, Intervallo e Sponda: disegni, dimensioni e dettagli |
| `/materiali/` | Tre essenze, tre finiture, texture e note sulla cura |
| `/configuratore/` | Scelte, misure, stima simulata spiegata, schema, reset e copia |
| `/contatti/` | Domande di progetto, trasparenza, FAQ e crediti, senza invio |

Le pagine includono titolo, descrizione e Open Graph nel primo HTML. `noindex, nofollow` e `robots.txt` proteggono la natura dimostrativa dall’indicizzazione, senza sostituire il futuro controllo di accesso. Il canonical è omesso finché non si configura un dominio pubblico autorizzato: vedere [deployment](docs/DEPLOYMENT.md).

## Documentazione

- [Architettura e struttura](docs/ARCHITECTURE.md)
- [Riproduzione SSR, futura pubblicazione e rollback](docs/DEPLOYMENT.md)
- [Worklog ed esiti effettivi](docs/WORKLOG.md)
- [Case study e limiti](docs/CASE_STUDY.md)
- [Fonti e licenze degli asset](docs/ASSETS.md)
- [Direzione di marca e sistema visivo](docs/BRAND_DIRECTION.md)
- [Configuratore: formula, assunzioni e verifiche](docs/CONFIGURATOR.md)
- [Collaudo 4A, evidenze e verifiche manuali residue](docs/QA_CHECKLIST.md)
- [Audit editoriale per pagina](docs/CONTENT_AUDIT.md)
- [Rilevanza delle segnalazioni sulle dipendenze](docs/DEPENDENCY_AUDIT.md)
- [Specifica MVP invariata](docs/MVP.md)

Non è stato effettuato alcun deployment. I branch `preview` e `master`, l’accesso Cloudflare e le promozioni restano riservati al proprietario. Segnalazioni note delle dipendenze e limiti di verifica sono nel worklog.
