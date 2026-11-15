# Collaudo 4A — evidenze e procedura manuale

15 novembre 2026. Baseline `b470451`; correzioni applicative `3eeead1` e `859c1b1`. Build Qwik City SSR eseguita con adapter Pages ufficiale, poi Wrangler locale 4.162.0 su `http://127.0.0.1:8790`. Il runtime è stato arrestato prima della ricostruzione e riavviato sulla build corretta. Nessun test usa `vite dev` come prova di produzione.

**Esito: collaudo parziale, con difetto bloccante corretto e controlli manuali residui.** Non è un’accettazione completa mobile/tastiera, un audit WCAG o una prova di deployment.

## Copertura visuale effettiva

| Rotta | 1440 × 1000 | 768 × 1024 | 390 × 844 | 320 px |
| --- | --- | --- | --- | --- |
| Home | Misure DOM e screenshot | Misure DOM e screenshot | Screenshot rivisto | Da eseguire |
| Lavorazioni | Misure DOM e screenshot | Misure DOM e screenshot | Screenshot rivisto | Da eseguire |
| Portfolio | Misure DOM e screenshot | Misure DOM e screenshot | Screenshot rivisto | Da eseguire |
| Materiali | Misure DOM e screenshot | Misure DOM e screenshot | Screenshot rivisto | Da eseguire |
| Configuratore | Misure DOM e screenshot | Misure DOM e screenshot | Screenshot rivisto, stato iniziale | Da eseguire |
| Contatti | Misure DOM e screenshot | Misure DOM e screenshot | Screenshot recuperato e rivisto | Da eseguire |

Dodici misurazioni DOM restituite dal browser: sei rotte a 1440 e a 768, HTTP 200, un H1, nessun elemento del main oltre i bordi orizzontali e nessun overflow del documento. `scrollWidth` rispettivamente 1425 e 753 px, con scrollbar verticale da 15 px. Le immagini catturate hanno quindi larghezza 1425/753/375 px rispetto ai viewport impostati 1440/768/390. È un browser desktop ridimensionato, non un dispositivo mobile reale.

**18 screenshot finali** salvati e rivisti: sei desktop, sei tablet, sei mobile. Contatti a 390 è stato recuperato dopo una nuova richiesta al server MCP, autorizzata dal proprietario. Le catture mostrano gerarchia coerente, testo senza sovrapposizioni, immagini e didascalie nei rispettivi contenitori, campioni e schede riconoscibili. A 768 il portfolio è in sequenza; a 390 controlli e riepilogo del configuratore sono in una colonna. Non emergono tagli orizzontali nelle sei catture mobili; la prima routine mobile non ha restituito il report numerico finale e le operazioni interrotte non sono contate. Nessuna evidenza a 320: non viene dichiarata superata una matrice di 24 misurazioni.

Nelle prime letture desktop due immagini lazy non erano ancora pronte: non sono state classificate come risorse rotte. Per le catture complete si è impostato temporaneamente `loading=eager` nel DOM di test e attesa la decodifica con un limite di due secondi. Nessun attributo del prodotto è stato modificato nel repository. Le foto risultano visibili nelle catture finali; la suite HTTP verifica tutte le varianti. Questa preparazione **non prova il caricamento lazy durante uno scroll naturale**: tale prova rimane manuale.

Contrasto ricalcolato sui token solidi: noce/carta 12,76:1, noce/betulla 10,51:1, bruno/carta 5,87:1, bruno/betulla 4,84:1, rame scuro/carta 5,83:1, rame scuro/betulla 4,80:1. Nessuna nuova palette introdotta. Non sono rapporti misurati su ogni pixel delle foto, su tutte le trasparenze o su tutti gli stati. Le quote SVG ridotte sono piccole su mobile: i valori essenziali sono ripetuti come testo nel riepilogo e nelle schede.

## Funzionamento e difetto corretto

