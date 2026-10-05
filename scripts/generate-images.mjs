// Generates responsive screenshot sizes and favicons from the source images in public/.
// Run after replacing a screenshot or the app icon: npm run images
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const screensDir = path.join(publicDir, "images/screens/latest");
const appIcon = path.join(publicDir, "images/app-icon.png");

// Keep in sync with SCREEN_WIDTHS in app/components/PhoneMockup.tsx.
const SCREEN_WIDTHS = [400, 640, 960];

async function generateScreens() {
  const sources = (await readdir(screensDir)).filter((file) => file.endsWith(".webp") && !/-\d+w\.webp$/.test(file));
  for (const file of sources) {
    const name = file.replace(/\.webp$/, "");
    for (const width of SCREEN_WIDTHS) {
      await sharp(path.join(screensDir, file))
        .resize({ width })
        .webp({ quality: 82, alphaQuality: 90, effort: 6 })
        .toFile(path.join(screensDir, `${name}-${width}w.webp`));
    }
    console.log(`screens: ${file} -> ${SCREEN_WIDTHS.join(", ")}w`);
  }
}

// ICO files can embed PNG images directly; every modern browser supports this.
function pngsToIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + pngs.length * 16;
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map(({ data }) => data)]);
}

async function generateIcons() {
  const png = (size) => sharp(appIcon).resize(size, size).png({ compressionLevel: 9, palette: size <= 64 ? false : true, quality: 90 }).toBuffer();
  await writeFile(path.join(publicDir, "images/app-icon-128.png"), await png(128));
  await writeFile(path.join(publicDir, "images/icon-192.png"), await png(192));
  await writeFile(path.join(publicDir, "apple-touch-icon.png"), await png(180));
  const icoSizes = [16, 32, 48];
  await writeFile(path.join(publicDir, "favicon.ico"), pngsToIco(await Promise.all(icoSizes.map(async (size) => ({ size, data: await png(size) })))));
  console.log("icons: app-icon-128.png, icon-192.png, apple-touch-icon.png, favicon.ico");
}

await generateScreens();
await generateIcons();
