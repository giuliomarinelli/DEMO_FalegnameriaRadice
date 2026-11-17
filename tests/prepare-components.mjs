// Compile the real Qwik components with the installed official optimizer.
// Only generated test-results files are written; the app build is unchanged.
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createOptimizer } from "@builder.io/qwik/optimizer";

const paths = [
  "components/furniture-configurator/furniture-configurator.tsx",
  "components/configuration-drawing/configuration-drawing.tsx",
];
const optimizer = await createOptimizer();
const result = optimizer.transformModulesSync({
  srcDir: resolve("src"),
  input: await Promise.all(
    paths.map(async (path) => ({
      path,
      code: await readFile(resolve("src", path), "utf8"),
    })),
  ),
  entryStrategy: { type: "inline" },
  mode: "dev",
  transpileTs: true,
  transpileJsx: true,
});
const errors = result.diagnostics.filter(
  (d) => d.category === "error" || d.category === "sourceError",
);
if (errors.length) throw new Error(errors.map((e) => e.message).join("\n"));
for (const module of result.modules) {
  const target = resolve("test-results/configurator", module.path);
  if (
    !target.startsWith(resolve("test-results/configurator") + "/") &&
    !target.startsWith(resolve("test-results/configurator") + "\\")
  )
    throw new Error("Unexpected optimizer output path");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, module.code);
}
