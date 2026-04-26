import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { buildMeta } from "@/lib/seo";
import supportImg from "@/assets/collection-everyday.jpg";
import storesImg from "@/assets/collection-bridal.jpg";
import shippingImg from "@/assets/hero-necklace.jpg";
import returnsImg from "@/assets/story-couple.jpg";

type CareSlug = "contact" | "stores" | "shipping" | "returns" | "size-guide" | "faq";

type CarePage = {
  title: string;
  eyebrow: string;
  intro: string;
  image: string;
  points: string[];
};

const pages: Record<CareSlug, CarePage> = {
  contact: {
    title: "Contact",
    eyebrow: "Client Care",
    intro: "Our advisors are available for styling help, custom requests, and order support.",
    image: supportImg,
    points: [
      "Email: care@meandyoumaison.com",
      "Phone: +91 98765 43210",
      "Hours: Mon-Sat, 10:00 AM - 7:00 PM IST",
    ],
  },
  stores: {
    title: "Stores",
    eyebrow: "Visit Us",
    intro: "Experience ME & YOURS in person at our flagship and partner boutique locations.",
    image: storesImg,
    points: [
      "Mumbai - Kala Ghoda (Flagship)",
      "Delhi - Khan Market (By Appointment)",
      "Bengaluru - UB City (Partner Studio)",
    ],
  },
  shipping: {
    title: "Shipping",
    eyebrow: "Delivery Policy",
    intro: "Secure insured shipping across India with tracked dispatch and signature delivery.",
    image: shippingImg,
    points: [
      "Ready pieces: dispatch in 2-4 business days",
      "Made-to-order pieces: dispatch in 14-21 business days",
      "Insured transit and tamper-evident packaging",
    ],
  },
  returns: {
    title: "Returns",
    eyebrow: "Exchange & Returns",
    intro: "We offer easy exchange assistance and guided returns for eligible orders.",
    image: returnsImg,
    points: [
      "Return window: 15 days from delivery",
      "Exchange option available for size and style support",
      "Custom and engraved pieces are not returnable",
    ],
  },
  "size-guide": {
    title: "Size Guide",
    eyebrow: "Find Your Fit",
    intro: "Use our quick measurement steps to select accurate ring and bangle sizing.",
    image: supportImg,
    points: [
      "Measure finger circumference at end of day",
      "Match millimeters with our size conversion chart",
      "Book a virtual sizing consult for first-time buyers",
    ],
  },
  faq: {
    title: "FAQ",
    eyebrow: "Common Questions",
    intro: "Answers to frequent queries on hallmarks, authenticity, shipping, and aftercare.",
    image: storesImg,
    points: [
      "All pieces are BIS hallmarked where applicable",
      "Certification details are listed per product",
      "Aftercare support is available through Client Care",
    ],
  },
};

function getPage(slug: string): CarePage {
  if (!(slug in pages)) throw notFound();
  return pages[slug as CareSlug];
}

export const Route = createFileRoute("/care/$slug")({
  loader: ({ params }) => ({ slug: params.slug, page: getPage(params.slug) }),
  head: ({ loaderData }) => ({
    meta: buildMeta({
      title: `${loaderData?.page?.title ?? "Care"} — ME & YOURS`,
      description: loaderData?.page?.intro ?? "Client care and shopping support by ME & YOURS.",
    }),
  }),
  component: CarePageComponent,
});

function CarePageComponent() {
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
            href="/care/contact"
            className="text-[11px] tracking-[0.3em] uppercase text-gold border-b border-gold/40 pb-1"
          >
            Talk to client care
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
