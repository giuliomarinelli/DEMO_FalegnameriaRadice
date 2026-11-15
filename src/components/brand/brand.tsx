import { component$ } from "@builder.io/qwik";

export const Brand = component$(() => (
  <a
    class="inline-flex items-center gap-3 text-current no-underline"
    href="/"
    aria-label="Falegnameria Radice — homepage"
  >
    <svg
      width="39"
      height="46"
      viewBox="0 0 42 48"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      aria-hidden="true"
    >
      <ellipse cx="21" cy="24" rx="19" ry="22" />
      <ellipse cx="21" cy="24" rx="12.5" ry="15.5" />
      <ellipse cx="21" cy="24" rx="6" ry="9" />
      <path d="M21 2v44" />
    </svg>
    <span>
      <span class="block text-[9px] tracking-[.23em] uppercase">
        Falegnameria
      </span>
      <span class="block font-display text-[32px] leading-none tracking-[.055em]">
        RADICE
      </span>
    </span>
  </a>
));
