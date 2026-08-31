import { writeFile } from 'node:fs/promises';

const [outputPath = 'weapon-data.js'] = process.argv.slice(2);
const [weaponsResponse, localizationResponse] = await Promise.all([
  fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/weapons.json'),
  fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json')
]);

if (!weaponsResponse.ok || !localizationResponse.ok) {
  throw new Error('Unable to download the current Enka weapon catalog.');
}

const weapons = await weaponsResponse.json();
const englishNames = (await localizationResponse.json()).en;
const seen = new Set();
const fallbackNames = {
  '11201': 'Silver Sword',
  '11302': 'Harbinger of Dawn',
  '11303': "Traveler's Handy Sword",
  '11304': 'Dark Iron Sword',
  '11305': 'Fillet Blade',
  '11306': 'Skyrider Sword',
  '12101': 'Waster Greatsword',
  '12201': "Old Merc's Pal",
  '12301': 'Ferrous Shadow',
  '12305': 'Debate Club',
  '12306': 'Skyrider Greatsword',
  '13302': 'Halberd',
  '14302': 'Thrilling Tales of Dragon Slayers',
  '14305': 'Twin Nephrite',
  '15201': "Seasoned Hunter's Bow",
  '15304': 'Slingshot',
  '15305': 'Messenger'
};
const weaponTypes = {
  1: 'WEAPON_SWORD_ONE_HAND',
  2: 'WEAPON_CLAYMORE',
  3: 'WEAPON_BOW',
  4: 'WEAPON_POLE',
  5: 'WEAPON_CATALYST'
};

const catalog = Object.entries(weapons)
  .map(([id, weapon]) => ({
    id,
    name: englishNames[weapon.NameTextMapHash] || fallbackNames[id],
    rarity: Number(weapon.Rarity ?? weapon.rankLevel ?? weapon.RankLevel),
    weaponType: weaponTypes[weapon.WeaponType] ?? weapon.WeaponType ?? weapon.weaponType,
    icon: String(weapon.Icon ?? weapon.icon ?? '').replace(/^\/ui\//, '').replace(/\.png$/i, '')
  }))
  .filter((weapon) => weapon.name && weapon.icon && weapon.weaponType && weapon.rarity >= 1 && weapon.rarity <= 3)
  .filter((weapon) => {
    const key = `${weapon.name}|${weapon.weaponType}|${weapon.rarity}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  })
  .sort((a, b) => a.rarity - b.rarity || a.weaponType.localeCompare(b.weaponType) || a.name.localeCompare(b.name))
  .map((weapon) => ({
    ...weapon,
    portrait: `assets/weapons/${weapon.icon}.png`
  }));

if (!catalog.length) throw new Error('No 1★–3★ weapons were found; the Enka source format may have changed.');

const output = `/* Generated from EnkaNetwork/API-docs weapon metadata. */\nwindow.GENSHIN_WEAPONS = ${JSON.stringify(catalog, null, 2)};\n`;
await writeFile(outputPath, output, 'utf8');
console.log(`Generated ${catalog.length} weapon entries.`);
