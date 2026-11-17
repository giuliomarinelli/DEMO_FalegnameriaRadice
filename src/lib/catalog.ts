export type FurnitureKind = "table" | "shelf" | "sideboard";

export const projects = [
  {
    id: "convivio",
    number: "01",
    name: "Convivio",
    kind: "table" as FurnitureKind,
    type: "Tavolo",
    wood: "Rovere",
    finish: "Olio naturale",
    dimensions: "180 × 90 × 75 cm",
    description:
      "Un piano generoso, quattro gambe arretrate e lo spazio per avvicinare una sedia in più. Un tavolo pensato per i giorni normali, prima che per le occasioni.",
    detail:
      "Bordo smussato, spessore visivo di 30 mm e traversi discreti sotto il piano.",
    joinery:
      "Nel concept, gambe e traversi si incontrano con un incastro a tenone e mortasa: la giunzione lavora senza diventare protagonista.",
    context:
      "Una zona pranzo raccolta, con luce laterale e passaggi liberi intorno al tavolo.",
  },
  {
    id: "intervallo",
    number: "02",
    name: "Intervallo",
    kind: "shelf" as FurnitureKind,
    type: "Libreria",
    wood: "Frassino",
    finish: "Trasparente opaca",
    dimensions: "96 × 32 × 180 cm",
    description:
      "Una sequenza di ripiani aperti, con un ritmo regolare che lascia respirare libri e oggetti. Una struttura chiara, da leggere anche quando è vuota.",
    detail:
      "Montanti continui, ripiani da 24 mm e profondità contenuta per uno studio o un soggiorno.",
    joinery:
      "I ripiani sono immaginati in sedi fresate nei montanti. Portate, stabilità e fissaggio a parete richiederebbero una verifica tecnica dedicata.",
    context:
      "Una parete dello studio, dove raccogliere volumi, quaderni e piccoli oggetti.",
  },
  {
    id: "sponda",
    number: "03",
    name: "Sponda",
    kind: "sideboard" as FurnitureKind,
    type: "Madia",
    wood: "Noce",
    finish: "Olio pigmentato",
    dimensions: "160 × 42 × 78 cm",
    description:
      "Un volume basso, due ante e una base leggermente rientrata. Il disegno della venatura attraversa il fronte e tiene insieme il mobile.",
    detail:
      "Presa ricavata nel bordo superiore, ante senza maniglie applicate e ripiano interno.",
    joinery:
      "La cassa del concept accosta fianchi e piano con una giunzione a battuta; ferramenta e tolleranze resterebbero da definire in esecutivo.",
    context:
      "Un ingresso ampio o una parete del soggiorno, per contenere senza appesantire.",
  },
] as const;

export type Project = (typeof projects)[number];

export const woods = [
  {
    id: "noce",
    number: "01",
    name: "Noce",
    latin: "Toni profondi / disegno mosso",
    className: "swatch-walnut",
    description:
      "Bruni caldi e passaggi di tono che danno profondità a un fronte o a un piano. Lo immaginiamo su madie e arredi che devono avere una presenza raccolta.",
    note: "Da osservare: continuità della venatura tra parti vicine.",
  },
  {
    id: "rovere",
    number: "02",
    name: "Rovere",
    latin: "Toni miele / trama evidente",
    className: "swatch-oak",
    description:
      "Una trama leggibile, con pori e segni che rimangono parte del progetto. È il punto di partenza del tavolo Convivio, dove la superficie invita all’uso quotidiano.",
    note: "Da osservare: nodi, poro e variazioni tra le tavole.",
  },
  {
    id: "frassino",
    number: "03",
    name: "Frassino",
    latin: "Toni chiari / linee vivaci",
    className: "swatch-ash",
    description:
      "Una materia luminosa, con un disegno che accompagna strutture leggere. Nel concept Intervallo, montanti e ripiani ne fanno emergere il ritmo.",
    note: "Da osservare: orientamento delle fibre e accostamento dei pezzi.",
  },
] as const;

export const finishes = [
  {
    id: "olio-naturale",
    name: "Olio naturale",
    look: "Caldo, vicino alla materia",
    className: "finish-natural",
    text: "Nel racconto della bottega è una finitura che accompagna il colore del legno e lascia percepire il disegno della superficie. Richiede una cura periodica da valutare sul prodotto effettivo.",
  },
  {
    id: "trasparente-opaca",
    name: "Trasparente opaca",
    look: "Discreta, dalla luce morbida",
    className: "finish-matte",
    text: "Una direzione per chi cerca una superficie visivamente uniforme e poco riflettente. Tono e protezione dipenderebbero dal ciclo di finitura scelto, non dal solo nome.",
  },
  {
    id: "olio-pigmentato",
    name: "Olio pigmentato",
    look: "Tono più pieno, venatura leggibile",
    className: "finish-pigmented",
    text: "Una possibilità per modulare il colore senza cancellare il carattere del legno. La resa andrebbe sempre confrontata su un campione dell’essenza scelta.",
  },
] as const;
