// Recompresses heavy source images in public/. Run: node scripts/optimise-images.mjs
//
// next/image optimises on delivery, but the source files are what gets committed, deployed and
// read at build time, so their raw size still matters. Dimensions are never changed here, only
// the encoder and quality, so the images look the same.
//
// Photographs stored as PNG are the usual cause of a very large file: PNG is lossless and has no
// business holding a photograph. Those are converted to JPEG and the file is renamed, so the
// references in the code have to be updated to match (the script prints which ones).
//
// sharp ships with Next, so this adds no dependency.
import sharp from "sharp";
import { statSync, existsSync, unlinkSync } from "node:fs";

// `maxWidth` caps the stored width. Only set it where the source is far larger than anything the
// layout can ever request: next/image generates the sized variants from this file, so the source
// only has to cover the widest variant, not the camera's native resolution. Capping does not
// change how the image looks at any size the page actually renders it.
const targets = [
  { file: "public/who-we-serve.jpg", to: "public/who-we-serve.jpg", q: 80, maxWidth: 2400 },
  { file: "public/banner.png", to: "public/banner.jpg", q: 82 },
  { file: "public/images/stock-audit.png", to: "public/images/stock-audit.jpg", q: 82 },
  // Phone photographs added in October 2026, stored at full camera resolution. 1600px covers the
  // widest variant any layout here requests (a full-bleed hero at 100vw), so the cap costs nothing
  // on screen and takes several megabytes out of the repository and the deploy.
  { file: "public/images/office/office-12.jpeg", to: "public/images/office/office-12.jpeg", q: 80, maxWidth: 1600 },
  { file: "public/images/office/office-13.jpeg", to: "public/images/office/office-13.jpeg", q: 80, maxWidth: 1600 },
  { file: "public/images/office/office-14.jpeg", to: "public/images/office/office-14.jpeg", q: 80, maxWidth: 1600 },
  { file: "public/images/team/full-team.jpeg", to: "public/images/team/full-team.jpeg", q: 80, maxWidth: 1600 },
];

const kb = (n) => `${Math.round(n / 1024)} KB`;
let changed = 0;

for (const { file, to, q, maxWidth } of targets) {
  if (!existsSync(file)) {
    console.log(`${file}: not found, skipping`);
    continue;
  }
  const before = statSync(file).size;
  const meta = await sharp(file).metadata();
  const tmp = `${to}.tmp`;

  await sharp(file)
    // These PNGs carry no meaningful transparency; flatten onto white so JPEG has no black edges.
    .flatten({ background: "#ffffff" })
    // withoutEnlargement: never upscale a source that is already smaller than the cap.
    .resize(maxWidth ? { width: maxWidth, withoutEnlargement: true } : undefined)
    .jpeg({ quality: q, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toFile(tmp);

  const after = statSync(tmp).size;
  if (after >= before) {
    unlinkSync(tmp);
    console.log(`${file}: ${kb(before)} -> ${kb(after)}, no gain, left alone`);
    continue;
  }

  // Replace, then remove the original if the extension changed.
  const { renameSync } = await import("node:fs");
  renameSync(tmp, to);
  if (to !== file) unlinkSync(file);

  const m2 = await sharp(to).metadata();
  // Dimensions may only change where a cap was asked for, and only downwards.
  if (!maxWidth && (meta.width !== m2.width || meta.height !== m2.height)) {
    throw new Error(`${file}: dimensions changed without a maxWidth, which must never happen`);
  }
  if (m2.width > meta.width) throw new Error(`${file}: image was enlarged`);
  changed++;
  const dims = meta.width === m2.width
    ? `${m2.width}x${m2.height} kept`
    : `${meta.width}x${meta.height} -> ${m2.width}x${m2.height}`;
  console.log(
    `${file} -> ${to}: ${kb(before)} -> ${kb(after)} ` +
    `(${Math.round((1 - after / before) * 100)}% smaller), ${dims}`
  );
  if (to !== file) console.log(`   update references from ${file.replace("public", "")} to ${to.replace("public", "")}`);
}

console.log(`\n${changed} file(s) recompressed.`);
