# Configuratore — modello dimostrativo v1

Il configuratore di `/configuratore/` simula arredi su misura. Tutte le cifre sono inventate, non provengono da listini e non costituiscono offerte commerciali. Nessun ordine, pagamento, invio o salvataggio. Versione del modello: `radice-demo-v1`.

## Misure e scelte

Misure in centimetri interi, estremi inclusi. L = larghezza, P = profondità, H = altezza. Gli intervalli sono plausibili per la demo, non verifiche di stabilità, resistenza o adattamento alla stanza.

| Tipologia | L: intervallo / iniziale | H: intervallo / iniziale | P: intervallo / iniziale | Lavorazione fissa |
| --- | --- | --- | --- | --- |
| Tavolo | 120–240 / 180 | 70–80 / 75 | 60–110 / 90 | 180,00 € |
| Libreria | 50–160 / 96 | 80–220 / 180 | 20–50 / 32 | 240,00 € |
| Madia | 80–220 / 160 | 50–110 / 78 | 30–60 / 42 | 280,00 € |

| Essenza | Tariffa inventata €/m² equivalenti |
| --- | --- |
| Noce | 195 |
| Rovere | 145 |
| Frassino | 120 |

| Finitura | Tariffa inventata €/m² equivalenti |
| --- | --- |
| Olio naturale | 18 |
| Trasparente opaca | 26 |
| Olio pigmentato | 32 |

Tutte le 27 combinazioni tipologia/essenza/finitura sono ammesse solo per la simulazione. Non viene garantita la compatibilità fisica. Il primo rendering propone tavolo, rovere, olio naturale, 180 × 90 × 75 cm (L × P × H).

## Formula riproducibile

Prima si calcola una superficie equivalente A in cm²:

```text
Tavolo:   A = L × P + 4 × H × 8
Libreria: A = 2 × H × P + 5 × L × P + L × H
Madia:    A = 2 × L × P + 2 × H × P + 2 × L × H
```

La superficie equivalente in m² è A / 10.000. Il tavolo rappresenta piano e quattro fasce equivalenti da 8 cm per gli appoggi; la libreria due fianchi, cinque ripiani e schienale; la madia sei superfici equivalenti. È un parametro convenzionale, non una distinta di taglio. Spessori, sfridi, ferramenta, giunzioni e verifiche tecniche non sono modellati. Imposte, trasporto, montaggio e accessori sono esclusi.

Il calcolo usa centesimi interi e non arrotonda prima la superficie:

```text
materiale_centesimi = Math.round(A × tariffa_materiale / 100)
finitura_centesimi  = Math.round(A × tariffa_finitura / 100)
totale_centesimi    = materiale_centesimi + lavorazione_centesimi + finitura_centesimi
```

Ogni voce viene quindi arrotondata al centesimo prima della somma. Tutti gli operandi sono positivi e limitati; `Math.round` arrotonda il mezzo centesimo verso l’alto. Nessuno sconto, imposta implicita o fattore casuale. Formattazione `Intl.NumberFormat("it-IT")`, euro a due decimali.

| Esempio, misure L × P × H | Superficie m² | Materiale | Lavorazione | Finitura | Totale |
| --- | --- | --- | --- | --- | --- |
| Tavolo, 180 × 90 × 75, rovere, olio naturale | 1,86 | 269,70 € | 180,00 € | 33,48 € | **483,18 €** |
| Libreria, 96 × 32 × 180, frassino, trasparente opaca | 4,416 | 529,92 € | 240,00 € | 114,82 € | **884,74 €** |
| Madia, 160 × 42 × 78, noce, olio pigmentato | 4,4952 | 876,56 € | 280,00 € | 143,85 € | **1.300,41 €** |

## Stato e comportamento

`src/lib/configurator.ts` contiene tipi, intervalli, tariffe, validazione, calcolo e testo copiabile. È un modulo puro, indipendente dal DOM e da Cloudflare. Valida anche gli ingressi della funzione pubblica di calcolo, oltre ai controlli HTML. Identificatori sconosciuti e proprietà del prototipo vengono rifiutati.

