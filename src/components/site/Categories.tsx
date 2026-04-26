import { motion } from "framer-motion";
import rings from "@/assets/cat-rings.jpg";
import earrings from "@/assets/cat-earrings.jpg";
import necklaces from "@/assets/cat-necklaces.jpg";
import bangles from "@/assets/cat-bangles.jpg";

const categories = [
  { name: "Rings", slug: "rings", tagline: "Forever, sealed", count: "120+", img: rings },
  { name: "Earrings", slug: "earrings", tagline: "Whisper of light", count: "85+", img: earrings },
  {
    name: "Necklaces",
    slug: "necklaces",
    tagline: "Heart's adornment",
    count: "94+",
    img: necklaces,
  },
  { name: "Bangles", slug: "bangles", tagline: "Heritage in motion", count: "60+", img: bangles },
];

export function Categories() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div>
            <span className="text-[10px] tracking-[0.5em] uppercase text-gold">— The Edit</span>
            <h2 className="font-display text-5xl md:text-7xl mt-4 leading-none">
              Curated by <span className="italic text-gradient-gold">desire</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            Four worlds, infinite stories. Each piece is hand-finished by master artisans across
            three generations of craft.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll */}
      <div className="overflow-x-auto scrollbar-hide pb-8">
        <div className="flex gap-6 px-6 lg:px-12 min-w-max">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="w-[320px] md:w-[380px] flex-shrink-0"
            >
              <a
                href={`/collections/${c.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden hover-tilt"
              >
                <img
                  src={c.img}
                  alt={`${c.name} collection`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  loading="lazy"
                  width={800}
                  height={1024}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-700" />

                <div className="absolute inset-x-0 bottom-0 p-7 flex items-end justify-between">
                  <div>
                    <p className="text-[9px] tracking-[0.4em] uppercase text-gold/80">
                      {c.count} pieces
                    </p>
                    <h3 className="font-display text-4xl mt-2 text-foreground">{c.name}</h3>
                    <p className="text-sm italic text-muted-foreground mt-1 font-display">
                      {c.tagline}
                    </p>
                  </div>
                  <span className="text-gold opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500 text-2xl">
                    →
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
