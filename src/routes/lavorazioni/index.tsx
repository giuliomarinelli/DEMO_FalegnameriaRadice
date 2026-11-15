import { component$ } from "@builder.io/qwik";
import ImgTools from "~/media/carving-tools.webp?jsx";
import ImgWorking from "~/media/woodworking.webp?jsx";
import { SectionIntro } from "../../components/section-intro/section-intro";
import { pageHead } from "../../lib/site";

export default component$(() => (
  <SectionIntro
    number="01"
    label="Lavorazioni"
    title="La misura giusta è la tua."
    description="Un arredo su misura comincia ben prima del taglio. Comincia da uno spazio da capire e da una domanda semplice: come lo userai?"
  >
    <section class="shell section-space" aria-labelledby="work-title">
      <div class="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <figure>
          <ImgTools
            alt="Utensili per intaglio disposti su una superficie di legno, con tracce e segni di lavorazione."
            class="h-[340px] w-full object-cover md:h-[460px]"
            loading="eager"
            sizes="(min-width: 1024px) 55vw, calc(100vw - 48px)"
          />
          <figcaption class="photo-credit">
            Il banco come punto di partenza. · Ispirazione: Dominik Scythe /
            Unsplash
          </figcaption>
        </figure>
        <div>
          <p class="eyebrow text-ink-copper">Tre famiglie, molte possibilità</p>
          <h2 id="work-title" class="section-title mt-5">
            Oggetti quotidiani.
            <br />
            Attenzioni particolari.
          </h2>
          <div class="mt-7 space-y-6">
            {[
              [
                "Tavoli e scrivanie",
                "Piani su cui lavorare o ritrovarsi. Ragioniamo su ingombro, spazio per le gambe, bordo e rapporto tra superficie e sostegni.",
              ],
              [
                "Librerie e contenitori",
                "Ripiani, vani e ante distribuiti intorno a ciò che devono accogliere. Profondità, ritmo e accessibilità guidano il disegno.",
              ],
              [
                "Piccoli arredi",
                "Mensole, panche e complementi per completare un angolo. Anche un pezzo piccolo richiede proporzioni e appoggi ben pensati.",
              ],
            ].map(([title, text]) => (
              <article key={title} class="border-t border-line pt-5">
                <h3 class="font-display text-2xl">{title}</h3>
                <p class="mt-2 text-sm leading-7 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section
      id="metodo"
      class="paper-grain border-y border-line bg-birch/40"
      aria-labelledby="method-title"
    >
      <div class="shell section-space">
        <p class="eyebrow text-ink-copper">
          Il metodo / Dall’ascolto al dettaglio
        </p>
        <h2 id="method-title" class="section-title mt-4">
          Quattro passaggi, un filo comune.
        </h2>
        <ol class="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Ascoltare",
              "Destinazione d’uso, abitudini e oggetti da ospitare. Prima della forma, serve capire il bisogno.",
            ],
            [
              "Rilevare",
              "Larghezza, altezza, profondità e passaggi. Le misure del mobile devono dialogare con quelle della stanza.",
            ],
            [
              "Disegnare",
              "Proporzioni, essenza, giunzioni e ferramenta. Le scelte si leggono insieme, non come opzioni isolate.",
            ],
            [
              "Rifinire",
              "Bordi, superfici e finitura. È il momento di osservare il pezzo da vicino e pensare a come verrà toccato.",
            ],
          ].map(([title, text], i) => (
            <li key={title} class="border-t border-line pt-5">
              <span class="font-display text-3xl italic text-ink-copper">
                0{i + 1}
              </span>
              <h3 class="mt-5 font-display text-2xl">{title}</h3>
              <p class="mt-3 text-sm leading-7 text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section
      id="dettagli"
      class="shell section-space"
      aria-labelledby="details-title"
    >
      <div class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p class="eyebrow text-ink-copper">Guardare da vicino</p>
          <h2 id="details-title" class="section-title mt-4">
            La cura sta
            <br />
            nei punti d’incontro.
          </h2>
          <dl class="mt-8 space-y-6">
            <div>
              <dt class="font-display text-2xl">La giunzione</dt>
              <dd class="mt-2 text-sm leading-7 text-muted">
                Un incastro mette in relazione due pezzi. Nei nostri studi
                raccontiamo tenoni, mortase e sedi fresate come scelte di
                progetto, senza trasformare il disegno in un esecutivo.
              </dd>
            </div>
            <div>
              <dt class="font-display text-2xl">Il bordo</dt>
              <dd class="mt-2 text-sm leading-7 text-muted">
                Uno smusso cambia il modo in cui una mano incontra il piano.
                Raggio e spessore si decidono in rapporto all’uso e al carattere
                dell’arredo.
              </dd>
            </div>
            <div>
              <dt class="font-display text-2xl">La superficie</dt>
              <dd class="mt-2 text-sm leading-7 text-muted">
                La finitura si osserva in luce radente e si confronta su un
                campione. Nome e colore sullo schermo non raccontano da soli il
                risultato.
              </dd>
            </div>
          </dl>
        </div>
        <figure>
          <ImgWorking
            alt="Rifinitura manuale della superficie curva di un elemento ligneo al tornio."
            class="h-[430px] w-full object-cover md:h-[580px]"
            loading="lazy"
            sizes="(min-width: 768px) 45vw, calc(100vw - 48px)"
          />
          <figcaption class="photo-credit">
            Il gesto della rifinitura. · Ispirazione: Elliott Ledain / Unsplash
          </figcaption>
        </figure>
      </div>
      <div class="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
        <p class="max-w-xl text-sm leading-7 text-muted">
          Quello descritto è il metodo immaginato per la demo. Non vengono
          accettate commesse o svolti sopralluoghi.
        </p>
        <a class="text-link" href="/portfolio/">
          Il metodo, nei manufatti <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  </SectionIntro>
));
export const head = pageHead(
  "Lavorazioni",
  "Tavoli, librerie e piccoli arredi: il metodo immaginato da Radice, dall’ascolto alle giunzioni e alle finiture. Falegnameria e lavorazioni dimostrative.",
);
