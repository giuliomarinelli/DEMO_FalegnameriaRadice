import { component$ } from "@builder.io/qwik";
import { Brand } from "../brand/brand";
import { navigation } from "../../lib/site";

export const SiteFooter = component$(() => (
  <footer class="dark-surface bg-walnut text-birch">
    <div class="shell py-14 md:py-20">
      <div class="flex flex-wrap items-end justify-between gap-8 border-b border-birch/25 pb-12">
        <div>
          <p class="eyebrow text-birch/70">
            Una buona idea merita la sua misura
          </p>
          <p class="mt-5 max-w-2xl font-display text-4xl leading-tight md:text-6xl">
            Le cose fatte bene
            <br />
            si riconoscono da vicino.
          </p>
        </div>
        <a class="button-light" href="/configuratore/">
          Immagina il tuo arredo <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div class="mt-12 grid gap-10 md:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <Brand />
          <p class="mt-5 max-w-64 text-sm leading-7 text-birch/80">
            Legno, mani e attenzione.
            <br />
            Il nostro modo di pensare la casa.
          </p>
        </div>
        <nav
          aria-label="Navigazione a piè di pagina"
          class="grid grid-cols-2 gap-x-6 gap-y-4 self-start text-sm"
        >
          <a href="/">Home</a>
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="/configuratore/">Configuratore</a>
        </nav>
        <div>
          <p class="eyebrow text-birch/70">Un progetto dimostrativo</p>
          <p class="mt-4 text-sm leading-7 text-birch/80">
            Azienda, informazioni e operazioni sono simulate. Nessuna sede
            visitabile, vendita o comunicazione reale.
          </p>
        </div>
      </div>
      <div class="mt-12 flex flex-wrap justify-between gap-3 border-t border-birch/25 pt-6 text-xs text-birch/75">
        <span>© 2026 Falegnameria Radice · Demo</span>
        <a href="/contatti/#fotografie">Fotografie e crediti</a>
        <span>Progettare con cura. Abitare con carattere.</span>
      </div>
    </div>
  </footer>
));
