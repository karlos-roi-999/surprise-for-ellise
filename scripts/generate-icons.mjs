import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const svg = readFileSync(new URL("../public/icon-source.svg", import.meta.url));

const targets = [
  { file: "apple-touch-icon.png", size: 180 },
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
  { file: "favicon-32.png", size: 32 },
];

for (const { file, size } of targets) {
  const out = fileURLToPath(new URL(`../public/${file}`, import.meta.url));
  await sharp(svg).resize(size, size).png().toFile(out);
  console.log(`wrote public/${file} (${size}x${size})`);
}
