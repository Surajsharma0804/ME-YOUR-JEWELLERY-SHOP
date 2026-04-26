import type { ReactNode } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

type SiteLayoutProps = {
  children: ReactNode;
  mainClassName?: string;
};

export function SiteLayout({ children, mainClassName }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className={mainClassName}>{children}</main>
      <Footer />
    </div>
  );
}
