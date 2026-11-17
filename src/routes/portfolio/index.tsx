import { component$ } from "@builder.io/qwik";
import ImgInterior from "~/media/wood-interior.webp?jsx";
import { SectionIntro } from "../../components/section-intro/section-intro";
import { FurnitureDrawing } from "../../components/furniture-drawing/furniture-drawing";
import { projects } from "../../lib/catalog";
import { pageHead } from "../../lib/site";

export default component$(() => (
  <SectionIntro
    number="02"
    label="Portfolio manufatti"
    title="Forme da cui partire."
    description="Tre studi originali per tre modi di abitare. Un quaderno aperto su proporzioni, materiali e dettagli: non una vetrina di lavori realmente consegnati."
  >
    <div class="shell py-8">
      <nav
        aria-label="Indice dei manufatti"
        class="flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-6"
      >
        {projects.map((project) => (
          <a class="text-link" key={project.id} href={`#${project.id}`}>
            {project.number} / {project.name} <span aria-hidden="true">↓</span>
          </a>
        ))}
      </nav>
    </div>
    {projects.map((project) => (
      <section
        key={project.id}
        id={project.id}
        class="shell py-10 md:py-14"
        aria-labelledby={`${project.id}-title`}
      >
        <div class="grid gap-10 border-b border-line pb-12 lg:grid-cols-2 lg:gap-16">
          <div class="paper-grain self-start bg-birch/50 p-4 md:p-7">
            <p class="eyebrow text-muted">
              R / {project.number} — Disegno di studio
            </p>
            <FurnitureDrawing
              kind={project.kind}
              label={`Vista illustrativa del concept ${project.name}, ${project.type.toLowerCase()}`}
            />
            <p class="text-xs leading-6 text-muted">
              Misure in centimetri · schema illustrativo, non in scala
            </p>
          </div>
          <div>
            <p class="eyebrow text-ink-copper">
              {project.type} / Concept dimostrativo
            </p>
            <h2 id={`${project.id}-title`} class="section-title mt-4">
              {project.name}
            </h2>
            <p class="body-copy mt-5">{project.description}</p>
            <dl class="fact-list mt-7">
              <div>
                <dt>Essenza</dt>
                <dd>{project.wood}</dd>
              </div>
              <div>
                <dt>Finitura immaginata</dt>
                <dd>{project.finish}</dd>
              </div>
              <div class="col-span-2">
                <dt>Misure L × P × H</dt>
                <dd>{project.dimensions}</dd>
              </div>
            </dl>
            <h3 class="mt-7 font-display text-2xl">
              Il dettaglio da osservare
            </h3>
            <p class="mt-3 text-sm leading-7 text-muted">{project.detail}</p>
            <p class="mt-3 text-sm leading-7 text-muted">{project.joinery}</p>
            <p class="note mt-5">{project.context}</p>
          </div>
        </div>
      </section>
    ))}
    <section class="shell section-space" aria-labelledby="atmosphere-title">
      <div class="grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <figure>
          <ImgInterior
            alt="Luce calda su una credenza curva, con venatura del legno visibile."
            class="h-[440px] w-full object-cover object-[50%_45%]"
            loading="lazy"
            sizes="(min-width: 1024px) 40vw, calc(100vw - 48px)"
          />
          <figcaption class="photo-credit">
            Atmosfera e materia. · Tim Schmidbauer / Unsplash
          </figcaption>
        </figure>
        <div>
          <p class="eyebrow text-ink-copper">Un progetto aperto</p>
          <h2 id="atmosphere-title" class="section-title mt-5">
            La stessa idea.
            <br />
            Un’altra possibilità.
          </h2>
          <p class="body-copy mt-6">
            Un tavolo può diventare più raccolto, una libreria può seguire
            un’altra parete. Nei nostri studi, le misure servono a rendere
            concreta un’idea: non sono taglie obbligate né un listino.
          </p>
          <p class="mt-4 text-sm leading-7 text-muted">
            La fotografia accanto è un riferimento di atmosfera e non
            rappresenta Sponda o un altro progetto Radice. I tre manufatti sono
            raccontati dai disegni originali di questa pagina.
          </p>
          <a href="/configuratore/" class="button-primary mt-7">
            Prova il configuratore di arredi <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  </SectionIntro>
));
export const head = pageHead(
  "Portfolio manufatti",
  "Convivio, Intervallo e Sponda: tre concept dimostrativi Radice con disegni originali, misure, essenze, giunzioni e finiture. Nessun lavoro reale attribuito.",
);
