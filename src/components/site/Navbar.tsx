import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Rings", to: "/shop" },
  { label: "Earrings", to: "/shop" },
  { label: "Necklaces", to: "/shop" },
  { label: "Bangles", to: "/shop" },
  { label: "Shop All", to: "/shop" },
  { label: "Our Story", to: "/" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setSearchQuery("");
      navigate({ to: "/shop" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-background/80 border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <button
            className="lg:hidden text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="flex flex-col items-center group">
            <span className="font-display text-2xl tracking-[0.3em] text-gold transition-all group-hover:tracking-[0.4em]">
              ME &amp; YOURS
            </span>
            <span className="text-[9px] tracking-[0.4em] text-muted-foreground mt-0.5">
              FINE JEWELLERY
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="relative text-[11px] tracking-[0.25em] uppercase text-foreground/80 hover:text-gold transition-colors group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5 text-foreground/80">
            <button
              className="hidden sm:block hover:text-gold transition-colors"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} strokeWidth={1.2} />
            </button>
            <button
              className="hidden sm:block hover:text-gold transition-colors"
              aria-label="Account"
              onClick={() => navigate({ to: "/" })}
            >
              <User size={18} strokeWidth={1.2} />
            </button>
            <button
              className="relative hover:text-gold transition-colors"
              aria-label="Cart"
              onClick={() => navigate({ to: "/shop" })}
            >
              <ShoppingBag size={18} strokeWidth={1.2} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {links.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="text-sm tracking-[0.2em] uppercase text-foreground/80 hover:text-gold"
                  >
                    {l.label}
                  </Link>
                ))}
                {/* Mobile search */}
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2 border-b border-gold/40 pt-2"
                >
                  <Search size={14} className="text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search jewellery..."
                    className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </form>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Desktop search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 z-[60] bg-onyx/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 inset-x-0 z-[70] bg-background border-b border-border px-6 py-6 lg:px-12"
            >
              <form onSubmit={handleSearch} className="mx-auto max-w-2xl flex items-center gap-4">
                <Search size={20} className="text-gold flex-shrink-0" strokeWidth={1.2} />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search rings, necklaces, earrings..."
                  className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-muted-foreground hover:text-gold transition-colors"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
