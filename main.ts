// makefun-gta6-meme-x-01 — the entry program.
//
// The entry itself is the X post: a GTA 6 WANTED-poster meme, posted from a
// public account with make.fun and the play code in its text. This program
// does the one mechanical job the harness needs: it hands the post's address
// to the grader by copying POST.json out of the repository and into the
// output directory. Nothing here judges anything, fetches anything, or reads
// the clock — it is a plain file copy, so two runs write identical bytes.
//
// Node 22, standard library only. Locally:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Inside the grader these are /bot and /output; the env vars let a local
// run point them somewhere harmless instead. No other input is read: the
// post's address comes from the repository file alone.
const repoRoot = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });

const source = join(repoRoot, "POST.json");
const target = join(outDir, "POST.json");

// One copy, no transformation: the grader reads the post itself from X,
// so whatever bytes POST.json holds here are exactly what it gets.
try {
  copyFileSync(source, target);
} catch (error) {
  console.error(`could not copy ${source} to ${target}: ${(error as Error).message}`);
  process.exit(1);
}
