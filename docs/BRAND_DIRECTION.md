# Direzione di marca — Falegnameria Radice

Milestone 2, 15 novembre 2026. Evoluzione della foundation sul branch `feature/mvp-foundation`.

## Idea guida

**Legno, mani, misura.** Una bottega piccola e competente, vicina alle abitudini di chi abita gli spazi. La cura si racconta attraverso un bordo, un incastro, un accostamento di tavole. Il sito è un quaderno di atelier: osservazione della materia, studi di arredo, annotazioni e misure.

Radice è fittizia: nessuna storia aziendale inventata, anzianità, sede, certificazione, cliente o lavoro consegnato. Il disclaimer rimane nell’header e nel footer; schede e fotografie distinguono concept e ispirazione.

## Palette e contrasto

| Colore | Token | Ruolo |
| --- | --- | --- |
| Noce scuro `#38271D` | `walnut` | Testi, hero, sezioni immersive, footer e pulsanti |
| Betulla `#E9DCC5` | `birch` | Fondi caldi, fogli di studio e testo sulle sezioni scure |
| Rame `#B66B40` | `copper` | Segni editoriali, linee, sottolineature e frecce decorative |
| Salvia `#7C8065` | `sage` | Indicatori di nota e piccoli dettagli |
| Carta `#F7F2E9` | `paper` | Fondo principale e pause nella composizione |
| Rame scuro `#8D4D2A` | `ink-copper` | Testo piccolo di accento sui fondi chiari e focus |
| Bruno secondario `#695B4E` | `muted` | Testi funzionali e didascalie sui fondi chiari |

Il rame originale non è usato per testi piccoli sul chiaro: il rapporto con la carta è circa 3,65:1. La variante `ink-copper` raggiunge circa 5,83:1 sulla carta e 4,80:1 sulla betulla. Noce su betulla è circa 10,51:1. Sono calcoli sui colori solidi, non un audit completo WCAG di tutti gli stati. Focus da 3 px, chiaro nelle sezioni scure; salvia come accento decorativo.

## Tipografia e voce

Titoli serif di sistema: Palatino Linotype / Book Antiqua / Palatino / Iowan Old Style / Georgia. Dimensioni fluide, interlinea compatta, corsivo limitato al titolo principale. Testi e quote in Segoe UI / Arial. Nessun font remoto o nuova dipendenza; la resa serif dipende dai font installati.

La voce usa parole concrete: tavolo, piano, ripiano, passaggio, bordo, finitura. Evitare superlativi, lusso astratto e dichiarazioni di prestazioni non verificate. Le caratteristiche dei manufatti sono intenzioni di progetto, non garanzie commerciali.

## Fotografia e materia

Quattro fotografie locali con licenza documentata in [ASSETS](ASSETS.md): utensili, gesto di rifinitura, superficie lignea e atmosfera di arredo. I soggetti ravvicinati mostrano tracce d’uso, fibre, mani e superfici. Nessuna immagine è presentata come sede, personale o manufatto di Radice.

Le sorgenti restano in `src/media`; gli import Qwik `?jsx` generano varianti WebP e `srcset`. Hero eager ad alta priorità; immagini successive lazy. Crediti contestuali e riepilogo in `/contatti/#fotografie`. Nessuna chiamata a Unsplash durante rendering o navigazione: i crediti sono normali link esterni.

La texture carta è un pattern CSS originale. I campioni sono gradienti illustrativi dichiarati, senza fingere fotografie certificate delle essenze. La fotografia di superficie non identifica un’essenza specifica.

## Composizione e disegni

Alternanza tra carta e noce scuro, fotografie ampie, sottili separatori, numerazione da quaderno e spazio intorno agli oggetti. Nessun carrello, prezzo barrato, recensione inventata o griglia di vendita. Su mobile l’ordine rimane lineare, senza caroselli o animazioni obbligate.

Convivio, Intervallo e Sponda sono concept originali: tavolo, libreria e madia. I disegni SVG sono schemi con quote illustrative, non esecutivi in scala. Le schede descrivono dimensioni L × P × H, essenza, finitura, giunzione e contesto d’uso. La foto di arredo è separata dai disegni e dichiarata come atmosfera.

## Futuro configuratore

Quattro aspetti: tipologia, essenza, misure, finitura. Anteprima editoriale di sola lettura: nessuna scelta attiva, selezione apparente, campo disabilitato, formula, prezzo, copia del riepilogo o richiesta. I campioni rimandano ai materiali, le tipologie alle schede del portfolio. La milestone 3 rimane separata.

## Continuità tecnica

Conservare marchio ad anelli, Qwik City, SSR, routing e adapter Pages. Tailwind governa layout e stati; CSS dedicato per texture, campioni e hero. Mantenere didascalie, testo alternativo, semantica, focus e menu mobile. Verificare produzione locale e viewport, senza assumere che il solo build provi la qualità visiva.
