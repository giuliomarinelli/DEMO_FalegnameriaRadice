import { woods, finishes, type FurnitureKind } from "./catalog.js";

export type ProductId = FurnitureKind;
export type MaterialId = (typeof woods)[number]["id"];
export type FinishId = (typeof finishes)[number]["id"];
export type Dimension = "width" | "height" | "depth";
export const dimensionLabels: Record<Dimension, string> = {
  width: "Larghezza",
  height: "Altezza",
  depth: "Profondità",
};

interface Range {
  min: number;
  max: number;
  initial: number;
}
interface Product {
  name: string;
  description: string;
  labourCents: number;
  limits: Record<Dimension, Range>;
  areaFormula: string;
}

export const products: Record<ProductId, Product> = {
  table: {
    name: "Tavolo",
    description: "Un piano da condividere, quattro appoggi.",
    labourCents: 18000,
    limits: {
      width: { min: 120, max: 240, initial: 180 },
      height: { min: 70, max: 80, initial: 75 },
      depth: { min: 60, max: 110, initial: 90 },
    },
    areaFormula: "(L × P + 4 × H × 8) / 10.000",
  },
  shelf: {
    name: "Libreria",
    description: "Ripiani aperti, spazio per libri e oggetti.",
    labourCents: 24000,
    limits: {
      width: { min: 50, max: 160, initial: 96 },
      height: { min: 80, max: 220, initial: 180 },
      depth: { min: 20, max: 50, initial: 32 },
    },
    areaFormula: "(2 × H × P + 5 × L × P + L × H) / 10.000",
  },
  sideboard: {
    name: "Madia",
    description: "Un volume basso, due ante e una base.",
    labourCents: 28000,
    limits: {
      width: { min: 80, max: 220, initial: 160 },
      height: { min: 50, max: 110, initial: 78 },
      depth: { min: 30, max: 60, initial: 42 },
    },
    areaFormula: "(2 × L × P + 2 × H × P + 2 × L × H) / 10.000",
  },
};

// Invented demo rates, in EUR per equivalent square metre. No market data.
export const materialRates: Record<MaterialId, number> = {
  noce: 195,
  rovere: 145,
  frassino: 120,
};
export const finishRates: Record<FinishId, number> = {
  "olio-naturale": 18,
  "trasparente-opaca": 26,
  "olio-pigmentato": 32,
};
export const MODEL_VERSION = "radice-demo-v1";
export const DISCLAIMER =
  "Stima inventata a scopo dimostrativo: non è un’offerta commerciale. Nessun ordine o invio. Imposte, trasporto, montaggio e accessori non sono inclusi nel modello.";

export interface Configuration {
  product: ProductId;
  material: MaterialId;
  finish: FinishId;
  width: number;
  height: number;
  depth: number;
}
export interface ConfiguratorDraft {
  product: string;
  material: string;
  finish: string;
  width: string;
  height: string;
  depth: string;
}
export interface Estimate {
  areaCm2: number;
  materialRate: number;
  finishRate: number;
  materialCents: number;
  labourCents: number;
  finishCents: number;
  totalCents: number;
}
export type ConfigurationResult =
  | { valid: true; configuration: Configuration; estimate: Estimate }
  | { valid: false; errors: Partial<Record<keyof ConfiguratorDraft, string>> };

export function isProductId(id: string): id is ProductId {
  return Object.hasOwn(products, id);
}

export function createDraft(product: ProductId = "table"): ConfiguratorDraft {
  if (!isProductId(product)) throw new RangeError("Tipologia non prevista");
  const { limits } = products[product];
  return {
    product,
    material: "rovere",
    finish: "olio-naturale",
    width: String(limits.width.initial),
    height: String(limits.height.initial),
    depth: String(limits.depth.initial),
  };
}

export function changeProduct(
  draft: ConfiguratorDraft,
  product: ProductId,
): ConfiguratorDraft {
  return {
    ...createDraft(product),
    material: draft.material,
    finish: draft.finish,
  };
}

