import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(scriptDir, '..', 'assets', 'weapon-types');
const weaponTypes = ['bow', 'catalyst', 'claymore', 'polearm', 'sword'];

await mkdir(outputDir, { recursive: true });

for (const weaponType of weaponTypes) {
  const filename = `Weapon-class-${weaponType}-icon.png`;
  const metadata = await fetch(`https://genshin-impact.fandom.com/api.php?action=query&titles=${encodeURIComponent(`File:${filename}`)}&prop=imageinfo&iiprop=url&format=json`);
  if (!metadata.ok) throw new Error(`Could not look up ${weaponType}: ${metadata.status}`);
  const pages = Object.values((await metadata.json()).query?.pages || {});
  const sourceUrl = pages[0]?.imageinfo?.[0]?.url;
  if (!sourceUrl) throw new Error(`No source URL found for ${weaponType}.`);
  const response = await fetch(sourceUrl);
  if (!response.ok) throw new Error(`Could not download ${weaponType}: ${response.status}`);
  await writeFile(resolve(outputDir, `${weaponType}.png`), Buffer.from(await response.arrayBuffer()));
}

console.log(`Downloaded ${weaponTypes.length} Genshin weapon-type icons to ${outputDir}.`);
