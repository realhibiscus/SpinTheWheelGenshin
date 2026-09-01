import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(scriptDir, '..', 'assets', 'elements');
const elements = ['anemo', 'cryo', 'dendro', 'electro', 'geo', 'hydro', 'pyro'];

await mkdir(outputDir, { recursive: true });

for (const element of elements) {
  const filename = `Element ${element[0].toUpperCase()}${element.slice(1)}.svg`;
  const metadata = await fetch(`https://genshin-impact.fandom.com/api.php?action=query&titles=${encodeURIComponent(`File:${filename}`)}&prop=imageinfo&iiprop=url&format=json`);
  if (!metadata.ok) throw new Error(`Could not look up ${element}: ${metadata.status}`);
  const pages = Object.values((await metadata.json()).query?.pages || {});
  const sourceUrl = pages[0]?.imageinfo?.[0]?.url;
  if (!sourceUrl) throw new Error(`No source URL found for ${element}.`);
  const response = await fetch(sourceUrl);
  if (!response.ok) throw new Error(`Could not download ${element}: ${response.status}`);
  await writeFile(resolve(outputDir, `${element}.svg`), Buffer.from(await response.arrayBuffer()));
}

console.log(`Downloaded ${elements.length} Genshin element icons to ${outputDir}.`);
