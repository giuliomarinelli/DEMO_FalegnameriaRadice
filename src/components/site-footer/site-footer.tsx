import { component$ } from "@builder.io/qwik";
import { Brand } from "../brand/brand";
import { navigation } from "../../lib/site";

export const SiteFooter = component$(() => (
  <footer class="bg-forest text-paper">
    <div class="shell grid gap-10 py-14 md:grid-cols-[1.1fr_1fr_1fr]">
      <div>
        <Brand />
        <p class="mt-5 max-w-64 text-sm leading-7 text-paper/80">
          Un modo di abitare più vicino alla materia. Un pezzo alla volta.
        </p>
      </div>
      <nav
        aria-label="Navigazione a piè di pagina"
        class="grid grid-cols-2 gap-x-6 gap-y-3 self-start text-sm"
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
        <p class="eyebrow text-paper/70">Una bottega immaginata</p>
        <p class="mt-4 text-sm leading-7 text-paper/80">
          Questo è un sito demo: nessuna sede visitabile, vendita, richiesta o
          comunicazione reale.
        </p>
      </div>
    </div>
    <div class="shell flex flex-wrap justify-between gap-3 border-t border-paper/25 py-5 text-xs text-paper/75">
      <span>© 2026 Radice · Progetto dimostrativo</span>
      <span>Materia, misura, cura.</span>
    </div>
  </footer>
));
