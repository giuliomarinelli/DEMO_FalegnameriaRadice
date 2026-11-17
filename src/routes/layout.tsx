import { component$, Slot } from "@builder.io/qwik";
import { SiteHeader } from "../components/site-header/site-header";
import { SiteFooter } from "../components/site-footer/site-footer";

export default component$(() => (
  <>
    <a class="skip-link" href="#main-content">
      Salta al contenuto
    </a>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <Slot />
    </main>
    <SiteFooter />
  </>
));
