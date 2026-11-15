import { component$ } from "@builder.io/qwik";
import { SectionIntro } from "../../components/section-intro/section-intro";
import { pageHead } from "../../lib/site";

export default component$(() => (
  <SectionIntro
    number="03"
    label="Materiali e finiture"
    title="Prima di tutto, il legno."
    description="Ogni essenza suggerisce un carattere diverso. Questo è il primo foglio del nostro futuro quaderno di materiali e finiture."
  >
    <div class="grid gap-8 md:grid-cols-3">
      {[
        {
          name: "Rovere",
          tone: "bg-[#b68c5f]",
          text: "Toni caldi e venature riconoscibili. Un punto di partenza per ambienti dal carattere naturale.",
        },
        {
          name: "Noce",
          tone: "bg-[#684833]",
          text: "Sfumature profonde e un disegno espressivo. Una presenza capace di dare ritmo allo spazio.",
        },
        {
          name: "Frassino",
          tone: "bg-[#d6c5a4]",
          text: "Colori chiari e trame vivaci. Un’ispirazione per arredi luminosi e forme leggere.",
        },
      ].map((wood) => (
        <article key={wood.name}>
          <div aria-hidden="true" class={["mb-6 h-28", wood.tone]} />
          <h2 class="font-display text-3xl">{wood.name}</h2>
          <p class="mt-4 text-sm leading-7 text-muted">{wood.text}</p>
        </article>
      ))}
    </div>
    <p class="mt-10 max-w-2xl text-sm leading-7 text-muted">
      Le tinte mostrate sono campioni grafici illustrativi, non campioni fisici
      né una garanzia di resa. Il catalogo dimostrativo delle finiture sarà
      sviluppato nella fase dedicata ai contenuti.
    </p>
  </SectionIntro>
));
export const head = pageHead(
  "Materiali e finiture",
  "Rovere, noce e frassino: prime note sui materiali della bottega immaginaria Radice. Campioni grafici e informazioni dimostrative.",
);
