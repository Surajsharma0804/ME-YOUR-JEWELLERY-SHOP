import { motion } from "framer-motion";
import { ShieldCheck, Truck, RefreshCw, Award, Gem, Phone } from "lucide-react";

const items = [
  { icon: Award, title: "BIS Certified", desc: "Hallmarked 22K & 18K gold, every piece" },
  { icon: Gem, title: "IGI Diamonds", desc: "Conflict-free, certified brilliance" },
  { icon: RefreshCw, title: "Lifetime Exchange", desc: "Trade up at full value, always" },
  { icon: ShieldCheck, title: "30-Day Returns", desc: "Try it, love it — or send it back" },
  { icon: Truck, title: "Insured Delivery", desc: "Free across India, signed & secure" },
  { icon: Phone, title: "Personal Stylist", desc: "Concierge guidance from our atelier" },
];

export function Trust() {
  return (
    <section className="py-28 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-gold">— The Promise</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">
            A maison built on <span className="italic text-gradient-gold">trust</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group bg-background p-8 flex flex-col items-center text-center transition-colors hover:bg-card"
              >
                <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center mb-4 transition-all duration-500 group-hover:border-gold group-hover:shadow-glow-gold">
                  <Icon size={20} className="text-gold" strokeWidth={1.2} />
                </div>
                <h3 className="font-display text-xl">{it.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{it.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
