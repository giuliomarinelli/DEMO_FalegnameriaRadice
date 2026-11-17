# Collaudo 4A — risultati verificati e riproduzione

15 novembre 2026. Codice applicativo `859c1b1`, invariato durante il completamento del collaudo. Qwik City SSR, adapter Pages ufficiale, Wrangler locale 4.162.0 su `http://127.0.0.1:8790`. Prima delle chiamate browser verificata risposta HTTP 200 con stima iniziale nell’HTML. Scheda dedicata; URL e viewport controllati prima delle sequenze. Nessun deployment o intervento sui processi browser condivisi.

**Rettifica:** la precedente attribuzione del mancato esito di alcune richieste a un guasto/blocco del servizio MCP non era dimostrata e viene ritirata. Le operazioni interrotte, i timeout di singole catture e gli errori di preparazione del test non provano un malfunzionamento generale di Playwright. La ripresa ha completato le verifiche principali riportate sotto.

## Copertura responsive e visuale

| Rotta | 1440 × 1000 | 768 × 1024 | 390 × 844 | 320 × 800 |
| --- | --- | --- | --- | --- |
| Home | DOM + screenshot | DOM + screenshot | Screenshot | DOM + screenshot |
| Lavorazioni | DOM + screenshot | DOM + screenshot | Screenshot | DOM + screenshot |
| Portfolio | DOM + screenshot | DOM + screenshot | Screenshot | DOM + screenshot |
| Materiali | DOM + screenshot | DOM + screenshot | Screenshot | DOM + screenshot |
| Configuratore | DOM + screenshot | DOM + screenshot | Screenshot e tastiera | DOM + screenshot |
| Contatti | DOM + screenshot | DOM + screenshot | Screenshot | DOM + screenshot |

**24 screenshot completi della matrice rivisti**, più catture della 404 e del fallback di copia. **18 misurazioni DOM delle pagine pubbliche**, a 1440/768/320: un H1, nessun overflow del documento o elemento main oltre i bordi orizzontali. Non sono 24 misurazioni numeriche: a 390 l’evidenza della matrice è visuale. La 404 ha una misurazione separata.

A 320 tutte le sei pagine riportano `clientWidth=scrollWidth=320`, nessun elemento main fuori bordo e tutte le immagini caricate. I cinque controlli numerici/select del configuratore occupano 272 px entro la shell. Header e menu vanno su due righe senza uscire dal viewport; titoli, schede, input, fattori di prezzo e footer restano nei contenitori. Quote SVG piccole sono duplicate nei testi delle schede/riepilogo. Non rilevati nuovi difetti applicativi riproducibili o motivi per un restyling.

Le prime catture hanno larghezze utili 1425/753/375 px per viewport 1440/768/390, a causa della scrollbar. Le catture finali a 320 sono larghe 320 px. È un browser desktop ridimensionato, non un dispositivo mobile reale o una prova Safari.

Contrasto dei token solidi: noce/carta 12,76:1; noce/betulla 10,51:1; bruno/carta 5,87:1; bruno/betulla 4,84:1; rame scuro/carta 5,83:1; rame scuro/betulla 4,80:1. Non è una certificazione WCAG di ogni pixel, trasparenza o stato.

## Funzionamento verificato

- **68/68 asserzioni native già concluse e non ripetute:** nove coppie di limiti; 18 estremi con prezzo esatto ricostruito indipendentemente; 18 adiacenti rifiutati; errori; vuoto/decimale; copia disabilitata in errore; reset completo; controlli visibili dopo gli aggiornamenti. Radio, select, fill e clic Playwright sul bundle reale, senza importare il modello nel browser.
- Esempi confermati: tavolo iniziale **483,18 €**, L 200 **512,52 €**, L 201 **513,99 €**; libreria frassino/opaca **884,74 €**; madia noce/pigmentato **1.300,41 €**. Formula in [CONFIGURATOR](CONFIGURATOR.md).
- **Percorso completo da tastiera a 390:** Tab sullo skip link, Invio al main, Tab alla radio; ArrowRight seleziona Libreria; Tab/ArrowDown scelgono Frassino e Trasparente opaca; Tab attraversa il link materiali e raggiunge L; Ctrl+A e digitazione di 100 producono **904,59 €**. L’outline osservato è di 3 px.
- Tab a H, Ctrl+A e 0: errore «Scegli una misura da 80 a 220 cm.», prezzo assente e copia disabilitata. Tab attraversa P e raggiunge il reset; Invio ripristina tavolo/rovere/olio naturale, L/H/P 180/75/90, **483,18 €**, zero errori. Tab raggiunge la copia; Spazio la attiva.
- **Clipboard reale:** l’API risolve e compare la conferma. Ctrl+V incolla il risultato in un campo QA temporaneo della sola pagina: 11 verifiche positive su intestazione, versione, tipo, essenza, finitura, misure, tre fattori, totale e disclaimer. Campo rimosso subito dopo; nessuna funzione di prodotto aggiunta. Il permesso di scrittura risulta `granted`, quello di lettura `prompt`; non sono stati modificati i permessi.
- **Fallback nel browser:** un `NotAllowedError` viene simulato sostituendo temporaneamente la sola Clipboard API della pagina, con ripristino nel `finally`. Il riepilogo readonly appare con prezzo corrente **512,52 €** e disclaimer, senza falsa conferma. È simulazione di un rifiuto API, **non** prova della revoca di un permesso reale nelle impostazioni Chrome.
- **Lazy loading:** sulla homepage a 320 lo scroll tramite rotella carica la foto successiva, che conserva `loading="lazy"`. Nelle altre pagine le immagini sono state portate nel viewport e decodificate senza cambiare l’attributo. Le vecchie catture a 1440/768/390 avevano usato `loading=eager` solo nel DOM di test: non sono la prova di lazy loading ora aggiunta.
- **404:** richiesta diretta HTTP 404, titolo e H1 corretti, nessun overflow a 320, screenshot rivisto; il clic nativo su «Torna alla homepage» raggiunge `/`. L’unico messaggio console della 404 è il caricamento HTTP 404 atteso, non un’eccezione JavaScript applicativa.

