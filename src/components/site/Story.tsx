import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import couple from "@/assets/story-couple.jpg";

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} id="story-section" className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
          <motion.div style={{ y }} className="absolute inset-[-15%]">
            <img
              src={couple}
              alt="Couple's hands with engagement ring at sunset"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1024}
              height={1280}
            />
          </motion.div>
          <div className="absolute inset-0 ring-1 ring-gold/30" />
          <div className="absolute -bottom-6 -right-6 h-32 w-32 border border-gold/40" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2 max-w-lg"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-gold">— Love Stories</span>
          <h2 className="font-display text-5xl md:text-6xl mt-4 leading-tight">
            Every piece begins with a <span className="italic text-gradient-gold">moment</span>.
          </h2>

          <span className="gold-divider my-8" />

          <p className="text-foreground/70 leading-relaxed text-lg font-display italic">
            “He didn’t kneel in some grand ballroom. He held my hand on a quiet rooftop, the city
            humming below, and slipped a ring onto my finger that felt like it had been waiting
            for me forever.”
          </p>
          <p className="mt-6 text-sm tracking-[0.2em] uppercase text-muted-foreground">
            — Aanya &amp; Vikram · Mumbai
          </p>

          <div className="mt-10 flex items-center gap-6">
            <a
              href="/shop"
              className="text-[11px] tracking-[0.3em] uppercase text-gold hover:text-champagne transition-colors border-b border-gold/40 pb-1"
            >
              Read More Stories
            </a>
            <span className="text-muted-foreground text-sm">· 240+ proposals</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
