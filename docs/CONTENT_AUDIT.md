# Audit dei contenuti — milestone 4A

15 novembre 2026. Revisione del sito fittizio Radice sulla build Qwik City SSR locale, baseline `b470451` con le correzioni circoscritte della 4A. Valutazione basata sui testi effettivi delle sei rotte e sulle catture desktop/tablet/mobile disponibili. Copertura e limiti in [QA_CHECKLIST](QA_CHECKLIST.md). Le proposte sotto sono un backlog editoriale, **non modifiche già implementate né autorizzazione ad ampliare il sito**.

## Valutazione per pagina

| Pagina | Necessità di altri contenuti | Evidenza e proposta concreta | Perché / priorità |
| --- | --- | --- | --- |
| Home `/` | Nessun ampliamento necessario | Hero, bottega, tre studi, campioni, rifinitura e accesso al configuratore sono già presenti. La chiusura «Configura il tuo arredo» e il footer «Immagina il tuo arredo» portano entrambi al configuratore. Valutare in futuro una sola azione conclusiva più netta, distinguendo il rimando editoriale dal flusso interattivo. | La pagina non è scarna; aggiungere un’altra sezione ripeterebbe materia, cura e su misura. Priorità bassa, eventuale riduzione delle ripetizioni. |
| Lavorazioni `/lavorazioni/` | Arricchimento mirato consigliato | Le tre famiglie di arredo e i quattro passaggi sono chiari, ma descrivono soprattutto intenzioni. Un breve esempio dimostrativo «dal rilievo al bordo» potrebbe collegare un vincolo della stanza a una scelta del concept Convivio, rimandando al relativo studio. Un piccolo dettaglio illustrato della giunzione renderebbe concreto il lessico già usato. | Differenziare questa pagina dal racconto generale della home e spiegare una decisione, senza inventare commesse o portate certificate. Priorità media. |
| Portfolio `/portfolio/` | Sufficiente; approfondimento facoltativo | Tre studi con misure, essenza, finitura, giunzione e uso immaginato. La struttura ripetuta facilita il confronto, ma ogni sezione ripropone la stessa scansione. Un solo approfondimento specifico per studio — passaggio intorno al tavolo, distribuzione dei ripiani, presa delle ante — aggiungerebbe ragionamento, senza nuovi prodotti. La CTA «Esplora le possibilità del su misura» potrebbe nominare direttamente il configuratore. | Migliorare la comprensione dei compromessi progettuali e della destinazione del link. Priorità media; niente fotografie presentate come lavori consegnati. |
| Materiali `/materiali/` | Utile un confronto pratico breve | Essenze e finiture hanno già descrizioni distinte, campioni dichiarati e note di cura. Manca una sintesi che aiuti a confrontare tono, disegno e manutenzione immaginata senza rileggere sei schede. Proposta: una tabella editoriale concisa con rimandi ai paragrafi esistenti, senza graduatorie di resistenza o prestazioni non documentate. | Ridurre lo sforzo di confronto prima della scelta nel configuratore. Priorità media. Corretto in questa 4A il solo riferimento obsoleto all’«anteprima»: la CTA ora dice «Prova essenze e finiture nel configuratore». |
| Configuratore `/configuratore/` | Nessun nuovo blocco necessario | Controlli, aiuti, errori, schema, riepilogo, tre voci di costo, formula e disclaimer coprono il compito. A 390 px il prezzo iniziale arriva dopo un lungo tratto di introduzione e controlli; ulteriori testi peggiorerebbero la distanza fra scelta e risultato. Valutare una revisione del solo microcopy ripetuto, mantenendo chiari limiti e natura simulata. Le piccole quote nello SVG sono duplicate nelle misure testuali leggibili. | Collaudo mobile/tastiera ora concluso; successiva priorità alla concisione. Non servono tutorial lunghi, nuove opzioni o un flusso di richiesta. Nessun intervento generale di layout eseguito. |
| Contatti `/contatti/` | Nessun riempimento necessario; orientamento migliorabile | Domande di progetto, nota sulla bottega fittizia, quattro FAQ e crediti danno una funzione alla pagina anche senza recapiti. La FAQ sul preventivo descrive la simulazione ma non contiene un link contestuale. Un rimando «Prova una stima simulata» e una frase su come conservare il riepilogo nei propri appunti chiuderebbero il percorso meglio della sola CTA verso Lavorazioni. | Aiutare chi arriva cercando un’azione concreta, senza suggerire invii reali. Priorità media. Non aggiungere telefono, indirizzo, orari o testimonianze inventati. |
| Pagina sconosciuta / 404 | Nessun ampliamento editoriale richiesto | Stato HTTP, revisione visuale a 320 e link di ritorno alla home verificati. Conservare messaggio breve e ritorno alle rotte pubbliche. | Una 404 non deve diventare una pagina promozionale. Nessun arricchimento necessario. |

## Ripetizioni e coerenza trasversale

Il lessico «materia, cura, dettagli, misura» mantiene la voce della bottega, ma home, Lavorazioni e chiusure potrebbero distinguere meglio i rispettivi compiti: presentare, spiegare, far provare. Le grandi aperture e il footer sono un sistema coerente; non sono un difetto da rimuovere solo perché ricorrono.

Header, footer, nota comune delle pagine interne e testi specifici ripetono la natura dimostrativa. Non eliminare automaticamente questi avvisi: un visitatore può arrivare direttamente su una rotta interna. Un’eventuale revisione dovrebbe accorpare soltanto le ripetizioni ravvicinate e lasciare sempre espliciti azienda fittizia, prezzi inventati e assenza di invio/ordine.

La fotografia degli utensili è riutilizzata in home, Lavorazioni e Contatti. È coerente e attribuita; in futuro un dettaglio originale di progetto potrebbe differenziare Lavorazioni, evitando una nuova immagine puramente decorativa. Non occorre aumentare il numero di fotografie per riempire la pagina.

## Ordine proposto per una futura revisione autorizzata

1. Completare i controlli manuali rimasti aperti, prima di cambiare copy o composizione.
2. Rendere più esplicite le CTA di Portfolio e della FAQ Contatti, mantenendo le destinazioni già esistenti.
3. Aggiungere un esempio concreto a Lavorazioni e una sintesi di confronto a Materiali.
4. Solo dopo, valutare la concisione del configuratore mobile e delle chiusure ripetitive.

Nessuna nuova sezione, funzionalità, servizio o restyling deriva automaticamente da questo audit. I soli interventi applicativi della 4A sono registrati nel worklog.
