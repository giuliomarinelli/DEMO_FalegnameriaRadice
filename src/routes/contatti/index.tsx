import { component$ } from "@builder.io/qwik";
import { SectionIntro } from "../../components/section-intro/section-intro";
import { pageHead } from "../../lib/site";

export default component$(() => (
  <SectionIntro
    number="05"
    label="Contatti"
    title="Una bottega da immaginare."
    description="Radice è un’azienda fittizia, creata per raccontare un’esperienza digitale dedicata all’artigianato e all’arredo su misura."
  >
    <div class="grid gap-12 md:grid-cols-2">
      <div>
        <p class="eyebrow">Trasparenza, prima di tutto</p>
        <h2 class="mt-4 font-display text-3xl">Questa porta è dimostrativa.</h2>
        <p class="mt-5 max-w-lg leading-8 text-muted">
          Non esistono una sede da visitare, orari di apertura, recapiti o un
          servizio clienti Radice. Nessun messaggio viene raccolto o inviato da
          questo sito.
        </p>
      </div>
      <div class="border border-line p-7">
        <h2 class="font-display text-3xl">Da dove cominciare?</h2>
        <p class="mt-4 leading-7 text-muted">
          Puoi esplorare la direzione della bottega attraverso le lavorazioni e
          le prime note sui materiali.
        </p>
        <a href="/lavorazioni/" class="text-link mt-7 inline-flex">
          Torna alle idee <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </SectionIntro>
));
export const head = pageHead(
  "Contatti e informazioni sulla demo",
  "Radice è una falegnameria fittizia: nessuna sede, recapito, raccolta di messaggi o comunicazione reale. Informazioni sul progetto dimostrativo.",
);
