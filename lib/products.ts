export type Size = "XS" | "S" | "M" | "L" | "XL";

export const SIZES: Size[] = ["XS", "S", "M", "L", "XL"];

export type CategorySlug = "tops" | "skirts" | "dresses";

export type Category = {
  slug: CategorySlug;
  label: string;
  blurb: string;
  /** Cover photograph for the category. */
  image: string;
};

export const categories: Category[] = [
  {
    slug: "tops",
    label: "Tops",
    blurb: "Soft knits, shirts and wraps for everyday layering.",
    image: "/images/dress-vienne.jpg",
  },
  {
    slug: "skirts",
    label: "Skirts",
    blurb: "Shapes that move with you — tiered, bias-cut and easy through the hip.",
    image: "/images/dress-solene.jpg",
  },
  {
    slug: "dresses",
    label: "Dresses",
    blurb: "Wraps, slips and midis for every kind of day.",
    image: "/images/hero-camel-wrap.jpg",
  },
];

/** Fabrics are shared between styles, so the care notes live in one place. */
const fabrics = {
  silkCrepe: {
    name: "Washed silk-crepe, 100% silk",
    care: "Cold hand wash, hang to dry, warm iron inside out",
  },
  charmeuse: {
    name: "Sandwashed silk charmeuse, 100% silk",
    care: "Dry clean, or cold hand wash with a great deal of care",
  },
  crepeDeChine: {
    name: "Silk crepe de chine, 100% silk",
    care: "Cold hand wash or dry clean, cool iron",
  },
  linen: {
    name: "Double-washed European linen, 100% linen",
    care: "Machine wash cool, line dry, make peace with the creases",
  },
  cottonVoile: {
    name: "Cotton voile, 100% cotton",
    care: "Machine wash cool, line dry",
  },
  eyelet: {
    name: "Cotton broderie anglaise, 100% cotton",
    care: "Machine wash cool, warm iron while slightly damp",
  },
  merino: {
    name: "Extra-fine merino, 92% merino / 8% elastane",
    care: "Cold hand wash, dry flat, never near a tumble dryer",
  },
  rib: {
    name: "Fine cotton rib, 95% cotton / 5% elastane",
    care: "Machine wash cool, dry flat",
  },
  twill: {
    name: "Cotton-silk twill, 70% cotton / 30% silk",
    care: "Machine wash cool, warm iron",
  },
  cupro: {
    name: "Cupro and linen, 60% cupro / 40% linen",
    care: "Machine wash cool, line dry",
  },
} satisfies Record<string, { name: string; care: string }>;

type FabricKey = keyof typeof fabrics;

export type Product = {
  slug: string;
  name: string;
  /** Shelf label — colour and cloth, in four or five words. */
  tagline: string;
  price: number;
  colour: string;
  category: CategorySlug;
  fabric: FabricKey;
  fit: string;
  length: string;
  images: { src: string; alt: string }[];
  /** Sizes on the rail. An empty list reads as sold out. */
  inStock: Size[];
  /** One or two short paragraphs, the way Agie would say them out loud. */
  story: string[];
  badge?: "new" | "loved";
};

const camel = {
  full: {
    src: "/images/hero-camel-wrap.jpg",
    alt: "Camel wrap dress with a tie waist, photographed in soft window light",
  },
  detail: {
    src: "/images/dress-marlowe-detail.jpg",
    alt: "Close detail of a softly knotted tie waist in camel silk-crepe",
  },
  seated: {
    src: "/images/dress-marlowe-seated.jpg",
    alt: "Back view of a camel wrap dress, seated beside a window",
  },
};

const linenSun = {
  src: "/images/dress-juniper.jpg",
  alt: "Cream washed-linen sundress with a square neckline",
};

const silkSlip = {
  src: "/images/dress-rosalind.jpg",
  alt: "Terracotta bias-cut silk slip dress catching the light",
};

const knitColumn = {
  src: "/images/dress-vienne.jpg",
  alt: "Espresso fine-knit column dress, back view",
};

const tiered = {
  src: "/images/dress-solene.jpg",
  alt: "Blush tiered cotton midi dress with short puffed sleeves",
};

const eyeletShirt = {
  src: "/images/dress-odette.jpg",
  alt: "Sand cotton eyelet shirtdress with a button front",
};

