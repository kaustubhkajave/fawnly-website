// Turns raw iPhone screenshots from the app repo's design folder into the framed phones and
// widget cards used on the site. Run, then `npm run images` for the responsive sizes:
//   node scripts/frame-screens.mjs [path/to/StepTrack/design]
// Mirrors design/app-store/shared.js: the real status bar is covered with the empty middle of
// the same bar and replaced by a clean 9:41 one, then the shot gets an iPhone 15/16 Pro frame.
import path from "node:path";
import sharp from "sharp";

const design = path.resolve(process.argv[2] ?? "../../androidWork/StepCount/StepTrack/design");
const appStore = (file) => path.join(design, "app-store/raw", file);
const widgetShot = (file) => path.join(design, "widgets/raw", file);
const screensDir = path.resolve("public/images/screens/latest");
const widgetsDir = path.resolve("public/images/widgets");

const SCREENS = {
  "home-sheep-meadow": "IMG_1222.PNG",
  "home-warm-green": "1-home-steps.PNG",
  "home-distance": "2-home-distance.PNG",
  "history-month": "IMG_1206.PNG",
  themes: "IMG_1225.PNG",
  "share-card": "IMG_1228.PNG",
};

const WIDGETS = {
  "sheep-meadow": "IMG_1229.PNG",
  "honeydew-meadow": "IMG_1230.PNG",
  "fawn-pond": "IMG_1231.PNG",
  "maple-brook": "IMG_1232.PNG",
  "heart-bloom": "IMG_1233.PNG",
};

// Screenshot space is 1179x2556 (iPhone 15/16 Pro at 3x).
const W = 1179, H = 2556;

const statusBar = (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="160">
  <text x="195" y="114" text-anchor="middle" font-family="Segoe UI Semibold, Segoe UI, sans-serif" font-weight="600" font-size="54" fill="${color}">9:41</text>
  <g fill="${color}" transform="translate(${W - 100 - 54 - 14 - 50 - 14 - 84} 70)">
    <rect x="0" y="22" width="9" height="12" rx="2"/><rect x="14" y="15" width="9" height="19" rx="2"/><rect x="28" y="8" width="9" height="26" rx="2"/><rect x="42" y="0" width="9" height="34" rx="2"/>
    <g transform="translate(68 -1)"><path d="M25 7c7 0 13.4 2.7 18.2 7.1l3.6-3.7C41 5 33.4 2 25 2S9 5 3.2 10.4l3.6 3.7C11.6 9.7 18 7 25 7z"/><path d="M25 16.5c4.4 0 8.4 1.7 11.4 4.4l3.6-3.6C36 13.6 30.8 11.5 25 11.5S14 13.6 10 17.3l3.6 3.6c3-2.7 7-4.4 11.4-4.4z"/><path d="M25 33l6.9-6.9C30 24.8 27.6 24 25 24s-5 .8-6.9 2.1z"/></g>
    <g transform="translate(132 -3)"><rect x="1.5" y="1.5" width="72" height="37" rx="11" fill="none" stroke="${color}" stroke-opacity=".4" stroke-width="3"/><rect x="7" y="7" width="61" height="26" rx="6"/><rect x="77" y="13" width="5" height="14" rx="2" fill-opacity=".4"/></g>
  </g></svg>`;

// Alpha mask that is solid, then fades over the last 90px towards `fadeTo` and below y=130.
function patchMask(w, fadeTo) {
  const [x1, x2] = fadeTo === "right" ? [0, 1] : [1, 0];
  const stop = ((w - 90) / w).toFixed(3);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="175">
    <defs><linearGradient id="h" x1="${x1}" x2="${x2}"><stop offset="${stop}" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="v" x2="0" y2="1"><stop offset=".743" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <mask id="m"><rect width="${w}" height="175" fill="url(#v)"/></mask></defs>
    <rect width="${w}" height="175" fill="url(#h)" mask="url(#m)"/></svg>`);
}

async function patch(file, fromX, w, fadeTo) {
  return sharp(file).extract({ left: fromX, top: 0, width: w, height: 175 })
    .composite([{ input: patchMask(w, fadeTo), blend: "dest-in" }]).png().toBuffer();
}

async function cleanScreen(file) {
  return sharp(file).composite([
    { input: await patch(file, 420, 420, "right"), left: 0, top: 0 },
    { input: await patch(file, 400, 439, "left"), left: 740, top: 0 },
    { input: Buffer.from(statusBar("#000")), left: 0, top: 0 },
  ]).png().toBuffer();
}

// Proportions from shared.js phone(): bezel 2.6% of the phone width, 55pt corners on a 393pt
// screen, a 125x37pt Dynamic Island 11pt from the top.
async function framePhone(file) {
  const pt = W / 393;
  const bezel = 32, radius = Math.round(55 * pt), outer = radius + bezel;
  const fw = W + 2 * bezel, fh = H + 2 * bezel;
  const island = { w: Math.round(125 * pt), h: Math.round(37 * pt), top: Math.round(11 * pt) };
  const roundMask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" rx="${radius}"/></svg>`);
  const screen = await sharp(await cleanScreen(file)).composite([{ input: roundMask, blend: "dest-in" }]).png().toBuffer();
  const body = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${fw}" height="${fh}">
    <rect width="${fw}" height="${fh}" rx="${outer}" fill="#161616"/>
    <rect x="2.5" y="2.5" width="${fw - 5}" height="${fh - 5}" rx="${outer - 2.5}" fill="none" stroke="#3a3a3a" stroke-width="5"/></svg>`);
  const islandSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${island.w}" height="${island.h}"><rect width="${island.w}" height="${island.h}" rx="${island.h / 2}"/></svg>`);
  return sharp(body).composite([
    { input: screen, left: bezel, top: bezel },
    { input: islandSvg, left: Math.round((fw - island.w) / 2), top: bezel + island.top },
  ]);
}

// The medium widget on the Home Screen shots, cut out with its own rounded corners.
const MEDIUM = { left: 75, top: 835, width: 1030, height: 484 };

async function cutWidget(file) {
  const { width, height } = MEDIUM, radius = 78;
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}"/></svg>`);
  return sharp(await sharp(await sharp(file).extract(MEDIUM).png().toBuffer()).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer());
}

for (const [name, file] of Object.entries(SCREENS)) {
  await (await framePhone(appStore(file))).webp({ quality: 90, alphaQuality: 90, effort: 6 }).toFile(path.join(screensDir, `${name}.webp`));
  console.log(`screens: ${file} -> ${name}.webp`);
}

for (const [name, file] of Object.entries(WIDGETS)) {
  const widget = await cutWidget(widgetShot(file));
  await widget.clone().webp({ quality: 88, alphaQuality: 90, effort: 6 }).toFile(path.join(widgetsDir, `${name}.webp`));
  await widget.clone().resize({ width: 520 }).webp({ quality: 84, alphaQuality: 90, effort: 6 }).toFile(path.join(widgetsDir, `${name}-520w.webp`));
  console.log(`widgets: ${file} -> ${name}.webp`);
}
