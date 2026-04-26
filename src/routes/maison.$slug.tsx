import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { buildMeta } from "@/lib/seo";
import craftImg from "@/assets/collection-everyday.jpg";
import sustainImg from "@/assets/story-couple.jpg";
import pressImg from "@/assets/hero-necklace.jpg";
import careersImg from "@/assets/collection-bridal.jpg";

type MaisonSlug = "craft" | "sustainability" | "press" | "careers";

type MaisonPage = {
  title: string;
  eyebrow: string;
  intro: string;
  points: string[];
  image: string;
};

const pages: Record<MaisonSlug, MaisonPage> = {
  craft: {
    title: "Craft",
    eyebrow: "The Atelier",
    intro:
      "Each ME & YOURS piece is shaped by master karigars using a blend of hand techniques and modern precision.",
    points: [
      "Hand setting and finishing by specialists with 15+ years of experience",
      "Multi-step quality checks from wax model to final polish",
      "Design development rooted in Indian jewellery traditions",
    ],
    image: craftImg,
  },
  sustainability: {
    title: "Sustainability",
    eyebrow: "Responsibly Made",
    intro:
      "We focus on durability, responsible sourcing, and long-life designs so your jewellery can be worn for decades.",
    points: [
      "BIS hallmarked precious metal standards",
      "Recraft and resize services to extend product lifetime",
      "Selective material partnerships with transparent sourcing records",
    ],
    image: sustainImg,
  },
  press: {
    title: "Press",
    eyebrow: "In Conversation",
    intro:
      "From editorial features to bridal showcases, discover moments where ME & YOURS has been celebrated.",
    points: [
      "Editorial placements in premium fashion and lifestyle media",
      "Seasonal launch showcases with stylists and creators",
      "Founder interviews on craft and modern Indian luxury",
    ],
    image: pressImg,
  },
  careers: {
    title: "Careers",
    eyebrow: "Join The Maison",
    intro:
      "Build meaningful work with designers, merchandisers, and client advisors shaping the next era of ME & YOURS.",
    points: [
      "Creative-first culture with craftsmanship at the center",
      "Growth tracks in design, retail, and digital commerce",
      "Hands-on learning with senior craft and sourcing teams",
    ],
    image: careersImg,
  },
};

function getPage(slug: string): MaisonPage {
  if (!(slug in pages)) throw notFound();
  return pages[slug as MaisonSlug];
}

export const Route = createFileRoute("/maison/$slug")({
  loader: ({ params }) => ({ slug: params.slug, page: getPage(params.slug) }),
  head: ({ loaderData }) => ({
    meta: buildMeta({
      title: `${loaderData?.page?.title ?? "Maison"} — ME & YOURS`,
      description:
        loaderData?.page?.intro ?? "Explore the maison behind ME & YOURS fine jewellery.",
    }),
  }),
  component: MaisonPageComponent,
});

function MaisonPageComponent() {
  const { page } = Route.useLoaderData();

  return (
    <SiteLayout mainClassName="pt-24">
      <section className="relative min-h-[58vh] overflow-hidden">
        <img
          src={page.image}
          alt={page.title}
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold">- {page.eyebrow}</p>
          <h1 className="font-display text-6xl md:text-8xl mt-5 leading-none">{page.title}</h1>
          <p className="mt-6 max-w-2xl text-foreground/80">{page.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {page.points.map((point) => (
            <article key={point} className="border border-border bg-card/40 p-7">
              <p className="text-sm leading-relaxed text-foreground/80">{point}</p>
            </article>
          ))}
        </div>
        <div className="mt-14 text-center">
          <a
            href="/shop"
            className="text-[11px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1"
          >
            Explore the collection
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
