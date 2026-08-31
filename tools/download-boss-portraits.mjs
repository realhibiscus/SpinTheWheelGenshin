import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const [catalogPath, destination] = process.argv.slice(2);
if (!catalogPath || !destination) throw new Error('Usage: node tools/download-boss-portraits.mjs <boss-data.js> <assets-directory>');
const source = await readFile(catalogPath, 'utf8');
const catalog = JSON.parse(source.replace(/^\/\*[^]*?\*\/\s*window\.GENSHIN_BOSSES\s*=\s*/, '').replace(/;\s*$/, ''));
await mkdir(destination, { recursive: true });
const failures = [];
await Promise.all(catalog.map(async (boss) => {
  try {
    const response = await fetch(`https://gi.yatta.moe/assets/UI/monster/${boss.icon}.png`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    await writeFile(join(destination, `${boss.icon}.png`), Buffer.from(await response.arrayBuffer()));
  } catch (error) { failures.push(`${boss.name}: ${error.message}`); }
}));
if (failures.length) { console.error(`Failed downloads:\n${failures.join('\n')}`); process.exitCode = 1; }
