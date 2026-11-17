# Audit dipendenze — milestone 4A

Snapshot del 15 novembre 2026, lockfile invariato dalla foundation. Node 22.16.0, npm 10.9.2. `npm audit --json` rileva **12 pacchetti segnalati: 8 moderate, 4 high, nessun critical**. Il conteggio include i pacchetti genitori delle catene, non indica dodici vulnerabilità indipendenti. L’audit non è superato: rimane un residuo noto.

## Catene e rilevanza effettiva

| Catena risolta | Segnalazione | Raggiungibilità nella demo e residuo |
| --- | --- | --- |
| Qwik City 1.20.4 → vite-imagetools 9.0.3 → **sharp 0.34.5** | High, tre advisory sulle librerie native ereditate: libvips, libheif, librsvg | Il plugin immagini elabora a build time le quattro sorgenti WebP locali. Il sito non offre upload, trasformazioni remote o endpoint immagini dinamici. Nessun uso di sharp nel codice applicativo. L’esposizione individuata riguarda la toolchain che elabora file, non una funzionalità HTTP della demo; resta rilevante se entrano asset non attendibili. Non significa pacchetto corretto o immagini certificate sicure. |
| Qwik City 1.20.4 → **zod 3.25.48** | High, consumo di memoria su collezioni sovradimensionate | Qwik City esporta gli helper di validazione Zod; la demo non importa `zod$`, non definisce route/global action e non valida collezioni ricevute da utenti. Il configuratore valida stringhe e numeri nel proprio modulo puro locale. Non è stato individuato un percorso applicativo verso la condizione descritta; non è una prova formale di assenza di ogni rischio nel framework. |
| typescript-eslint 8.72.2 → typescript-estree 8.72.2 → **minimatch 10.2.6**; propagazione a utils/parser/plugin ed eslint-plugin-qwik | Moderate, amplificazione di pattern glob | Percorso di lint/analisi del repository, senza input glob HTTP o uso nel configuratore. Il caso descritto riguarda pattern controllati da un attaccante con specifiche opzioni di ottimizzazione. Rimane un rischio della toolchain, non una funzione pubblica della demo. Le copie minimatch **3.1.5** mostrate da `npm ls` in altre catene non rientrano nel range di questo specifico advisory; non vengono dichiarate prive di ogni altro rischio. |

Wrangler 4.162.0 → miniflare porta una seconda copia **sharp 0.35.5**, distinta dalla 0.34.5 segnalata nella catena immagini. Non attribuire la segnalazione di una copia a tutte le altre. Nessun aggiornamento, override, downgrade o `npm audit fix` applicato.

Tutte le dipendenze dirette sono dichiarate in `devDependencies`, secondo lo scaffold; questo **non** dimostra che il framework non abbia codice nel Worker. Perciò un audit con `--omit=dev` non è usato per dichiarare sicura la produzione.

## Evidenze locali e limiti

Controllati albero `npm ls`, sorgenti e build finale. Il plugin Vite Qwik City importa dinamicamente `vite-imagetools`; `lib/index.qwik.mjs` importa Zod e definisce `zodQrl`. La ricerca nel codice `src` non trova impieghi di Zod, sharp, minimatch, action o parsing di payload business. Nei 7 file JavaScript di `server` e nei 61 chunk di `dist/build` della build esaminata non compaiono le stringhe `zod`, `sharp`, `minimatch`. Quest’ultima è un’indicazione coerente con il tree shaking, **non un’analisi completa di raggiungibilità né una SBOM**: i nomi possono essere rimossi dalla minificazione.

L’audit suggerisce fra le correzioni Qwik City `0.0.128`, eslint-plugin-qwik `1.9.1` e typescript-eslint `8.36.0`: sono downgrade rispetto ai pacchetti installati, non una soluzione compatibile verificata. Non vengono applicati per ottenere artificialmente un audit verde. Prima di una futura pubblicazione occorre rivalutare le release upstream compatibili e collaudare una remediation separata; questa milestone non autorizza deployment né aggiornamenti forzati.

## Riproduzione

Da un checkout con dipendenze installate tramite il lockfile:

```powershell
npm ci
npm audit --json > test-results/m4a-npm-audit.json
$auditExit = $LASTEXITCODE
Write-Output "npm audit exit code: $auditExit"
npm ls sharp zod minimatch vite-imagetools --all
git diff --exit-code -- package.json package-lock.json
```

Creare prima `test-results` se manca: `New-Item -ItemType Directory -Force test-results`. L’audit restituisce codice **1** in presenza delle segnalazioni; non confonderlo con un fallimento della build. Il JSON locale è ignorato da Git; questa analisi ne conserva versioni, catene e interpretazione. La risposta del registry può cambiare: datare sempre un nuovo confronto. Non eseguire `fix` per riprodurre una lettura.

## Fonti degli advisory consultate

- [sharp / libvips — GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj): versioni interessate precedenti a 0.35.0.
- [sharp / libheif — GHSA-rgj7-g3m4-5g8c](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c): correzione in 0.35.4; l’esposizione dipende dall’elaborazione di immagini non attendibili e dalle condizioni della piattaforma.
- [sharp / librsvg — GHSA-wq5f-xc86-pv6w](https://github.com/advisories/GHSA-wq5f-xc86-pv6w): correzione in 0.35.5, condizioni specifiche di runtime per la vulnerabilità nativa.
- [Zod — GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5): consumo di memoria nella validazione di collezioni; range del registry `<4.6.6`.
- [minimatch — GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249): range `>=7.0.0 <11.0.1`, pattern amplificabili con `optimizationLevel >= 2`.

Non eseguiti exploit, caricamenti di file malevoli, modifiche a CI o verifiche su servizi remoti. La gravità dell’advisory rimane quella del fornitore; la valutazione di esposizione qui è limitata alla demo e ai percorsi osservati.
