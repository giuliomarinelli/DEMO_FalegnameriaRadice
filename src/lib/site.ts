import type { DocumentHead } from "@builder.io/qwik-city";

export const navigation = [
  { href: "/lavorazioni/", label: "Lavorazioni" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/materiali/", label: "Materiali" },
  { href: "/contatti/", label: "Contatti" },
] as const;

export function pageHead(title: string, description: string): DocumentHead {
  return {
    title: `${title} | Falegnameria Radice — Demo`,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: `${title} | Falegnameria Radice` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "it_IT" },
    ],
  };
}

// Public build-time setting. No domain is invented for the unpublished demo.
const configuredOrigin = import.meta.env.VITE_SITE_ORIGIN as string | undefined;
export const siteOrigin = configuredOrigin
  ? new URL(configuredOrigin).origin
  : undefined;