/**
 * Ordered so the same photograph never lands beside itself in the grid —
 * the rail reads as a mix of cloths and colours the way a real one would.
 */
export const products: Product[] = [
  {
    slug: "the-marlowe",
    name: "The Marlowe",
    tagline: "Camel silk-crepe wrap",
    price: 168,
    colour: "Warm camel",
    category: "dresses",
    fabric: "silkCrepe",
    fit: "True to size, wraps generously at the bust",
    length: "Midi — 118cm from shoulder on a size S",
    images: [camel.full, camel.detail, camel.seated],
    inStock: ["S", "M", "L", "XL"],
    story: [
      "This is the one I reach for when I have no idea what to wear. The crepe has a little weight to it, so it falls instead of clinging, and the tie lets you decide where your waist sits that morning.",
      "I kept the sleeves at three-quarter length on purpose — it's the length that looks deliberate with sandals in July and with boots in October.",
    ],
    badge: "loved",
  },
  {
    slug: "juniper",
    name: "Juniper",
    tagline: "Cream washed linen",
    price: 132,
    colour: "Undyed cream",
    category: "dresses",
    fabric: "linen",
    fit: "Relaxed through the waist and skirt",
    length: "Midi — 115cm from shoulder on a size S",
    images: [linenSun],
    inStock: ["XS", "S", "M", "L"],
    story: [
      "Juniper is the summer dress I wanted and couldn't find — square neck, real pockets, a skirt with enough fabric to move in.",
      "The linen is washed twice before it's cut, so it arrives already soft and only gets better from there.",
    ],
    badge: "loved",
  },
  {
    slug: "rosalind",
    name: "Rosalind",
    tagline: "Terracotta silk slip",
    price: 186,
    colour: "Muted terracotta",
    category: "dresses",
    fabric: "charmeuse",
    fit: "Skims the body — size up if you're between sizes",
    length: "Maxi — 138cm from shoulder on a size S",
    images: [silkSlip],
    inStock: ["XS", "S", "M"],
    story: [
      "Cut on the bias, which is the whole trick — it follows you instead of holding you in. The colour is a warm, dusty terracotta that suits far more skin tones than it has any right to.",
      "Wear it to the wedding, then wear it again with a chunky cardigan so it isn't sitting in your wardrobe waiting for an occasion.",
    ],
    badge: "loved",
  },
  {
    slug: "the-vienne",
    name: "The Vienne",
    tagline: "Espresso fine knit",
    price: 174,
    colour: "Deep espresso",
    category: "tops",
    fabric: "merino",
    fit: "Close — stretches comfortably, holds its shape",
    length: "Mid-calf — 124cm from shoulder on a size S",
    images: [knitColumn],
    inStock: ["S", "M", "L"],
    story: [
      "A fine merino knit that behaves like a second skin without any of the drama — no lining, no zip, nothing to fuss with.",
      "I wear mine under a long coat all winter and it still looks composed at the end of a very long day.",
    ],
  },
  {
    slug: "solene",
    name: "Solène",
    tagline: "Blush tiered cotton",
    price: 145,
    colour: "Soft blush",
    category: "skirts",
    fabric: "cottonVoile",
    fit: "Easy and forgiving through the body",
    length: "Midi — 112cm from shoulder on a size S",
    images: [tiered],
    inStock: ["XS", "S", "M", "L", "XL"],
    story: [
      "Three tiers, slightly puffed sleeves, and enough swing that you'll catch yourself spinning in it. The blush is warm rather than sweet — closer to sand at sunset than bubblegum.",
    ],
    badge: "loved",
  },
  {
    slug: "odette",
    name: "Odette",
    tagline: "Sand cotton eyelet",
    price: 154,
    colour: "Warm sand",
    category: "tops",
    fabric: "eyelet",
    fit: "Straight with a gathered skirt, room at the hip",
    length: "Midi — 116cm from shoulder on a size S",
    images: [eyeletShirt],
    inStock: ["S", "M", "L"],
    story: [
      "An eyelet shirtdress with the collar softened and the buttons swapped for warm horn — small changes, but they take it out of holiday territory.",
      "Belt it, leave it open over a slip, or wear it exactly as it comes.",
    ],
  },
  {
    slug: "clementine",
    name: "Clementine",
    tagline: "Cinnamon sash skirt",
    price: 152,
    colour: "Cinnamon",
    category: "skirts",
    fabric: "twill",
    fit: "Easy through the body, defined by the sash",
    length: "Midi — 117cm from shoulder on a size S",
    images: [camel.seated, camel.detail],
    inStock: ["XS", "S", "M", "L"],
    story: [
      "The twill has a dry, matte finish that makes cinnamon read grown-up rather than autumnal. Tie the sash at the front, the back, or not at all.",
    ],
    badge: "new",
  },
  {
    slug: "beatrix",
    name: "Beatrix",
    tagline: "Rust bias maxi",
    price: 192,
    colour: "Deep rust",
    category: "skirts",
    fabric: "charmeuse",
    fit: "Fluid and close — size up for a looser drape",
    length: "Maxi — 141cm from shoulder on a size S",
    images: [silkSlip],
    inStock: ["S", "M", "L"],
    story: [
      "Rosalind's darker sister. Same bias cut, deeper colour, and a slightly longer hem that pools a little at the back.",
    ],
  },
  {
    slug: "saoirse",
    name: "Saoirse",
    tagline: "Ivory linen sundress",
    price: 128,
    colour: "Soft ivory",
    category: "dresses",
    fabric: "linen",
    fit: "Roomy — take your usual size",
    length: "Midi — 114cm from shoulder on a size S",
    images: [linenSun],
    inStock: ["XS", "S", "M", "L", "XL"],
    story: [
      "For the last week of August, when you want to be wearing almost nothing but still leave the house. Deep pockets, no lining, nothing to iron.",
    ],
  },
  {
    slug: "isla",
    name: "Isla",
    tagline: "Cocoa rib column",
    price: 156,
    colour: "Cocoa",
    category: "tops",
    fabric: "rib",
    fit: "Close with plenty of give",
    length: "Mid-calf — 122cm from shoulder on a size S",
    images: [knitColumn],
    inStock: ["XS", "S", "M", "L"],
    story: [
      "A cotton rib that holds you gently and washes like a t-shirt. This is the dress I pack when I've left it too late to think about packing.",
    ],
    badge: "new",
  },
  {
    slug: "camille",
    name: "Camille",
    tagline: "Rose voile tiered midi",
    price: 138,
    colour: "Pale rose",
    category: "skirts",
    fabric: "cottonVoile",
    fit: "Loose through the body, gathered at the yoke",
    length: "Midi — 110cm from shoulder on a size S",
    images: [tiered],
    inStock: ["S", "M", "L"],
    story: [
      "Cotton voile is the reason this stays cool in a marquee in July. Two petticoat layers so the light doesn't go straight through.",
    ],
  },
  {
    slug: "elowen",
    name: "Elowen",
    tagline: "Toffee crepe wrap",
    price: 158,
    colour: "Toffee",
    category: "dresses",
    fabric: "crepeDeChine",
    fit: "True to size, adjustable at the waist",
    length: "Midi — 116cm from shoulder on a size S",
    images: [camel.full, camel.detail],
    inStock: ["XS", "S", "M", "L"],
    story: [
      "A lighter crepe than the Marlowe, so it moves more and creases less. Toffee sits somewhere between camel and caramel and goes with absolutely everything brown.",
    ],
  },
  {
    slug: "bea",
    name: "Bea",
    tagline: "Wheat eyelet shirt",
    price: 146,
    colour: "Wheat",
    category: "tops",
    fabric: "eyelet",
    fit: "Straight, with room to belt",
    length: "Midi — 115cm from shoulder on a size S",
    images: [eyeletShirt],
    inStock: ["XS", "S", "M"],
    story: [
      "The eyelet is a smaller, denser pattern than Odette's, which makes it easier to wear to work. Wooden buttons all the way down.",
    ],
  },
  {
    slug: "amara",
    name: "Amara",
    tagline: "Brick silk cowl",
    price: 198,
    colour: "Warm brick",
    category: "dresses",
    fabric: "charmeuse",
    fit: "Bias cut — close at the hip, fluid below",
    length: "Maxi — 140cm from shoulder on a size S",
    images: [silkSlip],
    inStock: ["XS", "S", "M", "L"],
    story: [
      "The cowl is weighted with a little extra fabric so it stays where you put it. I've worn this to three weddings and been asked about it at every one.",
    ],
    badge: "loved",
  },
  {
    slug: "thea",
    name: "Thea",
    tagline: "Chestnut long-sleeve wrap",
    price: 172,
    colour: "Chestnut",
    category: "dresses",
    fabric: "silkCrepe",
    fit: "True to size, full-length sleeves",
    length: "Midi — 119cm from shoulder on a size S",
    images: [camel.seated, camel.full],
    inStock: ["S", "M", "L", "XL"],
    story: [
      "Long sleeves and a deeper wrap, for the months when a midi dress needs a bit more help. Chestnut is the warmest brown I've managed to dye.",
    ],
  },
  {
    slug: "lisbon",
    name: "Lisbon",
    tagline: "Oat linen square-neck",
    price: 136,
    colour: "Oat",
    category: "dresses",
    fabric: "linen",
    fit: "Fitted bodice, generous skirt",
    length: "Midi — 113cm from shoulder on a size S",
    images: [linenSun],
    inStock: ["XS", "S", "M", "L"],
    story: [
      "Named after the trip where I finally sketched it. A little more shape through the bodice than Juniper, same unhurried skirt.",
    ],
    badge: "new",
  },
  {
    slug: "noor",
    name: "Noor",
    tagline: "Chocolate merino top",
    price: 182,
    colour: "Dark chocolate",
    category: "tops",
    fabric: "merino",
    fit: "Close, with a soft rolled neckline",
    length: "Mid-calf — 125cm from shoulder on a size S",
    images: [knitColumn],
    inStock: ["S", "M"],
    story: [
      "The knit is fine enough to layer under a blazer and warm enough to be the only thing you're wearing on a cold morning.",
    ],
  },
  {
    slug: "adelaide",
    name: "Adelaide",
    tagline: "Peach tiered skirt",
    price: 142,
    colour: "Warm peach",
    category: "skirts",
    fabric: "cottonVoile",
    fit: "Easy — gathers below the bust",
    length: "Midi — 111cm from shoulder on a size S",
    images: [tiered],
    inStock: ["XS", "S", "L", "XL"],
    story: [
      "The sleeves are puffed but not theatrical — enough to feel like an occasion, not enough to knock over a glass.",
    ],
  },
  {
    slug: "delphine",
    name: "Delphine",
    tagline: "Camel sash midi",
    price: 162,
    colour: "Camel",
    category: "dresses",
    fabric: "silkCrepe",
    fit: "True to size, sash ties where you like",
    length: "Midi — 118cm from shoulder on a size S",
    images: [camel.detail, camel.full],
    inStock: ["S", "M", "L"],
    story: [
      "All the interest is at the waist — a long sash you can knot, loop or leave trailing. Plain everywhere else on purpose.",
    ],
  },
  {
    slug: "florence",
    name: "Florence",
    tagline: "Straw broderie midi",
    price: 158,
    colour: "Straw",
    category: "tops",
    fabric: "eyelet",
    fit: "Straight with a gathered skirt",
    length: "Midi — 117cm from shoulder on a size S",
    images: [eyeletShirt],
    inStock: [],
    story: [
      "Sold out, and I'm afraid this one isn't coming back — the broderie was the end of a roll. Bea is the closest thing I make now.",
    ],
  },
  {
    slug: "seville",
    name: "Seville",
    tagline: "Copper charmeuse column",
    price: 205,
    colour: "Burnished copper",
    category: "skirts",
    fabric: "charmeuse",
    fit: "Narrow — cut long and lean",
    length: "Maxi — 143cm from shoulder on a size S",
    images: [silkSlip],
    inStock: ["XS", "S"],
    story: [
      "The most expensive cloth I buy, and worth every penny for the way copper behaves under warm light. There are only twenty of these.",
    ],
    badge: "new",
  },
  {
    slug: "nadia",
    name: "Nadia",
    tagline: "Caramel wrap midi",
    price: 164,
    colour: "Caramel",
    category: "dresses",
    fabric: "cupro",
    fit: "True to size, softly draped",
    length: "Midi — 116cm from shoulder on a size S",
    images: [camel.full, camel.seated],
    inStock: ["XS", "S", "M", "L", "XL"],
    story: [
      "Cupro drapes like silk and forgives like linen, which makes this the most practical wrap dress on the rail.",
    ],
  },
  {
    slug: "lark",
    name: "Lark",
    tagline: "Shell pink cotton top",
    price: 134,
    colour: "Shell pink",
    category: "tops",
    fabric: "cottonVoile",
    fit: "Relaxed throughout",
    length: "Midi — 109cm from shoulder on a size S",
    images: [tiered],
    inStock: ["S", "M", "L", "XL"],
    story: [
      "The quietest pink I could find — barely there in daylight, warmer under lamps. Good with bare legs and battered flats.",
    ],
  },
  {
    slug: "verity",
    name: "Verity",
    tagline: "Walnut knit top",
    price: 168,
    colour: "Walnut",
    category: "tops",
    fabric: "merino",
    fit: "Close, longer sleeve",
    length: "Mid-calf — 126cm from shoulder on a size S",
    images: [knitColumn],
    inStock: ["M", "L", "XL"],
    story: [
      "A knit dress that can go out in the evening: slightly deeper neckline, slightly longer skirt, and a sheen to the yarn.",
    ],
  },
  {
    slug: "marisol",
    name: "Marisol",
    tagline: "Chalk cotton sundress",
    price: 124,
    colour: "Chalk",
    category: "dresses",
    fabric: "linen",
    fit: "Loose and cool",
    length: "Midi — 112cm from shoulder on a size S",
    images: [linenSun],
    inStock: ["XS", "S", "M", "L"],
    story: [
      "The lightest thing I make. Chalk is a warm off-white, so it doesn't fight with brown skin or wash out pale skin.",
    ],
  },
  {
    slug: "ottoline",
    name: "Ottoline",
    tagline: "Amber knotted wrap",
    price: 174,
    colour: "Amber",
    category: "dresses",
    fabric: "crepeDeChine",
    fit: "True to size, deep wrap front",
    length: "Midi — 120cm from shoulder on a size S",
    images: [camel.detail, camel.seated],
    inStock: ["S", "M", "L"],
    story: [
      "Amber silk with a hand-knotted waist. It looks considerably more complicated to wear than it is.",
    ],
  },
  {
    slug: "primrose",
    name: "Primrose",
    tagline: "Dusty pink tiered maxi",
    price: 156,
    colour: "Dusty pink",
    category: "skirts",
    fabric: "cottonVoile",
    fit: "Easy through the body, long skirt",
    length: "Maxi — 134cm from shoulder on a size S",
    images: [tiered],
    inStock: ["XS", "S", "M", "L"],
    story: [
      "A longer, quieter version of Solène for the weddings that ask you to make an effort. Four tiers instead of three.",
    ],
  },
  {
    slug: "hazel",
    name: "Hazel",
    tagline: "Honey twill wrap",
    price: 142,
    colour: "Honey",
    category: "tops",
    fabric: "twill",
    fit: "True to size, crisp rather than fluid",
    length: "Midi — 115cm from shoulder on a size S",
    images: [camel.full, camel.detail],
    inStock: ["XS", "S", "M", "L"],
    story: [
      "Twill holds a shape, so this is the wrap dress for days you want to look like you've made a decision.",
    ],
  },
  {
    slug: "aurelie",
    name: "Aurélie",
    tagline: "Biscuit eyelet blouse",
    price: 149,
    colour: "Biscuit",
    category: "tops",
    fabric: "eyelet",
    fit: "Fitted bodice, full skirt",
    length: "Midi — 114cm from shoulder on a size S",
    images: [eyeletShirt],
    inStock: ["S", "M", "L"],
    story: [
      "Eyelet reads a little formal in biscuit rather than white, which makes it an easy thing to wear to a summer registry office.",
    ],
  },
  {
    slug: "flora",
    name: "Flora",
    tagline: "Clay bias slip",
    price: 176,
    colour: "Pale clay",
    category: "skirts",
    fabric: "charmeuse",
    fit: "Bias cut, close through the hip",
    length: "Maxi — 137cm from shoulder on a size S",
    images: [silkSlip],
    inStock: ["XS", "S", "M", "L"],
    story: [
      "Clay is the colour I get asked for most — a soft, dusty neutral that photographs beautifully in daylight.",
    ],
  },
  {
    slug: "juno",
    name: "Juno",
    tagline: "Bronze silk wrap",
    price: 186,
    colour: "Bronze",
    category: "skirts",
    fabric: "silkCrepe",
    fit: "True to size, deep V wrap",
    length: "Midi — 121cm from shoulder on a size S",
    images: [camel.full, camel.seated],
    inStock: [],
    story: [
      "Sold out for now. Bronze silk-crepe comes back every autumn, so put your name down and I'll write to you first.",
    ],
  },
  {
    slug: "corinne",
    name: "Corinne",
    tagline: "Bone linen slip dress",
    price: 148,
    colour: "Bone",
    category: "dresses",
    fabric: "linen",
    fit: "Straight and narrow, bias-cut skirt",
    length: "Midi — 118cm from shoulder on a size S",
    images: [linenSun],
    inStock: ["S", "M", "L"],
    story: [
      "A linen slip, fully lined, for the wedding in the garden where silk would be too much. Bone is warmer than white.",
    ],
    badge: "new",
  },
  {
    slug: "margot",
    name: "Margot",
    tagline: "Tobacco crepe midi",
    price: 178,
    colour: "Tobacco",
    category: "skirts",
    fabric: "silkCrepe",
    fit: "True to size, softly bloused above the waist",
    length: "Midi — 120cm from shoulder on a size S",
    images: [camel.seated, camel.detail],
    inStock: ["XS", "S", "M", "L"],
    story: [
      "Tobacco is a smoky brown that behaves like a neutral after dark. The back is the best part, so wear your hair up.",
    ],
    badge: "new",
  },
  {
    slug: "wren",
    name: "Wren",
    tagline: "Ochre linen wrap",
    price: 138,
    colour: "Soft ochre",
    category: "dresses",
    fabric: "linen",
    fit: "Relaxed, ties at the side",
    length: "Midi — 116cm from shoulder on a size S",
    images: [camel.seated],
    inStock: ["XS", "S", "M", "L", "XL"],
    story: [
      "A linen wrap for the in-between weeks in spring. Ochre sounds bolder than it looks — it's closer to weak tea.",
    ],
  },
];

