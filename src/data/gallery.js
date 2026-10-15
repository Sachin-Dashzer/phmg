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
  { slug: "events", title: "Events and training", blurb: "Conferences, training sessions and firm events." },
];

// Shape: { src, alt, album, caption?, width, height }
// width/height are the file's own pixel dimensions. The gallery uses them for the frame's aspect
// ratio, so a portrait photograph is not cropped to landscape; they are not a resize instruction.
// Only the files that actually exist in public/ are listed. Nothing is referenced speculatively:
// a missing file would be a broken image on a live page.
export const photos = [
  {
    src: "/images/office/office-1.jpeg",
    alt: "Working area at the PHMG & Associates office",
    album: "offices",
    caption: "Working area",
    width: 1448,
    height: 1086,
  },
  {
    src: "/images/office/office-2.jpeg",
    alt: "Meeting room at the PHMG & Associates office",
    album: "offices",
    caption: "Meeting room",
    width: 1600,
    height: 900,
  },
  {
    src: "/images/office/office-3.jpeg",
    alt: "Reception and waiting area at the PHMG & Associates office",
    album: "offices",
    caption: "Reception and waiting area",
    width: 1086,
    height: 1448,
  },
  {
    src: "/images/office/office-9.jpeg",
    alt: "Members of the team working at desks in the open-plan area of a PHMG & Associates office",
    album: "offices",
    caption: "Open-plan working area",
    width: 1280,
    height: 960,
  },
  {
    src: "/images/office/office-10.jpeg",
    alt: "The open-plan working area of a PHMG & Associates office during the working day",
    album: "offices",
    caption: "A working day",
    width: 1280,
    height: 960,
  },
  {
    src: "/images/office/office-6.jpeg",
    alt: "Two colleagues reviewing a working file on screen at a desk in a PHMG & Associates office",
    album: "offices",
    caption: "Reviewing a working file",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/office/office-7.jpeg",
    alt: "Two colleagues discussing a schedule across two laptops in a PHMG & Associates office",
    album: "offices",
    caption: "Working through a schedule",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/office/office-8.jpeg",
    alt: "A review discussion at a desk in a PHMG & Associates office",
    album: "offices",
    caption: "A review discussion",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/team/piyush.jpeg",
    alt: "CA Piyush Mishra, Founding Partner",
    album: "team",
    caption: "CA Piyush Mishra, Founding Partner",
    width: 578,
    height: 582,
  },
  {
    src: "/images/team/ankit.jpeg",
    alt: "CA Ankit Choudhary, Partner – Business Development",
    album: "team",
    caption: "CA Ankit Choudhary, Partner – Business Development",
    width: 646,
    height: 645,
  },
  {
    src: "/images/team/praveen.jpeg",
    alt: "CA Praveen Thakur, Partner",
    album: "team",
    caption: "CA Praveen Thakur, Partner",
    width: 1122,
    height: 1402,
  },
  {
    src: "/images/team/manish.jpeg",
    alt: "CA Manish Goel, Head of the Delhi branch",
    album: "team",
    caption: "CA Manish Goel, Head – Delhi Branch",
    width: 573,
    height: 532,
  },
  {
    src: "/images/team/mehtaab.jpeg",
    alt: "CA Mehtaab Qureshi, Head of the Ludhiana branch",
    album: "team",
    caption: "CA Mehtaab Qureshi, Head – Ludhiana Branch",
    width: 390,
    height: 480,
  },
  {
    src: "/images/team/piyush-2.jpeg",
    alt: "CA Piyush Mishra working at his desk",
    album: "team",
    caption: "CA Piyush Mishra at his desk",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/office/office-12.jpeg",
    alt: "Four members of the PHMG & Associates team standing together in an office",
    album: "team",
    caption: "Colleagues from the team",
    width: 1600,
    height: 2133,
  },
  {
    src: "/images/office/office-14.jpeg",
    alt: "Partners of PHMG & Associates with delegate badges at an ICAI conference",
    album: "events",
    caption: "At an ICAI conference",
    width: 1600,
    height: 2133,
  },
  {
    src: "/images/team/full-team.jpeg",
    alt: "The team at the office during a Holi celebration",
    album: "events",
    caption: "Holi at the office",
    width: 1600,
    height: 2133,
  },
  {
    src: "/images/office/office-13.jpeg",
    alt: "The team together on a firm outing",
    album: "events",
    caption: "A firm outing",
    width: 1600,
    height: 1200,
  },
];

// Shape: { id, title, description?, album? }  — `id` is the YouTube video id, not the full URL.
export const videos = [];

export const photosIn = (album) => photos.filter((p) => p.album === album);
export const activeAlbums = () => albums.filter((a) => photosIn(a.slug).length > 0);
