import { component$ } from "@builder.io/qwik";
import ImgWoodInterior from "~/media/wood-interior.webp?jsx";
import { pageHead } from "../lib/site";

export default component$(() => (
  <>
    <section
      class="shell grid gap-10 pb-10 pt-12 md:grid-cols-[.95fr_1.05fr] md:gap-12 md:pb-16 md:pt-16 lg:gap-20"
      aria-labelledby="hero-title"
    >
      <div class="flex flex-col items-start justify-center py-3 md:py-8">
        <p class="eyebrow flex items-center gap-3">
          <span class="h-2 w-2 rounded-full bg-clay" /> Bottega di arredi su
          misura
        </p>
        <h1
          id="hero-title"
          class="mt-7 font-display text-[clamp(3.5rem,6.4vw,6.4rem)] leading-[.99] tracking-[-.045em]"
        >
          Il legno,
          <br />
          nella sua forma
          <br />
          <em class="font-normal text-clay">più tua.</em>
        </h1>
        <p class="mt-8 max-w-96 text-base leading-7 text-muted">
          Ogni casa ha le sue misure. Ogni legno, il suo carattere. Immaginiamo
          arredi che li facciano incontrare.
        </p>
        <a class="button-primary mt-8" href="/lavorazioni/">
          Entra in bottega <span aria-hidden="true">↗</span>
        </a>
        <div class="mt-12 flex items-center gap-4 text-xs text-muted">
          <span class="h-px w-10 bg-clay" />
          <span>Materia viva. Progetti personali.</span>
        </div>
      </div>
      <figure class="relative min-w-0">
        <div class="absolute left-5 top-5 z-10 border border-paper/70 bg-paper/95 px-3 py-2 text-[10px] tracking-[.16em] uppercase">
          Appunti di materia / 01
        </div>
        <ImgWoodInterior
          alt="La luce del sole rivela le venature di una credenza in legno dalle forme arrotondate."
          class="h-[440px] w-full object-cover object-[50%_48%] sm:h-[520px] md:h-[610px]"
          fetchPriority="high"
          loading="eager"
          sizes="(min-width: 1440px) 630px, (min-width: 768px) 48vw, calc(100vw - 48px)"
        />
        <figcaption class="flex flex-wrap justify-between gap-2 border-b border-line py-3 text-[11px] text-muted">
          <span>Legno, luce e linee essenziali.</span>
          <span>Fotografia di ispirazione · T. Schmidbauer</span>
        </figcaption>
      </figure>
    </section>

    <div class="border-y border-line">
      <div class="shell flex flex-wrap justify-between gap-x-8 gap-y-4 py-6 text-[11px] tracking-[.13em] uppercase">
        <span>01 — Pensato per il tuo spazio</span>
        <span>02 — La bellezza della materia</span>
        <span>03 — Cura in ogni dettaglio</span>
      </div>
    </div>

    <section class="shell py-16 md:py-24" aria-labelledby="craft-title">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow">Il nostro modo di fare</p>
          <h2
            id="craft-title"
            class="mt-4 font-display text-4xl leading-tight md:text-5xl"
          >
            Dall’idea, alla materia.
          </h2>
        </div>
        <a class="text-link" href="/portfolio/">
          Esplora i manufatti <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div class="mt-10 grid gap-0 border-t border-line md:grid-cols-3">
        {[
          {
            n: "01",
            title: "Arredi che abitano",
            text: "Librerie, tavoli e contenitori: proporzioni semplici, pensate intorno ai gesti di ogni giorno.",
            href: "/lavorazioni/",
            link: "Le lavorazioni",
          },
          {
            n: "02",
            title: "Venature da scegliere",
            text: "Il calore del rovere, la profondità del noce. L’identità di un arredo comincia dalla sua essenza.",
            href: "/materiali/",
            link: "Materiali e finiture",
          },
          {
            n: "03",
            title: "Spazio alle tue idee",
            text: "Un angolo da ripensare, una misura particolare. Il primo passo è immaginare una possibilità.",
            href: "/configuratore/",
            link: "Il futuro configuratore",
          },
        ].map((item) => (
          <article key={item.n} class="craft-card">
            <span class="font-display text-3xl italic text-clay">{item.n}</span>
            <h3 class="mt-8 font-display text-3xl">{item.title}</h3>
            <p class="mt-4 max-w-sm text-sm leading-7 text-muted">
              {item.text}
            </p>
            <a class="text-link mt-7 inline-flex" href={item.href}>
              {item.link} <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>

    <section class="bg-sand" aria-labelledby="material-title">
      <div class="shell grid items-center gap-10 py-14 md:grid-cols-2 md:gap-20 md:py-20">
        <div
          class="material-study"
          role="img"
          aria-label="Studio cromatico illustrativo: tre campioni nei toni del rovere, del noce e del frassino."
        >
          <span class="sample sample-oak">
            <span>01 / Rovere</span>
          </span>
          <span class="sample sample-walnut">
            <span>02 / Noce</span>
          </span>
          <span class="sample sample-ash">
            <span>03 / Frassino</span>
          </span>
        </div>
        <div>
          <p class="eyebrow">Nessuna venatura è uguale</p>
          <h2
            id="material-title"
            class="mt-5 font-display text-4xl leading-tight md:text-5xl"
          >
            La natura disegna.
            <br />
            Noi le diamo spazio.
          </h2>
          <p class="mt-6 max-w-md leading-7 text-muted">
            Nodi, sfumature, piccoli segni. Nel nostro racconto di bottega non
            sono imperfezioni da nascondere, ma il punto da cui partire.
          </p>
          <a class="text-link mt-7 inline-flex" href="/materiali/">
            Conosci la materia <span aria-hidden="true">↗</span>
          </a>
          <p class="mt-6 text-xs text-muted">
            Campioni illustrativi: colori e finiture non sono riferimenti
            commerciali.
          </p>
        </div>
      </div>
    </section>

    <section
      class="shell flex flex-wrap items-center justify-between gap-8 py-16 md:py-20"
      aria-labelledby="contact-title"
    >
      <div>
        <p class="eyebrow">Ogni progetto parte da un incontro</p>
        <h2 id="contact-title" class="mt-4 font-display text-4xl md:text-5xl">
          Facciamo spazio alle idee.
        </h2>
      </div>
      <a class="button-primary" href="/contatti/">
        La nostra bottega <span aria-hidden="true">↗</span>
      </a>
    </section>
  </>
));

export const head = pageHead(
  "Arredi su misura, materia e cura",
  "Entra nella bottega immaginaria di Radice: arredi su misura, legni e dettagli da scoprire. Sito dimostrativo, nessuna vendita o richiesta reale.",
);
