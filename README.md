# Falegnameria Radice

Sito dimostrativo per una falegnameria artigiana **fittizia**. Azienda, informazioni e operazioni sono simulate; nessun ordine, messaggio o preventivo commerciale.

Prima milestone: fondamenta Qwik City SSR, identità visiva e struttura iniziale delle sei pagine. Il configuratore è soltanto presentato e **non è disponibile**. Le pagine interne sono introduzioni: cataloghi e schede estese appartengono alla milestone 2, il configuratore alla 3.

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
npm run build
npm run serve
```

Lasciare `serve` attivo; in un secondo terminale nella repository:

```powershell
npm test
```

Il test richiede **prima** la build e il runtime locale Pages su `http://127.0.0.1:8788`. Verifica artefatti, SSR delle sei pagine, metadati, collegamenti di navigazione, 404 e asset. Non avvia servizi remoti. `Ctrl+C` arresta i processi locali. Per un’altra porta usare `npm run serve -- --port 8790` e impostare `$env:TEST_BASE_URL = 'http://127.0.0.1:8790'` nel terminale dei test.

## Stack

Qwik e Qwik City **1.20.4**, Vite **7.3.7**, TypeScript **5.4.5** in modalità strict, Tailwind CSS **4.3.5**, adapter ufficiale `cloudflare-pages`, Wrangler **4.162.0**. Versioni risolte riproducibili in `package-lock.json`. Nessuna dipendenza React, database, autenticazione o backend business.

## Rotte

| Percorso | Contenuto iniziale |
| --- | --- |
| `/` | Homepage, direzione della bottega, materiali e inviti all’esplorazione |
| `/lavorazioni/` | Introduzione a tavoli, librerie e piccoli arredi |
| `/portfolio/` | Taccuino fotografico di ispirazione, senza attribuzioni di lavori reali |
| `/materiali/` | Prime note su tre essenze e campioni grafici |
| `/configuratore/` | Presentazione esplicita della funzione futura, nessun controllo o prezzo |
| `/contatti/` | Trasparenza sulla demo, nessun recapito o modulo reale |

Le pagine includono titolo, descrizione e Open Graph nel primo HTML. `noindex, nofollow` e `robots.txt` proteggono la natura dimostrativa dall’indicizzazione, senza sostituire il futuro controllo di accesso. Il canonical è omesso finché non si configura un dominio pubblico autorizzato: vedere [deployment](docs/DEPLOYMENT.md).

## Documentazione

- [Architettura e struttura](docs/ARCHITECTURE.md)
- [Riproduzione SSR, futura pubblicazione e rollback](docs/DEPLOYMENT.md)
- [Worklog ed esiti effettivi](docs/WORKLOG.md)
- [Case study e limiti](docs/CASE_STUDY.md)
- [Fonti e licenze degli asset](docs/ASSETS.md)
- [Specifica MVP invariata](docs/MVP.md)

Non è stato effettuato alcun deployment. I branch `preview` e `master`, l’accesso Cloudflare e le promozioni restano riservati al proprietario. Segnalazioni note delle dipendenze e limiti di verifica sono nel worklog.
