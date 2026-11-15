import { component$ } from "@builder.io/qwik";
import ImgTools from "~/media/carving-tools.webp?jsx";
import { SectionIntro } from "../../components/section-intro/section-intro";
import { pageHead } from "../../lib/site";

export default component$(() => (
  <SectionIntro
    number="05"
    label="La bottega e i contatti"
    title="Una bottega da immaginare."
    description="Un luogo piccolo, un banco segnato dall’uso e il tempo per ragionare sui dettagli. Radice racconta questo modo di lavorare attraverso un progetto interamente dimostrativo."
  >
    <section class="shell section-space" aria-labelledby="conversation-title">
      <div class="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <figure>
          <ImgTools
            alt="Banco di lavorazione in legno con strumenti da intaglio appoggiati in primo piano."
            class="h-[340px] w-full object-cover md:h-[440px]"
            loading="eager"
            sizes="(min-width: 1024px) 50vw, calc(100vw - 48px)"
          />
          <figcaption class="photo-credit">
            Un’atmosfera di bottega, non una sede Radice. · Dominik Scythe /
            Unsplash
          </figcaption>
        </figure>
        <div>
          <p class="eyebrow text-ink-copper">Prima di parlare di un mobile</p>
          <h2 id="conversation-title" class="section-title mt-4">
            Le domande
            <br />
            da portare al banco.
          </h2>
          <ul class="mt-7 space-y-5 text-sm leading-7 text-muted">
            <li class="border-t border-line pt-4">
              <strong class="text-walnut">Lo spazio.</strong> Quali sono gli
              ingombri disponibili e i passaggi da lasciare liberi?
            </li>
            <li class="border-t border-line pt-4">
              <strong class="text-walnut">L’uso.</strong> Che cosa deve
              contenere o permetterti di fare, ogni giorno?
            </li>
            <li class="border-t border-line pt-4">
              <strong class="text-walnut">La materia.</strong> Preferisci una
              presenza chiara e discreta o un legno più profondo?
            </li>
          </ul>
          <p class="note mt-7">
            Queste domande sono spunti di progetto, non una richiesta di dati.
            Il sito non raccoglie messaggi e non invia comunicazioni.
          </p>
        </div>
      </div>
    </section>
    <section class="paper-grain border-y border-line bg-birch/40">
      <div class="shell grid gap-10 py-14 md:grid-cols-2">
        <div>
          <p class="eyebrow text-ink-copper">Una nota necessaria</p>
          <h2 class="section-title mt-4">
            Questa porta
            <br />è dimostrativa.
          </h2>
        </div>
        <div>
          <p class="body-copy">
            Radice non è una falegnameria reale. Non esistono una sede
            visitabile, orari di apertura, un telefono o un indirizzo email
            della bottega. Nessuna commessa, prenotazione o richiesta di
            preventivo può essere effettuata qui.
          </p>
          <p class="body-copy mt-4">
            Puoi però esplorare come nasce un’idea di arredo, confrontare i
            caratteri dei materiali e leggere le schede dei tre manufatti
            immaginati.
          </p>
          <a class="text-link mt-5" href="/lavorazioni/">
            Entra nel racconto del lavoro <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
    <section class="shell section-space" aria-labelledby="faq-title">
      <div class="grid gap-10 md:grid-cols-[.7fr_1.3fr]">
        <div>
          <p class="eyebrow text-ink-copper">Prima di continuare</p>
          <h2 id="faq-title" class="section-title mt-4">
            Due parole
            <br />
            di chiarezza.
          </h2>
        </div>
        <div>
          <details class="faq-item">
            <summary>I manufatti sono acquistabili?</summary>
            <p>
              No. Convivio, Intervallo e Sponda sono concept originali della
              demo, descritti con misure e dettagli illustrativi. Non sono
              prodotti in vendita, progetti esecutivi o lavori consegnati.
            </p>
          </details>
          <details class="faq-item">
            <summary>Posso già ottenere un preventivo?</summary>
            <p>
              Il configuratore non è ancora disponibile. L’anteprima presenta
              tipologie, materiali e finiture; in futuro il prezzo sarà soltanto
              simulato, con formula esplicita e senza ordini.
            </p>
          </details>
          <details class="faq-item">
            <summary>Le fotografie mostrano la bottega Radice?</summary>
            <p>
              No. Sono immagini di ispirazione con licenza documentata e crediti
              qui sotto. Non raffigurano una sede, personale o lavori di Radice
              e non implicano collaborazioni con gli autori.
            </p>
          </details>
          <details class="faq-item">
            <summary>Colori e misure sono riferimenti commerciali?</summary>
            <p>
              No. I campioni sono grafici, le misure appartengono agli studi
              dimostrativi e le fotografie non identificano le essenze del
              campionario. Un progetto reale richiederebbe campioni fisici e
              verifiche tecniche.
            </p>
          </details>
        </div>
      </div>
    </section>
    <section
      id="fotografie"
      class="shell pb-14 md:pb-20"
      aria-labelledby="credits-title"
    >
      <div class="border-t border-line pt-9">
        <p class="eyebrow text-ink-copper">Le immagini del racconto</p>
        <h2 id="credits-title" class="mt-4 font-display text-3xl">
          Fotografie e crediti.
        </h2>
        <ul class="mt-6 grid gap-5 text-sm leading-7 text-muted md:grid-cols-2">
          <li>
            <a
              class="underline"
              href="https://unsplash.com/photos/hand-tools-on-top-of-table-v8vz-Roj8zo"
            >
              Dominik Scythe
            </a>{" "}
            — utensili sul banco.
          </li>
          <li>
            <a
              class="underline"
              href="https://unsplash.com/photos/a-close-up-of-a-person-working-on-a-machine-OufMPGe5ZQc"
            >
              Elliott Ledain
            </a>{" "}
            — gesto di rifinitura al tornio.
          </li>
          <li>
            <a
              class="underline"
              href="https://unsplash.com/photos/a-close-up-of-a-light-brown-wood-grain-texture-0yfG1HXRN5U"
            >
              Colin Watts
            </a>{" "}
            — dettaglio di superficie lignea.
          </li>
          <li>
            <a
              class="underline"
              href="https://unsplash.com/photos/warm-sunlight-streams-across-a-wooden-cabinet-and-floor-CD-X0KwUNYU"
            >
              Tim Schmidbauer
            </a>{" "}
            — atmosfera di arredo.
          </li>
        </ul>
        <p class="mt-6 max-w-3xl text-xs leading-6 text-muted">
          Fotografie distribuite con{" "}
          <a class="underline" href="https://unsplash.com/license">
            Unsplash License
          </a>
          , servite da copie locali. Marchio, disegni dei manufatti e campioni
          grafici sono originali di questa demo.
        </p>
      </div>
    </section>
  </SectionIntro>
));
export const head = pageHead(
  "Contatti e informazioni sulla demo",
  "Conosci la bottega immaginaria Radice: domande di progetto, risposte sulla demo e crediti fotografici. Nessun recapito, messaggio o preventivo reale.",
);
