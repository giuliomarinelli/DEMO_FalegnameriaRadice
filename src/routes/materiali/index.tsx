import { component$ } from "@builder.io/qwik";
import ImgGrain from "~/media/wood-grain.webp?jsx";
import { SectionIntro } from "../../components/section-intro/section-intro";
import { woods, finishes } from "../../lib/catalog";
import { pageHead } from "../../lib/site";

const woodPreferences: Record<(typeof woods)[number]["id"], string> = {
  noce: "Per un accento scuro, con una venatura che rimane protagonista.",
  rovere: "Per accostare toni miele e una trama evidente a forme semplici.",
  frassino: "Per un insieme chiaro, scandito dal disegno vivace delle fibre.",
};

const finishPreferences: Record<(typeof finishes)[number]["id"], string> = {
  "olio-naturale": "Per mettere al centro il tono caldo del legno.",
  "trasparente-opaca":
    "Per una lettura discreta della superficie, con luce morbida.",
  "olio-pigmentato":
    "Per un tono più pieno, mantenendo visibile il disegno delle fibre.",
};

export default component$(() => (
  <SectionIntro
    number="03"
    label="Materiali e finiture"
    title="Prima di tutto, il legno."
    description="Il colore è solo l’inizio. Guardiamo il disegno delle fibre, accostiamo le tavole, immaginiamo come cambierà la luce sulla superficie."
  >
    <section class="shell section-space" aria-labelledby="wood-title">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow text-ink-copper">Il campionario / Tre essenze</p>
          <h2 id="wood-title" class="section-title mt-4">
            Caratteri da accostare.
          </h2>
        </div>
        <p class="max-w-sm text-xs leading-6 text-muted">
          I campioni qui sotto sono illustrazioni grafiche. Nessuna tinta a
          schermo sostituisce un campione fisico.
        </p>
      </div>
      <div class="mt-10 grid gap-10 md:grid-cols-3">
        {woods.map((wood) => (
          <article key={wood.id} id={wood.id}>
            <div class={["wood-swatch", wood.className]} aria-hidden="true" />
            <p class="eyebrow mt-6 text-muted">Essenza / {wood.number}</p>
            <h3 class="mt-3 font-display text-4xl">{wood.name}</h3>
            <p class="mt-2 text-xs text-ink-copper">{wood.latin}</p>
            <p class="mt-5 text-sm leading-7 text-muted">{wood.description}</p>
            <p class="note mt-5">{wood.note}</p>
          </article>
        ))}
      </div>
    </section>

    <section
      class="dark-surface bg-walnut text-birch"
      aria-labelledby="grain-title"
    >
      <div class="shell grid items-center gap-10 py-14 md:grid-cols-2 md:gap-16">
        <figure>
          <ImgGrain
            alt="Fotografia ravvicinata di una superficie lignea chiara, con fibre e sfumature irregolari."
            class="h-[320px] w-full object-cover md:h-[400px]"
            loading="lazy"
            sizes="(min-width: 768px) 45vw, calc(100vw - 48px)"
          />
          <figcaption class="mt-3 text-[10px] leading-5 text-birch/75">
            Studio di superficie, essenza non identificata. · Colin Watts /
            Unsplash
          </figcaption>
        </figure>
        <div>
          <p class="eyebrow text-[#d99a72]">Da vicino, è un’altra storia</p>
          <h2 id="grain-title" class="section-title mt-5">
            La venatura
            <br />
            non si ripete.
          </h2>
          <p class="mt-6 text-sm leading-8 text-birch/85">
            Anche tra tavole della stessa essenza cambiano tono, disegno e
            presenza dei nodi. Nel progetto immaginato da Radice, l’accostamento
            dei pezzi è una scelta visiva prima ancora dell’assemblaggio.
          </p>
          <p class="mt-5 text-sm leading-8 text-birch/85">
            La fotografia è un’osservazione della materia, non la certificazione
            di un’essenza o un campione commerciale.
          </p>
        </div>
      </div>
    </section>

    <section
      id="finiture"
      class="shell section-space"
      aria-labelledby="finish-title"
    >
      <p class="eyebrow text-ink-copper">
        L’ultimo passaggio cambia la lettura
      </p>
      <h2 id="finish-title" class="section-title mt-4">
        Tre direzioni di finitura.
      </h2>
      <div class="mt-10 grid gap-8 md:grid-cols-3">
        {finishes.map((finish, i) => (
          <article key={finish.id} id={`finitura-${finish.id}`}>
            <div
              class={["h-24 border border-walnut/15", finish.className]}
              aria-hidden="true"
            />
            <p class="eyebrow mt-5 text-muted">Finitura / 0{i + 1}</p>
            <h3 class="mt-3 font-display text-3xl">{finish.name}</h3>
            <p class="mt-3 text-xs text-ink-copper">{finish.look}</p>
            <p class="mt-4 text-sm leading-7 text-muted">{finish.text}</p>
          </article>
        ))}
      </div>
      <p class="note mt-10">
        Finiture descritte a scopo dimostrativo: nessun marchio, ciclo
        applicativo o prestazione certificata. La compatibilità tra essenza,
        finitura e uso richiederebbe una verifica sul prodotto reale.
      </p>
    </section>

    <section class="shell pb-14 md:pb-22" aria-labelledby="comparison-title">
      <p class="eyebrow text-ink-copper">
        Un colpo d’occhio / Orientamento estetico
      </p>
      <h2 id="comparison-title" class="section-title mt-4">
        Confrontare, prima di scegliere.
      </h2>
      <p class="body-copy mt-6 max-w-3xl">
        Le stesse tre essenze e tre finiture del configuratore, lette per
        aspetto e preferenze visive. Nessuna graduatoria di qualità: il
        confronto riguarda il carattere che immagini per l’arredo.
      </p>
      <div class="mt-10 grid gap-10 lg:grid-cols-2">
        <table class="w-full table-fixed text-left text-sm leading-7">
          <caption class="pb-5 text-left font-display text-3xl text-walnut">
            Essenze / Tono e venatura
          </caption>
          <thead>
            <tr class="border-b border-walnut/30">
              <th scope="col" class="w-2/5 py-3 pr-4 font-semibold">
                Essenza
              </th>
              <th scope="col" class="py-3 font-semibold">
                Carattere e preferenza
              </th>
            </tr>
          </thead>
          <tbody>
            {woods.map((wood) => (
              <tr key={wood.id} class="border-b border-line align-top">
                <th scope="row" class="py-5 pr-4 font-semibold">
                  <a href={`#${wood.id}`} class="underline underline-offset-4">
                    {wood.name}
                  </a>
                </th>
                <td class="py-5 text-muted">
                  <p class="text-walnut">{wood.latin}</p>
                  <p class="mt-2">{woodPreferences[wood.id]}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table class="w-full table-fixed text-left text-sm leading-7">
          <caption class="pb-5 text-left font-display text-3xl text-walnut">
            Finiture / Lettura della superficie
          </caption>
          <thead>
            <tr class="border-b border-walnut/30">
              <th scope="col" class="w-2/5 py-3 pr-4 font-semibold">
                Finitura
              </th>
              <th scope="col" class="py-3 font-semibold">
                Aspetto e preferenza
              </th>
            </tr>
          </thead>
          <tbody>
            {finishes.map((finish) => (
              <tr key={finish.id} class="border-b border-line align-top">
                <th scope="row" class="py-5 pr-4 font-semibold">
                  <a
                    href={`#finitura-${finish.id}`}
                    class="underline underline-offset-4"
                  >
                    {finish.name}
                  </a>
                </th>
                <td class="py-5 text-muted">
                  <p class="text-walnut">{finish.look}</p>
                  <p class="mt-2">{finishPreferences[finish.id]}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p class="note mt-8">
        Tono e luce sono indicativi: essenza e finitura vanno osservate insieme
        su un campione fisico. Queste descrizioni non attestano resistenza,
        protezione o altre prestazioni del materiale.
      </p>
    </section>

    <section class="paper-grain border-y border-line bg-birch/40">
      <div class="shell grid gap-10 py-14 md:grid-cols-2">
        <div>
          <p class="eyebrow text-ink-copper">Abitare la materia</p>
          <h2 class="section-title mt-4">
            La cura comincia
            <br />
            dalle abitudini.
          </h2>
        </div>
        <div>
          <p class="body-copy">
            Nel nostro racconto di bottega, un arredo è pensato per restare
            nella vita quotidiana. Evitare ristagni d’acqua, proteggere il piano
            dagli oggetti molto caldi e usare un panno morbido sono attenzioni
            di buon senso; detergenti e manutenzione devono seguire le
            indicazioni della finitura effettiva.
          </p>
          <a class="text-link mt-5" href="/configuratore/">
            Prova essenze e finiture nel configuratore{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  </SectionIntro>
));
export const head = pageHead(
  "Materiali e finiture",
  "Noce, rovere e frassino a confronto: toni, venature e tre finiture del catalogo demo Radice. Orientamento estetico, campioni illustrativi e note sulla cura.",
);
