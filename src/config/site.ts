export const siteConfig = {
  seo: {
    siteUrl: "https://example.com",
    socialImagePath: "/og-image.svg",
  },
  brand: {
    name: "ME & YOURS Maison",
    logoText: "ME & YOURS",
    tagline: "FINE JEWELLERY",
    foundedYear: 1998,
    description:
      "ME & YOURS is a fine jewellery maison creating hand-finished gold and diamond pieces designed to be treasured for generations.",
    shortDescription: "Fine jewellery crafted with modern elegance and timeless artistry.",
  },
  navigation: [
    { label: "Rings", href: "/collections/rings" },
    { label: "Earrings", href: "/collections/earrings" },
    { label: "Necklaces", href: "/collections/necklaces" },
    { label: "Bangles", href: "/collections/bangles" },
    { label: "Shop All", href: "/shop" },
    { label: "Story", href: "/story" },
  ],
  footer: {
    sections: [
      {
        title: "Shop",
        links: [
          { label: "Rings", href: "/collections/rings" },
          { label: "Earrings", href: "/collections/earrings" },
          { label: "Necklaces", href: "/collections/necklaces" },
          { label: "Bangles", href: "/collections/bangles" },
          { label: "Bridal", href: "/collections/bridal" },
          { label: "Gifts", href: "/collections/gifts" },
        ],
      },
      {
        title: "Maison",
        links: [
          { label: "Our Story", href: "/story" },
          { label: "Craft", href: "/maison/craft" },
          { label: "Sustainability", href: "/maison/sustainability" },
          { label: "Press", href: "/maison/press" },
          { label: "Careers", href: "/maison/careers" },
        ],
      },
      {
        title: "Care",
        links: [
          { label: "Contact", href: "/care/contact" },
          { label: "Stores", href: "/care/stores" },
          { label: "Shipping", href: "/care/shipping" },
          { label: "Returns", href: "/care/returns" },
          { label: "Size Guide", href: "/care/size-guide" },
          { label: "FAQ", href: "/care/faq" },
        ],
      },
    ],
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Facebook", href: "https://facebook.com" },
      { label: "Youtube", href: "https://youtube.com" },
    ],
  },
} as const;
