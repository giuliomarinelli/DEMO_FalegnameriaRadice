import { component$ } from "@builder.io/qwik";
import { SectionIntro } from "../../components/section-intro/section-intro";
import { MaterialSwatches } from "../../components/material-swatches/material-swatches";
import { FurnitureDrawing } from "../../components/furniture-drawing/furniture-drawing";
import { projects, finishes } from "../../lib/catalog";
import { pageHead } from "../../lib/site";

export default component$(() => (
  <SectionIntro
    number="04"
    label="Il tuo progetto"
    title="Un’idea, nelle tue misure."
    description="Il su misura è una conversazione tra forma, materia e spazio. Questo taccuino raccoglie le possibilità che troverai nel futuro configuratore."
  >
    <div class="shell pt-9">
      <p class="note">
        <strong class="font-semibold text-walnut">Anteprima visiva.</strong> Il
        configuratore non è ancora disponibile. Non puoi selezionare opzioni,
        calcolare prezzi o inviare richieste; qui puoi conoscere le direzioni
        del progetto.
      </p>
    </div>
    <section class="shell section-space" aria-labelledby="types-title">
      <p class="eyebrow text-ink-copper">01 / La forma</p>
      <h2 id="types-title" class="section-title mt-4">
        Da quale oggetto partiamo?
      </h2>
      <div class="mt-9 grid gap-7 md:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} class="border border-line">
            <div class="bg-birch/50">
              <FurnitureDrawing
                kind={project.kind}
                label={`Tipologia illustrativa: ${project.type.toLowerCase()}`}
              />
            </div>
            <div class="p-6">
              <h3 class="font-display text-3xl">{project.type}</h3>
              <p class="mt-3 text-sm leading-7 text-muted">{project.detail}</p>
              <a class="text-link mt-4" href={`/portfolio/#${project.id}`}>
                Lo studio {project.name} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
    <section class="paper-grain border-y border-line bg-birch/35">
      <div class="shell grid gap-10 py-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div>
          <p class="eyebrow text-ink-copper">02 / La materia</p>
          <h2 class="section-title mt-4">
            Un carattere
            <br />
            da scegliere.
          </h2>
          <p class="body-copy mt-5">
            Tre essenze per immaginare la presenza del mobile nella stanza. I
            campioni sono collegamenti al quaderno dei materiali, non controlli
            di selezione.
          </p>
        </div>
        <div>
          <MaterialSwatches />
          <p class="mt-5 text-xs leading-6 text-muted">
            Tinte grafiche indicative, senza corrispondenza garantita con un
            legno reale.
          </p>
        </div>
      </div>
    </section>
    <section class="shell section-space" aria-labelledby="measure-title">
      <div class="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div class="paper-grain border border-line bg-birch/40 p-5">
          <p class="eyebrow text-muted">Un esempio di proporzioni</p>
          <FurnitureDrawing
            kind="table"
            label="Schema del tavolo Convivio, con larghezza 180, profondità 90 e altezza 75 centimetri."
          />
          <p class="text-xs leading-6 text-muted">
            Misure del concept Convivio, non una configurazione selezionata.
          </p>
        </div>
        <div>
          <p class="eyebrow text-ink-copper">03 / Lo spazio</p>
          <h2 id="measure-title" class="section-title mt-4">
            Tre misure.
            <br />E tutto ciò che c’è intorno.
          </h2>
          <dl class="mt-7 space-y-5">
            <div>
              <dt class="font-display text-2xl">Larghezza</dt>
              <dd class="mt-1 text-sm leading-7 text-muted">
                Lo sviluppo del mobile lungo la parete o il piano di lavoro.
              </dd>
            </div>
            <div>
              <dt class="font-display text-2xl">Profondità</dt>
              <dd class="mt-1 text-sm leading-7 text-muted">
                Quanto spazio occupa davanti a sé, lasciando liberi passaggi e
                aperture.
              </dd>
            </div>
            <div>
              <dt class="font-display text-2xl">Altezza</dt>
              <dd class="mt-1 text-sm leading-7 text-muted">
                Il rapporto con il corpo, con gli oggetti da contenere e con il
                resto della stanza.
              </dd>
            </div>
          </dl>
          <p class="note mt-6">
            Il futuro configuratore userà intervalli vincolati. In questa
            anteprima non sono disponibili campi di misura o verifiche
            dimensionali.
          </p>
        </div>
      </div>
    </section>
    <section class="shell pb-14 md:pb-22" aria-labelledby="options-title">
      <p class="eyebrow text-ink-copper">04 / Il tocco finale</p>
      <h2 id="options-title" class="section-title mt-4">
        Come incontra la luce.
      </h2>
      <div class="mt-8 grid gap-7 md:grid-cols-3">
        {finishes.map((finish) => (
          <article key={finish.id} class="border-t border-line pt-5">
            <div class={["mb-5 h-16", finish.className]} aria-hidden="true" />
            <h3 class="font-display text-2xl">{finish.name}</h3>
            <p class="mt-3 text-sm leading-7 text-muted">{finish.look}</p>
          </article>
        ))}
      </div>
      <a class="text-link mt-7" href="/materiali/#finiture">
        Approfondisci le finiture <span aria-hidden="true">↗</span>
      </a>
    </section>
    <section class="dark-surface bg-walnut text-birch">
      <div class="shell grid gap-8 py-14 md:grid-cols-2 md:gap-16">
        <div>
          <p class="eyebrow text-[#d99a72]">
            Un prezzo da capire, non un ordine
          </p>
          <h2 class="section-title mt-4">
            Il prossimo passo
            <br />
            sarà trasparente.
          </h2>
        </div>
        <div>
          <p class="text-sm leading-8 text-birch/85">
            La futura esperienza mostrerà un prezzo simulato aggiornato alle
            scelte, con il dettaglio della formula e un riepilogo copiabile.
            Nessuna validità commerciale, nessun acquisto e nessun invio alla
            bottega.
          </p>
          <p class="mt-4 text-sm leading-8 text-birch/85">
            In questa pagina non vengono ancora eseguiti calcoli. Puoi
            continuare a esplorare i manufatti e riconoscere i dettagli che ti
            interessano.
          </p>
          <a class="button-light mt-6" href="/portfolio/">
            Torna al quaderno dei manufatti <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  </SectionIntro>
));
export const head = pageHead(
  "Configuratore in preparazione",
  "L’anteprima del futuro configuratore Radice: tavolo, libreria e madia, essenze, misure e finiture. Nessuna selezione, preventivazione o richiesta attiva.",
);
