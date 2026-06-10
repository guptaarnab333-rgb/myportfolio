import sharp from "sharp";
import fs from "fs";
import path from "path";

const PUBLIC = "public";
const SRC_DIRS = ["app", "components", "lib"];
const SRC_EXT = /\.(tsx?|jsx?|css|mjs)$/;

function walk(d) {
  return fs.existsSync(d)
    ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(d, e.name);
        return e.isDirectory() ? walk(p) : [p];
      })
    : [];
}
const MB = (b) => (b / 1048576).toFixed(1);

// ---- 1. delete the backup folder (definitively unreferenced) ----
const backup = path.join(PUBLIC, "cases", "_backup_covers_20260609");
let backupBytes = 0,
  backupCount = 0;
if (fs.existsSync(backup)) {
  for (const f of walk(backup)) {
    backupBytes += fs.statSync(f).size;
    backupCount++;
  }
  fs.rmSync(backup, { recursive: true, force: true });
}

// ---- 2. convert every PNG in public/ -> WebP, drop the original ----
const pngs = walk(PUBLIC).filter((f) => /\.png$/i.test(f));
let beforeBytes = 0,
  afterBytes = 0,
  converted = 0,
  resized = 0;
for (const f of pngs) {
  const meta = await sharp(f).metadata();
  const before = fs.statSync(f).size;
  const out = f.replace(/\.png$/i, ".webp");
  const pipe = sharp(f);
  if (meta.width && meta.width > 1920) {
    pipe.resize({ width: 1920 });
    resized++;
  }
  await pipe
    .webp({ quality: meta.hasAlpha ? 90 : 80, alphaQuality: 100, effort: 6 })
    .toFile(out);
  const after = fs.statSync(out).size;
  beforeBytes += before;
  afterBytes += after;
  converted++;
  fs.rmSync(f);
}

// ---- 3. rewrite .png -> .webp in source (literal "..png" AND template `..${x}.png`) ----
const srcFiles = SRC_DIRS.flatMap(walk).filter((f) => SRC_EXT.test(f));
const RE = /\.png(?=["'`])/g;
let edited = 0;
for (const f of srcFiles) {
  const t = fs.readFileSync(f, "utf8");
  const n = t.replace(RE, ".webp");
  if (n !== t) {
    fs.writeFileSync(f, n);
    edited++;
  }
}

console.log(`Deleted backup folder:  ${backupCount} files, ${MB(backupBytes)} MB`);
console.log(`Converted PNG -> WebP:  ${converted} files (${resized} downsized to 1920px)`);
console.log(`  PNG total:   ${MB(beforeBytes)} MB`);
console.log(`  WebP total:  ${MB(afterBytes)} MB`);
console.log(
  `  Saved:       ${MB(beforeBytes - afterBytes)} MB  (${(100 * (1 - afterBytes / beforeBytes)).toFixed(0)}% smaller)`
);
console.log(`Source files updated:   ${edited}`);