Prima della correzione, al caricamento diretto i controlli erano visibili (`display:block`, larghezza circa 650 px a 1440). Dopo aver cambiato L da 180 a 201, il prezzo diventava 513,99 € ma i controlli passavano a `display:none`, larghezza zero. Il browser mostrava una regola CSS attiva dentro `noscript`: durante l’aggiornamento reattivo Qwik ne ricreava i figli come nodi DOM.

Correzione: rimosso lo `style` da `noscript`, mantenuta la spiegazione testuale e spostata la regola in `src/global.css` sotto `@media (scripting: none)`. Dopo build e riavvio, i controlli restano visibili alle modifiche, al cambio di prodotto e al reset. Nessuna nuova funzionalità o modifica alla formula. Il ramo senza JavaScript va comunque verificato manualmente nel browser; il supporto della media query dipende dal browser.

Prova sul **bundle di produzione nel browser**, con `fill`/`selectOption` e attivazione DOM `element.click()` per radio e reset:

- L 200 sul tavolo iniziale: **512,52 €**, schema e riepilogo aggiornati, controlli ancora visibili; reset di questa modifica: **483,18 €**.
- Libreria 96 × 32 × 180, frassino/opaca: **884,74 €**; descrizione dello schema coerente con tipo ed essenza.
- Madia 160 × 42 × 78, noce/pigmentato: **1.300,41 €**; cambio tipologia conserva essenza/finitura.
- Limiti delle nove dimensioni aggiornati correttamente: **18 estremi accettati e 18 valori adiacenti rifiutati**, con errori visibili e copia disabilitata.
- La prima routine registra **70 asserzioni riuscite**, poi un timeout nell’attesa del ripristino dell’ultima misura; non è dichiarata passata integralmente. I successivi collegamenti hanno completato le verifiche native sotto, senza modificare il prodotto.

### Verifiche native recuperate prima della fase esclusiva

La nuova scheda dedicata, con viewport esplicitamente impostato, ha consentito **68/68 asserzioni native**: `check`, `fill`, `selectOption` e clic Playwright sul reset, senza `element.click()` in questa routine. Nove coppie di limiti, 18 estremi con prezzo esatto ricostruito indipendentemente, 18 adiacenti rifiutati, errori visibili, campo vuoto e decimale, copia disabilitata, reset completo di dimensioni e opzioni, controlli ancora visibili. Risultato `complete:true` e lista dei casi in `m4a-reconnection-results.json`; script locale `m4a-native-boundaries.js`.

In un’altra sequenza sono confermati ArrowUp da L 200 a 201 con prezzo 513,99 €, Tab da larghezza ad altezza e Shift+Tab di ritorno. A 390: Tab raggiunge lo skip link con outline 3 px, Invio porta il focus al main, Tab percorre marchio/menu, Invio apre il menu (`aria-expanded=true`), Tab e Invio seguono Lavorazioni. Non sono stati ripetuti nella successiva fase esclusiva. Resta **incompleto il percorso interamente da tastiera attraverso radio, select, misure, reset e copia**: la relativa sequenza è stata interrotta senza risultato conclusivo.

Una prima routine nativa aveva letto i limiti immediatamente dopo il cambio prodotto, prima della ripresa asincrona Qwik. L’asserzione fallita è conservata (`complete:false`, 8 asserzioni precedenti riuscite). La routine corretta attende i limiti e il prezzo attesi prima di verificare il passo successivo e completa 68 casi. Corretto il metodo di test, nessuna modifica applicativa per adattare il codice al test.

Separatamente, **15/15 test locali** (11 modello, 4 componenti Qwik) verificano anche vuoti/decimali, reset completo, copia riuscita e fallback con clipboard simulata. **14/14 test HTTP** verificano SSR e metadati delle sei rotte, configurazione iniziale, 404, link/frammenti e immagini. Questi test non colmano automaticamente i residui browser.

## Limiti del connettore, ripresa e arresto esclusivo

