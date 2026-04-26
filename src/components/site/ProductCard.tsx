import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { formatINR, metalLabels } from "@/data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block relative aspect-[3/4] overflow-hidden bg-card"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
        <div className="absolute inset-3 ring-1 ring-gold/0 group-hover:ring-gold/40 transition-all duration-700" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="text-[9px] tracking-[0.3em] uppercase bg-gold text-onyx px-2.5 py-1">
              New
            </span>
          )}
          {product.bestseller && (
            <span className="text-[9px] tracking-[0.3em] uppercase bg-onyx/80 text-gold border border-gold/40 px-2.5 py-1 backdrop-blur-sm">
              Bestseller
            </span>
          )}
        </div>

        <button
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full bg-onyx/60 backdrop-blur-md text-foreground/80 hover:text-gold hover:bg-onyx/90 transition-all opacity-0 group-hover:opacity-100"
        >
          <Heart size={15} strokeWidth={1.4} />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="text-[9px] tracking-[0.4em] uppercase text-gold/80">
            {metalLabels[product.metal]} · {product.karat}
          </span>
        </div>
      </Link>

      <div className="pt-5 pb-2 px-1">
        <h3 className="font-display text-2xl leading-tight text-foreground group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-xs italic font-display text-muted-foreground mt-1">{product.tagline}</p>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-sm tracking-wide text-foreground">{formatINR(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
