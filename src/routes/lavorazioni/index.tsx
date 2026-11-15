import { component$ } from "@builder.io/qwik";
import { SectionIntro } from "../../components/section-intro/section-intro";
import { pageHead } from "../../lib/site";

export default component$(() => (
  <SectionIntro
    number="01"
    label="Lavorazioni"
    title="La misura giusta è la tua."
    description="Un primo sguardo alle lavorazioni della nostra bottega immaginaria. Forme quotidiane, pensate per spazi personali."
  >
    <div class="grid gap-10 md:grid-cols-3">
      {[
        [
          "Tavoli e scrivanie",
          "Un piano per lavorare, condividere e ritrovarsi. Il progetto parte dallo spazio e dal modo di viverlo.",
        ],
        [
          "Librerie e contenitori",
          "Ritmi di pieni e vuoti, ripiani e ante: un posto per le cose che raccontano chi sei.",
        ],
        [
          "Piccoli arredi",
          "Panche, mensole e complementi. Anche una presenza discreta può cambiare una stanza.",
        ],
      ].map(([title, text]) => (
        <article key={title}>
          <h2 class="font-display text-3xl">{title}</h2>
          <p class="mt-4 text-sm leading-7 text-muted">{text}</p>
        </article>
      ))}
    </div>
    <a href="/materiali/" class="text-link mt-12 inline-flex">
      Il passo successivo: la materia <span aria-hidden="true">↗</span>
    </a>
  </SectionIntro>
));
export const head = pageHead(
  "Lavorazioni",
  "Tavoli, librerie e piccoli arredi: introduzione alle lavorazioni della falegnameria immaginaria Radice. Contenuti dimostrativi.",
);
