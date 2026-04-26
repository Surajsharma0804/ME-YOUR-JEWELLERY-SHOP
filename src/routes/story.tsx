import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { buildMeta } from "@/lib/seo";
import heroImg from "@/assets/hero-necklace.jpg";
import coupleImg from "@/assets/story-couple.jpg";

const stories = [
  {
    title: "A rooftop yes",
    couple: "Aanya & Vikram",
    city: "Mumbai",
    excerpt: "Under monsoon clouds and city lights, a solitaire ring became the start of forever.",
  },
  {
    title: "Her mother's bangles",
    couple: "Nisha & Rehan",
    city: "Delhi",
    excerpt:
      "A modern stack inspired by heirloom patterns from her family trunk, remade for today.",
  },
  {
    title: "The winter wedding edit",
    couple: "Sanya & Arjun",
    city: "Jaipur",
    excerpt: "Polki textures, warm gold, and a necklace designed to glow under candlelit pheras.",
  },
];

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: buildMeta({
      title: "Love Stories — ME & YOURS",
      description:
        "Discover proposal moments, wedding heirlooms, and personal jewellery stories from the ME & YOURS maison.",
      ogTitle: "ME & YOURS Love Stories",
    }),
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <SiteLayout mainClassName="pt-24">
      <section className="relative min-h-[72vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury necklace closeup"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-28">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.45em] uppercase text-gold"
          >
            - Maison Journal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl mt-5 leading-none"
          >
            Love <span className="italic text-gradient-gold">Stories</span>
          </motion.h1>
          <p className="mt-5 max-w-2xl text-foreground/80">
            Real moments. Real promises. Real pieces crafted to be worn through every chapter.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={coupleImg}
            alt="Couple holding hands"
            className="h-full w-full object-cover"
            width={1024}
            height={1280}
          />
          <div className="absolute inset-0 ring-1 ring-gold/35" />
        </div>
        <div>
          <h2 className="font-display text-5xl leading-tight">
            Every jewel carries a <span className="italic text-gradient-gold">memory</span>.
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed">
            Our design team works closely with couples and families to reimagine traditions into
            modern silhouettes. Each custom brief starts with a story and ends in a keepsake.
          </p>
          <Link
            to="/collections/bridal"
            params={{ category: "bridal" }}
            className="inline-block mt-8 text-[11px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1"
          >
            Explore bridal pieces
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-12 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="border border-border bg-card/40 p-7"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">{story.city}</p>
              <h3 className="font-display text-3xl mt-3">{story.title}</h3>
              <p className="mt-3 text-foreground/70 text-sm leading-relaxed">{story.excerpt}</p>
              <p className="mt-6 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                {story.couple}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
