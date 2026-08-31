import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const [catalogPath, destination] = process.argv.slice(2);
if (!catalogPath || !destination) {
  throw new Error('Usage: node tools/download-character-portraits.mjs <character-data.js> <assets-directory>');
}

const source = await readFile(catalogPath, 'utf8');
const catalog = JSON.parse(source.replace(/^\/\*[^]*?\*\/\s*window\.GENSHIN_CHARACTERS\s*=\s*/, '').replace(/;\s*$/, ''));
await mkdir(destination, { recursive: true });

let next = 0;
let completed = 0;
const failures = [];
const workers = Array.from({ length: 8 }, async () => {
  while (next < catalog.length) {
    const character = catalog[next++];
    try {
      let response = await fetch(character.imageUrl || `https://enka.network/ui/${character.icon}.png`);
      if (!response.ok && character.imageUrl) response = await fetch(`https://enka.network/ui/${character.icon}.png`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await writeFile(join(destination, `${character.icon}.png`), Buffer.from(await response.arrayBuffer()));
      completed += 1;
      process.stdout.write(`\rDownloaded ${completed}/${catalog.length}`);
    } catch (error) {
      failures.push(`${character.name}: ${error.message}`);
    }
  }
});

await Promise.all(workers);
process.stdout.write('\n');
if (failures.length) {
  console.error(`Failed downloads:\n${failures.join('\n')}`);
  process.exitCode = 1;
}
