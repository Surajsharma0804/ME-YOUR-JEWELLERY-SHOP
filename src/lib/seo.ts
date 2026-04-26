type MetaEntry = {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
  charSet?: string;
};

type MetaOptions = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
};

export function buildMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  image,
}: MetaOptions): MetaEntry[] {
  const result: MetaEntry[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: ogTitle ?? title },
    { property: "og:description", content: ogDescription ?? description },
    { name: "twitter:title", content: ogTitle ?? title },
    { name: "twitter:description", content: ogDescription ?? description },
  ];

  if (image) {
    result.push({ property: "og:image", content: image });
    result.push({ name: "twitter:image", content: image });
  }

  return result;
}
