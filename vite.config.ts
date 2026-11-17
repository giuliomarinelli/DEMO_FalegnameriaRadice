import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    qwikCity(),
    qwikVite(),
    tailwindcss(),
    tsconfigPaths({ root: "." }),
  ],
  server: { host: "127.0.0.1" },
});