/** The dress featured in the home hero. */
export const heroProduct = products[0];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function byCategory(slug: CategorySlug): Product[] {
  return products.filter((product) => product.category === slug);
}

export function newIn(count = 6): Product[] {
  return products.filter((product) => product.badge === "new").slice(0, count);
}

export function mostLoved(count = 4): Product[] {
  return products.filter((product) => product.badge === "loved").slice(0, count);
}

/** Same category where possible, and never the same photograph twice. */
export function getRelated(product: Product, count = 3): Product[] {
  const seen = new Set([product.images[0].src]);
  const picked: Product[] = [];

  for (const candidate of [...byCategory(product.category), ...products]) {
    if (picked.length === count) break;
    if (candidate.slug === product.slug) continue;
    if (picked.some((item) => item.slug === candidate.slug)) continue;
    if (seen.has(candidate.images[0].src)) continue;

    seen.add(candidate.images[0].src);
    picked.push(candidate);
  }

  return picked;
}

export function productDetails(product: Product): { label: string; value: string }[] {
  const fabric = fabrics[product.fabric];

  return [
    { label: "Fabric", value: fabric.name },
    { label: "Fit", value: product.fit },
    { label: "Length", value: product.length },
    { label: "Care", value: fabric.care },
  ];
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Pieces currently on the rail — the number changes, and that's fine. */
export function onTheRail(list: Product[] = products): Product[] {
  return list.filter((product) => product.inStock.length > 0);
}

function pieceNoun(count: number, category: CategorySlug | "all"): string {
  if (category === "tops") return count === 1 ? "top" : "tops";
  if (category === "skirts") return count === 1 ? "skirt" : "skirts";
  if (category === "dresses") return count === 1 ? "dress" : "dresses";
  return count === 1 ? "piece" : "pieces";
}

/** Warm, human result line — never sounds like inventory software. */
export function shopResultsLine(count: number, category: CategorySlug | "all"): string {
  const noun = pieceNoun(count, category);

  if (count === 0) {
    return category === "all"
      ? "The rail is quiet for now — something new usually lands soon."
      : `No ${noun} on the rail right now. Have a look at the rest?`;
  }

  if (category === "all") {
    return count === 1
      ? "One piece on the rail right now."
      : `${count} ${noun} on the rail — take your time.`;
  }

  if (count === 1) {
    const one =
      category === "tops" ? "top" : category === "skirts" ? "skirt" : "dress";
    return `One lovely ${one}.`;
  }

  return `${count} ${noun} — all easy to wear.`;
}
