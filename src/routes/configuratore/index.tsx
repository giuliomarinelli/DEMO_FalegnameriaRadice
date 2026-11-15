import { component$ } from "@builder.io/qwik";
import { SectionIntro } from "../../components/section-intro/section-intro";
import { pageHead } from "../../lib/site";

export default component$(() => (
  <SectionIntro
    number="04"
    label="Configuratore"
    title="Un’idea, nelle tue misure."
    description="Qui prenderà forma il configuratore di arredi Radice: uno spazio per esplorare combinazioni e dimensioni, senza effettuare ordini."
  >
    <div class="border-l-2 border-clay bg-sand p-7 md:p-10">
      <p class="eyebrow">In preparazione</p>
      <h2 class="mt-4 font-display text-3xl">
        Il banco di progetto sta prendendo forma.
      </h2>
      <p class="mt-5 max-w-2xl leading-7 text-muted">
        Il configuratore non è ancora disponibile. In una fase successiva potrai
        scegliere tipologia, materiale, misure e finitura e leggere un prezzo
        puramente indicativo, con formula e riepilogo.
      </p>
      <p class="mt-4 max-w-2xl text-sm leading-7 text-muted">
        Nessun preventivo commerciale, invio di richieste o acquisto: anche la
        futura esperienza sarà interamente simulata.
      </p>
      <a href="/materiali/" class="text-link mt-7 inline-flex">
        Nel frattempo, scopri i materiali <span aria-hidden="true">↗</span>
      </a>
    </div>
  </SectionIntro>
));
export const head = pageHead(
  "Configuratore in preparazione",
  "Il futuro configuratore dimostrativo di Radice: arredi su misura e prezzi simulati, senza ordini. Funzionalità non ancora disponibile.",
);
