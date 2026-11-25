// News image entry for make.fun's news-image-20261124: the program ships the
// front page (entry.png) built in-session and writes it to /output/entry.png.
// Node 22, standard library only, no network. It runs twice and writes the
// same bytes both times, because it only copies a fixed file.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const bytes = readFileSync(join(here, 'entry.png'));

// A PNG starts with these eight bytes; refuse to write anything else, so a
// damaged or replaced image fails loudly instead of reaching the judge.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error('entry.png is not a PNG file');
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), bytes);
console.log(`wrote entry.png (${bytes.length} bytes)`);
