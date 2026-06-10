// One-time bulk upload of public/cases/ to ImageKit under /portfolio/cases/.
// Reads IMAGEKIT_PRIVATE_KEY from .env.local. Idempotent: re-running
// overwrites files with the same name (useUniqueFileName=false).
//
//   node scripts/upload-to-imagekit.mjs [sourceDir]
// sourceDir defaults to public/cases; pass another dir to upload from elsewhere.

import { readFile, readdir } from "node:fs/promises";
import { openAsBlob } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(ROOT, "public", "cases");
const IK_FOLDER = "/portfolio/cases";
const UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";
const CONCURRENCY = 6;

const env = Object.fromEntries(
  (await readFile(path.join(ROOT, ".env.local"), "utf8"))
    .split(/\r?\n/)
    .filter((l) => l.includes("="))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const privateKey = env.IMAGEKIT_PRIVATE_KEY;
if (!privateKey || !privateKey.startsWith("private_")) {
  console.error("IMAGEKIT_PRIVATE_KEY missing from .env.local");
  process.exit(1);
}
const auth = "Basic " + Buffer.from(privateKey + ":").toString("base64");

const files = (await readdir(SRC_DIR, { recursive: true, withFileTypes: true }))
  .filter((d) => d.isFile())
  .map((d) => path.join(d.parentPath, d.name));

console.log(`Uploading ${files.length} files from ${SRC_DIR} -> ${IK_FOLDER}`);

let done = 0;
const failures = [];

async function uploadOne(filePath, attempt = 1) {
  const rel = path.relative(SRC_DIR, filePath);
  const subDir = path.dirname(rel).split(path.sep).filter((s) => s && s !== ".").join("/");
  const folder = subDir ? `${IK_FOLDER}/${subDir}` : IK_FOLDER;

  const form = new FormData();
  form.append("file", await openAsBlob(filePath), path.basename(filePath));
  form.append("fileName", path.basename(filePath));
  form.append("folder", folder);
  form.append("useUniqueFileName", "false");

  const res = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: { Authorization: auth },
    body: form,
  });

  if (!res.ok) {
    const body = await res.text();
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 1000 * attempt));
      return uploadOne(filePath, attempt + 1);
    }
    failures.push({ rel, status: res.status, body });
    console.error(`FAIL ${rel}: ${res.status} ${body}`);
    return;
  }
  done++;
  if (done % 20 === 0 || done === files.length) {
    console.log(`  ${done}/${files.length}`);
  }
}

const queue = [...files];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) await uploadOne(queue.shift());
  })
);

console.log(`\nDone: ${done} uploaded, ${failures.length} failed`);
if (failures.length) {
  console.log(failures.map((f) => f.rel).join("\n"));
  process.exit(1);
}