Già superati sul medesimo codice e non rieseguiti inutilmente: typecheck, lint, formattazione, build di produzione, **15/15 test locali** e **14/14 test HTTP**. Nessuna modifica applicativa in questa ripresa.

## Errori di esecuzione e preparazione delle catture

Il difetto applicativo reale trovato nella 4A era lo stile dentro `noscript` che nascondeva i controlli dopo un aggiornamento Qwik. È corretto in `3eeead1`, con regola globale `@media (scripting: none)`; la CTA obsoleta di Materiali è corretta in `859c1b1`.

Distinti da quel difetto: viewport iniziale 0 × 0 di una nuova scheda; asserzione che leggeva limiti prima dell’aggiornamento Qwik; routine aggregate interrotte; timeout di singole catture dopo «fonts loaded». Questi esiti non sono dichiarati passati e non dimostrano un guasto di MCP. Le verifiche riprese usano comandi dedicati, attese per il testo aggiornato e preparazione esplicita della cattura:

1. Controllare URL e `innerWidth/innerHeight` della scheda dedicata.
2. Attendere `document.fonts.ready`; portare le immagini nel viewport e attenderne la decodifica.
3. Posizionare lo scroll, attendere due `requestAnimationFrame`, poi richiedere lo screenshot con il comando MCP dedicato.
4. Ispezionare il file salvato prima di contarlo come evidenza.

Con questa preparazione sono state completate anche le catture integrali di Materiali, Configuratore, Contatti, Portfolio e 404. Non si deduce una causa unica per tutti i timeout precedenti dal successo delle richieste successive. Il servizio non è stato riavviato o riconfigurato.

## Confini ancora aperti

- **Browser con JavaScript disabilitato:** il tentativo per la sola scheda tramite `browserContext.newCDPSession` è stato rifiutato con `Target.attachToBrowserTarget: Not allowed`; non è arrivato al comando di disabilitazione. Non è una prova di browser senza JS né un guasto generale del tool. SSR senza esecuzione di script resta verificato dai 14 test HTTP; la verifica visuale specifica senza JS rimane manuale.
- **Revoca reale del permesso clipboard:** non effettuata; confermati copia/incolla reali e fallback con rifiuto simulato, come distinti sopra.
- Nessuna certificazione WCAG, prova con screen reader, Safari o dispositivo mobile fisico.

## Evidenze e riproduzione

Artefatti locali ignorati in `test-results/`:

- `m4a-{home,lavorazioni,portfolio,materiali,configuratore,contatti}-{1440,768,390,320}.png`: 24 catture della matrice.
- `m4a-404-320.png`, `m4a-copy-fallback-visible-390.png`; viewport preliminare aggiuntivo del portfolio.
- `m4a-*-320-metrics.json`, `m4a-keyboard-product-focus.json`, `m4a-corrected-browser-results.json`.
- `m4a-reconnection-results.json`: 68 casi nativi e risultati parziali precedenti, conservati senza cancellare gli errori.
- `m4a-build.log`, `m4a-tests.log`, `m4a-npm-audit.json`, manifest SHA-256 e cattura del difetto iniziale.

Gli artefatti ignorati non vengono trasferiti dal push. I risultati e i confini sono conservati qui e nel [WORKLOG](WORKLOG.md). Da un checkout nuovo: `npm ci`, `npm run build`, `npm run serve -- --port 8790`. Verificare HTTP prima del browser. Non ripetere casi già passati salvo modifiche o regressioni; per la procedura completa vedere [DEPLOYMENT](DEPLOYMENT.md).

Per i soli residui, in una sessione locale controllata dal proprietario: disabilitare JavaScript per la pagina e ricaricare direttamente home/configuratore, verificando contenuti SSR, nota noscript e controlli nascosti nei browser con supporto `scripting: none`; poi ripristinare JavaScript. Revocare il solo permesso clipboard del sito e provare la copia, controllare il fallback readonly, quindi ripristinare il permesso precedente. Registrare browser/versione, atteso/osservato ed evidenze, senza confondere questi casi con le simulazioni già concluse.

Pulizia conclusa: chiusa soltanto la scheda Radice creata per il collaudo e arrestato soltanto Wrangler della sessione. La scheda di connessione dell’estensione e i processi browser condivisi sono rimasti invariati. Nessuna ulteriore chiamata Playwright da questa sessione dopo la chiusura.
