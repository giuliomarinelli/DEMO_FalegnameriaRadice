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
          <p class="eyebrow text-ink-copper">Studio dimostrativo / Convivio</p>
          <h2 id="details-title" class="section-title mt-4">
            Dal passaggio
            <br />
            al bordo.
          </h2>
          <p class="body-copy mt-6">
            Immaginiamo Convivio in una zona pranzo raccolta: per raggiungere la
            finestra si passa accanto al lato corto del tavolo. È un vincolo
            ipotetico con cui leggere il concept, non una commessa realizzata.
          </p>
          <dl class="mt-8 space-y-6">
            <div>
              <dt class="font-display text-2xl">
                Il vincolo / Un lato di passaggio
              </dt>
              <dd class="mt-2 text-sm leading-7 text-muted">
                Quel lato non è un retro da nascondere: lo si incontra ogni
                giorno, anche da vicino. Il disegno rinuncia a cornici sporgenti
                e concentra l’attenzione sul profilo del piano.
              </dd>
            </div>
            <div>
              <dt class="font-display text-2xl">
                La scelta / Un bordo smussato
              </dt>
              <dd class="mt-2 text-sm leading-7 text-muted">
                Lo smusso già previsto per Convivio interrompe lo spigolo del
                piano. Le gambe arretrate lasciano leggere il bordo senza
                aggiungere elementi al suo ingombro: è una scelta di disegno,
                non una garanzia di spazio libero nella stanza.
              </dd>
            </div>
            <div>
              <dt class="font-display text-2xl">Il nodo / Gamba e traverso</dt>
              <dd class="mt-2 text-sm leading-7 text-muted">
                Sotto il piano, il tenone del traverso entra nella mortasa della
                gamba. Il nodo resta raccolto sotto la superficie, coerente con
                la giunzione descritta nel portfolio. Sedie, aperture e passaggi
                andrebbero verificati con un rilievo e un progetto esecutivo.
              </dd>
            </div>
          </dl>
        </div>
        <div class="space-y-6">
          <figure>
            <ImgWorking
              alt="Rifinitura manuale della superficie curva di un elemento ligneo al tornio."
              class="h-[320px] w-full object-cover md:h-[360px]"
              loading="lazy"
              sizes="(min-width: 768px) 45vw, calc(100vw - 48px)"
            />
            <figcaption class="photo-credit">
              Il gesto della rifinitura, non Convivio. · Ispirazione: Elliott
              Ledain / Unsplash
            </figcaption>
          </figure>
          <figure class="border border-line bg-birch/30 p-5">
            <p class="eyebrow text-ink-copper">
              Convivio / Appunto di costruzione
            </p>
            <svg
              viewBox="0 0 520 270"
              class="mt-4 block h-auto w-full text-walnut"
              role="img"
              aria-labelledby="convivio-detail-title convivio-detail-desc"
            >
              <title id="convivio-detail-title">
                Bordo e giunzione di Convivio
              </title>
              <desc id="convivio-detail-desc">
                Schema originale fuori scala: il piano ha un bordo smussato;
                sotto, il traverso è separato dalla gamba per mostrare il tenone
                e la mortasa in cui entrerebbe.
              </desc>
              <g stroke="currentColor" stroke-width="2" stroke-linejoin="round">
                <path d="M54 48H446L464 66V96H54Z" fill="#E9DCC5" />
                <path d="M54 66H464M446 48V66" fill="none" />
                <path d="M92 96H142V236H92Z" fill="#E9DCC5" />
                <path d="M124 134H142V160H124Z" fill="#38271D" />
                <path
                  d="M194 126H396V168H194V160H164V134H194Z"
                  fill="#E9DCC5"
                />
                <path d="M144 147H162" stroke-dasharray="4 4" fill="none" />
                <path d="M460 24V40L452 52M176 212V186L164 160" fill="none" />
              </g>
              <g fill="#8D4D2A" font-size="22" text-anchor="middle">
                <text x="460" y="21">
                  1
                </text>
                <text x="176" y="239">
                  2
                </text>
              </g>
            </svg>
            <figcaption class="text-sm leading-7 text-muted">
              <span class="font-semibold text-walnut">1. Bordo smussato.</span>{" "}
              <span class="font-semibold text-walnut">
                2. Tenone e mortasa.
              </span>{" "}
              Vista schematica esplosa, fuori scala: illustra un’idea, senza
              quote, verifiche strutturali o indicazioni di montaggio.
            </figcaption>
          </figure>
        </div>
      </div>
      <div class="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
        <p class="max-w-xl text-sm leading-7 text-muted">
          Quello descritto è il metodo immaginato per la demo. Non vengono
          accettate commesse o svolti sopralluoghi.
        </p>
        <a class="text-link" href="/portfolio/#convivio">
          Ritrova Convivio nel portfolio <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  </SectionIntro>
));
export const head = pageHead(
  "Lavorazioni",
  "Il metodo immaginato da Radice e il caso concettuale Convivio: dal passaggio nella stanza al bordo smussato e alla giunzione. Lavorazioni dimostrative.",
);