export function evaluateDraft(draft: ConfiguratorDraft): ConfigurationResult {
  const errors: Partial<Record<keyof ConfiguratorDraft, string>> = {};
  if (!isProductId(draft.product))
    errors.product = "Scegli una tipologia prevista.";
  if (!Object.hasOwn(materialRates, draft.material))
    errors.material = "Scegli un’essenza prevista.";
  if (!Object.hasOwn(finishRates, draft.finish))
    errors.finish = "Scegli una finitura prevista.";
  const values = { width: 0, height: 0, depth: 0 };
  for (const key of ["width", "height", "depth"] as const) {
    const raw = draft[key].trim();
    const value = Number(raw);
    if (!/^\d+$/.test(raw) || !Number.isSafeInteger(value)) {
      errors[key] = "Inserisci centimetri interi, senza decimali.";
    } else if (isProductId(draft.product)) {
      const { min, max } = products[draft.product].limits[key];
      if (value < min || value > max)
        errors[key] = `Scegli una misura da ${min} a ${max} cm.`;
    }
    values[key] = value;
  }
  if (Object.keys(errors).length) return { valid: false, errors };
  const configuration: Configuration = {
    product: draft.product as ProductId,
    material: draft.material as MaterialId,
    finish: draft.finish as FinishId,
    ...values,
  };
  return {
    valid: true,
    configuration,
    estimate: calculateEstimate(configuration),
  };
}

export function calculateEstimate(config: Configuration): Estimate {
  if (
    !isProductId(config.product) ||
    !Object.hasOwn(materialRates, config.material) ||
    !Object.hasOwn(finishRates, config.finish)
  )
    throw new RangeError("Opzione non prevista");
  for (const key of ["width", "height", "depth"] as const) {
    const { min, max } = products[config.product].limits[key];
    if (
      !Number.isSafeInteger(config[key]) ||
      config[key] < min ||
      config[key] > max
    )
      throw new RangeError(`Misura ${key} non valida`);
  }
  const { width: l, height: h, depth: p } = config;
  const areaCm2 =
    config.product === "table"
      ? l * p + 4 * h * 8
      : config.product === "shelf"
        ? 2 * h * p + 5 * l * p + l * h
        : 2 * l * p + 2 * h * p + 2 * l * h;
  const materialRate = materialRates[config.material];
  const finishRate = finishRates[config.finish];
  // Round each monetary line to cents, then sum. Never round the area first.
  const materialCents = Math.round((areaCm2 * materialRate) / 100);
  const finishCents = Math.round((areaCm2 * finishRate) / 100);
  const labourCents = products[config.product].labourCents;
  return {
    areaCm2,
    materialRate,
    finishRate,
    materialCents,
    labourCents,
    finishCents,
    totalCents: materialCents + labourCents + finishCents,
  };
}

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    useGrouping: true,
  }).format(cents / 100);
}
export function formatArea(areaCm2: number): string {
  return new Intl.NumberFormat("it-IT", { maximumFractionDigits: 4 }).format(
    areaCm2 / 10000,
  );
}
export function configurationSummary(
  config: Configuration,
  estimate = calculateEstimate(config),
): string {
  const material = woods.find((wood) => wood.id === config.material)!.name;
  const finish = finishes.find((item) => item.id === config.finish)!.name;
  return [
    "FALEGNAMERIA RADICE — CONFIGURAZIONE DEMO",
    `Modello: ${MODEL_VERSION}`,
    `Tipologia: ${products[config.product].name}`,
    `Essenza: ${material}`,
    `Finitura: ${finish}`,
    `Misure L × P × H: ${config.width} × ${config.depth} × ${config.height} cm`,
    `Superficie equivalente: ${formatArea(estimate.areaCm2)} m²`,
    `Materiale: ${formatMoney(estimate.materialCents)} (${estimate.materialRate} €/m²)`,
    `Lavorazione: ${formatMoney(estimate.labourCents)}`,
    `Finitura: ${formatMoney(estimate.finishCents)} (${estimate.finishRate} €/m²)`,
    `Totale simulato: ${formatMoney(estimate.totalCents)}`,
    DISCLAIMER,
  ].join("\n");
}
