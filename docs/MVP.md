# MVP - Falegnameria Radice

## Prodotto
Sito per una falegnameria artigiana fittizia. Funzionalita' distintiva: configuratore di arredo su misura con prezzo indicativo e senza ordine.

## Pagine
Home; Lavorazioni; Portfolio manufatti; Materiali e finiture; Configuratore; Contatti.

## Flusso verticale prioritario
Configuratore: scelta tipologia oggetto, materiale, larghezza/altezza/profondita' in range plausibili e finitura; preventivo simulato aggiornato al variare dei parametri con dettaglio formula e disclaimer. Riepilogo copiabile.

## Criteri di accettazione
Configuratore utilizzabile su mobile e tastiera; controlli vincolati; prezzo di esempio coerente e spiegabile, senza pretesa di validita' commerciale; reset e riepilogo; contenuti demo ben dichiarati.

## Vincoli di scope
- Niente backend, credenziali, integrazioni terze reali, pagamenti o comunicazioni spedite.
- Dati mock mantenuti nel codice e identificati come tali.
- Esperienza completa e dimostrabile anche offline dopo build statico.
- Design originale, non copia di siti reali; contenuto leggibile e funzionante, non placeholder generici.
- Deploy futuro: Cloudflare Pages; master produzione, preview staging da proteggere con Access; develop senza promozione automatica.

## Checklist della prima milestone
- [ ] Scaffold React/Vite/TypeScript strict/Tailwind configurato.
- [ ] Navigazione, layout responsive, tema e componenti base.
- [ ] Typecheck, lint, test essenziale e build.
- [ ] README e documentazione iniziale aggiornati.
- [ ] Nessun deploy remoto o modifica a servizi esterni.
