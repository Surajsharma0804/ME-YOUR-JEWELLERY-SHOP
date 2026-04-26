import { Instagram, Facebook, Youtube } from "lucide-react";
import { siteConfig } from "@/config/site";

const socialIcons = {
  Instagram,
  Facebook,
  Youtube,
} as const;

export function Footer() {
  return (
    <footer className="bg-card/50 pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.5em] uppercase text-gold">
            - The Inner Circle
          </span>
          <h3 className="font-display text-4xl md:text-5xl mt-4">
            First look at <span className="italic text-gradient-gold">new collections</span>
          </h3>
          <p className="text-muted-foreground mt-4 text-sm">
            Quiet drops, private previews, and stories from the atelier.
          </p>
          <form className="mt-8 flex border-b border-gold/40 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent py-3 text-sm tracking-wide outline-none placeholder:text-muted-foreground"
            />
            <button className="text-[11px] tracking-[0.3em] uppercase text-gold hover:text-champagne transition-colors px-4">
              Subscribe -&gt;
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-border">
          <div>
            <span className="font-display text-2xl tracking-[0.3em] text-gold">
              {siteConfig.brand.logoText}
            </span>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Fine jewellery, hand-crafted across three generations. A maison of stories, told in
              gold.
            </p>
            <div className="flex gap-4 mt-6 text-foreground/60">
              {siteConfig.footer.socialLinks.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="hover:text-gold transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon size={18} strokeWidth={1.2} />
                  </a>
                );
              })}
            </div>
          </div>

          {siteConfig.footer.sections.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] tracking-[0.3em] uppercase text-gold mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-foreground/70 hover:text-gold transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© Suraj Kumar 2026. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase text-[10px]">
            Independent atelier since {siteConfig.brand.foundedYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
