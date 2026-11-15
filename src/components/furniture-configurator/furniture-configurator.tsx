import {
  component$,
  useComputed$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { woods, finishes } from "../../lib/catalog.js";
import {
  changeProduct,
  configurationSummary,
  createDraft,
  dimensionLabels,
  DISCLAIMER,
  evaluateDraft,
  formatArea,
  formatMoney,
  materialRates,
  finishRates,
  isProductId,
  MODEL_VERSION,
  products,
  type Dimension,
  type ProductId,
} from "../../lib/configurator.js";
import { ConfigurationDrawing } from "../configuration-drawing/configuration-drawing.js";

export const FurnitureConfigurator = component$(() => {
  const draft = useStore(createDraft());
  const result = useComputed$(() => evaluateDraft(draft));
  const summary = useComputed$(() =>
    result.value.valid
      ? configurationSummary(result.value.configuration, result.value.estimate)
      : "",
  );
  const copyState = useSignal<"idle" | "copying" | "copied" | "manual">("idle");
  const copiedText = useSignal("");
  const copySequence = useSignal(0);
  const notice = useSignal("");
  const product =
    products[isProductId(draft.product) ? draft.product : "table"];

  return (
    <div class="shell section-space">
      <p class="note max-w-4xl">
        <strong class="text-walnut">Un esercizio di su misura.</strong> Le cifre
        e le tariffe sono inventate. Modifica le scelte per esplorare una stima
        simulata: nessun ordine, offerta commerciale o invio alla bottega.
      </p>
      <noscript>
        <style dangerouslySetInnerHTML=".config-controls, .config-actions { display: none !important; }" />
        <p class="note mt-6">
          Per modificare la configurazione serve JavaScript. Qui puoi leggere la
          configurazione iniziale, il prezzo dimostrativo e la formula già
          presenti nell’HTML.
        </p>
      </noscript>
      <div class="mt-10 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div class="config-controls space-y-9">
          <fieldset>
            <legend class="eyebrow text-ink-copper">
              01 / Scegli la forma
            </legend>
            <p class="mt-3 text-sm leading-7 text-muted" id="product-help">
              Cambiando tipologia ripristiniamo le misure di esempio. Essenza e
              finitura restano quelle scelte.
            </p>
            <div class="mt-5 grid gap-3 sm:grid-cols-3">
              {(Object.entries(products) as [ProductId, typeof product][]).map(
                ([id, item]) => (
                  <label
                    key={id}
                    class={[
                      "config-choice",
                      draft.product === id && "is-selected",
                    ]}
                  >
                    <input
                      type="radio"
                      name="furniture-kind"
                      value={id}
                      checked={draft.product === id}
                      aria-describedby="product-help"
                      onChange$={() => {
                        Object.assign(draft, changeProduct(draft, id));
                        copiedText.value = "";
                        notice.value = `Misure di esempio per ${item.name.toLowerCase()} ripristinate.`;
                      }}
                    />
                    <span class="block">
                      <span class="block font-display text-2xl">
                        {item.name}
                      </span>
                      <span class="mt-2 block text-xs leading-6 text-muted">
                        {item.description}
                      </span>
                    </span>
                  </label>
                ),
              )}
            </div>
          </fieldset>
          <fieldset>
            <legend class="eyebrow text-ink-copper">
              02 / Essenza e finitura
            </legend>
            <div class="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label for="config-material" class="config-label">
                  Essenza
                </label>
                <select
                  id="config-material"
                  value={draft.material}
                  class="config-input"
                  onChange$={(_, el) => {
                    draft.material = el.value;
                    copiedText.value = "";
                  }}
                >
                  {woods.map((wood) => (
                    <option
                      key={wood.id}
                      value={wood.id}
                      selected={wood.id === draft.material}
                    >
                      {wood.name}
                    </option>
                  ))}
                </select>
                <div
                  class={[
                    "mt-3 h-9 border border-walnut/15",
                    woods.find((wood) => wood.id === draft.material)?.className,
                  ]}
                  aria-hidden="true"
                />
              </div>
              <div>
                <label for="config-finish" class="config-label">
                  Finitura
                </label>
                <select
                  id="config-finish"
                  value={draft.finish}
                  class="config-input"
                  onChange$={(_, el) => {
                    draft.finish = el.value;
                    copiedText.value = "";
                  }}
                >
                  {finishes.map((finish) => (
                    <option
                      key={finish.id}
                      value={finish.id}
                      selected={finish.id === draft.finish}
                    >
                      {finish.name}
                    </option>
                  ))}
                </select>
                <p class="mt-3 text-xs leading-6 text-muted">
                  {finishes.find((finish) => finish.id === draft.finish)?.look}
                </p>
              </div>
            </div>
            <p class="mt-4 text-xs leading-6 text-muted">
              Campioni grafici indicativi. Le finiture sono combinazioni
              dimostrative, senza garanzia di resa o compatibilità fisica.{" "}
              <a class="underline" href="/materiali/">
                Apri il quaderno dei materiali.
              </a>
            </p>
          </fieldset>
          <fieldset>
            <legend class="eyebrow text-ink-copper">
              03 / Le tue misure, in centimetri
            </legend>
            <div class="mt-5 grid gap-5 sm:grid-cols-3">
              {(["width", "height", "depth"] as Dimension[]).map((key) => {
                const limits = product.limits[key];
                const error = !result.value.valid
                  ? result.value.errors[key]
                  : undefined;
                return (
                  <div key={key}>
                    <label for={`config-${key}`} class="config-label">
                      {dimensionLabels[key]} (cm)
                    </label>
                    <input
                      class="config-input"
                      id={`config-${key}`}
                      type="number"
                      inputMode="numeric"
                      min={limits.min}
                      max={limits.max}
                      step="1"
                      required
                      value={draft[key]}
                      aria-invalid={!!error}
                      aria-describedby={`config-${key}-help${error ? ` config-${key}-error` : ""}`}
                      onInput$={(_, el) => {
                        draft[key] = el.value;
                        copiedText.value = "";
                        notice.value = "";
                      }}
                    />
                    <p
                      id={`config-${key}-help`}
                      class="mt-2 text-xs leading-6 text-muted"
                    >
                      Da {limits.min} a {limits.max} cm · interi
                    </p>
                    {error && (
                      <p
                        id={`config-${key}-error`}
                        class="mt-1 text-xs leading-6 text-ink-copper"
                      >
                        {error}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <p class="mt-4 text-xs leading-6 text-muted">
              Intervalli della demo, non verifiche strutturali, di stabilità o
              di adattamento alla stanza. Una misura non valida sospende la
              stima, senza correzioni automatiche.
            </p>
          </fieldset>
          <div class="config-actions border-t border-line pt-6">
            <button
              class="button-secondary"
              type="button"
              onClick$={() => {
                Object.assign(draft, createDraft());
                copySequence.value++;
                copyState.value = "idle";
                copiedText.value = "";
                notice.value = "Configurazione iniziale ripristinata.";
              }}
            >
              Ripristina configurazione
            </button>
            <p class="mt-3 min-h-6 text-xs leading-6 text-muted" role="status">
              {notice.value}
            </p>
          </div>
        </div>

        <section
          class="min-w-0 border border-line bg-birch/35 p-5 md:p-7 lg:sticky lg:top-6"
          aria-labelledby="configuration-title"
        >
          <p class="eyebrow text-ink-copper">
            Il tuo taccuino / Riepilogo aggiornato
          </p>
          <h2 id="configuration-title" class="mt-4 font-display text-4xl">
            {product.name} su misura
          </h2>
          {result.value.valid ? (
            <>
              <ConfigurationDrawing
                configuration={result.value.configuration}
              />
              <dl class="fact-list">
                <div>
                  <dt>Essenza</dt>
                  <dd>
                    {woods.find((wood) => wood.id === draft.material)?.name}
                  </dd>
                </div>
                <div>
                  <dt>Finitura</dt>
                  <dd>
                    {
                      finishes.find((finish) => finish.id === draft.finish)
                        ?.name
                    }
                  </dd>
                </div>
                <div class="col-span-2">
                  <dt>Misure L × P × H</dt>
                  <dd data-testid="configuration-dimensions">
                    {result.value.configuration.width} ×{" "}
                    {result.value.configuration.depth} ×{" "}
                    {result.value.configuration.height} cm
                  </dd>
                </div>
              </dl>
              <div
                class="py-6"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                <p class="eyebrow text-muted">Stima indicativa simulata</p>
                <output
                  id="estimate-total"
                  class="mt-3 block break-words font-display text-4xl md:text-5xl"
                >
                  {formatMoney(result.value.estimate.totalCents)}
                </output>
              </div>
              <div class="border-t border-line pt-5">
                <h3 class="font-display text-2xl">Da cosa nasce la cifra</h3>
                <p class="mt-3 text-xs leading-6 text-muted">
                  Superficie equivalente:{" "}
                  <strong data-testid="equivalent-area">
                    {formatArea(result.value.estimate.areaCm2)} m²
                  </strong>
                  . È un parametro convenzionale della demo, non il legno
                  effettivamente necessario.
                </p>
                <dl class="mt-4 space-y-3 text-sm">
                  <div class="flex justify-between gap-4">
                    <dt>
                      Materiale{" "}
                      <span class="block text-xs text-muted">
                        {result.value.estimate.materialRate} €/m² × superficie
                      </span>
                    </dt>
                    <dd class="shrink-0" data-testid="material-cost">
                      {formatMoney(result.value.estimate.materialCents)}
                    </dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt>
                      Lavorazione{" "}
                      <span class="block text-xs text-muted">
                        Quota fissa per {product.name.toLowerCase()}
                      </span>
                    </dt>
                    <dd class="shrink-0" data-testid="labour-cost">
                      {formatMoney(result.value.estimate.labourCents)}
                    </dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt>
                      Finitura{" "}
                      <span class="block text-xs text-muted">
                        {result.value.estimate.finishRate} €/m² × superficie
                      </span>
                    </dt>
                    <dd class="shrink-0" data-testid="finish-cost">
                      {formatMoney(result.value.estimate.finishCents)}
                    </dd>
                  </div>
                </dl>
              </div>
            </>
          ) : (
            <div
              class="my-7 border-l-2 border-copper bg-paper p-5"
              role="status"
            >
              <h3 class="font-display text-2xl">
                Completa le misure per vedere la stima.
              </h3>
              <p class="mt-3 text-sm leading-7 text-muted">
                Controlla i campi segnalati: il prezzo e il disegno sono sospesi
                finché tutte le misure e le opzioni sono valide.
              </p>
            </div>
          )}
          <p class="mt-6 text-xs leading-6 text-muted">{DISCLAIMER}</p>
          <div class="config-actions mt-6">
            <button
              type="button"
              class="button-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!result.value.valid || copyState.value === "copying"}
              onClick$={async () => {
                if (!result.value.valid) return;
                const text = summary.value;
                const request = ++copySequence.value;
                copyState.value = "copying";
                try {
                  if (!navigator.clipboard?.writeText)
                    throw new Error("Clipboard non disponibile");
                  await navigator.clipboard.writeText(text);
                  if (request === copySequence.value) {
                    copiedText.value = text;
                    copyState.value = "copied";
                  }
                } catch {
                  if (request === copySequence.value)
                    copyState.value = "manual";
                }
              }}
            >
              {copyState.value === "copying"
                ? "Copia in corso…"
                : "Copia il riepilogo"}
              <span aria-hidden="true">↗</span>
            </button>
            <p class="mt-3 min-h-6 text-xs leading-6 text-muted" role="status">
              {copyState.value === "copied" &&
              copiedText.value === summary.value &&
              summary.value
                ? "Riepilogo copiato. Puoi conservarlo nei tuoi appunti."
                : copyState.value === "manual" && result.value.valid
                  ? "Copia automatica non disponibile. Puoi selezionare e copiare il testo qui sotto."
                  : ""}
            </p>
            {copyState.value === "manual" && result.value.valid && (
              <div>
                <label for="copy-summary" class="config-label">
                  Riepilogo da copiare manualmente
                </label>
                <textarea
                  id="copy-summary"
                  class="config-input text-xs leading-6"
                  readOnly
                  rows={12}
                  value={summary.value}
                  onFocus$={(_, el) => el.select()}
                />
              </div>
            )}
          </div>
        </section>
      </div>

      <section
        class="mt-12 border-t border-line pt-9"
        aria-labelledby="price-formula-title"
      >
        <p class="eyebrow text-ink-copper">Il modello, alla luce del sole</p>
        <h2 id="price-formula-title" class="mt-4 font-display text-3xl">
          Una cifra che puoi ricostruire.
        </h2>
        <p class="body-copy mt-5 max-w-4xl">
          Il totale somma materiale, lavorazione e finitura. La superficie
          equivalente cambia con la tipologia e con le misure; le tariffe sono
          inventate e uguali per tutti gli utenti. Nessun dato viene salvato o
          inviato.
        </p>
        <details class="faq-item mt-5">
          <summary>Formula, tariffe e assunzioni della demo</summary>
          <div class="mt-5 space-y-5 text-sm leading-7 text-muted">
            <p>
              <strong class="text-walnut">
                Totale = materiale + lavorazione + finitura.
              </strong>{" "}
              Materiale e finitura sono superficie equivalente in m² ×
              rispettiva tariffa €/m²; ogni voce è arrotondata al centesimo
              prima della somma.
            </p>
            <p>
              Con L = larghezza, P = profondità, H = altezza, tutte in
              centimetri:
            </p>
            <ul class="space-y-3">
              {Object.entries(products).map(([id, item]) => (
                <li key={id}>
                  <strong class="text-walnut">{item.name}:</strong> superficie ={" "}
                  {item.areaFormula} m²; lavorazione{" "}
                  {formatMoney(item.labourCents)}.
                </li>
              ))}
            </ul>
            <p>
              Il tavolo considera il piano e quattro fasce equivalenti da 8 cm
              per gli appoggi. La libreria considera due fianchi, cinque ripiani
              e uno schienale. La madia considera sei superfici equivalenti. Non
              sono distinte esecutive: spessori, sfridi, ferramenta e verifiche
              tecniche non sono modellati.
            </p>
            <div>
              <p>Tariffe inventate del materiale:</p>
              <ul>
                {woods.map((wood) => (
                  <li key={wood.id}>
                    {wood.name}: {materialRates[wood.id]} €/m².
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p>Tariffe inventate della finitura:</p>
              <ul>
                {finishes.map((finish) => (
                  <li key={finish.id}>
                    {finish.name}: {finishRates[finish.id]} €/m².
                  </li>
                ))}
              </ul>
            </div>
            <p>
              Modello {MODEL_VERSION}. Tutte le combinazioni di essenza e
              finitura sono ammesse soltanto per la simulazione.
            </p>
          </div>
        </details>
      </section>
    </div>
  );
});
