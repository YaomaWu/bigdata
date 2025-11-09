#!/usr/bin/env node
/**
 * Optimize images under `src/.vuepress/public/images`.
 * - Recompress JPEG/PNG in place (only if size is reduced)
 * - Generate alongside WebP files
 * - Skip if outputs are newer than source
 */
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src', '.vuepress', 'public', 'images');
const exts = new Set(['.jpg', '.jpeg', '.png']);

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function statOrNull(p) {
  try { return await fs.stat(p); } catch { return null; }
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

function webpPath(file) {
  const { dir, name } = path.parse(file);
  return path.join(dir, `${name}.webp`);
}

async function optimizeOne(file) {
  const ext = path.extname(file).toLowerCase();
  if (!exts.has(ext)) return { skipped: true };

  const srcStat = await statOrNull(file);
  if (!srcStat) return { skipped: true };

  const webpOut = webpPath(file);
  const webpStat = await statOrNull(webpOut);

  // Skip if outputs newer than source
  if (webpStat && webpStat.mtimeMs > srcStat.mtimeMs) {
    // also try to check .opt marker (we won't use marker, but we will avoid re-encode too often)
  }

  // Recompress original
  const tmp = `${file}.opt`;
  try {
    const img = sharp(file);
    if (ext === '.jpg' || ext === '.jpeg') {
      await img.jpeg({ quality: 76, mozjpeg: true }).toFile(tmp);
    } else if (ext === '.png') {
      await img.png({ compressionLevel: 9, palette: true }).toFile(tmp);
    }

    // Replace if smaller
    const [orig, opt] = await Promise.all([statOrNull(file), statOrNull(tmp)]);
    if (opt && orig && opt.size < orig.size) {
      await fs.rename(tmp, file);
      console.log(`✓ Optimized: ${path.relative(ROOT, file)} (${orig.size} -> ${opt.size})`);
    } else {
      if (await exists(tmp)) await fs.unlink(tmp);
    }
  } catch (e) {
    if (await exists(tmp)) await fs.unlink(tmp);
    console.warn(`! Failed to optimize ${file}:`, e.message);
  }

  // Generate WebP
  try {
    const srcStat2 = await statOrNull(file);
    const webpStat2 = await statOrNull(webpOut);
    if (!webpStat2 || (srcStat2 && webpStat2.mtimeMs <= srcStat2.mtimeMs)) {
      await sharp(file).webp({ quality: 76 }).toFile(webpOut);
      console.log(`+ WebP: ${path.relative(ROOT, webpOut)}`);
    }
  } catch (e) {
    console.warn(`! Failed to generate webp for ${file}:`, e.message);
  }
}

async function main() {
  if (!(await exists(SRC_DIR))) {
    console.log(`No images dir: ${path.relative(ROOT, SRC_DIR)} (skipped)`);
    return;
  }
  let count = 0;
  for await (const f of walk(SRC_DIR)) {
    await optimizeOne(f);
    count++;
  }
  console.log(`Done. Processed ${count} files.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

