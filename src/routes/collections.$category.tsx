import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/site/ProductCard";
import { SiteLayout } from "@/components/site/SiteLayout";
import { buildMeta } from "@/lib/seo";
import { products, categoryLabels, type Category } from "@/data/products";
import ringsImg from "@/assets/cat-rings.jpg";
import earringsImg from "@/assets/cat-earrings.jpg";
import necklacesImg from "@/assets/cat-necklaces.jpg";
import banglesImg from "@/assets/cat-bangles.jpg";
import bridalImg from "@/assets/collection-bridal.jpg";
import giftsImg from "@/assets/collection-everyday.jpg";

type CollectionKey = Category | "bridal" | "gifts";

type CollectionConfig = {
  title: string;
  subtitle: string;
  description: string;
  hero: string;
};

const collectionConfig: Record<CollectionKey, CollectionConfig> = {
  rings: {
    title: "Rings",
    subtitle: "Promises in gold",
    description: "From solitaires to eternity stacks, discover signature rings for every chapter.",
    hero: ringsImg,
  },
  earrings: {
    title: "Earrings",
    subtitle: "Light for every hour",
    description: "Studs, chandeliers, and heirloom silhouettes crafted to frame every mood.",
    hero: earringsImg,
  },
  necklaces: {
    title: "Necklaces",
    subtitle: "Stories at the collarbone",
    description:
      "Everyday chains and statement chokers that move from day rituals to celebration nights.",
    hero: necklacesImg,
  },
  bangles: {
    title: "Bangles",
    subtitle: "Heritage in motion",
    description: "Stackable pavé forms and carved kadas rooted in timeless Indian craft.",
    hero: banglesImg,
  },
  bridal: {
    title: "Bridal",
    subtitle: "Made for the vows",
    description: "Cinematic bridal pieces with fine setting details for your wedding trousseau.",
    hero: bridalImg,
  },
  gifts: {
    title: "Gifts",
    subtitle: "For meaningful moments",
    description:
      "Thoughtful pieces chosen for birthdays, anniversaries, and once-in-a-lifetime milestones.",
    hero: giftsImg,
  },
};

function normalizeCategory(value: string): CollectionKey {
  if (value in collectionConfig) return value as CollectionKey;
  throw notFound();
}

export const Route = createFileRoute("/collections/$category")({
  loader: ({ params }) => {
    const category = normalizeCategory(params.category);
    const config = collectionConfig[category];

    const filtered =
      category === "bridal"
        ? products.filter((p) => p.occasion === "bridal")
        : category === "gifts"
          ? products.filter((p) => p.occasion === "gifting")
          : products.filter((p) => p.category === category);

    return { category, config, filtered };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.config?.title ?? "Collection";
    return {
      meta: buildMeta({
        title: `${title} Collection — ME & YOURS`,
        description:
          loaderData?.config?.description ??
          "Explore signature fine jewellery collections from ME & YOURS.",
        ogTitle: `${title} — ME & YOURS Maison`,
      }),
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { category, config, filtered } = Route.useLoaderData();
  const categoryName =
    category in categoryLabels ? categoryLabels[category as Category] : config.title;

  return (
    <SiteLayout mainClassName="pt-24">
      <section className="relative min-h-[62vh] overflow-hidden">
        <img
          src={config.hero}
          alt={`${config.title} collection`}
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/55 to-background" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <nav className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            <a href="/" className="hover:text-gold">
              Home
            </a>
            <span className="mx-3 text-gold/40">/</span>
            <a href="/shop" className="hover:text-gold">
              Shop
            </a>
            <span className="mx-3 text-gold/40">/</span>
            <span className="text-gold">{categoryName}</span>
          </nav>
          <h1 className="font-display text-6xl md:text-8xl mt-6 leading-none">
            {config.title} <span className="italic text-gradient-gold">Edit</span>
          </h1>
          <p className="mt-5 max-w-2xl text-foreground/80">{config.description}</p>
          <p className="mt-2 text-[11px] tracking-[0.25em] uppercase text-gold/90">
            {config.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-border bg-card/40">
            <p className="font-display text-4xl italic text-muted-foreground">No pieces yet.</p>
            <a
              href="/shop"
              className="inline-block mt-6 text-[11px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1"
            >
              View full shop
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-14">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-12 pb-24">
        <div className="border border-gold/25 bg-card/30 p-8 md:p-12 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold">Need help choosing?</p>
          <h2 className="font-display text-4xl md:text-5xl mt-4">Speak with a maison stylist</h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            From engagement bands to gifting edits, our stylists can recommend pieces that match
            your occasion and budget.
          </p>
          <Link
            to="/care/contact"
            params={{ slug: "contact" }}
            className="inline-block mt-8 text-[11px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1"
          >
            Book a consultation
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
