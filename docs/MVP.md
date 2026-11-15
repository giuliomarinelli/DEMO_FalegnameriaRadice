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
- Niente backend business separato, credenziali, integrazioni terze reali, pagamenti o comunicazioni spedite; Pages Functions per SSR consentite.
- Dati mock mantenuti nel codice e identificati come tali.
- Esperienza completa via SSR Cloudflare Pages; le interazioni dimostrative funzionano in locale nel browser senza servizi business esterni. Non richiedere una build statica o funzionamento offline.
- Design originale, non copia di siti reali; contenuto leggibile e funzionante, non placeholder generici.
- Deploy futuro: Cloudflare Pages; master produzione, preview staging da proteggere con Access; develop senza promozione automatica.


## Requisito architetturale vincolante: SSR
- Framework: Qwik + Qwik City; TypeScript strict, Tailwind CSS.
- Cloudflare Pages con adapter Qwik City `cloudflare-pages` e SSR tramite Pages Functions; Vite è solo la toolchain interna al progetto Qwik.
- L'HTML della prima risposta, incluse le rotte interne, deve contenere il contenuto significativo della pagina anche senza eseguire JavaScript nel browser.
- Impostare metadati SEO per le pagine e verificare la build SSR con richiesta HTTP diretta a una rotta interna in ambiente compatibile con Pages.
- Dati applicativi dimostrativi locali; nessun database o backend business separato. Le funzioni serverless dell'adapter SSR sono ammesse.
- Non implementare una SPA React e non abilitare SSG in sostituzione dell'SSR senza autorizzazione.

## Checklist della prima milestone
- [ ] Scaffold Qwik/Qwik City con SSR, adapter Cloudflare Pages, TypeScript strict e Tailwind configurato.
- [ ] Navigazione, layout responsive, tema e componenti base.
- [ ] Typecheck, lint, test essenziale e build.
- [ ] README e documentazione iniziale aggiornati.
- [ ] Nessun deploy remoto o modifica a servizi esterni.
