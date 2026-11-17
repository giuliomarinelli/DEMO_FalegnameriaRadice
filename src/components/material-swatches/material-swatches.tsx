import { component$ } from "@builder.io/qwik";
import { woods } from "../../lib/catalog";

export const MaterialSwatches = component$(() => (
  <div class="grid grid-cols-3 gap-3 md:gap-5">
    {woods.map((wood) => (
      <a href={`/materiali/#${wood.id}`} key={wood.id} class="material-tile">
        <div class={["wood-swatch", wood.className]} aria-hidden="true" />
        <span class="mt-4 flex flex-wrap justify-between gap-2 text-sm">
          <span>{wood.name}</span>
          <span class="text-copper" aria-hidden="true">
            ↗
          </span>
        </span>
      </a>
    ))}
  </div>
));
