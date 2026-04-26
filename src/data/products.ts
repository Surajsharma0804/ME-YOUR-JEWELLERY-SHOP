import ringSolitaire from "@/assets/p-ring-solitaire.jpg";
import ringEternity from "@/assets/p-ring-eternity.jpg";
import earChandelier from "@/assets/p-earring-chandelier.jpg";
import earStud from "@/assets/p-earring-stud.jpg";
import necklaceChain from "@/assets/p-necklace-chain.jpg";
import necklaceChoker from "@/assets/p-necklace-choker.jpg";
import bangleStack from "@/assets/p-bangle-stack.jpg";
import bangleKada from "@/assets/p-bangle-kada.jpg";

export type Metal = "yellow-gold" | "white-gold" | "rose-gold" | "platinum";
export type Karat = "14k" | "18k" | "22k";
export type Category = "rings" | "earrings" | "necklaces" | "bangles";
export type Occasion = "everyday" | "bridal" | "gifting" | "heirloom";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  story: string;
  category: Category;
  metal: Metal;
  karat: Karat;
  occasion: Occasion;
  price: number; // INR
  originalPrice?: number;
  image: string;
  bestseller?: boolean;
  isNew?: boolean;
  weightGrams: number;
  diamondCarats?: number;
  certification: string[];
}

export const products: Product[] = [
  {
    id: "p1",
    slug: "solitaire-aura-ring",
    name: "Solitaire Aura",
    tagline: "The one she'll never take off",
    story:
      "A single brilliant-cut diamond, cradled by four hand-set prongs of 18k gold. The kind of ring that begins a life.",
    category: "rings",
    metal: "yellow-gold",
    karat: "18k",
    occasion: "bridal",
    price: 89000,
    originalPrice: 105000,
    image: ringSolitaire,
    bestseller: true,
    weightGrams: 3.2,
    diamondCarats: 0.5,
    certification: ["BIS Hallmark", "IGI Certified"],
  },
  {
    id: "p2",
    slug: "eternity-whisper-band",
    name: "Eternity Whisper",
    tagline: "Promises, in pavé",
    story:
      "Twenty-one micro-pavé diamonds wrap an eternity band of warm rose gold. Stack it, gift it, wear it forever.",
    category: "rings",
    metal: "rose-gold",
    karat: "18k",
    occasion: "gifting",
    price: 42000,
    image: ringEternity,
    isNew: true,
    weightGrams: 2.1,
    diamondCarats: 0.3,
    certification: ["BIS Hallmark"],
  },
  {
    id: "p3",
    slug: "mehr-chandelier-earrings",
    name: "Mehr Chandelier",
    tagline: "Light, suspended",
    story:
      "Tiered diamonds drop from carved emeralds — a regal echo of Mughal courts, made for the night you walk in late.",
    category: "earrings",
    metal: "yellow-gold",
    karat: "22k",
    occasion: "bridal",
    price: 215000,
    image: earChandelier,
    bestseller: true,
    weightGrams: 12.4,
    diamondCarats: 2.1,
    certification: ["BIS Hallmark", "IGI Certified"],
  },
  {
    id: "p4",
    slug: "luna-solitaire-studs",
    name: "Luna Studs",
    tagline: "The everyday icon",
    story:
      "A pair of brilliant-cut diamonds in white gold prongs. Quiet enough for office, sharp enough for dinner.",
    category: "earrings",
    metal: "white-gold",
    karat: "18k",
    occasion: "everyday",
    price: 36500,
    image: earStud,
    weightGrams: 1.6,
    diamondCarats: 0.4,
    certification: ["BIS Hallmark", "IGI Certified"],
  },
  {
    id: "p5",
    slug: "saavi-layered-chain",
    name: "Saavi Layered Chain",
    tagline: "Three strands, one story",
    story:
      "A trio of fine gold chains, each a different weight, anchored by a single bezel-set diamond pendant.",
    category: "necklaces",
    metal: "yellow-gold",
    karat: "18k",
    occasion: "everyday",
    price: 58000,
    image: necklaceChain,
    isNew: true,
    weightGrams: 8.7,
    diamondCarats: 0.15,
    certification: ["BIS Hallmark"],
  },
  {
    id: "p6",
    slug: "noor-polki-choker",
    name: "Noor Polki Choker",
    tagline: "An heirloom in waiting",
    story:
      "Uncut polki diamonds and South Sea pearls, hand-set across a lattice of 22k gold. The piece your daughter will fight her sister for.",
    category: "necklaces",
    metal: "yellow-gold",
    karat: "22k",
    occasion: "bridal",
    price: 685000,
    image: necklaceChoker,
    bestseller: true,
    weightGrams: 78,
    diamondCarats: 18,
    certification: ["BIS Hallmark", "IGI Certified", "GIA Polki"],
  },
  {
    id: "p7",
    slug: "rasa-pavé-stack",
    name: "Rasa Pavé Stack",
    tagline: "Two notes, in unison",
    story:
      "A pair of slim pavé bangles that catch light at every wrist-turn. Wear them together — or apart, for the ones you love.",
    category: "bangles",
    metal: "yellow-gold",
    karat: "18k",
    occasion: "gifting",
    price: 124000,
    image: bangleStack,
    weightGrams: 22,
    diamondCarats: 1.4,
    certification: ["BIS Hallmark", "IGI Certified"],
  },
  {
    id: "p8",
    slug: "viraasat-temple-kada",
    name: "Viraasat Temple Kada",
    tagline: "Heritage, hand-carved",
    story:
      "Granulated 22k gold worked in the temple tradition of Tamil Nadu. Worn by brides for three generations of our karigars' families.",
    category: "bangles",
    metal: "yellow-gold",
    karat: "22k",
    occasion: "heirloom",
    price: 248000,
    image: bangleKada,
    weightGrams: 58,
    certification: ["BIS Hallmark", "Handcrafted in India"],
  },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getRelated = (p: Product, n = 4) =>
  products.filter((x) => x.id !== p.id && x.category === p.category).slice(0, n);

export const metalLabels: Record<Metal, string> = {
  "yellow-gold": "Yellow Gold",
  "white-gold": "White Gold",
  "rose-gold": "Rose Gold",
  platinum: "Platinum",
};

export const categoryLabels: Record<Category, string> = {
  rings: "Rings",
  earrings: "Earrings",
  necklaces: "Necklaces",
  bangles: "Bangles",
};
