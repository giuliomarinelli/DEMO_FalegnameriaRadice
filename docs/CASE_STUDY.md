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

## Milestone 2 — un quaderno di atelier

L’identità passa dal verde bosco alla coppia noce/betulla, con rame e salvia negli accenti. La homepage avvicina il punto di vista al banco: utensili, mani e superfici. Il marchio ad anelli e la tipografia serif rimangono riconoscibili, dentro una composizione più materica fatta di sezioni scure, fotografie e fogli di studio.

Le sei pagine sono completate con metodo di bottega, tre concept originali, essenze, finiture, cura, domande di progetto e FAQ. Convivio, Intervallo e Sponda hanno disegni SVG originali, misure e note sulle giunzioni. Le immagini fotografiche restano ispirazioni dichiarate: non vengono usate per fingere lavori reali o illustrare come consegnato un concept inventato.

Il futuro configuratore è valorizzato attraverso tipologie, campioni e significato delle misure. Non è presente logica di preventivazione: il contenuto è tutto SSR e le uniche interazioni sono menu, collegamenti e FAQ native. Dati demo centralizzati e componenti per disegni/campioni evitano divergenze tra le pagine senza introdurre backend o dipendenze.

Direzione completa in [BRAND_DIRECTION](BRAND_DIRECTION.md), fonti in [ASSETS](ASSETS.md), risultati e limiti di verifica nel worklog.

## Passi futuri separati

La milestone 3 implementerà scelte vincolate, formula trasparente, prezzo simulato e riepilogo del configuratore; la 4 amplierà audit, documentazione e preparazione al deploy. Non sono state avviate da questa consegna.