La prima navigazione browser è riuscita; non si è assunto che il blocco della milestone 3 fosse ancora presente. Inizialmente ArrowUp/Tab non producevano keydown e il clic Playwright restava in attesa. In seguito, su richiesta esplicita del proprietario, sono state inviate nuove richieste al server MCP per una scheda dedicata. Il contesto isolato è rifiutato con `Target.createBrowserContext: Not allowed`; nessun aggiramento. Una nuova scheda aveva viewport 0 × 0: impostarlo esplicitamente ha consentito il clic nativo e le verifiche recuperate sopra. Non è un difetto dell’applicazione. Sono state chiuse soltanto schede della demo create da questa sessione, senza riavviare o riconfigurare processi browser condivisi.

La cattura di Contatti a 390 aveva restituito timeout di screenshot dopo il caricamento dei font; una successiva richiesta MCP dedicata ha prodotto il PNG completo. L’ultima routine che doveva proseguire a 320 è stata interrotta dall’utente: il client non ha conservato un risultato, non esistono PNG a 320 e nessun passo di quella routine viene considerato completato.

Nella successiva **fase esclusiva e sequenziale**, letti nuovamente worklog e deployment, il runtime già avviato da questa sessione risponde via HTTP 200 su `/configuratore/`, con 483,18 € nell’HTML. Eseguita una sola richiesta iniziale `browser_tabs({action:"list"})`: rimasta senza risposta, poi annullata lato client. Non è stato possibile verificare URL/viewport della scheda, quindi **nessuna nuova sequenza browser è stata iniziata**. Non effettuati retry, nuove schede, restart o riconfigurazioni dopo questo blocco, seguendo l’ultima istruzione. È un blocco dell’accesso MCP, non evidenza di errore della pagina HTTP; la causa interna del servizio non è accertata.

Arrestato il solo Wrangler di proprietà della sessione. Nessun’altra chiamata Playwright rimane attiva nel client di questa sessione; non è possibile confermare la chiusura dell’ultima scheda o lo stato di un’operazione rimasta lato server senza una risposta MCP. Non viene dichiarato riavviato o ripristinato il servizio condiviso. Restano: tutte le rotte a 320, 404 visuale, percorso completo da tastiera nel configuratore, clipboard reale, caricamento lazy naturale, JavaScript disabilitato, screen reader e Safari. Le prove storiche M1/M2 non sostituiscono questi casi.

## Evidenze locali

Sotto `test-results/`, esclusa da Git:

- `m4a-{home,lavorazioni,portfolio,materiali,configuratore,contatti}-{1440,768}.png`.
- `m4a-{home,lavorazioni,portfolio,materiali,configuratore,contatti}-390.png`.
- `m4a-before-hidden-controls.png`: stato difettoso prima della correzione.
- `m4a-browser-results.json`: risultati del connettore, incluse le interruzioni; nessuna rimozione dei fallimenti.
- `m4a-reconnection-results.json`: 68 asserzioni native riuscite, traccia tastiera/menu e risultati parziali conservati.
- `m4a-native-boundaries.js`: routine locale dei 68 casi; `m4a-exclusive-preflight.json`: HTTP riuscito, unica richiesta MCP senza risposta e pulizia della fase esclusiva.
- `m4a-build.log`, `m4a-tests.log`, `m4a-npm-audit.json`.
- `m4a-evidence-manifest.json`: nomi, dimensioni e SHA-256 dei 28 artefatti locali, per confrontarli senza modificarli.

PNG controllati per dimensioni e terminazione `IEND`, poi rivisti; non sono screenshot della pagina di sviluppo. Gli artefatti ignorati non vengono trasferiti dal push: il report versionato conserva metodo ed esiti e la procedura seguente permette nuove catture. Non riutilizzare catture M1/M2 come prova del configuratore corrente.

## Procedura manuale residua, indipendente dagli strumenti agente

Per riprendere **solo ciò che manca**, eseguire il punto 2 a 320 e sulla 404, controllare lo scroll naturale; completare il punto 4 con radio/select/misure esclusivamente da tastiera, il punto 6 da tastiera con clipboard reale e il punto 7. Skip link/menu, vincoli, vuoti/decimali e reset con clic sono già provati: i relativi passi sotto rimangono una procedura di regressione e non vanno ripetuti senza nuove modifiche o un motivo concreto.

