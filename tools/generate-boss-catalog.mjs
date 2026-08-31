import { writeFile } from 'node:fs/promises';

const [outputPath = 'boss-data.js'] = process.argv.slice(2);
const resistanceFields = {
  Pyro: 'fireSubHurt', Hydro: 'waterSubHurt', Cryo: 'iceSubHurt', Electro: 'elecSubHurt',
  Anemo: 'windSubHurt', Geo: 'rockSubHurt', Dendro: 'grassSubHurt', Physical: 'physicalSubHurt'
};
const chineseElements = { '火': 'Pyro', '水': 'Hydro', '冰': 'Cryo', '电': 'Electro', '風': 'Anemo', '风': 'Anemo', '岩': 'Geo', '草': 'Dendro' };

function parseBossResistances(monster, sourceId) {
  const entries = Object.values(monster?.entries || {});
  const entry = entries.find(candidate => String(candidate.id) === String(sourceId)) || entries[0];
  const result = Object.fromEntries(Object.entries(resistanceFields).map(([element, field]) => [element, Math.round((entry?.resistance?.[field] ?? 0.1) * 100)]));
  for (const affix of entry?.affix || []) {
    const text = `${affix.name || ''} ${affix.description || ''}`;
    const element = Object.entries(chineseElements).find(([character]) => text.includes(character))?.[1];
    const amount = text.match(/[-+]?\s*(\d+)\s*%/);
    if (element && amount && /抗|resist/i.test(text)) result[element] = Math.max(result[element], Number(amount[1]));
  }
  return result;
}

async function loadResistances(sourceId) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(`https://gi.yatta.moe/api/v2/EN/monster/${sourceId}`);
      if (response.ok) return parseBossResistances((await response.json()).data, sourceId);
    } catch (_) {}
    await new Promise(resolve => setTimeout(resolve, 220 * (attempt + 1)));
  }
  return null;
}

async function mapWithConcurrency(items, limit, mapper) {
  const output = new Array(items.length);
  let nextIndex = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      output[index] = await mapper(items[index]);
    }
  }));
  return output;
}
const response = await fetch('https://genshin-db-api.vercel.app/api/v5/enemies?query=names&matchCategories=true&verboseCategories=true');
if (!response.ok) throw new Error('Unable to download the current Genshin enemy catalog.');

const catalog = (await response.json())
  .filter((enemy) => enemy.enemyType === 'BOSS' && enemy.images?.filename_icon)
  .filter((enemy) => enemy.name !== 'Bolteater Bathysmal Vishap')
  .flatMap((enemy) => {
    const base = {
      id: String(enemy.id),
      sourceId: String(enemy.id),
      name: enemy.name === 'Rimebiter Bathysmal Vishap' ? 'Bathysmal Vishap Herd' : enemy.name,
      type: enemy.categoryText === 'Enemies of Note' ? 'weekly' : 'world',
      handbookOrder: Number.isFinite(enemy.investigation?.investigationId) ? enemy.investigation.investigationId : null,
      icon: enemy.images.filename_icon,
      portrait: `assets/bosses/${enemy.images.filename_icon}.png`
    };
    if (enemy.name !== 'Icewind Suite') return [base];
    return [
      { ...base, id: `${base.id}-coppelia`, name: 'Icewind Suite: Dirge of Coppelia' },
      { ...base, id: `${base.id}-coppelius`, name: 'Icewind Suite: Nemesis of Coppelius', handbookOrder: (base.handbookOrder ?? 0) + 0.1 }
    ];
  })
  .sort((a, b) => (a.handbookOrder ?? 9999) - (b.handbookOrder ?? 9999) || a.name.localeCompare(b.name));

const resistanceCache = new Map();
const catalogWithResistances = await mapWithConcurrency(catalog, 4, async (boss) => ({
  ...boss,
  resistances: await (resistanceCache.get(boss.sourceId) || (() => {
    const pending = loadResistances(boss.sourceId);
    resistanceCache.set(boss.sourceId, pending);
    return pending;
  })())
}));

const output = `/* Generated from genshin-db enemy metadata plus Yatta monster resistance data. */\nwindow.GENSHIN_BOSSES = ${JSON.stringify(catalogWithResistances, null, 2)};\n`;
await writeFile(outputPath, output, 'utf8');
console.log(`Generated ${catalogWithResistances.length} boss entries.`);
