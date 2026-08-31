(() => {
  'use strict';

  const config = window.WHEEL_CONFIG;
  if (!config || !Array.isArray(config.items) || !config.items.length) {
    document.body.innerHTML = '<pre style="color:white">wheel-data.js is missing or invalid.</pre>';
    return;
  }

  const canvas = document.getElementById('wheel');
  const g = canvas.getContext('2d');
  const wheelWrap = document.getElementById('wheelWrap');
  const spinButton = document.getElementById('spinButton');
  const soundButton = document.getElementById('soundButton');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const clearButton = document.getElementById('clearButton');
  const resetWheelButton = document.getElementById('resetWheelButton');
  const pointer = document.querySelector('.pointer');
  const resultText = document.getElementById('resultText');
  const resultChance = document.getElementById('resultChance');
  const historyEl = document.getElementById('history');
  const statusStrip = document.getElementById('statusStrip');
  const resultFlash = document.getElementById('resultFlash');

  document.getElementById('title').textContent = config.title || 'THE WHEEL';
  document.getElementById('subtitle').textContent = config.subtitle || 'EVERY DEATH = ONE SPIN';

  const TAU = Math.PI * 2;
  const POINTER_ANGLE = -Math.PI / 2;
  const STORAGE_USED = 'deathWheelUsedV2';
  const STORAGE_HISTORY = 'deathWheelHistoryV2';

  const allItems = config.items.map((item, index) => ({
    ...item,
    id: String(item.id || `item-${index + 1}`)
  }));

  let activeItems = [];
  let segments = [];
  let usedIds = new Set();
  let pendingRemovalId = null;
  let rotation = 0;
  let spinning = false;
  let soundOn = config.soundOnByDefault !== false;
  let audioCtx = null;
  let lastPointerSegment = -1;
  let history = [];

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_USED) || '[]');
    if (Array.isArray(saved)) usedIds = new Set(saved.map(String));
  } catch (_) {}

  try {
    const savedHistory = JSON.parse(localStorage.getItem(STORAGE_HISTORY) || '[]');
    if (Array.isArray(savedHistory)) history = savedHistory;
  } catch (_) {}

  // Ignore stale ids if the data file changed.
  const validIds = new Set(allItems.map(x => x.id));
  usedIds = new Set([...usedIds].filter(id => validIds.has(id)));

  function rng() {
    if (window.crypto?.getRandomValues) {
      const a = new Uint32Array(1);
      window.crypto.getRandomValues(a);
      return a[0] / 4294967296;
    }
    return Math.random();
  }

  function mod(n, m) { return ((n % m) + m) % m; }

  function rebuildSegments() {
    activeItems = allItems.filter(item => !usedIds.has(item.id));
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

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    drawWheel();
  }

  function drawWheel() {
    const rect = canvas.getBoundingClientRect();
    const dpr = canvas.width / Math.max(rect.width, 1);
    const cssW = canvas.width / dpr;
    const cssH = canvas.height / dpr;
    const cx = cssW / 2;
    const cy = cssH / 2;
    const radius = Math.min(cssW, cssH) * 0.485;

    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, cssW, cssH);

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
      g.font = `600 ${radius * .065}px Bahnschrift, Arial Narrow, Segoe UI, sans-serif`;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText('EMPTY — RESET WHEEL', 0, 0, radius * 1.25);
      g.restore();
      return;
    }

    g.save();
    g.translate(cx, cy);
    g.rotate(rotation);

    segments.forEach((seg) => {
      g.beginPath();
      g.moveTo(0, 0);
      g.arc(0, 0, radius, seg.start, seg.end);
      g.closePath();
      g.fillStyle = '#f1f1ee';
      g.fill();

      g.strokeStyle = 'rgba(16,17,17,.42)';
      g.lineWidth = 1.15;
      g.stroke();

      drawSegmentLabel(seg, radius);
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
    g.strokeStyle = 'rgba(244,239,230,.35)';
    g.lineWidth = 1.2;
    g.stroke();

    g.restore();
  }

  function drawSegmentLabel(seg, radius) {
    const arc = seg.end - seg.start;
    const mid = (seg.start + seg.end) / 2;
    const degrees = arc * 180 / Math.PI;
    let text = seg.short || seg.label;

    if (degrees < 8 && text.length > 12) text = text.slice(0, 10) + '…';

    const fontSize = degrees < 9 ? radius * .030 : degrees < 15 ? radius * .032 : radius * .035;
    const textRadius = degrees < 9 ? radius * .72 : radius * .67;

    g.save();
    g.rotate(mid);
    g.translate(textRadius, 0);

    const normalised = mod(mid, TAU);
    const flip = normalised > Math.PI / 2 && normalised < Math.PI * 1.5;
    if (flip) g.rotate(Math.PI);

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
    return segments[Math.floor(rng() * segments.length)];
  }

  function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }

  function segmentUnderPointer(rot) {
    if (!segments.length) return -1;
    const local = mod(POINTER_ANGLE - rot, TAU);
    return segments.findIndex(s => local >= s.start && local < s.end);
  }

  function tick() {
    pointer.classList.remove('tick');
    void pointer.offsetWidth;
    pointer.classList.add('tick');

    if (!soundOn) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(820, audioCtx.currentTime);
      gain.gain.setValueAtTime(.026, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + .035);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + .04);
    } catch (_) {}
  }

  function applyPendingRemoval() {
    if (!pendingRemovalId || config.removeSelected === false) return;
    usedIds.add(pendingRemovalId);
    pendingRemovalId = null;
    persistUsed();
    rebuildSegments();
  }

  function spin() {
    if (spinning) return;

    // Keep the previous result visibly landed until the next spin begins.
    // At this point it is removed, then the remaining slices redistribute equally.
    applyPendingRemoval();

    if (!segments.length) {
      updateSpinState();
      return;
    }

    spinning = true;
    spinButton.disabled = true;
    spinButton.querySelector('span').textContent = '...';

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
      const t = Math.min(1, (now - startTime) / duration);
      rotation = startRotation + (endRotation - startRotation) * easeOutQuint(t);
      drawWheel();

      const currentSegment = segmentUnderPointer(rotation);
      if (currentSegment !== lastPointerSegment) {
        lastPointerSegment = currentSegment;
        tick();
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        rotation = mod(endRotation, TAU);
        drawWheel();
        spinning = false;
        spinButton.disabled = false;
        spinButton.querySelector('span').textContent = 'SPIN';
        reveal(chosen);
      }
    }

    requestAnimationFrame(frame);
  }

  function reveal(item) {
    const chanceAtSpin = 100 / activeItems.length;
    resultText.textContent = item.label;
    resultChance.textContent = `1 OF ${activeItems.length} · ${formatPercent(chanceAtSpin)} AT THIS SPIN · WILL NOT REPEAT`;

    const entry = {
      id: item.id,
      label: item.label,
      time: new Date().toISOString()
    };
    history.unshift(entry);
    history = history.slice(0, 100);
    persistHistory();
    renderHistory();

    if (config.removeSelected !== false) {
      pendingRemovalId = item.id;
      // Reserve it immediately so a reload cannot make it eligible again.
      usedIds.add(item.id);
      persistUsed();
      // But do not redraw yet; this leaves the landed slice visible until the next spin.
    }

    renderStatus();
    resultFlash.classList.remove('show');
    void resultFlash.offsetWidth;
    resultFlash.classList.add('show');
  }

  function renderHistory() {
    if (!history.length) {
      historyEl.innerHTML = '<li class="history-empty">No spins yet.</li>';
      return;
    }
    historyEl.innerHTML = history.map((h, i) =>
      `<li><span class="history-index">${String(history.length - i).padStart(2, '0')}</span><span>${escapeHtml(h.label)}</span></li>`
    ).join('');
  }

  function renderStatus() {
    // Account for a just-selected item that is already reserved but still visible until next spin.
    const remaining = allItems.length - usedIds.size;
    statusStrip.innerHTML = `
      <div class="status-cell"><span>STARTING ITEMS</span><strong>${allItems.length}</strong></div>
      <div class="status-cell"><span>REMAINING</span><strong>${Math.max(0, remaining)}</strong></div>
      <div class="status-cell"><span>SELECTION</span><strong>EQUAL</strong></div>
      <div class="status-cell"><span>REPEATS</span><strong>OFF</strong></div>`;
  }

  function updateSpinState() {
    const remaining = allItems.length - usedIds.size;
    if (remaining <= 0 && !pendingRemovalId) {
      spinButton.disabled = true;
      spinButton.querySelector('span').textContent = 'EMPTY';
      spinButton.querySelector('small').textContent = 'RESET';
    } else {
      spinButton.disabled = spinning;
      spinButton.querySelector('small').textContent = 'SPACE';
      if (!spinning) spinButton.querySelector('span').textContent = 'SPIN';
    }
  }

  function formatPercent(v) {
    if (v >= 10) return `${v.toFixed(1).replace(/\.0$/, '')}%`;
    return `${v.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')}%`;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  function persistUsed() {
    try { localStorage.setItem(STORAGE_USED, JSON.stringify([...usedIds])); } catch (_) {}
  }

  function persistHistory() {
    try { localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history)); } catch (_) {}
  }

  function clearHistory() {
    history = [];
    try { localStorage.removeItem(STORAGE_HISTORY); } catch (_) {}
    renderHistory();
    resultText.textContent = 'Spin after a death.';
    resultChance.textContent = '—';
  }

  function resetWheel() {
    usedIds.clear();
    pendingRemovalId = null;
    try { localStorage.removeItem(STORAGE_USED); } catch (_) {}
    rotation = 0;
    rebuildSegments();
    resultText.textContent = 'All outcomes are back in the wheel.';
    resultChance.textContent = `${allItems.length} EQUAL OUTCOMES · NO REPEATS`;
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

  spinButton.addEventListener('click', spin);
  soundButton.addEventListener('click', toggleSound);
  fullscreenButton.addEventListener('click', toggleFullscreen);
  clearButton.addEventListener('click', clearHistory);
  resetWheelButton.addEventListener('click', resetWheel);

  document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    if (e.code === 'Space') { e.preventDefault(); spin(); }
    if (e.key.toLowerCase() === 'f') toggleFullscreen();
    if (e.key.toLowerCase() === 'r') resetWheel();
  });

  const ro = new ResizeObserver(resizeCanvas);
  ro.observe(wheelWrap);
  window.addEventListener('resize', resizeCanvas);

  // If a selected item was stored during a previous session, don't redraw it as available.
  pendingRemovalId = null;
  rebuildSegments();
  renderHistory();
  soundButton.textContent = soundOn ? 'SOUND ON' : 'SOUND OFF';
  soundButton.setAttribute('aria-pressed', String(soundOn));
  resizeCanvas();
})();
