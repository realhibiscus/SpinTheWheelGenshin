import { writeFile } from 'node:fs/promises';

const [outputPath = 'character-data.js'] = process.argv.slice(2);
const response = await fetch('https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&verboseCategories=true');
if (!response.ok) throw new Error('Unable to download the current Genshin character catalog.');

const seenNames = new Set();
const catalog = (await response.json())
  .filter((character) => (
    character.name
    && character.weaponType
    && (character.rarity === 4 || character.rarity === 5)
    && character.associationType !== 'ASSOC_MAINACTOR'
    && character.images?.mihoyo_sideIcon
  ))
  .map((character) => ({
    id: String(character.id),
    name: character.name,
    rarity: character.rarity,
    element: character.elementText,
    weaponType: character.weaponType,
    icon: character.images.filename_icon,
    imageUrl: character.images.mihoyo_icon
  }))
  .filter((character) => {
    if (seenNames.has(character.name)) return false;
    seenNames.add(character.name);
    return true;
  })
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((character) => ({ ...character, portrait: `assets/characters/${character.icon}.png` }));

const output = `/* Generated from the current genshin-db character API. */\nwindow.GENSHIN_CHARACTERS = ${JSON.stringify(catalog, null, 2)};\n`;
await writeFile(outputPath, output, 'utf8');
console.log(`Generated ${catalog.length} character entries.`);
