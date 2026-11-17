import { component$ } from "@builder.io/qwik";
import { pageHead } from "../lib/site";

export default component$(() => (
  <div class="shell py-24">
    <p class="eyebrow">404 / Fuori misura</p>
    <h1 class="mt-6 font-display text-5xl">Questa pagina non è in bottega.</h1>
    <p class="mt-6 text-muted">
      Il percorso richiesto non esiste. Riparti dalle idee e dalla materia.
    </p>
    <a class="button-primary mt-8" href="/">
      Torna alla homepage <span aria-hidden="true">↗</span>
    </a>
  </div>
));
export const head = pageHead(
  "Pagina non trovata",
  "Il percorso richiesto non esiste nella demo Falegnameria Radice. Torna alla homepage.",
);
