import assert from "node:assert/strict";
import { test } from "node:test";
import {
  calculateEstimate,
  changeProduct,
  configurationSummary,
  createDraft,
  evaluateDraft,
  products,
} from "../test-results/configurator/lib/configurator.js";

test("initial configuration has the documented independently calculated price", () => {
  const result = evaluateDraft(createDraft());
  assert.equal(result.valid, true);
  assert.deepEqual(result.estimate, {
    areaCm2: 18600,
    materialRate: 145,
    finishRate: 18,
    materialCents: 26970,
    labourCents: 18000,
    finishCents: 3348,
    totalCents: 48318,
  });
});

test("all product defaults, minima and maxima are valid", () => {
  for (const [id, product] of Object.entries(products)) {
    assert.equal(evaluateDraft(createDraft(id)).valid, true);
    for (const edge of ["min", "max"]) {
      const draft = createDraft(id);
      for (const key of ["width", "height", "depth"])
        draft[key] = String(product.limits[key][edge]);
      const result = evaluateDraft(draft);
      assert.equal(result.valid, true);
      assert.ok(Number.isSafeInteger(result.estimate.totalCents));
    }
  }
});

test("each dimensional boundary rejects the adjacent out-of-range value without a price", () => {
  for (const [id, product] of Object.entries(products)) {
    for (const key of ["width", "height", "depth"]) {
      for (const value of [
        product.limits[key].min - 1,
        product.limits[key].max + 1,
      ]) {
        const result = evaluateDraft({
          ...createDraft(id),
          [key]: String(value),
        });
        assert.equal(result.valid, false);
        assert.ok(result.errors[key]);
        assert.equal("estimate" in result, false);
      }
    }
  }
});

test("empty, decimal, partial, non-finite, exponent and unsafe inputs never produce a price", () => {
  for (const value of [
    "",
    " ",
    "-1",
    "180.5",
    "180.0",
    "1e2",
    "120px",
    "NaN",
    "Infinity",
    "9".repeat(50),
    "+180",
  ]) {
    const result = evaluateDraft({ ...createDraft(), width: value });
    assert.equal(result.valid, false, value);
    assert.ok(result.errors.width);
    assert.equal("estimate" in result, false);
  }
});

test("unrecognised and prototype option names are rejected", () => {
  for (const key of ["product", "material", "finish"]) {
    for (const value of ["", "unknown", "__proto__", "constructor"]) {
      const result = evaluateDraft({ ...createDraft(), [key]: value });
      assert.equal(result.valid, false);
      assert.ok(result.errors[key]);
    }
  }
});

test("changing product resets dimensions and preserves material and finish", () => {
  const draft = {
    ...createDraft(),
    width: "",
    material: "noce",
    finish: "olio-pigmentato",
  };
  const switched = changeProduct(draft, "shelf");
  assert.deepEqual(switched, {
    product: "shelf",
    material: "noce",
    finish: "olio-pigmentato",
    width: "96",
    height: "180",
    depth: "32",
  });
  assert.equal(evaluateDraft(switched).valid, true);
  assert.deepEqual(createDraft(), {
    product: "table",
    material: "rovere",
    finish: "olio-naturale",
    width: "180",
    height: "75",
    depth: "90",
  });
});

test("every product/material/finish combination has deterministic, reconciled cents", () => {
  for (const id of Object.keys(products))
    for (const material of ["rovere", "noce", "frassino"])
      for (const finish of [
        "olio-naturale",
        "trasparente-opaca",
        "olio-pigmentato",
      ]) {
        const result = evaluateDraft({ ...createDraft(id), material, finish });
        assert.equal(result.valid, true);
        const e = result.estimate;
        assert.equal(
          e.totalCents,
          e.materialCents + e.labourCents + e.finishCents,
        );
        assert.deepEqual(calculateEstimate(result.configuration), e);
      }
});

test("reference shelf and sideboard examples match independent area and rounding calculations", () => {
  const shelf = evaluateDraft({
    ...createDraft("shelf"),
    material: "frassino",
    finish: "trasparente-opaca",
  });
  assert.equal(shelf.estimate.areaCm2, 44160);
  assert.equal(shelf.estimate.totalCents, 88474); // 529.92 + 240 + 114.82
  const sideboard = evaluateDraft({
    ...createDraft("sideboard"),
    material: "noce",
    finish: "olio-pigmentato",
  });
  assert.equal(sideboard.estimate.areaCm2, 44952);
  assert.equal(sideboard.estimate.totalCents, 130041); // 876.56 + 280 + 143.85
});

test("every dimensional increase changes the estimate monotonically for each product", () => {
  for (const id of Object.keys(products)) {
    const draft = createDraft(id);
    const initial = evaluateDraft(draft).estimate.totalCents;
    for (const key of ["width", "height", "depth"])
      assert.ok(
        evaluateDraft({ ...draft, [key]: String(Number(draft[key]) + 1) })
          .estimate.totalCents > initial,
      );
  }
  assert.ok(
    evaluateDraft({ ...createDraft(), material: "noce" }).estimate.totalCents >
      evaluateDraft(createDraft()).estimate.totalCents,
  );
  assert.ok(
    evaluateDraft({ ...createDraft(), finish: "olio-pigmentato" }).estimate
      .totalCents > evaluateDraft(createDraft()).estimate.totalCents,
  );
});

test("the calculation entry point also rejects invalid numeric configurations", () => {
  const valid = evaluateDraft(createDraft()).configuration;
  for (const value of [NaN, Infinity, -1, 180.5, 241])
    assert.throws(
      () => calculateEstimate({ ...valid, width: value }),
      RangeError,
    );
});

test("copy text contains actual options, dimensions, factors, version and disclaimer", () => {
  const result = evaluateDraft({
    ...createDraft("sideboard"),
    material: "noce",
    finish: "olio-pigmentato",
  });
  const summary = configurationSummary(result.configuration);
  for (const text of [
    "radice-demo-v1",
    "Madia",
    "Noce",
    "Olio pigmentato",
    "160 × 42 × 78 cm",
    "4,4952 m²",
    "195 €/m²",
    "32 €/m²",
    "1.300,41",
    "non è un’offerta commerciale",
    "Nessun ordine o invio",
  ])
    assert.ok(summary.includes(text), text);
  const defaultResult = evaluateDraft(createDraft());
  assert.notEqual(configurationSummary(defaultResult.configuration), summary);
});
