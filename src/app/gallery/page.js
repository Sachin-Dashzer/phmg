import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Images } from "lucide-react";
import { albums, photos, videos, photosIn, activeAlbums } from "@/data/gallery";
import { firm } from "@/data/firm";
import { buildMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CTABand from "@/components/ui/CTABand";

export const metadata = buildMetadata({
  title: "Gallery",
  description:
    "Photographs of the PHMG & Associates offices and team across Noida, Delhi, Ludhiana and Meerut, together with videos from our channel.",
  path: "/gallery",
});

// A masonry-style grid: CSS columns rather than JS, so it reflows with no layout shift and needs
// no client code. Each image keeps its own aspect ratio instead of being cropped to a square,
// which is what makes a gallery of mixed portrait and landscape photographs look deliberate.
const Photo = ({ p, priority }) => (
  <figure className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-brand-line bg-brand-mist">
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: p.width && p.height ? `${p.width} / ${p.height}` : "4 / 3" }}
    >
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
        {...(priority ? { fetchPriority: "high", loading: "eager" } : {})}
      />
    </div>
    {p.caption && (
      <figcaption className="px-4 py-3 text-sm text-brand-muted">{p.caption}</figcaption>
    )}
  </figure>
);

export default function Gallery() {
  const shown = activeAlbums();

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Gallery", href: "/gallery" }]}
        eyebrow="Gallery"
        title="Our offices and team"
        intro="Photographs from the four offices we work from, and the partners and branch heads who lead them."
        image="/images/office/office-1.jpeg"
      >
        <div className="flex flex-wrap gap-3">
          {shown.map((a) => (
            <Link key={a.slug} href={`#${a.slug}`} className="btn btn-ghost-light">{a.title}</Link>
          ))}
          {videos.length > 0 && <Link href="#videos" className="btn btn-ghost-light">Videos</Link>}
        </div>
      </PageHeader>

      {shown.length === 0 ? (
        <section className="section bg-white">
          <div className="container-x flex max-w-xl flex-col items-center gap-4 text-center">
            <Images size={34} className="text-brand-gold" aria-hidden="true" />
            <h2 className="font-display text-2xl font-bold">Photographs are on the way</h2>
            <p className="text-brand-muted">
              We are putting this gallery together. In the meantime, you are welcome to visit any of
              our offices.
            </p>
            <Link href="/locations" className="btn btn-primary">See our offices <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </section>
      ) : (
        shown.map((album, ai) => (
          <section
            key={album.slug}
            id={album.slug}
            aria-labelledby={`${album.slug}-title`}
            className={`section scroll-mt-24 ${ai % 2 === 0 ? "bg-white" : "bg-brand-mist"}`}
          >
            <div className="container-x">
              <SectionHeading id={`${album.slug}-title`} label="Album" title={album.title} intro={album.blurb} />
              <ScrollReveal className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                {photosIn(album.slug).map((p, i) => (
                  <Photo key={p.src} p={p} priority={ai === 0 && i === 0} />
                ))}
              </ScrollReveal>
            </div>
          </section>
        ))
      )}

      {videos.length > 0 && (
        <section aria-labelledby="videos-title" id="videos" className="section scroll-mt-24 bg-brand-navy">
          <div className="container-x">
            <SectionHeading id="videos-title" dark label="Videos" title="From our channel" />
            <ScrollReveal stagger className="grid gap-6 md:grid-cols-2">
              {videos.map((v) => (
                <figure key={v.id} className="overflow-hidden rounded-2xl bg-black ring-1 ring-white/10">
                  {/* youtube-nocookie and no autoplay: nothing loads a tracking cookie until the
                      visitor presses play, which keeps this consistent with the cookie banner. */}
                  <div className="relative aspect-video">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                      title={v.title}
                      loading="lazy"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  <figcaption className="p-4">
                    <h3 className="font-semibold text-white">{v.title}</h3>
                    {v.description && <p className="mt-1 text-sm text-white/65">{v.description}</p>}
                  </figcaption>
                </figure>
              ))}
            </ScrollReveal>
          </div>
        </section>
      )}

      {videos.length === 0 && firm.social.youtube && (
        <section aria-labelledby="channel-title" className="section bg-brand-navy">
          <div className="container-x flex max-w-2xl flex-col items-center gap-4 text-center">
            <Play size={32} className="text-brand-gold" aria-hidden="true" />
            <h2 id="channel-title" className="font-display text-2xl font-bold text-white md:text-3xl">Videos</h2>
            <p className="text-white/70">
              Our videos are published on YouTube. We are adding them to this page; until then you
              can watch them on the channel.
            </p>
            <a href={firm.social.youtube} rel="noopener" className="btn btn-gold">
              Open our YouTube channel <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
      )}

      <CTABand
        title="Prefer to meet in person?"
        text="You are welcome at any of our four offices. Tell us what you need and we will arrange a time."
        cta="Book a consultation"
      />
    </>
  );
}
