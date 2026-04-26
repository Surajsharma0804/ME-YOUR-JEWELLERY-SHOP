import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { Story } from "@/components/site/Story";
import { Collections } from "@/components/site/Collections";
import { Trust } from "@/components/site/Trust";
import { SiteLayout } from "@/components/site/SiteLayout";
import { buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildMeta({
      title: "ME & YOURS — Fine Jewellery, A Story You Wear",
      description:
        "ME & YOURS is a luxury jewellery maison crafting hand-finished gold and diamond pieces. Bridal, everyday, and heirloom collections designed for the moments that matter.",
      ogTitle: "ME & YOURS — A Story You Wear",
      ogDescription: "Cinematic luxury jewellery. Hand-crafted. Hallmarked. Forever yours.",
    }),
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Categories />
      <Story />
      <Collections />
      <Trust />
    </SiteLayout>
  );
}
