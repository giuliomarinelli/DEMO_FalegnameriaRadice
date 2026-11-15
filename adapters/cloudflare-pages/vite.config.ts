import { cloudflarePagesAdapter } from "@builder.io/qwik-city/adapters/cloudflare-pages/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.cloudflare-pages.tsx", "@qwik-city-plan"],
      },
    },
    // Every public page is rendered at request time. No static page generation.
    // In Qwik City 1.20.4 `ssg: null` also skips Worker generation.
    // Exclude every public route while retaining the adapter's packaging step.
    plugins: [cloudflarePagesAdapter({ ssg: { include: [], exclude: ["*"] } })],
  };
});
