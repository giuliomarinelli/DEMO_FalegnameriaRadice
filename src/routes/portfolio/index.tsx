import { component$ } from "@builder.io/qwik";
import ImgWoodInterior from "~/media/wood-interior.webp?jsx";
import { SectionIntro } from "../../components/section-intro/section-intro";
import { pageHead } from "../../lib/site";

export default component$(() => (
  <SectionIntro
    number="02"
    label="Portfolio manufatti"
    title="Forme da cui partire."
    description="Uno spazio per raccogliere idee di arredo. La selezione dei progetti dimostrativi prenderà forma nella prossima fase del sito."
  >
    <div class="grid items-center gap-10 md:grid-cols-2">
      <figure>
        <ImgWoodInterior
          loading="lazy"
          sizes="(min-width: 768px) 50vw, calc(100vw - 48px)"
          alt="Dettaglio di una credenza curva in legno, illuminata dal sole."
          class="h-96 w-full object-cover object-[50%_45%]"
        />
        <figcaption class="mt-3 text-xs leading-6 text-muted">
          Ispirazione fotografica · Tim Schmidbauer / Unsplash.
          <br />
          Non è un manufatto realizzato da Radice.
        </figcaption>
      </figure>
      <div>
        <p class="eyebrow">Taccuino di bottega</p>
        <h2 class="mt-4 font-display text-4xl">
          Linee morbide,
          <br />
          materia in luce.
        </h2>
        <p class="mt-5 max-w-sm leading-7 text-muted">
          Un’immagine per raccontare la direzione: proporzioni essenziali,
          superfici da osservare e un legno che rimane protagonista.
        </p>
        <a href="/lavorazioni/" class="text-link mt-7 inline-flex">
          Scopri le lavorazioni <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </SectionIntro>
));
export const head = pageHead(
  "Portfolio manufatti",
  "Il taccuino di ispirazione della bottega immaginaria Radice. Struttura iniziale del portfolio, senza attribuire lavori reali alla demo.",
);
