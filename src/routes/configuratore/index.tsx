import { component$ } from "@builder.io/qwik";
import { SectionIntro } from "../../components/section-intro/section-intro";
import { FurnitureConfigurator } from "../../components/furniture-configurator/furniture-configurator";
import { pageHead } from "../../lib/site";

export default component$(() => (
  <SectionIntro
    number="04"
    label="Il tuo progetto"
    title="Un’idea, nelle tue misure."
    description="Scegli un arredo, avvicina un’essenza, prova le misure. Il taccuino Radice aggiorna il disegno, il riepilogo e una stima dimostrativa, con ogni voce in chiaro."
  >
    <FurnitureConfigurator />
  </SectionIntro>
));
export const head = pageHead(
  "Configuratore di arredi su misura",
  "Configura un tavolo, una libreria o una madia: essenze, finiture e misure vincolate, con stima simulata, fattori di prezzo e riepilogo copiabile. Nessun ordine.",
);
