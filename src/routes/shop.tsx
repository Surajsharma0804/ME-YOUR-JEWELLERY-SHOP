import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { SiteLayout } from "@/components/site/SiteLayout";
import { buildMeta } from "@/lib/seo";
import {
  products,
  type Category,
  type Metal,
  type Karat,
  metalLabels,
  categoryLabels,
} from "@/data/products";

type Sort = "featured" | "price-asc" | "price-desc" | "newest";

const metals: Metal[] = ["yellow-gold", "white-gold", "rose-gold", "platinum"];
const karats: Karat[] = ["14k", "18k", "22k"];
const cats: Category[] = ["rings", "earrings", "necklaces", "bangles"];

const PRICE_MAX = 800000;

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: buildMeta({
      title: "Shop Fine Jewellery — ME & YOURS",
      description:
        "Browse hand-crafted rings, earrings, necklaces and bangles in 18k & 22k gold. Filter by metal, karat, occasion and price.",
      ogTitle: "Shop — ME & YOURS Fine Jewellery",
    }),
  }),
  component: ShopPage,
});

function ShopPage() {
  const [activeCats, setActiveCats] = useState<Set<Category>>(new Set());
  const [activeMetals, setActiveMetals] = useState<Set<Metal>>(new Set());
  const [activeKarats, setActiveKarats] = useState<Set<Karat>>(new Set());
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = <T,>(set: Set<T>, value: T): Set<T> => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (activeCats.size && !activeCats.has(p.category)) return false;
      if (activeMetals.size && !activeMetals.has(p.metal)) return false;
      if (activeKarats.size && !activeKarats.has(p.karat)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
      default:
        list = [...list].sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    }
    return list;
  }, [activeCats, activeMetals, activeKarats, maxPrice, sort]);

  const activeCount =
    activeCats.size + activeMetals.size + activeKarats.size + (maxPrice < PRICE_MAX ? 1 : 0);

  const reset = () => {
    setActiveCats(new Set());
    setActiveMetals(new Set());
    setActiveKarats(new Set());
    setMaxPrice(PRICE_MAX);
  };

  return (
    <SiteLayout>
      {/* Header */}
      <section className="relative pt-40 pb-16 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <nav className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span className="mx-3 text-gold/40">/</span>
              <span className="text-gold">Shop</span>
            </nav>
            <h1 className="font-display text-6xl md:text-8xl mt-6 leading-none">
              The <span className="italic text-gradient-gold">Maison</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              {filtered.length} pieces, hand-finished and hallmarked. Filter by mood, metal, or
              moment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-[72px] z-30 backdrop-blur-xl bg-background/80 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-4 flex items-center justify-between">
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase hover:text-gold transition-colors lg:hidden"
          >
            <SlidersHorizontal size={14} strokeWidth={1.4} />
            Filters
            {activeCount > 0 && (
              <span className="h-5 w-5 rounded-full bg-gold text-onyx text-[10px] grid place-items-center">
                {activeCount}
              </span>
            )}
          </button>
          <div className="hidden lg:block text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </div>

          <div className="relative">
            <select
              aria-label="Sort products"
              title="Sort products"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="appearance-none bg-transparent border border-border pl-4 pr-10 py-2 text-[11px] tracking-[0.25em] uppercase text-foreground hover:border-gold focus:border-gold focus:outline-none transition-colors"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Sort: Price ↑</option>
              <option value="price-desc">Sort: Price ↓</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gold"
            />
          </div>
        </div>
      </div>

      {/* Layout */}
      <section className="px-6 lg:px-12 py-12">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[260px_1fr] gap-12">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block">
            <FilterPanel
              activeCats={activeCats}
              activeMetals={activeMetals}
              activeKarats={activeKarats}
              maxPrice={maxPrice}
              onToggleCat={(c) => setActiveCats((s) => toggle(s, c))}
              onToggleMetal={(m) => setActiveMetals((s) => toggle(s, m))}
              onToggleKarat={(k) => setActiveKarats((s) => toggle(s, k))}
              onPriceChange={setMaxPrice}
              onReset={reset}
              activeCount={activeCount}
            />
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="py-32 text-center">
                <p className="font-display text-3xl italic text-muted-foreground">
                  No pieces match your edit.
                </p>
                <button
                  onClick={reset}
                  className="mt-6 text-[11px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-14">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 z-40 bg-onyx/80 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-background border-r border-border overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="text-[11px] tracking-[0.3em] uppercase text-gold">Filters</span>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <FilterPanel
                  activeCats={activeCats}
                  activeMetals={activeMetals}
                  activeKarats={activeKarats}
                  maxPrice={maxPrice}
                  onToggleCat={(c) => setActiveCats((s) => toggle(s, c))}
                  onToggleMetal={(m) => setActiveMetals((s) => toggle(s, m))}
                  onToggleKarat={(k) => setActiveKarats((s) => toggle(s, k))}
                  onPriceChange={setMaxPrice}
                  onReset={reset}
                  activeCount={activeCount}
                />
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="mt-8 w-full bg-gold text-onyx py-4 text-[11px] tracking-[0.3em] uppercase"
                >
                  Show {filtered.length} pieces
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}

function FilterPanel({
  activeCats,
  activeMetals,
  activeKarats,
  maxPrice,
  onToggleCat,
  onToggleMetal,
  onToggleKarat,
  onPriceChange,
  onReset,
  activeCount,
}: {
  activeCats: Set<Category>;
  activeMetals: Set<Metal>;
  activeKarats: Set<Karat>;
  maxPrice: number;
  onToggleCat: (c: Category) => void;
  onToggleMetal: (m: Metal) => void;
  onToggleKarat: (k: Karat) => void;
  onPriceChange: (n: number) => void;
  onReset: () => void;
  activeCount: number;
}) {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <span className="text-[11px] tracking-[0.3em] uppercase text-gold">Refine</span>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-gold transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterGroup label="Category">
        {cats.map((c) => (
          <Pill key={c} active={activeCats.has(c)} onClick={() => onToggleCat(c)}>
            {categoryLabels[c]}
          </Pill>
        ))}
      </FilterGroup>

      <FilterGroup label="Metal">
        {metals.map((m) => (
          <Pill key={m} active={activeMetals.has(m)} onClick={() => onToggleMetal(m)}>
            {metalLabels[m]}
          </Pill>
        ))}
      </FilterGroup>

      <FilterGroup label="Karat">
        {karats.map((k) => (
          <Pill key={k} active={activeKarats.has(k)} onClick={() => onToggleKarat(k)}>
            {k.toUpperCase()}
          </Pill>
        ))}
      </FilterGroup>

      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Price
          </span>
          <span className="text-xs text-gold">up to ₹{(maxPrice / 1000).toFixed(0)}k</span>
        </div>
        <input
          aria-label="Maximum price"
          title="Maximum price"
          type="range"
          min={20000}
          max={PRICE_MAX}
          step={5000}
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-[oklch(0.78_0.13_85)]"
        />
        <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-2">
          <span>₹20k</span>
          <span>₹8L</span>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-4">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] tracking-[0.15em] uppercase px-3.5 py-2 border transition-all ${
        active
          ? "bg-gold text-onyx border-gold"
          : "border-border text-foreground/80 hover:border-gold hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}
