import { component$, Slot } from "@builder.io/qwik";

interface SectionIntroProps {
  number: string;
  label: string;
  title: string;
  description: string;
}

export const SectionIntro = component$<SectionIntroProps>((props) => (
  <div class="shell py-12 md:py-20">
    <a href="/" class="text-sm text-muted underline underline-offset-4">
      ← Torna alla bottega
    </a>
    <div class="mt-12 grid gap-8 border-b border-line pb-12 md:grid-cols-[1.5fr_1fr] md:items-end">
      <div>
        <p class="eyebrow">
          {props.number} / {props.label}
        </p>
        <h1 class="mt-6 max-w-3xl font-display text-5xl leading-[1.08] md:text-7xl">
          {props.title}
        </h1>
      </div>
      <p class="max-w-lg text-lg leading-8 text-muted">{props.description}</p>
    </div>
    <div class="py-12 md:py-16">
      <Slot />
    </div>
    <p class="border-t border-line pt-6 text-xs leading-6 text-muted">
      La bottega Radice è immaginaria. Testi e progetti sono dimostrativi; le
      fotografie sono immagini di ispirazione, non lavori dell’azienda.
    </p>
  </div>
));
