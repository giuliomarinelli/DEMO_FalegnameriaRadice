import { component$ } from "@builder.io/qwik";
import ImgTools from "~/media/carving-tools.webp?jsx";
import ImgWorking from "~/media/woodworking.webp?jsx";
import { pageHead } from "../lib/site";
import { projects } from "../lib/catalog";
import { ProjectCard } from "../components/project-card/project-card";
import { MaterialSwatches } from "../components/material-swatches/material-swatches";

export default component$(() => (
  <>
    <section
      class="dark-surface bg-walnut text-birch"
      aria-labelledby="hero-title"
    >
      <div class="shell hero-grid">
        <div class="hero-copy flex min-w-0 flex-col items-start justify-center">
          <p class="eyebrow flex items-center gap-3 text-birch/80">
            <span class="h-px w-8 bg-copper" /> Falegnameria di idee e materia
          </p>
          <h1 id="hero-title" class="hero-title mt-8 font-display">
            Il legno,
            <br />
            le mani,
            <br />
            <em class="font-normal text-[#d99a72]">la tua misura.</em>
          </h1>
          <p class="mt-7 max-w-sm text-sm leading-7 text-birch/80">
            Partiamo da uno spazio, ascoltiamo un’esigenza. Poi scegliamo il
            legno, disegniamo gli incastri e diamo una forma alle cose che
            userai ogni giorno.
          </p>
          <a class="button-light mt-8" href="/lavorazioni/">
            Scopri il lavoro di bottega <span aria-hidden="true">↗</span>
          </a>
          <p class="mt-8 text-[10px] tracking-[.12em] text-birch/65 uppercase">
            Materia viva / Progetti personali
          </p>
        </div>
        <figure class="hero-figure relative">
          <ImgTools
            class="hero-photo"
            alt="Sgorbie e scalpelli dal manico in legno appoggiati su un banco segnato dal lavoro."
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1440px) 670px, (min-width: 768px) 50vw, calc(100vw - 48px)"
          />
          <figcaption class="absolute bottom-0 left-0 right-0 bg-walnut/90 px-5 py-3 text-[10px] leading-5 text-birch/85">
            Sul banco, prima del progetto. · Foto di ispirazione: Dominik Scythe
            / Unsplash
          </figcaption>
        </figure>
      </div>
    </section>
    <div class="border-b border-line bg-birch">
      <div class="shell flex flex-wrap justify-between gap-x-8 gap-y-3 py-5 text-[10px] tracking-[.15em] uppercase">
        <span>01 / Essenze da conoscere</span>
        <span>02 / Dettagli da guardare</span>
        <span>03 / Misure da immaginare</span>
      </div>
    </div>

    <section class="shell section-space" aria-labelledby="atelier-title">
      <div class="grid gap-8 md:grid-cols-[.65fr_1.35fr]">
        <p class="eyebrow pt-2 text-ink-copper">La bottega Radice</p>
        <div>
          <h2 id="atelier-title" class="section-title max-w-3xl">
            Una forma che nasce
            <br />
            dal tuo modo di abitare.
          </h2>
          <div class="mt-7 grid gap-6 md:grid-cols-2">
            <p class="body-copy">
              Una nicchia che aspetta una libreria. Un tavolo su cui allargare i
              quaderni. Un ingresso da tenere in ordine. Ci interessano le cose
              concrete: ingombri, gesti, luce e abitudini.
            </p>
            <p class="body-copy">
              Radice immagina una falegnameria in cui progetto e banco di lavoro
              restano vicini. Poche forme, scelte con attenzione; giunzioni
              ragionate e finiture che lasciano parlare il legno.
            </p>
          </div>
          <a href="/lavorazioni/#metodo" class="text-link mt-6">
            Come prende forma un arredo <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>

    <section
      class="paper-grain border-y border-line bg-birch/35"
      aria-labelledby="projects-title"
    >
      <div class="shell section-space">
        <div class="flex flex-wrap items-end justify-between gap-7">
          <div>
            <p class="eyebrow text-ink-copper">
              Quaderno dei manufatti / Tre studi
            </p>
            <h2 id="projects-title" class="section-title mt-4">
              Pensati per essere vissuti.
            </h2>
          </div>
          <a href="/portfolio/" class="text-link">
            Apri il quaderno <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div class="mt-10 grid gap-10 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <p class="mt-8 text-xs leading-6 text-muted">
          Concept originali della demo. Disegni e misure illustrativi, non
          progetti esecutivi o lavori consegnati.
        </p>
      </div>
    </section>

    <section class="shell section-space" aria-labelledby="materials-title">
      <div class="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div>
          <p class="eyebrow text-ink-copper">La materia, prima del colore</p>
          <h2 id="materials-title" class="section-title mt-5">
            Ogni tavola ha
            <br />
            qualcosa da dire.
          </h2>
          <p class="body-copy mt-6 max-w-md">
            Noce, rovere, frassino. Tre caratteri diversi, da accostare alle
            proporzioni di un mobile e alla luce di una stanza. Il campione
            viene prima della decisione.
          </p>
          <a href="/materiali/" class="text-link mt-6">
            Sfoglia essenze e finiture <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div>
          <MaterialSwatches />
          <p class="mt-5 text-xs leading-6 text-muted">
            Campioni grafici indicativi. Venature e colori reali variano da
            tavola a tavola.
          </p>
        </div>
      </div>
    </section>

    <section
      class="dark-surface bg-walnut text-birch"
      aria-labelledby="detail-title"
    >
      <div class="shell grid items-center gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-16">
        <figure>
          <ImgWorking
            alt="Mani che rifiniscono con carta abrasiva un elemento in legno al tornio."
            class="h-[360px] w-full object-cover md:h-[460px]"
            loading="lazy"
            sizes="(min-width: 768px) 45vw, calc(100vw - 48px)"
          />
          <figcaption class="mt-3 text-[10px] leading-5 text-birch/70">
            Il gesto e la superficie. · Ispirazione: Elliott Ledain / Unsplash
          </figcaption>
        </figure>
        <div>
          <p class="eyebrow text-[#d99a72]">Ciò che fa la differenza</p>
          <h2 id="detail-title" class="section-title mt-5">
            Un bordo.
            <br />
            Un incastro.
            <br />
            Una passata in più.
          </h2>
          <p class="mt-6 max-w-md text-sm leading-8 text-birch/80">
            La qualità si cerca nei punti che una fotografia d’insieme lascia
            fuori. Nel modo in cui una mano incontra un bordo, nel rapporto tra
            un ripiano e il suo sostegno, nella superficie osservata in
            controluce.
          </p>
          <a href="/lavorazioni/#dettagli" class="button-light mt-7">
            Guarda più da vicino <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>

    <section class="shell section-space" aria-labelledby="future-title">
      <div class="grid gap-8 border-b border-line pb-12 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <p class="eyebrow text-ink-copper">Il tuo progetto / Configuratore</p>
          <h2 id="future-title" class="section-title mt-4">
            E se prendesse
            <br />
            le tue misure?
          </h2>
        </div>
        <div>
          <p class="body-copy">
            Un tavolo, una libreria o una madia. Un’essenza da sentire vicina,
            una finitura da osservare. Prova le misure e leggi una stima
            simulata con tutti i fattori di prezzo in chiaro.
          </p>
          <a class="button-primary mt-6" href="/configuratore/">
            Configura il tuo arredo <span aria-hidden="true">↗</span>
          </a>
          <p class="mt-4 text-xs leading-6 text-muted">
            Cifre inventate, nessuna offerta commerciale. Nessun ordine o invio.
          </p>
        </div>
      </div>
    </section>
  </>
));
export const head = pageHead(
  "Arredi su misura, materia e cura",
  "Legno, mani e misura: la bottega immaginaria Radice racconta arredi su misura, dettagli, essenze e finiture. Progetti e informazioni dimostrativi.",
);
