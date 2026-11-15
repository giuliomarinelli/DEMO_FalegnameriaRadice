# Case study — una bottega digitale, dalle fondamenta

## Problema e direzione

Una falegnameria su misura deve rendere percepibili materia, proporzioni e cura prima ancora di presentare un catalogo. Radice è una bottega fittizia: il sito esplora questa esperienza senza inventare clienti, testimonianze, certificazioni o lavori realmente consegnati.

La prima milestone costruisce una base riconoscibile e navigabile. La homepage introduce il linguaggio artigiano; cinque pagine interne offrono primi contenuti orientativi. Il configuratore resta una promessa dichiarata come futura, senza un’interfaccia che suggerisca un servizio già attivo.

## Decisioni

- **Identità originale:** anelli del legno nel marchio, carta calda, verde bosco e terracotta. Titoli serif ampi, ritmo editoriale e campioni cromatici illustrativi.
- **Trasparenza:** avviso demo sempre presente, contatti senza recapiti fittizi azionabili, fotografia dichiarata come ispirazione e attribuita al suo autore.
- **Qwik City SSR:** contenuti e metadati nella prima risposta, con ripresa locale della sola interazione di navigazione. Routing convenzionale senza React o SPA alternativa.
- **Cloudflare Pages:** adapter e middleware ufficiali, nessun server business separato. La produzione viene verificata localmente in workerd/Wrangler.
- **Poche dipendenze di prodotto:** nessun kit UI, font remoto, backend o analytics. Tailwind 4 governa il sistema visivo, Qwik City produce le immagini responsive dalla sorgente locale.
- **Riuso concreto:** header, footer, marchio, apertura delle pagine e metadati sono condivisi; i contenuti specifici restano nelle rispettive rotte.

## Evidenza e confini

Il test essenziale legge via HTTP il risultato della build Pages: tutte le sei pagine devono contenere H1, testo, titolo, descrizione e navigazione. Controlla anche HTTP 404 e asset. Il dettaglio degli esiti effettivi, dei viewport ispezionati e delle dipendenze segnalate è in [WORKLOG](WORKLOG.md). Questa evidenza locale non equivale a deployment remoto, accettazione Safari o certificazione completa di accessibilità.

## Passi futuri separati

La milestone 2 completerà contenuti e presentazione dei manufatti; la 3 implementerà scelte vincolate, formula trasparente, prezzo simulato e riepilogo del configuratore; la 4 amplierà audit, documentazione e preparazione al deploy. Non sono state avviate da questa consegna.
