import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-necklace.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Background image with ken burns */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Diamond and gold necklace draped on black silk"
          className="h-full w-full object-cover animate-ken-burns"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />
      </motion.div>

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial-glow)" }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="text-[10px] tracking-[0.6em] uppercase text-gold/80 mb-8"
        >
          ✦ A Maison of Fine Jewellery ✦
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-7xl md:text-[9rem] lg:text-[11rem] leading-[0.9] tracking-tight"
        >
          <span className="text-foreground">me</span>
          <span className="text-gold italic font-light"> &amp; </span>
          <span className="text-foreground">you</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="my-10 h-px w-32 bg-gradient-gold origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="font-display text-2xl md:text-3xl text-champagne/90 italic max-w-2xl"
        >
          Not just jewellery.
          <br />
          <span className="text-gold">A story you wear.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-5"
        >
          <button className="group relative overflow-hidden bg-gold text-onyx px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-medium transition-all hover:shadow-glow-gold">
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-champagne translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-onyx translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              Explore Collection
            </span>
          </button>
          <button className="text-[11px] tracking-[0.3em] uppercase text-foreground/80 hover:text-gold transition-colors border-b border-transparent hover:border-gold py-2">
            Watch the Story →
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-12 w-px bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
