(() => {
  'use strict';

  const config = window.WHEEL_CONFIG;
  const wheels = config?.wheels;
  if (!wheels?.fate || !wheels?.punishment || !wheels?.blessing) {
    document.body.innerHTML = '<pre style="color:white">wheel-data.js is missing the Fate, Punishment, or Blessing wheel.</pre>';
    return;
  }

  const canvas = document.getElementById('wheel');
  const g = canvas.getContext('2d');
  const wheelWrap = document.getElementById('wheelWrap');
  const spinButton = document.getElementById('spinButton');
  const soundButton = document.getElementById('soundButton');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const rosterButton = document.getElementById('rosterButton');
  const clearButton = document.getElementById('clearButton');
  const resetWheelButton = document.getElementById('resetWheelButton');
  const pointer = document.querySelector('.pointer');
  const title = document.getElementById('title');
  const subtitle = document.getElementById('subtitle');
  const resultText = document.getElementById('resultText');
  const resultChance = document.getElementById('resultChance');
  const historyEl = document.getElementById('history');
  const challengeList = document.getElementById('challengeList');
  const challengeCount = document.getElementById('challengeCount');
  const clearChallengesButton = document.getElementById('clearChallengesButton');
  const wheelView = document.getElementById('wheelView');
  const trackerView = document.getElementById('trackerView');
  const appTabs = [...document.querySelectorAll('.app-tab')];
  const includeWorldBosses = document.getElementById('includeWorldBosses');
  const includeWeeklyBosses = document.getElementById('includeWeeklyBosses');
  const currentBossArt = document.getElementById('currentBossArt');
  const currentBossType = document.getElementById('currentBossType');
  const currentBossName = document.getElementById('currentBossName');
  const currentBossMeta = document.getElementById('currentBossMeta');
  const bossDefeatedButton = document.getElementById('bossDefeatedButton');
  const bossLostButton = document.getElementById('bossLostButton');
  const clearBossResultButton = document.getElementById('clearBossResultButton');
  const nextBossButton = document.getElementById('nextBossButton');
  const bossDefeatedCount = document.getElementById('bossDefeatedCount');
  const bossLostCount = document.getElementById('bossLostCount');
  const bossRemainingCount = document.getElementById('bossRemainingCount');
  const trackerChallengeList = document.getElementById('trackerChallengeList');
  const trackerClearChallengesButton = document.getElementById('trackerClearChallengesButton');
  const bossLog = document.getElementById('bossLog');
  const bossOverview = document.getElementById('bossOverview');
  const wheelBossCard = document.getElementById('wheelBossCard');
  const wheelBossPortrait = document.getElementById('wheelBossPortrait');
  const wheelBossType = document.getElementById('wheelBossType');
  const wheelBossName = document.getElementById('wheelBossName');
  const bossActionsModal = document.getElementById('bossActionsModal');
  const bossActionsType = document.getElementById('bossActionsType');
  const bossActionsTitle = document.getElementById('bossActionsTitle');
  const bossActionsCopy = document.getElementById('bossActionsCopy');
  const bossActionsClose = document.getElementById('bossActionsClose');
  const bossActionSelect = document.getElementById('bossActionSelect');
  const modalBossChoose = document.getElementById('modalBossChoose');
  const modalBossNext = document.getElementById('modalBossNext');
  const modalBossDefeated = document.getElementById('modalBossDefeated');
  const modalBossLost = document.getElementById('modalBossLost');
  const modalBossClear = document.getElementById('modalBossClear');
  const statusStrip = document.getElementById('statusStrip');
  const resultFlash = document.getElementById('resultFlash');
  const routeOverlay = document.getElementById('routeOverlay');
  const routeOverlayKicker = document.getElementById('routeOverlayKicker');
  const routeOverlayTitle = document.getElementById('routeOverlayTitle');
  const routeOverlayMeta = document.getElementById('routeOverlayMeta');
  const outcomeModal = document.getElementById('outcomeModal');
  const outcomeModalKicker = document.getElementById('outcomeModalKicker');
  const outcomeModalTitle = document.getElementById('outcomeModalTitle');
  const outcomeModalPortrait = document.getElementById('outcomeModalPortrait');
  const outcomeModalMeta = document.getElementById('outcomeModalMeta');
  const keepOutcomeButton = document.getElementById('keepOutcomeButton');
  const removeOutcomeButton = document.getElementById('removeOutcomeButton');
  const lotteryModal = document.getElementById('lotteryModal');
  const lotteryKicker = document.getElementById('lotteryKicker');
  const lotteryTitle = document.getElementById('lotteryTitle');
  const lotteryReel = document.getElementById('lotteryReel');
  const lotteryStopButton = document.getElementById('lotteryStopButton');
  const undoChallengeModal = document.getElementById('undoChallengeModal');
  const undoChallengeList = document.getElementById('undoChallengeList');
  const undoChallengeClose = document.getElementById('undoChallengeClose');
  const activeCharacterSection = document.getElementById('activeCharacterSection');
  const activeCharacterRule = document.getElementById('activeCharacterRule');
  const activeCharacterButton = document.getElementById('activeCharacterButton');
  const chooseCharacterButton = document.getElementById('chooseCharacterButton');
  const activeCharacterPortrait = document.getElementById('activeCharacterPortrait');
  const activeCharacterName = document.getElementById('activeCharacterName');
  const activeCharacterWeapon = document.getElementById('activeCharacterWeapon');
  const characterPickerModal = document.getElementById('characterPickerModal');
  const characterPickerGroups = document.getElementById('characterPickerGroups');
  const characterPickerClose = document.getElementById('characterPickerClose');
  const rosterModal = document.getElementById('rosterModal');
  const rosterGroups = document.getElementById('rosterGroups');
  const rosterWeaponGroups = document.getElementById('rosterWeaponGroups');
  const rosterSaveButton = document.getElementById('rosterSaveButton');
  const rosterCancelButton = document.getElementById('rosterCancelButton');

  const TAU = Math.PI * 2;
  const POINTER_ANGLE = -Math.PI / 2;
  const STORAGE_USED = 'fateWheelUsedV3';
  const STORAGE_HISTORY = 'fateWheelHistoryV3';
  const STORAGE_ROSTER = 'fateWheelRosterV1';
  const STORAGE_ACTIVE_CHARACTER = 'fateWheelActiveCharacterV1';
  const STORAGE_WEAPONS = 'fateWheelWeaponsV1';
  const STORAGE_CHALLENGES = 'fateWheelChallengesV1';
  const STORAGE_BOSS_TRACKER = 'fateWheelBossTrackerV1';
  const STORAGE_FATE_PITY = 'fateWheelPityV1';
  const routeKeys = ['punishment', 'blessing'];
  const characterCatalog = Array.isArray(window.GENSHIN_CHARACTERS) ? window.GENSHIN_CHARACTERS : [];
  const weaponCatalog = Array.isArray(window.GENSHIN_WEAPONS) ? window.GENSHIN_WEAPONS : [];
  const bossCatalog = Array.isArray(window.GENSHIN_BOSSES) ? window.GENSHIN_BOSSES : [];
  const handbookOrderOverrides = new Map([
    ['Bolteater Bathysmal Vishap', 38]
  ]);
  const weaponTypeLabels = {
    WEAPON_SWORD_ONE_HAND: 'Sword',
    WEAPON_CLAYMORE: 'Claymore',
    WEAPON_POLE: 'Polearm',
    WEAPON_BOW: 'Bow',
    WEAPON_CATALYST: 'Catalyst'
  };

  let currentWheelKey = 'fate';
  let activeItems = [];
  let segments = [];
  let rotation = 0;
  let spinning = false;
  let spinSerial = 0;
  let flowLocked = false;
  let soundOn = config.soundOnByDefault !== false;
  let audioCtx = null;
  let lastPointerSegment = -1;
  let routeTimer = null;
  let pendingOutcome = null;
  let lotteryState = null;
  let lotteryTimer = null;
  let history = [];
  let disabledCharacterIds = new Set();
  let rosterDraft = new Set();
  let disabledWeaponIds = new Set();
  let weaponDraft = new Set();
  let activeCharacterId = null;
  let activeChallenges = [];
  let doubleNextFate = false;
  let targetSpinQueue = 0;
  let fateChallengeStreak = 0;
  let bossTracker = { sequenceVersion: 3, includeWorld: true, includeWeekly: false, currentId: null, results: {}, log: [] };
  const usedIds = { punishment: new Set(), blessing: new Set() };

  function validItemIds(key) {
    return new Set((wheels[key].items || []).map(item => String(item.id)));
  }

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_USED) || '{}');
    routeKeys.forEach((key) => {
      const valid = validItemIds(key);
      if (Array.isArray(saved[key])) {
        usedIds[key] = new Set(saved[key].map(String).filter(id => valid.has(id)));
      }
    });
  } catch (_) {}

  try {
    const savedChallenges = JSON.parse(localStorage.getItem(STORAGE_CHALLENGES) || '[]');
    if (Array.isArray(savedChallenges)) {
      const validEffectIds = new Set(routeKeys.flatMap(key => wheels[key].items.map(item => item.id)));
      activeChallenges = savedChallenges
        .filter(item => item?.id && item?.label && (!item.sourceId || validEffectIds.has(item.sourceId)))
        .map(item => ({ ...item, type: item.type === 'blessing' ? 'blessing' : 'challenge' }));
    }
  } catch (_) {}

  try {
    const savedTracker = JSON.parse(localStorage.getItem(STORAGE_BOSS_TRACKER) || '{}');
    if (savedTracker && typeof savedTracker === 'object') {
      const isLegacyTracker = savedTracker.sequenceVersion !== 3;
      bossTracker = { ...bossTracker, ...savedTracker };
      bossTracker.sequenceVersion = 3;
      bossTracker.results = savedTracker.results && typeof savedTracker.results === 'object' ? savedTracker.results : {};
      if (!Object.prototype.hasOwnProperty.call(savedTracker, 'results') && Array.isArray(savedTracker.completedIds)) {
        bossTracker.results = Object.fromEntries(savedTracker.completedIds.map(id => [String(id), 'defeated']));
      }
      bossTracker.log = Array.isArray(savedTracker.log) ? savedTracker.log : [];
      if (isLegacyTracker) {
        const loggedResults = new Map(bossTracker.log.map(entry => [String(entry.bossId), entry.status]));
        bossTracker.results = Object.fromEntries(Object.entries(bossTracker.results).filter(([id, status]) => loggedResults.get(String(id)) === status));
        bossTracker.currentId = null;
      }
      delete bossTracker.completedIds;
    }
  } catch (_) {}

  try {
    fateChallengeStreak = Math.max(0, Math.min(5, Number(localStorage.getItem(STORAGE_FATE_PITY)) || 0));
  } catch (_) {}

  try {
    const savedWeapons = JSON.parse(localStorage.getItem(STORAGE_WEAPONS) || '[]');
    if (Array.isArray(savedWeapons)) {
      const validIds = new Set(weaponCatalog.map(weapon => String(weapon.id)));
      disabledWeaponIds = new Set(savedWeapons.map(String).filter(id => validIds.has(id)));
    }
  } catch (_) {}

  try {
    const savedHistory = JSON.parse(localStorage.getItem(STORAGE_HISTORY) || '[]');
    if (Array.isArray(savedHistory)) history = savedHistory;
  } catch (_) {}

  try {
    const savedRoster = JSON.parse(localStorage.getItem(STORAGE_ROSTER) || '[]');
    if (Array.isArray(savedRoster)) {
      const validIds = new Set(characterCatalog.map(character => String(character.id)));
      disabledCharacterIds = new Set(savedRoster.map(String).filter(id => validIds.has(id)));
    }
  } catch (_) {}

  try {
    const savedActiveCharacter = String(localStorage.getItem(STORAGE_ACTIVE_CHARACTER) || '');
    if (characterCatalog.some(character => String(character.id) === savedActiveCharacter) && !disabledCharacterIds.has(savedActiveCharacter)) {
      activeCharacterId = savedActiveCharacter;
    }
  } catch (_) {}

  function currentWheel() { return wheels[currentWheelKey]; }

  function activeCharacter() {
    return characterCatalog.find(character => String(character.id) === String(activeCharacterId)) || null;
  }

  function weaponTypeLabel(weaponType) {
    return weaponTypeLabels[weaponType] || 'Weapon';
  }

  function eligibleCharacters(rarity) {
    return characterCatalog.filter((character) => (
      character.rarity === rarity
      && !disabledCharacterIds.has(String(character.id))
      && String(character.id) !== String(activeCharacterId)
    ));
  }

  function persistRoster() {
    try { localStorage.setItem(STORAGE_ROSTER, JSON.stringify([...disabledCharacterIds])); } catch (_) {}
  }

  function persistWeapons() {
    try { localStorage.setItem(STORAGE_WEAPONS, JSON.stringify([...disabledWeaponIds])); } catch (_) {}
  }

  function persistActiveCharacter() {
    try {
      if (activeCharacterId) localStorage.setItem(STORAGE_ACTIVE_CHARACTER, String(activeCharacterId));
      else localStorage.removeItem(STORAGE_ACTIVE_CHARACTER);
    } catch (_) {}
  }

  function updateActiveCharacterUI() {
    const character = activeCharacter();
  // The active character contextualizes all three wheels (including weapon-based challenges).
  activeCharacterSection.hidden = false;
  activeCharacterRule.hidden = false;
    if (!character) {
      activeCharacterPortrait.hidden = true;
      activeCharacterPortrait.removeAttribute('src');
      activeCharacterName.textContent = 'CHOOSE CHARACTER';
      activeCharacterWeapon.textContent = 'PICK ONE BEFORE SPINNING FATE';
      return;
    }
    activeCharacterPortrait.src = character.portrait;
    activeCharacterPortrait.alt = character.name;
    activeCharacterPortrait.hidden = false;
    activeCharacterName.textContent = character.name;
    activeCharacterWeapon.textContent = weaponTypeLabel(character.weaponType).toUpperCase();
  }

  function rng() {
    if (window.crypto?.getRandomValues) {
      const value = new Uint32Array(1);
      window.crypto.getRandomValues(value);
      return value[0] / 4294967296;
    }
    return Math.random();
  }

  function mod(n, m) { return ((n % m) + m) % m; }
  function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }

  function availableItems() {
    const wheel = currentWheel();
    if (!wheel.removesSelected) return wheel.items;
    return wheel.items.filter(item => !usedIds[currentWheelKey].has(String(item.id)));
  }

  function persistUsed() {
    const data = {};
    routeKeys.forEach(key => { data[key] = [...usedIds[key]]; });
    try { localStorage.setItem(STORAGE_USED, JSON.stringify(data)); } catch (_) {}
  }

  function persistHistory() {
    try { localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history)); } catch (_) {}
  }

  function persistFatePity() {
    try { localStorage.setItem(STORAGE_FATE_PITY, String(fateChallengeStreak)); } catch (_) {}
  }

  function renderFatePity() {
    if (currentWheelKey !== 'fate') return;
    resultChance.textContent = fateChallengeStreak >= 5
      ? 'BLESSING PITY READY'
      : `BLESSING PITY ${fateChallengeStreak}/5`;
  }

  function persistChallenges() {
    try { localStorage.setItem(STORAGE_CHALLENGES, JSON.stringify(activeChallenges)); } catch (_) {}
  }

  function challengeCategory(item) {
    if (['full-hp', 'full-atk', 'full-def', 'full-em'].includes(item.id)) return 'build';
    return item.id;
  }

  // A later spin never changes the priority of these rules: a Blessing is meant
  // to grant permission, so it wins over the Challenge it explicitly negates.
  const effectOverrides = {
    'choose-weapon': ['low-rarity-weapon', 'no-five-star', 'level-one'],
    'choose-build': ['full-hp', 'full-atk', 'full-def', 'full-em', 'remove-artefact'],
    'support-ally': ['no-healer'],
    'normal-only': ['no-burst', 'no-skill'],
    'low-rarity-weapon': ['no-five-star'],
    'immunity': ['ignore-death']
  };

  function effectSourceId(effect) {
    return String(effect.sourceId || '').trim();
  }

  function effectTimestamp(effect) {
    const match = String(effect.id || '').match(/-(\d+)$/);
    return match ? Number(match[1]) : 0;
  }

  function overridingEffect(effect, effects = activeChallenges) {
    const sourceId = effectSourceId(effect);
    const directOverride = effects.find((candidate) => candidate.id !== effect.id && effectOverrides[effectSourceId(candidate)]?.includes(sourceId));
    if (directOverride) return directOverride;

    // Low and high DPI cannot both be followed. Unlike the permanent priority
    // rules above, the newest DPI instruction is the one that takes effect.
    if (sourceId === 'low-dpi' || sourceId === 'high-dpi') {
      const dpiEffects = effects.filter((candidate) => ['low-dpi', 'high-dpi'].includes(effectSourceId(candidate)));
      if (dpiEffects.length > 1) {
        const newest = dpiEffects.reduce((latest, candidate) => effectTimestamp(candidate) > effectTimestamp(latest) ? candidate : latest);
        if (newest.id !== effect.id) return newest;
      }
    }
    return null;
  }

  function effectiveEffectCount() {
    return activeChallenges.filter(effect => !overridingEffect(effect)).length;
  }

  function isActiveEffect(item) {
    if (currentWheelKey === 'punishment') return !['spin-twice', 'standard-pull', 'event-pull', 'weapon-pull'].includes(item.id);
    if (currentWheelKey === 'blessing') return !['remove-punishment', 'undo-punishment'].includes(item.id);
    return false;
  }

  function addActiveEffect(item, label) {
    if (!isActiveEffect(item)) return;
    const category = challengeCategory(item);
    const type = currentWheelKey === 'blessing' ? 'blessing' : 'challenge';
    if (type === 'challenge') activeChallenges = activeChallenges.filter(effect => effect.type !== type || effect.category !== category);
    activeChallenges.unshift({ id: `${item.id}-${Date.now()}`, sourceId: item.id, category, type, label });
    persistChallenges();
    renderChallenges();
  }

  function effectMark(effect) {
    const blessing = effect.type === 'blessing';
    return `<span class="challenge-mark${blessing ? ' blessing-mark' : ''}">${blessing ? 'BLESSING' : 'CHALLENGE'}</span>`;
  }

  function effectRow(effect) {
    const overriddenBy = overridingEffect(effect);
    const status = overriddenBy
      ? `<span class="effect-status">OVERRIDDEN BY ${escapeHtml(overriddenBy.label)}</span>`
      : '';
    return `<li class="${overriddenBy ? 'is-overridden' : ''}">${effectMark(effect)}<span class="effect-label">${escapeHtml(effect.label)}</span>${status}</li>`;
  }

  function renderChallenges() {
    challengeCount.textContent = String(effectiveEffectCount()).padStart(2, '0');
    if (!activeChallenges.length) {
      challengeList.innerHTML = '<li class="history-empty">No active effects.</li>';
      renderTrackerChallenges();
      return;
    }
    challengeList.innerHTML = activeChallenges.map(effectRow).join('');
    renderTrackerChallenges();
  }

  function persistBossTracker() {
    try { localStorage.setItem(STORAGE_BOSS_TRACKER, JSON.stringify(bossTracker)); } catch (_) {}
  }

  function selectedBosses() {
    return bossCatalog
      .filter((boss) => (boss.type === 'world' && bossTracker.includeWorld) || (boss.type === 'weekly' && bossTracker.includeWeekly))
      .sort((a, b) => {
        if (a.type !== b.type) return a.type === 'world' ? -1 : 1;
        if (a.type === 'weekly') return Number(a.id) - Number(b.id);
        return (handbookOrderOverrides.get(a.name) ?? a.handbookOrder ?? 9999) - (handbookOrderOverrides.get(b.name) ?? b.handbookOrder ?? 9999) || a.name.localeCompare(b.name);
      });
  }

  function currentBoss() {
    return selectedBosses().find(boss => boss.id === String(bossTracker.currentId)) || null;
  }

  function selectFirstBoss() {
    const first = selectedBosses()[0];
    bossTracker.currentId = first ? first.id : null;
    persistBossTracker();
  }

  function chooseNextBoss() {
    const bosses = selectedBosses();
    const currentIndex = bosses.findIndex(boss => boss.id === String(bossTracker.currentId));
    const nextIndex = currentIndex < 0 ? 0 : currentIndex + 1;
    bossTracker.currentId = bosses[nextIndex]?.id || null;
    persistBossTracker();
    renderBossTracker();
  }

  function recordBoss(status) {
    const boss = currentBoss();
    if (!boss) return;
    bossTracker.results[boss.id] = status;
    bossTracker.log = bossTracker.log.filter(entry => entry.bossId !== boss.id);
    bossTracker.log.unshift({ bossId: boss.id, name: boss.name, type: boss.type, status, time: new Date().toISOString() });
    bossTracker.log = bossTracker.log.slice(0, 100);
    persistBossTracker();
    chooseNextBoss();
  }

  function finishBoss(status) {
    recordBoss(status);
    switchView('wheel');
  }

  function clearBossResult() {
    const boss = currentBoss();
    if (!boss) return;
    delete bossTracker.results[boss.id];
    bossTracker.log = bossTracker.log.filter(entry => entry.bossId !== boss.id);
    persistBossTracker();
    renderBossTracker();
  }

  function renderTrackerChallenges() {
    if (!trackerChallengeList) return;
    trackerChallengeList.innerHTML = activeChallenges.length
      ? activeChallenges.map(effectRow).join('')
      : '<li class="history-empty">No active effects for this boss.</li>';
  }

  function renderBossTracker() {
    includeWorldBosses.checked = bossTracker.includeWorld;
    includeWeeklyBosses.checked = bossTracker.includeWeekly;
    const bosses = selectedBosses();
    const boss = currentBoss();
    const defeated = bosses.filter(entry => bossTracker.results[entry.id] === 'defeated').length;
    const lost = bosses.filter(entry => bossTracker.results[entry.id] === 'lost').length;
    bossDefeatedCount.textContent = String(defeated).padStart(2, '0');
    bossLostCount.textContent = String(lost).padStart(2, '0');
    bossRemainingCount.textContent = String(bosses.filter(entry => !bossTracker.results[entry.id]).length).padStart(2, '0');
    if (!boss) {
      currentBossArt.innerHTML = '<span>?</span>';
      currentBossArt.classList.add('is-empty');
      currentBossType.textContent = bosses.length ? 'READY WHEN YOU ARE' : 'NO BOSS TYPE SELECTED';
      currentBossName.textContent = bosses.length ? 'NEXT BOSS' : 'CHOOSE WORLD AND/OR WEEKLY';
      currentBossMeta.textContent = bosses.length ? 'Select a boss in the handbook below.' : 'Enable at least one boss type above.';
    } else {
      currentBossArt.innerHTML = `<img src="${escapeHtml(boss.portrait)}" alt="" onerror="this.remove();this.parentElement.classList.add('is-empty');" /><span>${escapeHtml(boss.name.slice(0, 1))}</span>`;
      currentBossArt.classList.remove('is-empty');
      currentBossType.textContent = boss.type === 'weekly' ? 'WEEKLY BOSS' : 'WORLD BOSS';
      currentBossName.textContent = boss.name;
      const effective = effectiveEffectCount();
      const overridden = activeChallenges.length - effective;
      currentBossMeta.textContent = activeChallenges.length
        ? `${effective} active effect${effective === 1 ? '' : 's'} carry into this fight.${overridden ? ` ${overridden} overridden.` : ''}`
        : 'No active effects carried into this fight.';
    }
    const disabled = !boss;
    bossDefeatedButton.disabled = disabled;
    bossLostButton.disabled = disabled;
    clearBossResultButton.disabled = disabled || !bossTracker.results[boss.id];
    nextBossButton.disabled = !bosses.length;
    bossLog.innerHTML = bossTracker.log.length ? bossTracker.log.slice(0, 10).map(entry => `<li><span class="boss-log-status ${entry.status}">${entry.status === 'defeated' ? 'DEFEATED' : 'LOST'}</span><span>${escapeHtml(entry.name)}</span></li>`).join('') : '<li class="history-empty">No bosses recorded.</li>';
    renderTrackerChallenges();
    const renderOverviewGroup = (groupBosses, heading, type) => groupBosses.length ? `<section class="boss-overview-group"><h3>${heading}</h3><div class="boss-overview-grid">${groupBosses.map((entry, index) => {
      const status = bossTracker.results[entry.id] || '';
      return `<button class="boss-overview-card${entry.id === boss?.id ? ' is-current' : ''}${status ? ` is-${status}` : ''}" type="button" data-boss-id="${escapeHtml(entry.id)}"><span class="boss-overview-number">${String(index + 1).padStart(2, '0')}</span><img src="${escapeHtml(entry.portrait)}" alt="" onerror="this.remove()" /><span class="boss-overview-name"><small>${type}</small><strong>${escapeHtml(entry.name)}</strong></span><b class="boss-overview-status" aria-label="${status || 'not marked'}">${status === 'defeated' ? '✓' : status === 'lost' ? '×' : ''}</b></button>`;
    }).join('')}</div></section>` : '';
    bossOverview.innerHTML = renderOverviewGroup(bosses.filter(entry => entry.type === 'world'), 'WORLD BOSSES · HANDBOOK ORDER', 'WORLD') + renderOverviewGroup(bosses.filter(entry => entry.type === 'weekly'), 'WEEKLY BOSSES · RELEASE ORDER', 'WEEKLY') || '<p class="history-empty">Enable World Bosses and/or Weekly Bosses to see the handbook.</p>';
    renderWheelBoss();
  }

  function renderWheelBoss() {
    const boss = currentBoss();
    if (!boss) {
      wheelBossPortrait.hidden = true;
      wheelBossPortrait.removeAttribute('src');
      wheelBossType.textContent = selectedBosses().length ? 'NO BOSS SELECTED' : 'CHOOSE BOSS TYPE';
      wheelBossName.textContent = selectedBosses().length ? 'OPEN BOSS TRACKER' : 'CHOOSE BOSS TYPE';
      return;
    }
    wheelBossPortrait.src = boss.portrait;
    wheelBossPortrait.hidden = false;
    wheelBossType.textContent = boss.type === 'weekly' ? 'WEEKLY BOSS' : 'WORLD BOSS';
    wheelBossName.textContent = boss.name;
  }

  function openBossActions() {
    const boss = currentBoss();
    const choices = selectedBosses();
    bossActionsType.textContent = boss ? (boss.type === 'weekly' ? 'WEEKLY BOSS' : 'WORLD BOSS') : 'BOSS TRACKER';
    bossActionsTitle.textContent = boss ? boss.name : 'CHOOSE YOUR NEXT BOSS';
    bossActionsCopy.textContent = boss ? 'Change this mark at any time, choose a specific boss, or move to the next handbook entry.' : 'Choose a specific boss from the enabled World and Weekly handbook lists.';
    bossActionSelect.innerHTML = choices.length
      ? choices.map(entry => `<option value="${escapeHtml(entry.id)}"${entry.id === boss?.id ? ' selected' : ''}>${escapeHtml(entry.type === 'weekly' ? 'WEEKLY — ' : 'WORLD — ')}${escapeHtml(entry.name)}</option>`).join('')
      : '<option value="">NO BOSSES REMAIN</option>';
    modalBossDefeated.disabled = !boss;
    modalBossLost.disabled = !boss;
    modalBossClear.disabled = !boss || !bossTracker.results[boss.id];
    bossActionSelect.disabled = !choices.length;
    modalBossChoose.disabled = !choices.length;
    modalBossNext.disabled = !choices.length;
    bossActionsModal.hidden = false;
  }

  function closeBossActions() { bossActionsModal.hidden = true; }

  function switchView(view) {
    const tracker = view === 'tracker';
    wheelView.hidden = tracker;
    trackerView.hidden = !tracker;
    appTabs.forEach(tab => tab.classList.toggle('is-active', tab.dataset.view === view));
    if (tracker) renderBossTracker();
  }

  function clearChallenges() {
    activeChallenges = [];
    try { localStorage.removeItem(STORAGE_CHALLENGES); } catch (_) {}
    renderChallenges();
    resultText.textContent = 'Challenges cleared for the next boss.';
    resultChance.textContent = '';
  }

  function rebuildSegments() {
    activeItems = availableItems();
    const count = activeItems.length;
    segments = activeItems.map((item, index) => ({
      ...item,
      index,
      start: (index / count) * TAU,
      end: ((index + 1) / count) * TAU
    }));
    rotation = 0;
    renderStatus();
    drawWheel();
    updateSpinState();
  }

  function setWheel(key) {
    currentWheelKey = key;
    const wheel = currentWheel();
    title.textContent = wheel.title;
    subtitle.textContent = wheel.subtitle || config.subtitle || 'EVERY DEATH = ONE SPIN';
    canvas.setAttribute('aria-label', `${wheel.title} wheel`);
    updateActiveCharacterUI();
    rebuildSegments();
    renderFatePity();
  }

  function characterGroupsHtml(mode) {
    return [5, 4].map((rarity) => {
      const characters = characterCatalog.filter(character => character.rarity === rarity && (mode !== 'picker' || !disabledCharacterIds.has(String(character.id))));
      const cards = characters.map((character) => {
        const id = String(character.id);
        const disabled = mode === 'roster' && rosterDraft.has(id);
        const active = mode === 'picker' && id === String(activeCharacterId);
        return `<button class="character-card${disabled ? ' is-disabled' : ''}${active ? ' is-active' : ''}" type="button" data-character-id="${escapeHtml(id)}" aria-pressed="${String(active || !disabled)}">
          <img src="${escapeHtml(character.portrait)}" alt="" />
          <span>${escapeHtml(character.name)}</span>
        </button>`;
      }).join('');
      return `<section class="character-group"><h3>${rarity}★ CHARACTERS</h3><div class="character-grid">${cards}</div></section>`;
    }).join('');
  }

  function weaponGroupsHtml() {
    return [3, 2, 1].map((rarity) => {
      const weapons = weaponCatalog.filter(weapon => weapon.rarity === rarity);
      const cards = weapons.map((weapon) => {
        const id = String(weapon.id);
        const disabled = weaponDraft.has(id);
        return `<button class="character-card${disabled ? ' is-disabled' : ''}" type="button" data-weapon-id="${escapeHtml(id)}" aria-pressed="${String(!disabled)}">
          <img src="${escapeHtml(weapon.portrait)}" alt="" />
          <span>${escapeHtml(weapon.name)}</span>
        </button>`;
      }).join('');
      return `<section class="character-group"><h3>${rarity}★ WEAPONS</h3><div class="character-grid">${cards}</div></section>`;
    }).join('');
  }

  function openCharacterPicker() {
    if (spinning || flowLocked) return;
    characterPickerGroups.innerHTML = characterGroupsHtml('picker');
    characterPickerModal.hidden = false;
  }

  function closeCharacterPicker() {
    characterPickerModal.hidden = true;
  }

  function selectActiveCharacter(id) {
    const character = characterCatalog.find(entry => String(entry.id) === String(id));
    if (!character || disabledCharacterIds.has(String(character.id))) return;
    activeCharacterId = String(character.id);
    persistActiveCharacter();
    closeCharacterPicker();
    updateActiveCharacterUI();
    updateSpinState();
  }

  function openRosterSettings() {
    if (spinning || flowLocked) return;
    rosterDraft = new Set(disabledCharacterIds);
    weaponDraft = new Set(disabledWeaponIds);
    rosterGroups.innerHTML = characterGroupsHtml('roster');
    rosterWeaponGroups.innerHTML = weaponGroupsHtml();
    rosterModal.hidden = false;
  }

  function closeRosterSettings() {
    rosterModal.hidden = true;
  }

  function toggleRosterCharacter(id) {
    if (rosterDraft.has(id)) rosterDraft.delete(id);
    else rosterDraft.add(id);
    rosterGroups.innerHTML = characterGroupsHtml('roster');
  }

  function toggleRosterWeapon(id) {
    if (weaponDraft.has(id)) weaponDraft.delete(id);
    else weaponDraft.add(id);
    rosterWeaponGroups.innerHTML = weaponGroupsHtml();
  }

  function saveRosterSettings() {
    disabledCharacterIds = new Set(rosterDraft);
    disabledWeaponIds = new Set(weaponDraft);
    if (activeCharacterId && disabledCharacterIds.has(String(activeCharacterId))) activeCharacterId = null;
    persistRoster();
    persistWeapons();
    persistActiveCharacter();
    closeRosterSettings();
    updateActiveCharacterUI();
    updateSpinState();
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    drawWheel();
  }

  function drawWheel() {
    const rect = canvas.getBoundingClientRect();
    const dpr = canvas.width / Math.max(rect.width, 1);
    const cssWidth = canvas.width / dpr;
    const cssHeight = canvas.height / dpr;
    const cx = cssWidth / 2;
    const cy = cssHeight / 2;
    const radius = Math.min(cssWidth, cssHeight) * 0.485;

    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, cssWidth, cssHeight);

    if (!segments.length) {
      g.save();
      g.translate(cx, cy);
      g.beginPath();
      g.arc(0, 0, radius, 0, TAU);
      g.fillStyle = '#f1f1ee';
      g.fill();
      g.strokeStyle = 'rgba(245,245,241,.82)';
      g.lineWidth = 2.2;
      g.stroke();
      g.fillStyle = '#171818';
      g.font = `600 ${radius * .06}px Bahnschrift, Arial Narrow, Segoe UI, sans-serif`;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText('EMPTY — RESET OUTCOMES', 0, 0, radius * 1.25);
      g.restore();
      return;
    }

    g.save();
    g.translate(cx, cy);
    g.rotate(rotation);

    segments.forEach((segment) => {
      g.beginPath();
      g.moveTo(0, 0);
      g.arc(0, 0, radius, segment.start, segment.end);
      g.closePath();
      g.fillStyle = '#f1f1ee';
      g.fill();
      g.strokeStyle = 'rgba(16,17,17,.42)';
      g.lineWidth = 1.15;
      g.stroke();
      drawSegmentLabel(segment, radius);
    });

    g.beginPath();
    g.arc(0, 0, radius, 0, TAU);
    g.strokeStyle = 'rgba(245,245,241,.82)';
    g.lineWidth = 2.2;
    g.stroke();

    g.beginPath();
    g.arc(0, 0, radius * .225, 0, TAU);
    g.fillStyle = '#0e1010';
    g.fill();
    g.strokeStyle = 'rgba(27,128,175,.72)';
    g.lineWidth = 1.2;
    g.stroke();
    g.restore();
  }

  function drawSegmentLabel(segment, radius) {
    const arc = segment.end - segment.start;
    const mid = (segment.start + segment.end) / 2;
    const degrees = arc * 180 / Math.PI;
    let text = segment.short || segment.label;

    if (degrees < 8 && text.length > 12) text = text.slice(0, 10) + '…';

    const fontSize = degrees < 9 ? radius * .030 : degrees < 15 ? radius * .032 : radius * .035;
    const textRadius = degrees < 9 ? radius * .84 : radius * .81;

    g.save();
    g.rotate(mid);
    g.translate(textRadius, 0);
    const screenAngle = mod(mid + rotation, TAU);
    if (screenAngle > 0 && screenAngle < Math.PI) g.rotate(Math.PI);
    g.rotate(Math.PI / 2);
    g.fillStyle = '#171818';
    g.font = `600 ${fontSize}px Bahnschrift, Arial Narrow, Segoe UI, sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(text, 0, 0, radius * .56);
    g.restore();
  }

  function equalPick() {
    if (!segments.length) return null;
    const choices = currentWheelKey === 'fate' && fateChallengeStreak >= 5
      ? segments.filter(segment => segment.target === 'blessing')
      : segments;
    return choices[Math.floor(rng() * choices.length)];
  }

  function segmentUnderPointer(rot) {
    if (!segments.length) return -1;
    const local = mod(POINTER_ANGLE - rot, TAU);
    return segments.findIndex(segment => local >= segment.start && local < segment.end);
  }

  function tick() {
    pointer.classList.remove('tick');
    void pointer.offsetWidth;
    pointer.classList.add('tick');
    if (!soundOn) return;

    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(820, audioCtx.currentTime);
      gain.gain.setValueAtTime(.026, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + .035);
      oscillator.connect(gain).connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + .04);
    } catch (_) {}
  }

  function spin() {
    if (spinning || flowLocked || !segments.length || (currentWheelKey === 'fate' && !activeCharacter())) return;

    spinning = true;
    const spinId = ++spinSerial;
    updateSpinState();
    const chosen = equalPick();
    const margin = Math.min((chosen.end - chosen.start) * .16, .04);
    const usableStart = chosen.start + margin;
    const usableEnd = chosen.end - margin;
    const targetLocalAngle = usableEnd > usableStart
      ? usableStart + rng() * (usableEnd - usableStart)
      : (chosen.start + chosen.end) / 2;
    const turns = Math.floor(config.minTurns + rng() * ((config.maxTurns || config.minTurns + 1) - config.minTurns + 1));
    const currentMod = mod(rotation, TAU);
    const alignment = mod(POINTER_ANGLE - targetLocalAngle - currentMod, TAU);
    const startRotation = rotation;
    const endRotation = rotation + turns * TAU + alignment;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const duration = reduceMotion ? Math.min(850, config.spinDurationMs || 5600) : (config.spinDurationMs || 5600);
    const startTime = performance.now();
    lastPointerSegment = segmentUnderPointer(rotation);

    function frame(now) {
      if (spinId !== spinSerial) return;
      const progress = Math.min(1, (now - startTime) / duration);
      rotation = startRotation + (endRotation - startRotation) * easeOutQuint(progress);
      drawWheel();

      const currentSegment = segmentUnderPointer(rotation);
      if (currentSegment !== lastPointerSegment) {
        lastPointerSegment = currentSegment;
        tick();
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
        return;
      }

      rotation = mod(endRotation, TAU);
      drawWheel();
      spinning = false;
      resolveSpin(chosen);
    }

    requestAnimationFrame(frame);
  }

  function resolveSpin(item) {
    if (currentWheelKey === 'fate') {
      const target = item.target;
      if (!wheels[target]) return;
      const pityTriggered = target === 'blessing' && fateChallengeStreak >= 5;
      fateChallengeStreak = target === 'blessing' ? 0 : Math.min(5, fateChallengeStreak + 1);
      persistFatePity();
      flowLocked = true;
      resultText.textContent = `${wheels[target].title} wheel selected.`;
      showOverlay(pityTriggered ? 'BLESSING PITY' : 'FATE SELECTED', wheels[target].title, pityTriggered ? 'FIVE CHALLENGES WITHOUT A BLESSING' : `OPENING THE ${wheels[target].title} WHEEL`, config.routeRevealMs || 1100, () => {
        setWheel(target);
        resultText.textContent = `Spin the ${wheels[target].title} wheel.`;
        if (doubleNextFate) {
          targetSpinQueue = 2;
          doubleNextFate = false;
          resultChance.textContent = 'DOUBLE RESULT ACTIVE';
        }
        flowLocked = false;
        updateSpinState();
      });
      return;
    }

    const wheel = currentWheel();
    flowLocked = true;
    pendingOutcome = { wheelKey: currentWheelKey, item };
    if (item.id === 'remove-punishment' && activeChallenges.some(effect => effect.type === 'challenge')) {
      openUndoChallengePicker(item, wheel);
      return;
    }
    if (item.id === 'undo-punishment' && undoMostRecentChallenge(wheel)) return;
    if (item.artefactLottery && startArtefactLottery(item, wheel)) return;
    if (item.healerLottery && startSupportLottery(item, wheel)) return;
    if (item.lotteryRarity && startCharacterLottery(item, wheel)) return;
    if (item.weaponLottery && resolveWeaponLottery(item, wheel)) return;
    showOutcomeResult(item.label, wheel);
  }

  function showOutcomeResult(label, wheel, reveal = null) {
    if (pendingOutcome) addActiveEffect(pendingOutcome.item, label);
    history.unshift({ wheel: wheel.title, label, time: new Date().toISOString() });
    history = history.slice(0, 100);
    persistHistory();
    renderHistory();
    resultText.textContent = label;
    resultChance.textContent = '';
    resultFlash.classList.remove('show');
    void resultFlash.offsetWidth;
    resultFlash.classList.add('show');
    outcomeModalKicker.textContent = `${wheel.title} RESULT`;
    outcomeModalTitle.textContent = reveal ? reveal.name : label;
    outcomeModalMeta.textContent = reveal ? reveal.detail : '';
    outcomeModalPortrait.hidden = !reveal?.portrait;
    if (reveal?.portrait) {
      outcomeModalPortrait.src = reveal.portrait;
      outcomeModalPortrait.alt = reveal.name;
    } else {
      outcomeModalPortrait.removeAttribute('src');
      outcomeModalPortrait.alt = '';
    }
    outcomeModal.hidden = false;
    requestAnimationFrame(() => outcomeModal.classList.add('show'));
  }

  function startCharacterLottery(item, wheel) {
    const pool = eligibleCharacters(item.lotteryRarity);
    if (!pool.length) return false;

    startLottery(item, wheel, pool, `RANDOM ${item.lotteryRarity}★ CHARACTER`, 'BLESSING LOTTERY', 'character');
    return true;
  }

  function startSupportLottery(item, wheel) {
    const supportNames = new Set(['Diona', 'Sangonomiya Kokomi', 'Zhongli', 'Yaoyao']);
    const pool = characterCatalog.filter(character => supportNames.has(character.name) && !disabledCharacterIds.has(String(character.id)));
    if (!pool.length) return false;
    startLottery(item, wheel, pool, 'RANDOM SUPPORT CHARACTER', 'BLESSING LOTTERY', 'support');
    return true;
  }

  function startArtefactLottery(item, wheel) {
    const pool = [
      { name: 'Flower', token: 'FLOWER' },
      { name: 'Plume', token: 'PLUME' },
      { name: 'Sands', token: 'SANDS' },
      { name: 'Goblet', token: 'GOBLET' },
      { name: 'Circlet', token: 'CIRCLET' }
    ];
    startLottery(item, wheel, pool, 'ARTEFACT TO REMOVE', 'CHALLENGE DRAW', 'artefact');
    return true;
  }

  function startLottery(item, wheel, pool, title, kicker, kind) {
    lotteryState = { item, wheel, pool, kind, index: Math.floor(rng() * pool.length) };
    lotteryKicker.textContent = kicker;
    lotteryTitle.textContent = title;
    lotteryModal.hidden = false;
    renderLotteryReel();
    requestAnimationFrame(() => lotteryModal.classList.add('show'));
    lotteryTimer = window.setInterval(() => {
      if (!lotteryState) return;
      lotteryState.index = (lotteryState.index + 1 + Math.floor(rng() * 3)) % lotteryState.pool.length;
      renderLotteryReel();
    }, 90);
  }

  function renderLotteryReel() {
    const { pool, index } = lotteryState;
    const cards = [-2, -1, 0, 1, 2].map((offset) => pool[mod(index + offset, pool.length)]);
    lotteryReel.innerHTML = cards.map((entry, index) => `
      <div class="lottery-character${index === 2 ? ' is-selected' : ''}">
        ${entry.portrait ? `<img src="${escapeHtml(entry.portrait)}" alt="" />` : `<span class="lottery-token">${escapeHtml(entry.token || entry.name)}</span>`}
        <span>${escapeHtml(entry.name)}</span>
      </div>`).join('');
    lotteryReel.classList.remove('roll');
    void lotteryReel.offsetWidth;
    lotteryReel.classList.add('roll');
  }

  function stopLottery() {
    if (!lotteryState) return;
    window.clearInterval(lotteryTimer);
    lotteryTimer = null;
    const { item, wheel, pool, index, kind } = lotteryState;
    const selected = pool[index];
    lotteryState = null;
    lotteryModal.classList.remove('show');
    lotteryModal.hidden = true;
    const label = kind === 'artefact'
      ? `Remove your ${selected.name} for this boss`
      : kind === 'support'
        ? `${selected.name} is allowed for this boss`
        : `${item.label}: ${selected.name}`;
    showOutcomeResult(label, wheel, selected.portrait ? {
      name: selected.name,
      portrait: selected.portrait,
      detail: kind === 'support' ? 'RANDOM SUPPORT · FOR THIS BOSS' : item.label
    } : null);
  }

  function resolveWeaponLottery(item, wheel) {
    const character = activeCharacter();
    if (!character) return false;
    const pool = weaponCatalog.filter((weapon) => weapon.weaponType === character.weaponType && !disabledWeaponIds.has(String(weapon.id)));
    const weaponType = weaponTypeLabel(character.weaponType);
    if (!pool.length) {
      showOutcomeResult(`Use any 1–3★ ${weaponType} for this boss`, wheel);
      return true;
    }
    const weapon = pool[Math.floor(rng() * pool.length)];
    showOutcomeResult(`Use ${weapon.name} for this boss`, wheel, {
      name: weapon.name,
      portrait: weapon.portrait,
      detail: `${weapon.rarity}★ ${weaponType.toUpperCase()} · FOR ${character.name.toUpperCase()}`
    });
    return true;
  }

  function closeLottery() {
    if (lotteryTimer) window.clearInterval(lotteryTimer);
    lotteryTimer = null;
    lotteryState = null;
    lotteryModal.classList.remove('show');
    lotteryModal.hidden = true;
  }

  function openUndoChallengePicker(item, wheel) {
    undoChallengeList.innerHTML = activeChallenges.filter(effect => effect.type === 'challenge').map((challenge) => `<button class="undo-challenge-option" type="button" data-challenge-id="${escapeHtml(challenge.id)}"><span class="challenge-mark">CHALLENGE</span><strong>${escapeHtml(challenge.label)}</strong><span>REMOVE</span></button>`).join('');
    undoChallengeModal.hidden = false;
    undoChallengeModal.dataset.itemId = item.id;
    undoChallengeModal.dataset.wheelTitle = wheel.title;
  }

  function closeUndoChallengePicker() {
    undoChallengeModal.hidden = true;
    delete undoChallengeModal.dataset.itemId;
    delete undoChallengeModal.dataset.wheelTitle;
  }

  function undoActiveChallenge(id) {
    const challenge = activeChallenges.find(entry => entry.id === id && entry.type === 'challenge');
    if (!challenge || !pendingOutcome) return;
    activeChallenges = activeChallenges.filter(entry => entry.id !== id);
    persistChallenges();
    renderChallenges();
    const wheel = currentWheel();
    closeUndoChallengePicker();
    showOutcomeResult(`Removed challenge: ${challenge.label}`, wheel);
  }

  function undoMostRecentChallenge(wheel) {
    const mostRecent = activeChallenges.find(effect => effect.type === 'challenge');
    if (!mostRecent) return false;
    activeChallenges = activeChallenges.filter(effect => effect.id !== mostRecent.id);
    persistChallenges();
    renderChallenges();
    showOutcomeResult(`Undid most recent challenge: ${mostRecent.label}`, wheel);
    return true;
  }

  function showOverlay(kicker, heading, meta, duration, onComplete) {
    if (routeTimer) window.clearTimeout(routeTimer);
    routeOverlayKicker.textContent = kicker;
    routeOverlayTitle.textContent = heading;
    routeOverlayMeta.textContent = meta;
    routeOverlay.hidden = false;
    requestAnimationFrame(() => routeOverlay.classList.add('show'));
    routeTimer = window.setTimeout(() => {
      routeOverlay.classList.remove('show');
      routeOverlay.hidden = true;
      routeTimer = null;
      onComplete();
    }, duration);
  }

  function closeOutcomeModal() {
    outcomeModal.classList.remove('show');
    outcomeModal.hidden = true;
  }

  function returnToFate() {
    pendingOutcome = null;
    closeOutcomeModal();
    closeLottery();
    setWheel('fate');
    flowLocked = false;
    updateSpinState();
  }

  function keepOutcome() {
    if (!pendingOutcome) return;
    finishOutcome(false);
  }

  function removeOutcome() {
    if (!pendingOutcome) return;
    usedIds[pendingOutcome.wheelKey].add(String(pendingOutcome.item.id));
    persistUsed();
    finishOutcome(true);
  }

  function finishOutcome() {
    const item = pendingOutcome?.item;
    if (item?.id === 'spin-twice') doubleNextFate = true;
    if (targetSpinQueue > 1 && pendingOutcome?.wheelKey !== 'fate') {
      targetSpinQueue -= 1;
      pendingOutcome = null;
      closeOutcomeModal();
      flowLocked = false;
      window.setTimeout(spin, 260);
      return;
    }
    targetSpinQueue = 0;
    returnToFate();
  }

  function renderHistory() {
    if (!history.length) {
      historyEl.innerHTML = '<li class="history-empty">No outcomes yet.</li>';
      return;
    }
    historyEl.innerHTML = history.map((entry, index) => {
      const wheelClass = entry.wheel === 'CHALLENGE' ? 'punishment' : 'blessing';
      return `<li><span class="history-index">${String(history.length - index).padStart(2, '0')}</span><span><em class="history-wheel history-wheel-${wheelClass}">${escapeHtml(entry.wheel || '')}</em><span>${escapeHtml(entry.label)}</span></span></li>`;
    }).join('');
  }

  function renderStatus() {
    if (currentWheelKey === 'fate') {
      statusStrip.hidden = true;
      statusStrip.innerHTML = '';
      return;
    }
    statusStrip.hidden = false;
    const remaining = activeItems.length;
    statusStrip.innerHTML = `<div class="status-cell"><span>REMAINING</span><strong>${remaining}</strong></div>`;
  }

  function updateSpinState() {
    if (spinning) {
      spinButton.disabled = true;
      spinButton.querySelector('span').textContent = '...';
      return;
    }
    if (flowLocked) {
      spinButton.disabled = true;
      spinButton.querySelector('span').textContent = '...';
      spinButton.querySelector('small').textContent = 'WAIT';
      return;
    }
    if (currentWheelKey === 'fate' && !activeCharacter()) {
      spinButton.disabled = true;
      spinButton.querySelector('span').textContent = 'CHOOSE';
      spinButton.querySelector('small').textContent = 'CHARACTER';
      return;
    }
    if (!segments.length) {
      spinButton.disabled = true;
      spinButton.querySelector('span').textContent = 'EMPTY';
      spinButton.querySelector('small').textContent = 'RESET';
      return;
    }
    spinButton.disabled = false;
    spinButton.querySelector('span').textContent = 'SPIN';
    spinButton.querySelector('small').textContent = 'SPACE';
  }

  function clearHistory() {
    history = [];
    try { localStorage.removeItem(STORAGE_HISTORY); } catch (_) {}
    renderHistory();
  }

  function resetWheels() {
    spinSerial += 1;
    if (routeTimer) window.clearTimeout(routeTimer);
    routeTimer = null;
    routeOverlay.classList.remove('show');
    routeOverlay.hidden = true;
    pendingOutcome = null;
    targetSpinQueue = 0;
    doubleNextFate = false;
    fateChallengeStreak = 0;
    try { localStorage.removeItem(STORAGE_FATE_PITY); } catch (_) {}
    closeOutcomeModal();
    routeKeys.forEach(key => usedIds[key].clear());
    try { localStorage.removeItem(STORAGE_USED); } catch (_) {}
    history = [];
    try { localStorage.removeItem(STORAGE_HISTORY); } catch (_) {}
    renderHistory();
    flowLocked = false;
    spinning = false;
    setWheel('fate');
    resultText.textContent = 'Challenge and Blessing wheels reset.';
    renderFatePity();
  }

  function toggleSound() {
    soundOn = !soundOn;
    soundButton.textContent = soundOn ? 'SOUND ON' : 'SOUND OFF';
    soundButton.setAttribute('aria-pressed', String(soundOn));
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) {}
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  spinButton.addEventListener('click', spin);
  soundButton.addEventListener('click', toggleSound);
  fullscreenButton.addEventListener('click', toggleFullscreen);
  clearButton.addEventListener('click', clearHistory);
  clearChallengesButton.addEventListener('click', clearChallenges);
  trackerClearChallengesButton.addEventListener('click', clearChallenges);
  appTabs.forEach(tab => tab.addEventListener('click', () => switchView(tab.dataset.view)));
  includeWorldBosses.addEventListener('change', () => { bossTracker.includeWorld = includeWorldBosses.checked; selectFirstBoss(); renderBossTracker(); });
  includeWeeklyBosses.addEventListener('change', () => { bossTracker.includeWeekly = includeWeeklyBosses.checked; selectFirstBoss(); renderBossTracker(); });
  nextBossButton.addEventListener('click', chooseNextBoss);
  bossDefeatedButton.addEventListener('click', () => finishBoss('defeated'));
  bossLostButton.addEventListener('click', () => finishBoss('lost'));
  clearBossResultButton.addEventListener('click', clearBossResult);
  bossOverview.addEventListener('click', (event) => {
    const card = event.target.closest('[data-boss-id]');
    if (!card) return;
    bossTracker.currentId = card.dataset.bossId;
    persistBossTracker();
    renderBossTracker();
  });
  wheelBossCard.addEventListener('click', openBossActions);
  bossActionsClose.addEventListener('click', closeBossActions);
  modalBossChoose.addEventListener('click', () => {
    if (!bossActionSelect.value) return;
    bossTracker.currentId = bossActionSelect.value;
    persistBossTracker();
    renderBossTracker();
    closeBossActions();
  });
  modalBossNext.addEventListener('click', () => {
    chooseNextBoss();
    closeBossActions();
  });
  modalBossDefeated.addEventListener('click', () => {
    finishBoss('defeated');
    closeBossActions();
  });
  modalBossLost.addEventListener('click', () => {
    finishBoss('lost');
    closeBossActions();
  });
  modalBossClear.addEventListener('click', () => {
    clearBossResult();
    closeBossActions();
  });
  resetWheelButton.addEventListener('click', resetWheels);
  rosterButton.addEventListener('click', openRosterSettings);
  activeCharacterButton.addEventListener('click', openCharacterPicker);
  chooseCharacterButton.addEventListener('click', openCharacterPicker);
  characterPickerClose.addEventListener('click', closeCharacterPicker);
  rosterCancelButton.addEventListener('click', closeRosterSettings);
  rosterSaveButton.addEventListener('click', saveRosterSettings);
  characterPickerGroups.addEventListener('click', (event) => {
    const card = event.target.closest('[data-character-id]');
    if (card) selectActiveCharacter(card.dataset.characterId);
  });
  rosterGroups.addEventListener('click', (event) => {
    const card = event.target.closest('[data-character-id]');
    if (card) toggleRosterCharacter(card.dataset.characterId);
  });
  rosterWeaponGroups.addEventListener('click', (event) => {
    const card = event.target.closest('[data-weapon-id]');
    if (card) toggleRosterWeapon(card.dataset.weaponId);
  });
  keepOutcomeButton.addEventListener('click', keepOutcome);
  removeOutcomeButton.addEventListener('click', removeOutcome);
  lotteryStopButton.addEventListener('click', stopLottery);
  undoChallengeClose.addEventListener('click', () => {
    closeUndoChallengePicker();
    returnToFate();
  });
  undoChallengeList.addEventListener('click', (event) => {
    const option = event.target.closest('[data-challenge-id]');
    if (option) undoActiveChallenge(option.dataset.challengeId);
  });

  document.addEventListener('keydown', (event) => {
    if (event.repeat) return;
    if (!characterPickerModal.hidden || !rosterModal.hidden || !undoChallengeModal.hidden || !bossActionsModal.hidden) {
      if (event.key === 'Escape') {
        const undoWasOpen = !undoChallengeModal.hidden;
        closeCharacterPicker();
        closeRosterSettings();
        closeUndoChallengePicker();
        closeBossActions();
        if (undoWasOpen) returnToFate();
      }
      return;
    }
    if (lotteryState && (event.code === 'Space' || event.key === 'Enter')) { event.preventDefault(); stopLottery(); return; }
    if (pendingOutcome && event.key === 'Enter') { event.preventDefault(); keepOutcome(); return; }
    if (pendingOutcome && event.key.toLowerCase() === 'x') { event.preventDefault(); removeOutcome(); return; }
    if (event.code === 'Space') { event.preventDefault(); spin(); }
    if (event.key.toLowerCase() === 'f') toggleFullscreen();
    if (event.key.toLowerCase() === 'r') resetWheels();
  });

  const observer = new ResizeObserver(resizeCanvas);
  observer.observe(wheelWrap);
  window.addEventListener('resize', resizeCanvas);

  setWheel('fate');
  if (!currentBoss() && selectedBosses().length) selectFirstBoss();
  resultText.textContent = 'Spin the wheel.';
  renderFatePity();
  renderHistory();
  renderChallenges();
  renderBossTracker();
  soundButton.textContent = soundOn ? 'SOUND ON' : 'SOUND OFF';
  soundButton.setAttribute('aria-pressed', String(soundOn));
  resizeCanvas();
})();
