import { firm } from "@/data/firm";

export const SITE_URL = firm.url;
export const absUrl = (path = "/") => new URL(path, SITE_URL).toString();

/** Keep titles within ~60 chars: the brand suffix is dropped if too long. */
const withBrand = (t) => (t.length + 20 <= 60 ? `${t} | ${firm.name}` : t);

// ownImage: the route has its own opengraph-image file, so skip the default one.
export function buildMetadata({ title, description, path = "/", noindex = false, type = "website", ownImage = false, extra = {} }) {
  const url = absUrl(path);
  const images = ownImage ? undefined : [absUrl("/opengraph-image")];
  return {
    title: { absolute: withBrand(title) },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: firm.name, locale: "en_IN", type, ...(images && { images }) },
    twitter: { card: "summary_large_image", title, description, ...(images && { images }) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    ...extra,
  };
}
