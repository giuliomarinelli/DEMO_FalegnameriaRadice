import { component$, Slot } from "@builder.io/qwik";

interface SectionIntroProps {
  number: string;
  label: string;
  title: string;
  description: string;
}

export const SectionIntro = component$<SectionIntroProps>((props) => (
  <div>
    <div class="page-heading paper-grain">
      <div class="shell py-12 md:py-20">
        <p class="eyebrow text-muted">
          Radice / {props.number} — {props.label}
        </p>
        <div class="mt-7 grid gap-7 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20">
          <h1 class="font-display text-[clamp(2.8rem,5.8vw,5.5rem)] leading-[1.04] tracking-[-.035em]">
            {props.title}
          </h1>
          <p class="max-w-xl leading-8 text-muted">{props.description}</p>
        </div>
      </div>
    </div>
    <Slot />
    <div class="shell py-8">
      <p class="border-t border-line pt-6 text-xs leading-6 text-muted">
        Radice è una bottega immaginaria. Manufatti, misure e lavorazioni
        descritti sono dimostrativi. Le fotografie sono riferimenti di
        atmosfera, non lavori o persone dell’azienda.
      </p>
    </div>
  </div>
));
