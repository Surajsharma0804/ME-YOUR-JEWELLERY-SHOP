import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, ShoppingBag, Shield, Truck, RotateCcw, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { SiteLayout } from "@/components/site/SiteLayout";
import { buildMeta } from "@/lib/seo";
import {
  getProduct,
  getRelated,
  formatINR,
  metalLabels,
  categoryLabels,
  type Product,
} from "@/data/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }): { product: Product } => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) {
      return {
        meta: buildMeta({
          title: "Product — ME & YOURS",
          description: "Explore fine jewellery from ME & YOURS.",
        }),
      };
    }
    return {
      meta: buildMeta({
        title: `${p.name} — ME & YOURS`,
        description: p.story,
        ogTitle: `${p.name} · ${p.tagline}`,
        image: p.image,
      }),
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-display text-5xl italic text-gold">Not found</p>
        <Link
          to="/shop"
          className="mt-6 inline-block text-[11px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1"
        >
          Back to shop
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center bg-background">
      <p className="text-foreground">{error.message}</p>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const related = getRelated(product);
  const [zoom, setZoom] = useState(false);

  return (
    <SiteLayout mainClassName="pt-32">
      {/* Crumbs */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          <Link to="/" className="hover:text-gold">
            Home
          </Link>
          <span className="mx-3 text-gold/40">/</span>
          <Link to="/shop" className="hover:text-gold">
            Shop
          </Link>
          <span className="mx-3 text-gold/40">/</span>
          <span className="text-gold">{categoryLabels[product.category]}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 py-12 grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image with zoom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="relative aspect-[4/5] overflow-hidden bg-card cursor-zoom-in"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1280}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out ${
                zoom ? "scale-200" : "scale-100"
              }`}
            />
            <div className="absolute inset-4 ring-1 ring-gold/20 pointer-events-none" />
            <div className="absolute -bottom-5 -right-5 h-28 w-28 border border-gold/40 pointer-events-none hidden md:block" />
          </div>
          <p className="mt-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground text-center">
            Hover to magnify
          </p>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="lg:pt-8"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold">
            {metalLabels[product.metal]} · {product.karat}
          </span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 leading-tight">{product.name}</h1>
          <p className="mt-3 font-display italic text-xl text-champagne/80">{product.tagline}</p>

          <span className="gold-divider my-8" />

          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl text-gold">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Inclusive of all taxes · EMI from ₹
            {Math.round(product.price / 12).toLocaleString("en-IN")}/mo
          </p>

          <p className="mt-8 text-foreground/70 leading-relaxed">{product.story}</p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button className="group relative flex-1 overflow-hidden bg-gold text-onyx px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:shadow-glow-gold transition-all">
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                <ShoppingBag size={14} strokeWidth={1.6} />
                Add to Bag
              </span>
            </button>
            <button className="flex items-center justify-center gap-2 border border-gold/40 text-gold px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold/10 transition-all">
              <Heart size={14} strokeWidth={1.6} />
              Wishlist
            </button>
          </div>

          {/* Specs */}
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8">
            <SpecRow label="Weight" value={`${product.weightGrams} g`} />
            {product.diamondCarats && (
              <SpecRow label="Diamonds" value={`${product.diamondCarats} ct`} />
            )}
            <SpecRow
              label="Metal"
              value={`${product.karat.toUpperCase()} ${metalLabels[product.metal]}`}
            />
            <SpecRow label="Occasion" value={product.occasion} />
          </dl>

          {/* Trust */}
          <div className="mt-10 grid grid-cols-3 gap-3 text-center">
            <Promise icon={<Shield size={16} strokeWidth={1.4} />} label="Lifetime exchange" />
            <Promise icon={<Truck size={16} strokeWidth={1.4} />} label="Free shipping" />
            <Promise icon={<RotateCcw size={16} strokeWidth={1.4} />} label="15-day returns" />
          </div>

          {/* Certs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {product.certification.map((c: string) => (
              <span
                key={c}
                className="text-[9px] tracking-[0.3em] uppercase border border-gold/30 text-gold/90 px-3 py-1.5"
              >
                ✦ {c}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Story strip */}
      <section className="bg-card/30 py-24 mt-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Sparkles size={20} className="mx-auto text-gold" strokeWidth={1.2} />
          <p className="mt-6 font-display italic text-3xl md:text-4xl leading-snug text-foreground/90">
            "Each piece passes through seven hands before it reaches yours — from the karigar's
            bench in Jaipur to the final hallmark in Mumbai."
          </p>
          <p className="mt-6 text-[10px] tracking-[0.4em] uppercase text-gold">
            The ME &amp; YOURS promise
          </p>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-gold">
                — Style with this
              </span>
              <h2 className="font-display text-4xl md:text-5xl mt-3">
                You may also <span className="italic text-gradient-gold">love</span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-block text-[11px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-sm text-foreground capitalize">{value}</p>
    </div>
  );
}

function Promise({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-3 border border-border">
      <span className="text-gold">{icon}</span>
      <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground">{label}</span>
    </div>
  );
}