1. Dalla radice della repository, con Node 22.12+ della linea 22 (verificato 22.16.0) o Node 24: `npm ci`, `npm run build`, poi `npm run serve -- --port 8790`. Non ricostruire con Wrangler già attivo. Non servono account, login o credenziali. Aprire `http://127.0.0.1:8790/` in un browser locale.
2. Aprire gli strumenti sviluppatore e la modalità responsive. Impostare, uno alla volta, 1440 × 1000, 768 × 1024, 390 × 844 e 320 × 800, zoom 100%. Visitare direttamente tutte le sei rotte, poi una rotta inesistente. Scorrere naturalmente dall’inizio al footer; attendere le foto. Verificare assenza di scroll orizzontale, testo troncato, sovrapposizioni, immagini vuote e CTA fuori schermo. Salvare schermate desktop/mobile con data, rotta e larghezza. **Per completare questo collaudo riprendere solo i casi mancanti:** tutte le rotte a 320, 404 visuale e comportamento lazy, senza ripetere la matrice già acquisita.
3. Ricaricare senza usare il mouse. Tab deve mostrare «Salta al contenuto»; Invio deve portare il focus al main. Tornare all’header, usare Tab/Shift+Tab e Invio/Spazio sul menu mobile. Verificare che i link compaiano nell’ordine di tabulazione, che il focus sia visibile e che nessun controllo intrappoli la tastiera. Seguire un link interno e verificare destinazione e indicazione della rotta attiva. Aprire una FAQ con Invio/Spazio. Annotare browser/versione e ogni punto in cui il focus scompare.
4. Aprire direttamente `/configuratore/`. Con Tab raggiungere la radio selezionata; le frecce devono cambiare tipologia e misure. Provare essenza e finitura nei select con tastiera; raggiungere L/H/P. Digitare valori con selezione completa e sostituzione del contenuto; ArrowUp/ArrowDown devono seguire lo step. Verificare L 180 → 200 e **483,18 → 512,52 €**, mantenendo visibili tutti i controlli. Ripetere dopo navigazione da un’altra pagina e dopo più modifiche consecutive: è il caso di regressione corretto.
5. Per ciascuna tipologia provare ogni minimo/massimo e un valore appena esterno, usando [la tabella dei limiti](CONFIGURATOR.md). Svuotare un campo e inserire un decimale: errore associato, stima/schema sospesi, copia disabilitata. Correggere il valore: recupero. Provare gli esempi libreria **884,74 €** e madia **1.300,41 €** con le relative opzioni documentate.
6. Modificare tutte le opzioni e produrre un errore; attivare «Ripristina configurazione» da tastiera: tavolo, rovere, olio naturale, L/H/P 180/75/90, **483,18 €**, errori e conferme cancellati. Copiare il riepilogo e incollarlo in un editor locale: scelte, dimensioni, fattori, totale, versione e disclaimer. Negare il permesso clipboard nelle impostazioni locali del sito, riprovare e verificare la copia manuale readonly. Nessun invio a servizi esterni.
7. Disabilitare JavaScript dagli strumenti sviluppatore e ricaricare direttamente home e configuratore: contenuti e metadati SSR leggibili, spiegazione `noscript`, controlli nascosti nei browser con supporto `scripting: none`. Riabilitare JavaScript e ripristinare i permessi locali al termine. Questo passaggio non sostituisce il controllo HTTP già automatizzato.
8. Registrare ogni caso come PASS, FAIL o NON ESEGUITO, con passi, atteso/osservato e screenshot. Se un test fallisce, riprodurlo prima di cambiare codice; rieseguire i controlli tecnici dopo una correzione. Arrestare soltanto Wrangler di questa demo con `x` o `Ctrl+C`. Nessuna operazione Cloudflare remota è parte del collaudo.