`FurnitureConfigurator` conserva la bozza come stringhe in `useStore`, così un campo vuoto non diventa zero. `useComputed$` deriva il risultato validato e il riepilogo. Input vuoti, decimali, notazione esponenziale, valori non sicuri e fuori intervallo sospendono stima, disegno e copia: nessun clamp o prezzo precedente presentato come attuale. Gli spazi esterni sono rimossi dalla validazione; il valore digitato rimane visibile. I limiti nativi `min`, `max`, `step` non sono l’unico controllo.

Cambiare tipologia ripristina le sue tre misure iniziali e conserva essenza/finitura. Il reset completo torna al tavolo iniziale e pulisce errori e stato di copia. `ConfigurationDrawing` deriva proporzioni, colore e opacità dalle scelte: SVG originale e illustrativo, senza valore esecutivo o accuratezza fotografica. Nessun nuovo asset di terzi.

La copia usa `navigator.clipboard.writeText` solo da un clic dell’utente. La conferma appare dopo la risoluzione positiva e solo per il testo ancora corrente. Il reset invalida le richieste pendenti. Se API o permesso mancano, compare un riepilogo readonly selezionabile, aggiornato alle scelte correnti. Nessun uso di API deprecate, storage o chiamata business di rete.

## SSR e accessibilità

La prima risposta SSR contiene configurazione iniziale, prezzo, fattori, formula, disclaimer e metadati. Le modifiche richiedono JavaScript; `noscript` lo dichiara, mentre una media query globale `scripting: none` nasconde i controlli non operativi nei browser che la supportano. La simulazione iniziale resta leggibile. La regola è esterna a `noscript` per evitare che una ricreazione DOM di Qwik la renda attiva anche con scripting abilitato, difetto riprodotto e corretto nella 4A. Nessuna sostituzione con CSR o SSG.

Radio, select, number e button nativi; fieldset/legend, label esplicite, aiuti ed errori associati con `aria-describedby`, `aria-invalid`, focus visibile e stati annunciati con `role=status`. Il prezzo usa una regione live cortese. Il disegno ha una descrizione accessibile. Colonna singola sotto il breakpoint desktop; riepilogo sticky solo sul desktop. Questo progetto semantico non equivale a certificazione WCAG o verifica con screen reader.

## Riprodurre i test

```powershell
npm ci
npm run test.unit
npm run typecheck
npm run lint
npm run fmt.check
npm run build
npm run serve -- --port 8790
```

In un secondo terminale, con il runtime attivo:

```powershell
$env:TEST_BASE_URL = 'http://127.0.0.1:8790'
npm test
Remove-Item Env:TEST_BASE_URL
```

`test.unit` non richiede un server. Compila il modello in `test-results/configurator`, trasforma i due componenti reali con l’optimizer Qwik installato e li verifica con `@builder.io/qwik/testing` e le condizioni Node `development`. Il piccolo preparatore serve a eseguire eventi QRL nel DOM di test ufficiale, senza introdurre Vite/Vitest o dipendenze nuove. Non cambia la build dell’applicazione.

11 test del modello coprono estremi e valori adiacenti per tutte le misure, input malformati, 27 combinazioni, esempi indipendenti, arrotondamento, monotonia, reset delle misure e riepilogo. 4 test dei componenti verificano reattività effettiva di Qwik, limiti aggiornati, errori, reset, diagramma e copia con clipboard simulata, incluso il rifiuto del permesso. Nessuna scrittura nella clipboard reale durante i test. I 14 test HTTP controllano produzione Pages, contenuti iniziali e metadati senza eseguire JS, sei rotte, link, immagini e 404.

La simulazione DOM non verifica layout, tastiera fisica, permessi della clipboard del browser o ripresa Qwik dalla pagina di produzione. Per la matrice manuale vedere [DEPLOYMENT](DEPLOYMENT.md); esiti realmente ottenuti e blocchi in [WORKLOG](WORKLOG.md).

Il successivo [collaudo 4A](QA_CHECKLIST.md) aggiunge evidenza della ripresa sulla produzione Pages, degli estremi, del percorso completo da tastiera, di copia/incolla reali e della resa sulle quattro larghezze. Il fallback è provato anche nel browser con rifiuto API simulato e ripristino della modifica temporanea. Restano distinti la revoca reale del permesso e la prova visuale con JS disabilitato; nessuna certificazione WCAG o compatibilità con tutti i browser.
