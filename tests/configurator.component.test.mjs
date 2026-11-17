import assert from "node:assert/strict";
import { test } from "node:test";
import { createDOM } from "@builder.io/qwik/testing";
import { jsx } from "@builder.io/qwik/jsx-runtime";
import { FurnitureConfigurator } from "../test-results/configurator/components/furniture-configurator/furniture-configurator.js";

async function setup() {
  const dom = await createDOM();
  await dom.render(jsx(FurnitureConfigurator, {}));
  const field = (name) => dom.screen.querySelector(`#config-${name}`);
  const edit = async (name, value, event = "input") => {
    field(name).value = value;
    await dom.userEvent(field(name), event);
  };
  const button = (text) =>
    Array.from(dom.screen.querySelectorAll("button")).find((el) =>
      el.textContent.includes(text),
    );
  const price = () => dom.screen.querySelector("#estimate-total")?.textContent;
  return { ...dom, field, edit, button, price };
}

test("Qwik reacts to dimension, material and finish edits with price and drawing", async () => {
  const { screen, field, edit, price } = await setup();
  assert.ok(
    field("material")
      .querySelector('option[value="rovere"]')
      .hasAttribute("selected"),
  );
  assert.match(price(), /483,18/);
  await edit("width", "200");
  assert.match(price(), /512,52/);
  assert.match(
    screen.querySelector('[data-testid="configuration-dimensions"]')
      .textContent,
    /200/,
  );
  assert.match(
    screen.querySelector("svg").getAttribute("aria-label"),
    /larghezza 200/,
  );
  await edit("width", "180");
  await edit("material", "noce", "change");
  await edit("finish", "olio-pigmentato", "change");
  assert.match(price(), /602,22/);
  assert.match(screen.querySelector("svg").getAttribute("aria-label"), /Noce/);
  assert.match(
    screen.querySelector('[data-testid="material-cost"]').textContent,
    /362,70/,
  );
  assert.match(
    screen.querySelector('[data-testid="finish-cost"]').textContent,
    /59,52/,
  );
});

test("changing product resets measures and limits while preserving options", async () => {
  const { screen, field, edit, userEvent } = await setup();
  await edit("material", "frassino", "change");
  await edit("finish", "trasparente-opaca", "change");
  for (const [id, width, height, depth, min, max] of [
    ["shelf", "96", "180", "32", "50", "160"],
    ["sideboard", "160", "78", "42", "80", "220"],
    ["table", "180", "75", "90", "120", "240"],
  ]) {
    await userEvent(screen.querySelector(`input[value="${id}"]`), "change");
    assert.equal(field("width").value, width);
    assert.equal(field("height").value, height);
    assert.equal(field("depth").value, depth);
    assert.equal(field("width").getAttribute("min"), min);
    assert.equal(field("width").getAttribute("max"), max);
    assert.equal(field("material").value, "frassino");
    assert.equal(field("finish").value, "trasparente-opaca");
  }
});

test("invalid input suspends price, diagram and copy; correction and reset recover", async () => {
  const { screen, field, edit, price, button, userEvent } = await setup();
  for (const value of ["", "119", "241", "180.5"]) {
    await edit("width", value);
    assert.equal(price(), undefined);
    assert.ok(!screen.querySelector("svg"));
    assert.equal(field("width").getAttribute("aria-invalid"), "true");
    assert.ok(screen.querySelector("#config-width-error"));
    assert.ok(button("Copia").disabled);
  }
  await edit("width", "200");
  assert.match(price(), /512,52/);
  assert.equal(field("width").getAttribute("aria-invalid"), "false");
  await edit("material", "noce", "change");
  await edit("finish", "olio-pigmentato", "change");
  await edit("height", "999");
  await userEvent(button("Ripristina"), "click");
  assert.match(price(), /483,18/);
  assert.equal(field("width").value, "180");
  assert.equal(field("height").value, "75");
  assert.equal(field("depth").value, "90");
  assert.ok(
    field("material")
      .querySelector('option[value="rovere"]')
      .hasAttribute("selected"),
  );
  assert.equal(field("finish").value, "olio-naturale");
  assert.ok(!screen.querySelector("#config-height-error"));
  assert.equal(button("Copia").disabled, false);
});

test("copy confirms only success, clears stale confirmation and offers manual fallback", async () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "navigator");
  let captured;
  const clipboard = {
    writeText: async (text) => {
      captured = text;
    },
  };
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { clipboard },
  });
  try {
    const { screen, edit, button, userEvent } = await setup();
    await userEvent(button("Copia"), "click");
    assert.match(captured, /radice-demo-v1/);
    assert.match(captured, /483,18/);
    assert.match(captured, /offerta commerciale/);
    assert.match(screen.textContent, /Riepilogo copiato/);
    await edit("width", "200");
    assert.doesNotMatch(screen.textContent, /Riepilogo copiato/);
    clipboard.writeText = async () => {
      throw new Error("Permission denied");
    };
    await userEvent(button("Copia"), "click");
    const fallback = screen.querySelector("#copy-summary");
    assert.ok(fallback.readOnly);
    assert.match(fallback.value, /512,52/);
    assert.match(screen.textContent, /Copia automatica non disponibile/);
    await userEvent(button("Ripristina"), "click");
    assert.ok(!screen.querySelector("#copy-summary"));
    assert.doesNotMatch(screen.textContent, /Riepilogo copiato/);
  } finally {
    if (original) Object.defineProperty(globalThis, "navigator", original);
    else delete globalThis.navigator;
  }
});
