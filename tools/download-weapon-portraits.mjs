import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const [catalogPath, destination] = process.argv.slice(2);
if (!catalogPath || !destination) {
  throw new Error('Usage: node tools/download-weapon-portraits.mjs <weapon-data.js> <assets-directory>');
}

const source = await readFile(catalogPath, 'utf8');
const catalog = JSON.parse(source.replace(/^\/\*[^]*?\*\/\s*window\.GENSHIN_WEAPONS\s*=\s*/, '').replace(/;\s*$/, ''));
await mkdir(destination, { recursive: true });

let next = 0;
let completed = 0;
const failures = [];
const workers = Array.from({ length: 8 }, async () => {
  while (next < catalog.length) {
    const weapon = catalog[next++];
    try {
      const response = await fetch(`https://enka.network/ui/${weapon.icon}.png`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await writeFile(join(destination, `${weapon.icon}.png`), Buffer.from(await response.arrayBuffer()));
      completed += 1;
      process.stdout.write(`\rDownloaded ${completed}/${catalog.length}`);
    } catch (error) {
      failures.push(`${weapon.name}: ${error.message}`);
    }
  }
});

await Promise.all(workers);
process.stdout.write('\n');
if (failures.length) {
  console.error(`Failed downloads:\n${failures.join('\n')}`);
  process.exitCode = 1;
}
