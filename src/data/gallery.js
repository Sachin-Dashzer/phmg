// Gallery media, rendered at /gallery.
//
// Photos: drop a file into public/images/gallery (or reuse one already in public/images) and add
// an entry. `alt` is required — it is what a screen reader and an image search read. Keep it
// factual: describe what is in the frame, do not sell.
//
// Videos: YouTube only, by video id, from the firm's own channel. The channel is in firm.social.
// TODO: CLIENT TO CONFIRM — no video ids have been supplied, so `videos` is empty and the video
// section does not render. Add ids as they become available. Tracked in REVIEW.md.
//
// Run `node scripts/optimise-images.mjs` after adding large photos.

export const albums = [
  { slug: "offices", title: "Our offices", blurb: "The places we work from and meet clients." },
  { slug: "team", title: "The team", blurb: "Partners and branch heads." },
  { slug: "events", title: "Events and training", blurb: "Seminars, training sessions and firm events." },
];

// Shape: { src, alt, album, caption?, width?, height? }
// Only the files that actually exist in public/ are listed. Nothing is referenced speculatively:
// a missing file would be a broken image on a live page.
export const photos = [
  {
    src: "/images/office/office-1.jpeg",
    alt: "Reception and waiting area at the PHMG & Associates office",
    album: "offices",
    caption: "Reception",
  },
  {
    src: "/images/office/office-2.jpeg",
    alt: "Meeting room at the PHMG & Associates office",
    album: "offices",
    caption: "Meeting room",
  },
  {
    src: "/images/office/office-3.jpeg",
    alt: "Open working area at the PHMG & Associates office",
    album: "offices",
    caption: "Working area",
  },
  {
    src: "/images/team/piyush.jpeg",
    alt: "CA Piyush Mishra, Founding Partner",
    album: "team",
    caption: "CA Piyush Mishra, Founding Partner",
  },
  {
    src: "/images/team/ankit.jpeg",
    alt: "CA Ankit Choudhary, Partner – Business Development",
    album: "team",
    caption: "CA Ankit Choudhary, Partner – Business Development",
  },
  {
    src: "/images/team/praveen.jpeg",
    alt: "CA Praveen Thakur, Partner",
    album: "team",
    caption: "CA Praveen Thakur, Partner",
  },
  {
    src: "/images/team/manish.jpeg",
    alt: "CA Manish Goel, Head of the Delhi branch",
    album: "team",
    caption: "CA Manish Goel, Head – Delhi Branch",
  },
  {
    src: "/images/team/mehtaab.jpeg",
    alt: "CA Mehtaab Qureshi, Head of the Ludhiana branch",
    album: "team",
    caption: "CA Mehtaab Qureshi, Head – Ludhiana Branch",
  },
];

// Shape: { id, title, description?, album? }  — `id` is the YouTube video id, not the full URL.
export const videos = [];

export const photosIn = (album) => photos.filter((p) => p.album === album);
export const activeAlbums = () => albums.filter((a) => photosIn(a.slug).length > 0);
