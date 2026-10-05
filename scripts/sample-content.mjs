// Lists every line tagged `// SAMPLE` so nothing made-up goes live by accident.
// Usage: npm run check:samples
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(jsx?|mjs)$/.test(f) ? [p] : [];
  });

const hits = [];
for (const file of walk(join(root, 'src'))) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (/(?<!`)\/\/\s*SAMPLE\b/.test(line)) hits.push(`${relative(root, file)}:${i + 1}  ${line.trim().slice(0, 110)}`);
  });
}

if (hits.length) {
  console.log(`${hits.length} sample value(s) still need real content:\n`);
  console.log(hits.join('\n'));
  process.exitCode = 1;
} else {
  console.log('No sample content left. Ready to launch.');
}
