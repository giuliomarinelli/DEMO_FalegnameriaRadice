import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { qwikEslint9Plugin } from "eslint-plugin-qwik";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "server/**",
      "node_modules/**",
      ".wrangler/**",
      "test-results/**",
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      ...tseslint.configs.recommended,
      qwikEslint9Plugin.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
