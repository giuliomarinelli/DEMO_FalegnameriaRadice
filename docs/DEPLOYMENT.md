# Esecuzione locale e futura destinazione Cloudflare Pages

## Stato

Milestone 1, nessun deployment, login o provisioning eseguito. Nessun account ID, progetto remoto, dominio, binding, secret o configurazione Access è necessario per riprodurre la verifica locale. Il nome in `wrangler.jsonc` è un identificatore locale hardcoded, non la prova di un progetto Cloudflare esistente. `send_metrics: false` disabilita la telemetria Wrangler.

## Riprodurre da un checkout pulito

Usare Node 22 da 22.12 (verificato 22.16.0), oppure Node 24, e npm. La versione Node deve restare coerente tra macchina e futura build ospitata. Eseguire dalla radice:

```powershell
npm ci
npm run typecheck
npm run lint
npm run fmt.check
npm run build
npm run serve
```

Il comando `serve` esegue soltanto `wrangler pages dev --ip 127.0.0.1`, leggendo output `dist`, porta 8788, compatibilità e `nodejs_als` dal file locale. Non usare `--remote`. Nessun login richiesto. Se workerd non supporta la data di compatibilità richiesta, Wrangler può dichiarare una data effettiva precedente: registrarla nel worklog, senza presumere equivalenza con il futuro runtime remoto.

Con il runtime attivo, in un altro terminale:

```powershell
npm test
curl.exe -i http://127.0.0.1:8788/
curl.exe -i http://127.0.0.1:8788/materiali/
```

Le risposte devono avere HTTP 200, `<title>`, descrizione e contenuto principale già nel corpo HTML. `npm test` controlla tutte e sei le rotte direttamente con `fetch` Node, senza eseguire script. Verifica anche 404, asset, collegamenti e assenza di pagine pubbliche prerenderizzate. Un browser aperto su `vite dev` non è una prova sostitutiva.

Per un controllo manuale a 390 px: ricaricare la homepage, usare Tab per raggiungere «Salta al contenuto», verificarne il focus visibile e premere Invio; il focus deve arrivare al contenuto principale. Tornare all’header, raggiungere «Menu +» con Tab e aprirlo con Invio/Spazio; i collegamenti devono entrare nell’ordine Tab. Raggiungere «Lavorazioni» e premere Invio; verificare destinazione e indicazione della rotta attiva. Chiudere e riaprire il menu, ripetere a 320 px e controllare il footer. Con JavaScript disabilitato verificare contenuti SSR e collegamenti nel footer; nei browser con supporto `scripting: none`, la navigazione mobile rimane espansa. Lo stato delle prove effettive e i limiti del connettore sono nel worklog.

Se la porta è occupata, non fermare altri servizi: `npm run serve -- --port 8790`; nel terminale dei test impostare `$env:TEST_BASE_URL = 'http://127.0.0.1:8790'`. Eliminare tale variabile dopo il test con `Remove-Item Env:TEST_BASE_URL`.

## Canonical opzionale, nessun segreto

`VITE_SITE_ORIGIN` è una variabile **pubblica di build**, visibile nel bundle. Il valore deve essere il dominio HTTPS effettivamente approvato dal proprietario; non inserirvi credenziali, percorsi o parametri. In assenza, non viene emesso un canonical. Non è presente alcun `.env` necessario.

Per collaudare localmente la sola configurazione si può usare il dominio riservato di esempio, senza DNS o chiamate a quell’host:

```powershell
$env:VITE_SITE_ORIGIN = 'https://radice.example'
npm run build
Remove-Item Env:VITE_SITE_ORIGIN
```

Riavviare `npm run serve` sulla nuova build; nel terminale dei test:

```powershell
$env:EXPECT_SITE_ORIGIN = 'https://radice.example'
npm test
Remove-Item Env:EXPECT_SITE_ORIGIN
```

Questo dominio è soltanto un valore dimostrativo per il test, non configurazione privata o dominio reale. Per tornare allo stato predefinito, ricostruire senza `VITE_SITE_ORIGIN`. Il worklog distingue le verifiche eseguite da questa procedura opzionale.

## Preparazione al futuro hosting, riservata al proprietario

La destinazione richiesta è **Cloudflare Pages**, output `dist`, comando `npm run build`, adapter Qwik City ufficiale e Pages Functions in advanced mode (`_worker.js`). Non pubblicare come solo sito statico e non rimuovere il Worker. Non è stato creato uno script `deploy` nel progetto, per tenere l’avvio locale distinto dalla pubblicazione.

Il Worker generato importa i moduli in `server/`: conservare `server/` accanto a `dist/` durante il bundling Wrangler. Le due directory sono artefatti locali non versionati e vengono ricreate dalla build; copiare solo HTML o solo gli asset non riproduce l’applicazione SSR.

Git flow da preservare: `develop` integra, `preview` è staging da proteggere con Access, `master` è produzione. Non attivare promozioni automatiche da `develop` o `feature/*`. Prima di un’eventuale integrazione Git Cloudflare, il proprietario dovrà controllare le regole di branch; il push di questa milestone riguarda esclusivamente il branch di lavoro.

Qualunque futura pubblicazione, creazione di progetto o modifica Access, DNS, secrets, billing o CI richiede istruzioni esplicite. Se il proprietario sceglierà di pubblicare, dovrà reperire gli identificatori del proprio progetto nel proprio account Cloudflare e usare il proprio flusso autorizzato: nessun nome locale deve essere interpretato come identificatore remoto già verificato. Non sono previste credenziali applicative.

## Arresto e rollback

- Arrestare solo il runtime/terminale avviato per questa demo con `Ctrl+C`.
- Build e dipendenze sono rigenerabili: `npm ci`, poi `npm run build`; non committare `dist`, `node_modules`, `.wrangler` o file di variabili private.
- Per annullare una modifica già versionata, usare un commit inverso con `git revert <sha>` sul branch di lavoro, controllare il diff ed eseguire nuovamente le verifiche; nessun reset distruttivo o force push.
- Per annullare il canonical locale, rimuovere la variabile e ricostruire.
- Non c’è rollback remoto da eseguire: nessuna release è stata distribuita. In futuro, il proprietario dovrà scegliere una release Pages precedente nel proprio progetto e verificare direttamente home e una rotta interna; la procedura concreta dipenderà dal progetto effettivamente creato e non è stata collaudata qui.
