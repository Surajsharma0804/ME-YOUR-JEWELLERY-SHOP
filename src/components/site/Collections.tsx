import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import bridal from "@/assets/collection-bridal.jpg";
import everyday from "@/assets/collection-everyday.jpg";

const items = [
  {
    img: bridal,
    eyebrow: "Bridal Couture",
    title: "Vows in Gold",
    desc: "Heirloom-worthy pieces designed for the day you say forever.",
    cta: "Discover Bridal",
    to: "/shop",
  },
  {
    img: everyday,
    eyebrow: "Everyday Edit",
    title: "Quiet Luxury",
    desc: "Effortless gold for the rituals that make a life beautiful.",
    cta: "Shop Everyday",
    to: "/shop",
  },
];

export function Collections() {
  return (
    <section className="py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-gold">— New Arrivals</span>
          <h2 className="font-display text-5xl md:text-7xl mt-4">
            Two worlds. <span className="italic text-gradient-gold">One you.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={item.to}
                className="group relative aspect-[4/5] overflow-hidden block"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  loading="lazy"
                  width={1280}
                  height={960}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
                <div className="absolute inset-6 ring-1 ring-gold/0 group-hover:ring-gold/40 transition-all duration-700" />

                <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-gold/90">
                    {item.eyebrow}
                  </span>
                  <h3 className="font-display text-5xl md:text-6xl mt-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-foreground/70 max-w-sm leading-relaxed">{item.desc}</p>
                  <span className="mt-8 inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-gold">
                    {item.cta}
                    <span className="h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
