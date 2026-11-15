import { component$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Brand } from "../brand/brand";
import { navigation } from "../../lib/site";

export const SiteHeader = component$(() => {
  const open = useSignal(false);
  const location = useLocation();
  return (
    <header class="border-b border-line">
      <div class="bg-forest px-5 py-2 text-center text-[11px] tracking-[.07em] text-paper">
        Un progetto dimostrativo. Azienda, informazioni e operazioni sono
        simulate.
      </div>
      <div class="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-6">
        <Brand />
        <button
          class="menu-toggle min-h-11 border border-forest px-4 text-sm"
          type="button"
          aria-expanded={open.value}
          aria-controls="primary-navigation"
          onClick$={() => {
            open.value = !open.value;
          }}
        >
          {open.value ? "Chiudi menu −" : "Menu +"}
        </button>
        <nav
          id="primary-navigation"
          aria-label="Navigazione principale"
          class={["primary-navigation", open.value && "is-open"]}
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={
                location.url.pathname === item.href ? "page" : undefined
              }
              onClick$={() => {
                open.value = false;
              }}
              class="nav-link"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/configuratore/"
            aria-current={
              location.url.pathname === "/configuratore/" ? "page" : undefined
            }
            onClick$={() => {
              open.value = false;
            }}
            class="nav-configurator"
          >
            Il tuo progetto <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
});
