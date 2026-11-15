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

## Milestone 3 — dal quaderno alla simulazione

Il configuratore permette di esplorare tavolo, libreria e madia senza suggerire un acquisto. Misure vincolate, tre essenze e tre finiture aggiornano un riepilogo e uno schema proporzionale. La cifra è ricostruibile: superficie equivalente, tariffa del materiale, quota di lavorazione e finitura; ogni voce viene arrotondata al centesimo prima della somma. Il tavolo iniziale produce 483,18 €, una cifra inventata con disclaimer esplicito.

Il modello puro è separato dai componenti Qwik. Una bozza testuale conserva anche campi vuoti e valori errati; il risultato derivato sospende la stima finché tutti i valori sono validi. Nessun clamp nascosto. Il cambio di tipologia conserva essenza/finitura ma ripristina misure coerenti; il reset riparte dall’esempio iniziale. La copia ha un’alternativa manuale quando il browser non concede la clipboard.

SSR restituisce già simulazione iniziale, formula e metadati; le modifiche usano stato locale Qwik, senza backend, persistenza o integrazioni. L’identità materica e i contenuti editoriali restano integri. Formula e assunzioni sono in [CONFIGURATOR](CONFIGURATOR.md).

Evidenza: 11 test del modello, 4 dei componenti Qwik con DOM di test ufficiale e 14 HTTP su produzione Pages locale, oltre a typecheck, lint e build. I test dei componenti simulano eventi e clipboard; non provano layout, tastiera fisica o ripresa Qwik nel browser di produzione. Il connettore browser non ha risposto in questa sessione: la matrice manuale è documentata e resta un limite di accettazione esplicito.

## Milestone 4A — collaudo con evidenze parziali

La prova sulla pagina di produzione ha trovato un difetto sfuggito ai test DOM: una regola CSS dentro `noscript`, reinserita da Qwik durante l’aggiornamento, nascondeva i controlli dopo la prima modifica. Il prezzo si aggiornava, ma l’utente perdeva l’interfaccia. Spostare la regola nella media query globale `scripting: none` conserva lo scopo senza attivarla nel flusso interattivo. Corretto anche un richiamo obsoleto all’anteprima nella CTA Materiali.

Il collaudo aggiunge 24 screenshot rivisti sulle quattro larghezze, misure senza overflow delle sei rotte a 1440/768/320 e 68 verifiche native sul bundle reale. La ripresa completa il percorso da tastiera nel configuratore, errore e reset, copia/incolla reali con 11 verifiche del testo e fallback con rifiuto API simulato. Verificati anche lazy loading, 404 e ritorno alla home. La precedente attribuzione di un guasto MCP era non dimostrata ed è stata rettificata: timeout di singole operazioni, preparazione del viewport e attese del test sono distinti dai difetti applicativi. I residui specifici sono dichiarati nel report, senza nuove funzionalità o revisione generale del design.

[CONTENT_AUDIT](CONTENT_AUDIT.md) individua opportunità mirate: rendere concreto il metodo, confrontare le opzioni e chiarire le CTA, senza riempire le pagine o inventare credenziali aziendali. [DEPENDENCY_AUDIT](DEPENDENCY_AUDIT.md) distingue le 12 segnalazioni e la loro esposizione effettiva, senza downgrade forzati. [QA_CHECKLIST](QA_CHECKLIST.md) conserva confini, risultati e residui del collaudo.

## Passi futuri separati

La 4A si ferma al collaudo descritto. Eventuali completamenti manuali, interventi editoriali e preparazione alla pubblicazione richiedono una nuova istruzione. Nessuna pubblicazione è stata effettuata.
