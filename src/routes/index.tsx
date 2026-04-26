import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { Story } from "@/components/site/Story";
import { Collections } from "@/components/site/Collections";
import { Trust } from "@/components/site/Trust";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ME & YOURS — Fine Jewellery, A Story You Wear" },
      {
        name: "description",
        content:
          "ME & YOURS is a luxury jewellery maison crafting hand-finished gold and diamond pieces. Bridal, everyday, and heirloom collections — designed for the moments that matter.",
      },
      { property: "og:title", content: "ME & YOURS — A Story You Wear" },
      {
        property: "og:description",
        content: "Cinematic luxury jewellery. Hand-crafted. Hallmarked. Forever yours.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Story />
        <Collections />
        <Trust />
      </main>
      <Footer />
    </div>
  );
}
