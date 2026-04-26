import { Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const shopLinks = [
    { label: "Rings", to: "/shop" },
    { label: "Earrings", to: "/shop" },
    { label: "Necklaces", to: "/shop" },
    { label: "Bangles", to: "/shop" },
    { label: "Bridal", to: "/shop" },
    { label: "Gifts", to: "/shop" },
  ];

  const maisonLinks = [
    { label: "Our Story", to: "/" },
    { label: "Craft", to: "/" },
    { label: "Sustainability", to: "/" },
    { label: "Press", to: "/" },
    { label: "Careers", to: "/" },
  ];

  const careLinks = [
    { label: "Contact", to: "/" },
    { label: "Stores", to: "/" },
    { label: "Shipping", to: "/" },
    { label: "Returns", to: "/" },
    { label: "Size Guide", to: "/" },
    { label: "FAQ", to: "/" },
  ];

  return (
    <footer className="bg-card/50 pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Newsletter */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.5em] uppercase text-gold">— The Inner Circle</span>
          <h3 className="font-display text-4xl md:text-5xl mt-4">
            First look at <span className="italic text-gradient-gold">new collections</span>
          </h3>
          <p className="text-muted-foreground mt-4 text-sm">
            Quiet drops, private previews, and stories from the atelier.
          </p>
          {subscribed ? (
            <p className="mt-8 text-gold text-sm tracking-[0.2em] uppercase">
              ✦ You're on the list. Welcome to the inner circle.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-8 flex border-b border-gold/40 max-w-md mx-auto">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-transparent py-3 text-sm tracking-wide outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="text-[11px] tracking-[0.3em] uppercase text-gold hover:text-champagne transition-colors px-4"
              >
                Subscribe →
              </button>
            </form>
          )}
        </div>

        <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-border">
          <div>
            <span className="font-display text-2xl tracking-[0.3em] text-gold">ME &amp; YOURS</span>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Fine jewellery, hand-crafted across three generations. A maison of stories, told in
              gold.
            </p>
            <div className="flex gap-4 mt-6 text-foreground/60">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-gold transition-colors"
              >
                <Instagram size={18} strokeWidth={1.2} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-gold transition-colors"
              >
                <Facebook size={18} strokeWidth={1.2} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Youtube"
                className="hover:text-gold transition-colors"
              >
                <Youtube size={18} strokeWidth={1.2} />
              </a>
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-gold mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-foreground/70 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Maison column */}
          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-gold mb-5">Maison</h4>
            <ul className="space-y-3">
              {maisonLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-foreground/70 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Care column */}
          <div>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-gold mb-5">Care</h4>
            <ul className="space-y-3">
              {careLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-foreground/70 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 ME &amp; YOURS. All rights reserved. Copyright by Suraj Kumar.</p>
          <p className="tracking-[0.2em] uppercase text-[10px]">
            Crafted with <span className="text-gold">♦</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
