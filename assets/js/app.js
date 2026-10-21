
// ============================================================================
// MACHIAVELLIFY APPLICATION STATE & STORAGE ENGINE
// ============================================================================

const AppState = {
  selectedPyramidTier: 'tier-1',
  activeArenaId: 'corporate',
  activeMaximFilter: 'all',
  activeGameTab: 'gambit',
  activeBlogCat: 'all',
  annualBilling: false,
  currentArticleId: null,
  user: null,
  savedVaultItems: [],
  bookings: [],
  dispatches: [],
  intrigue: {
    stageIndex: 0,
    fear: 70,
    leverage: 65,
    optics: 60,
    protest: 20,
    history: []
  },
  gauntlet: {
    currentQ: 0,
    score: 0,
    answered: false
  },
  gambit: {
    gridSize: 8,
    turn: 1,
    maxTurns: 25,
    score: 0,
    highScore: 0,
    fearAura: 100,
    foxCharges: 3,
    lionCharges: 2,
    soundEnabled: true,
    gameOver: false,
    player: { x: 0, y: 0 },
    nodes: [],
    rebels: [],
    snares: [],
    logs: []
  }
};

function loadPersistedState() {
  try {
    const savedVault = localStorage.getItem('machiavellify_vault');
    if (savedVault) AppState.savedVaultItems = JSON.parse(savedVault);
    const savedUser = localStorage.getItem('machiavellify_user');
    if (savedUser) AppState.user = JSON.parse(savedUser);
    const savedBookings = localStorage.getItem('machiavellify_bookings');
    if (savedBookings) AppState.bookings = JSON.parse(savedBookings);
    const savedHigh = localStorage.getItem('machiavellify_gambit_high');
    if (savedHigh) AppState.gambit.highScore = parseInt(savedHigh, 10) || 0;
  } catch (e) {
    // Sandbox safe fallback
  }
}

function savePersistedState() {
  try {
    localStorage.setItem('machiavellify_vault', JSON.stringify(AppState.savedVaultItems));
    if (AppState.user) {
      localStorage.setItem('machiavellify_user', JSON.stringify(AppState.user));
    } else {
      localStorage.removeItem('machiavellify_user');
    }
    localStorage.setItem('machiavellify_bookings', JSON.stringify(AppState.bookings));
    localStorage.setItem('machiavellify_gambit_high', String(AppState.gambit.highScore));
  } catch (e) {
    // Sandbox safe fallback
  }
}

let toastTimer = null;
function showToast(msg) {
  const banner = document.getElementById('toastBanner');
  const textEl = document.getElementById('toastMessageText');
  if (!banner || !textEl) return;
  textEl.textContent = msg;
  banner.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    banner.classList.add('hidden');
  }, 3200);
}

// ============================================================================
// SYNTHESIZED WEB AUDIO SOUND ENGINE (NO EXTERNAL AUDIO FILES)
// ============================================================================
let audioCtx = null;
function playTacticalSound(type) {
  if (!AppState.gambit.soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === 'move') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'capture') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
      osc.start(now);
      osc.stop(now + 0.19);
    } else if (type === 'purge') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.25);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === 'hit') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.21);
      osc.start(now);
      osc.stop(now + 0.21);
    }
  } catch (e) {
    // Ignore audio context restrictions
  }
}

// ============================================================================
// 1. PYRAMID OF POWER INTERACTIVE VISUALIZER
// ============================================================================
function renderPyramidVisualizer() {
  const container = document.getElementById('pyramidVisualizer');
  const detailBox = document.getElementById('pyramidDetailBox');
  if (!container || !detailBox) return;

  const widths = ['w-3/5', 'w-4/6', 'w-5/6', 'w-11/12', 'w-full'];
  container.innerHTML = PYRAMID_TIERS.map((tier, idx) => {
    const isSelected = tier.id === AppState.selectedPyramidTier;
    const activeRing = isSelected ? 'ring-2 ring-amber-400 scale-[1.01]' : 'opacity-85 hover:opacity-100';
    return `
      <div class="flex justify-center">
        <button type="button" data-pyramid-id="${tier.id}" class="pyramid-tier-btn pyramid-tier ${widths[idx]} py-2.5 px-4 rounded-lg bg-gradient-to-r ${tier.color} ${activeRing} border border-white/15 flex items-center justify-between text-xs shadow-md">
          <span class="font-mono-code uppercase tracking-wider truncate">${tier.rank}: ${tier.title}</span>
          <span class="hidden sm:inline text-[10px] opacity-90 ml-2 shrink-0">${tier.pop}</span>
        </button>
      </div>
    `;
  }).join('');

  const selected = PYRAMID_TIERS.find(t => t.id === AppState.selectedPyramidTier) || PYRAMID_TIERS[0];
  detailBox.innerHTML = `
    <div class="flex items-center justify-between">
      <span class="text-[11px] font-mono-code uppercase text-amber-400 font-bold">${selected.rank} • ${selected.pop}</span>
      <span class="text-[10px] font-mono-code text-slate-400">STRUCTURAL REALITY</span>
    </div>
    <div class="font-cinzel text-sm sm:text-base font-bold text-white">${selected.title}</div>
    <p class="text-xs text-slate-300 leading-relaxed">${selected.summary}</p>
    <div class="pt-1 border-t border-white/10 text-xs text-amber-300">
      <strong>Machiavellian Directive:</strong> ${selected.tactic}
    </div>
  `;

  container.querySelectorAll('.pyramid-tier-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      AppState.selectedPyramidTier = btn.getAttribute('data-pyramid-id');
      renderPyramidVisualizer();
    });
  });
}

// ============================================================================
// 2. CENTRAL COMMAND SEARCH BAR (OMNISEARCH ENGINE)
// ============================================================================
function executeCentralSearch() {
  const inputEl = document.getElementById('centralSearchInput');
  const catEl = document.getElementById('centralSearchCategory');
  const resultsEl = document.getElementById('centralSearchResults');
  const countEl = document.getElementById('centralSearchResultCount');
  const clearBtn = document.getElementById('clearCentralSearchBtn');
  if (!inputEl || !catEl || !resultsEl || !countEl) return;

  const query = inputEl.value.trim().toLowerCase();
  const cat = catEl.value;

  if (!query && cat === 'all') {
    resultsEl.classList.add('hidden');
    if (clearBtn) clearBtn.classList.add('hidden');
    countEl.textContent = 'Type a keyword or click a tag below to filter all doctrines';
    return;
  }

  if (clearBtn) clearBtn.classList.toggle('hidden', !query);

  const matches = [];

  if (cat === 'all' || cat === 'arena') {
    ARENAS_DATA.forEach(a => {
      const hay = `${a.name} ${a.headline} ${a.sheepIllusion} ${a.wolfReality} ${a.fearVsLoveApplication} ${a.blurringTheLineProtocol}`.toLowerCase();
      if (!query || hay.includes(query)) {
        matches.push({
          type: 'REAL-WORLD ARENA',
          title: a.headline,
          desc: a.wolfReality,
          actionType: 'arena',
          targetId: a.id
        });
      }
    });
  }

  if (cat === 'all' || cat === 'maxim') {
    MAXIMS_DATA.forEach(m => {
      const hay = `${m.title} ${m.chapter} ${m.category} ${m.quote} ${m.analysis} ${m.realWorldMove}`.toLowerCase();
      if (!query || hay.includes(query)) {
        matches.push({
          type: `MAXIM • ${m.chapter}`,
          title: m.title,
          desc: `"${m.quote}" — ${m.realWorldMove}`,
          actionType: 'maxim',
          targetId: m.id
        });
      }
    });
  }

  if (cat === 'all' || cat === 'blog') {
    BLOG_POSTS.forEach(b => {
      const hay = `${b.title} ${b.category} ${b.excerpt} ${b.tags.join(' ')} ${b.body.join(' ')}`.toLowerCase();
      if (!query || hay.includes(query)) {
        matches.push({
          type: `BLOG DOSSIER • ${b.category}`,
          title: b.title,
          desc: b.excerpt,
          actionType: 'blog',
          targetId: b.id
        });
      }
    });
  }

  if (cat === 'all' || cat === 'game') {
    const gamesList = [
      { id: 'gambit', title: "The Sovereign's Gambit (8x8 Citadel Board Game)", desc: 'Command Fox snares and Lion fear purges on an interactive tactical grid.' },
      { id: 'intrigue', title: 'Realpolitik Dilemma & Crisis Simulator', desc: 'Test your instincts in corporate, academic, and bureaucratic protest crises.' },
      { id: 'gauntlet', title: 'Dark Psychology & Manipulation Mastery Gauntlet', desc: 'Detect double binds, passive-aggressive traps, and status degradation.' }
    ];
    gamesList.forEach(g => {
      if (!query || `${g.title} ${g.desc} game simulator`.toLowerCase().includes(query)) {
        matches.push({
          type: 'STRATEGIC GAME',
          title: g.title,
          desc: g.desc,
          actionType: 'game',
          targetId: g.id
        });
      }
    });
  }

  if (cat === 'all' || cat === 'counselling') {
    COUNSELLING_TIERS.forEach(t => {
      const hay = `${t.name} ${t.subtitle} ${t.features.join(' ')} counselling war room audit`.toLowerCase();
      if (!query || hay.includes(query)) {
        matches.push({
          type: 'COUNSELLING RETAINER',
          title: `${t.name} — ${t.subtitle}`,
          desc: t.features.join(' • '),
          actionType: 'counselling',
          targetId: t.id
        });
      }
    });
  }

  countEl.textContent = `${matches.length} intelligence match${matches.length === 1 ? '' : 'es'} found`;
  resultsEl.classList.remove('hidden');

  if (matches.length === 0) {
    resultsEl.innerHTML = `
      <div class="col-span-full p-4 rounded-xl bg-obsidian-950 border border-white/10 text-xs text-slate-400">
        No intelligence matches found for "<strong>${ query }</strong>". Try searching <em>fear</em>, <em>corporate</em>, <em>protest</em>, <em>fox</em>, or <em>college</em>.
      </div>
    `;
    return;
  }

  resultsEl.innerHTML = matches.map((m, i) => `
    <div class="p-3.5 rounded-xl bg-obsidian-950 border border-white/10 hover:border-amber-400/50 flex flex-col justify-between gap-2 transition">
      <div>
        <span class="text-[10px] font-mono-code uppercase text-amber-400 block">${m.type}</span>
        <h4 class="font-cinzel text-sm font-bold text-white mt-0.5">${m.title}</h4>
        <p class="text-xs text-slate-400 mt-1 line-clamp-2">${m.desc}</p>
      </div>
      <button type="button" data-res-idx="${i}" class="search-result-jump-btn self-start text-[11px] font-mono-code text-crimson-400 hover:text-amber-300 uppercase tracking-wider mt-1">
        Open Intelligence →
      </button>
    </div>
  `).join('');

  resultsEl.querySelectorAll('.search-result-jump-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = matches[parseInt(btn.getAttribute('data-res-idx'), 10)];
      if (!item) return;
      if (item.actionType === 'arena') {
        AppState.activeArenaId = item.targetId;
        renderArenasSection();
        document.getElementById('arenasSection').scrollIntoView({ behavior: 'smooth' });
      } else if (item.actionType === 'maxim') {
        AppState.activeMaximFilter = 'all';
        renderMaximsGrid();
        document.getElementById('cornerSection').scrollIntoView({ behavior: 'smooth' });
      } else if (item.actionType === 'blog') {
        openArticleModal(item.targetId);
      } else if (item.actionType === 'game') {
        switchGameTab(item.targetId);
        document.getElementById('gamesSection').scrollIntoView({ behavior: 'smooth' });
      } else if (item.actionType === 'counselling') {
        document.getElementById('counsellingSection').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================================================
// 3. REAL-WORLD ARENAS SECTION (Corporate, Business, College, Workplace, Bureaucracy)
// ============================================================================
function renderArenasSection() {
  const tabsEl = document.getElementById('arenaTabsContainer');
  const detailEl = document.getElementById('arenaDetailView');
  if (!tabsEl || !detailEl) return;

  tabsEl.innerHTML = ARENAS_DATA.map(a => {
    const active = a.id === AppState.activeArenaId;
    const cls = active
      ? 'bg-gradient-to-r from-crimson-700 to-crimson-600 text-white border-crimson-400/50 shadow-lg'
      : 'bg-obsidian-800 text-slate-300 hover:text-amber-400 border-white/10';
    return `
      <button type="button" data-arena-id="${a.id}" class="arena-tab-btn px-3.5 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition ${cls}">
        ${a.name}
      </button>
    `;
  }).join('');

  const arena = ARENAS_DATA.find(a => a.id === AppState.activeArenaId) || ARENAS_DATA[0];

  detailEl.innerHTML = `
    <!-- Left 7 Cols: Sheep vs Wolf + Fear over Love + Line Blurring -->
    <div class="lg:col-span-7 card-surface rounded-2xl p-5 sm:p-7 border border-white/10 flex flex-col justify-between space-y-5">
      <div>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span class="px-2.5 py-1 rounded bg-crimson-950 border border-crimson-500/40 text-crimson-300 font-mono-code text-[11px] uppercase">${arena.badge}</span>
          <button type="button" data-save-arena="${arena.id}" class="save-arena-btn text-xs font-mono-code text-amber-400 hover:underline">
            ★ Save Playbook to Vault
          </button>
        </div>
        <h3 class="font-cinzel text-xl sm:text-2xl font-black text-white">${arena.headline}</h3>
        <blockquote class="mt-3 p-3 rounded-xl bg-obsidian-950 border-l-4 border-amber-500 text-xs sm:text-sm italic text-amber-200/90">
          ${arena.quote}
        </blockquote>
      </div>

      <!-- Contrast Cards: Sheep Costume vs Predator Doctrine -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="p-4 rounded-xl bg-obsidian-950/90 border border-white/10">
          <div class="text-[11px] font-mono-code uppercase text-slate-400 mb-1">🐑 THE SHEEP ILLUSION (WEAKNESS)</div>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${arena.sheepIllusion}</p>
        </div>
        <div class="p-4 rounded-xl bg-crimson-950/30 border border-crimson-500/40">
          <div class="text-[11px] font-mono-code uppercase text-amber-400 mb-1">🐺 THE WOLF REALITY (PREDATOR)</div>
          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${arena.wolfReality}</p>
        </div>
      </div>

      <!-- Fear vs Love & Blurring the Line Boxes -->
      <div class="space-y-3">
        <div class="p-4 rounded-xl bg-obsidian-950 border border-amber-500/30">
          <div class="text-xs font-cinzel font-bold text-amber-400 uppercase mb-1">Applying "Feared Rather Than Loved" in ${arena.name}</div>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${arena.fearVsLoveApplication}</p>
        </div>
        <div class="p-4 rounded-xl bg-obsidian-950 border border-white/10">
          <div class="text-xs font-cinzel font-bold text-crimson-400 uppercase mb-1">Suppressing Protests &amp; Resistance by "Blurring the Line"</div>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${arena.blurringTheLineProtocol}</p>
        </div>
      </div>
    </div>

    <!-- Right 5 Cols: 4 Tactical Execution Plays -->
    <div class="lg:col-span-5 card-surface rounded-2xl p-5 sm:p-7 border border-amber-500/30 flex flex-col justify-between space-y-4">
      <div>
        <span class="text-[11px] font-mono-code uppercase text-amber-400">STEP-BY-STEP EXECUTION</span>
        <h4 class="font-cinzel text-lg sm:text-xl font-bold text-white mt-0.5 mb-4">Four Tactical Power Plays for ${arena.name}</h4>
        <div class="space-y-3">
          ${arena.playbook.map((step, i) => `
            <div class="p-3.5 rounded-xl bg-obsidian-950 border border-white/10 hover:border-amber-500/40 transition">
              <div class="flex items-center gap-2 font-cinzel font-bold text-sm text-amber-400">
                <span class="w-5 h-5 rounded bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono-code">0${i + 1}</span>
                <span>${step.title}</span>
              </div>
              <p class="text-xs text-slate-300 mt-1.5 leading-relaxed">${step.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
        <span class="text-xs text-slate-400">Ready to test this arena under pressure?</span>
        <button type="button" id="arenaLaunchSimulatorBtn" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition">
          Simulate Crisis →
        </button>
      </div>
    </div>
  `;

  tabsEl.querySelectorAll('.arena-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      AppState.activeArenaId = btn.getAttribute('data-arena-id');
      renderArenasSection();
    });
  });

  const saveBtn = detailEl.querySelector('.save-arena-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveItemToVault(`Arena Playbook: ${arena.headline}`, 'ARENA PLAYBOOK');
    });
  }

  const simBtn = document.getElementById('arenaLaunchSimulatorBtn');
  if (simBtn) {
    simBtn.addEventListener('click', () => {
      switchGameTab('intrigue');
      document.getElementById('gamesSection').scrollIntoView({ behavior: 'smooth' });
    });
  }
}


// ============================================================================
// 4. MACHIAVELLI'S CORNER: TELEMETRY CALCULATOR, CHART.JS RADAR & MAXIMS
// ============================================================================
let radarChartInstance = null;

function updateMachiavelliTelemetry() {
  const sFear = parseInt(document.getElementById('sliderFear')?.value || '85', 10);
  const sLove = parseInt(document.getElementById('sliderLove')?.value || '25', 10);
  const sBlur = parseInt(document.getElementById('sliderBlur')?.value || '90', 10);
  const sDep = parseInt(document.getElementById('sliderDep')?.value || '80', 10);
  const sFox = parseInt(document.getElementById('sliderFox')?.value || '88', 10);

  document.getElementById('valFearSlider').textContent = sFear + '%';
  document.getElementById('valLoveSlider').textContent = sLove + '%';
  document.getElementById('valBlurSlider').textContent = sBlur + '%';
  document.getElementById('valDepSlider').textContent = sDep + '%';
  document.getElementById('valFoxSlider').textContent = sFox + '%';

  // Compute Sovereign Control & Mutiny Risk based on Machiavellian axioms
  const loveVulnerabilityPenalty = Math.max(0, (sLove - sFear) * 0.45);
  const rawControl = (sFear * 0.30) + (sBlur * 0.25) + (sDep * 0.20) + (sFox * 0.25) - loveVulnerabilityPenalty;
  const controlScore = Math.max(5, Math.min(100, Math.round(rawControl)));

  const rawMutiny = Math.max(2, Math.min(98, Math.round(100 - (sFear * 0.35 + sBlur * 0.35 + sDep * 0.30) + (sLove * 0.20))));

  let archetype = 'THE LION-FOX SOVEREIGN';
  let verdictHtml = '';
  if (sLove > sFear + 15) {
    archetype = 'UNARMED PROPHET (SHEEP)';
    verdictHtml = `<div class="text-crimson-400 font-bold text-xs uppercase">⚠️ CRITICAL VULNERABILITY: LOVE EXCEEDS FEAR</div>
      <p class="text-xs text-slate-300">You are relying on sentimental gratitude (${sLove}%) over structural dread (${sFear}%). Per Chapter XVII, your subordinates will abandon or overthrow you at the first sign of crisis.</p>`;
  } else if (sFear > 75 && sBlur < 40) {
    archetype = 'EXPOSED LION (BRUTE)';
    verdictHtml = `<div class="text-amber-400 font-bold text-xs uppercase">⚡ WARNING: HIGH FEAR WITHOUT LINE-BLURRING</div>
      <p class="text-xs text-slate-300">Your authority is feared (${sFear}%), but your low line-blurring (${sBlur}%) makes you a visible target for united protests. Increase procedural ambiguity immediately.</p>`;
  } else if (controlScore >= 80) {
    archetype = 'APEX LION-FOX PRINCE';
    verdictHtml = `<div class="text-emerald-400 font-bold text-xs uppercase">✓ OPTIMAL FLORENTINE EQUILIBRIUM</div>
      <p class="text-xs text-slate-300">Calibrated dread (${sFear}%), high subordinate dependency (${sDep}%), and masterful line-blurring (${sBlur}%) reduce protest risk to ${rawMutiny}%. Your citadel is unassailable.</p>`;
  } else {
    archetype = 'TACTICAL COURTIER';
    verdictHtml = `<div class="text-amber-300 font-bold text-xs uppercase">MODERATE REGIME STABILITY</div>
      <p class="text-xs text-slate-300">Your position holds, but increasing Information Asymmetry (Fox Index) and Consequence Certainty will lock in total dominance.</p>`;
  }

  document.getElementById('metricControlScore').textContent = `${controlScore}/100`;
  document.getElementById('metricMutinyRisk').textContent = `${rawMutiny}%`;
  document.getElementById('metricArchetype').textContent = archetype;
  document.getElementById('telemetryVerdictBox').innerHTML = verdictHtml;

  const ctx = document.getElementById('machiavelliRadarChart');
  if (ctx && typeof Chart !== 'undefined') {
    const dataValues = [sFear, 100 - sLove, sBlur, sDep, sFox];
    if (!radarChartInstance) {
      radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Dread (Fear)', 'Emotional Detachment', 'Line-Blurring', 'Subordinate Dependency', 'Fox Deception'],
          datasets: [{
            label: 'Sovereign Power Profile',
            data: dataValues,
            backgroundColor: 'rgba(225, 29, 72, 0.25)',
            borderColor: '#f59e0b',
            pointBackgroundColor: '#e11d48',
            pointBorderColor: '#fff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              min: 0,
              max: 100,
              angleLines: { color: 'rgba(255,255,255,0.1)' },
              grid: { color: 'rgba(255,255,255,0.1)' },
              pointLabels: { color: '#cbd5e1', font: { size: 11, family: 'Inter' } },
              ticks: { display: false }
            }
          },
          plugins: {
            legend: { labels: { color: '#fcd34d', font: { size: 11 } } }
          }
        }
      });
    } else {
      radarChartInstance.data.datasets[0].data = dataValues;
      radarChartInstance.update();
    }
  }
}

function renderMaximsGrid() {
  const grid = document.getElementById('maximsGrid');
  if (!grid) return;
  const filtered = AppState.activeMaximFilter === 'all'
    ? MAXIMS_DATA
    : MAXIMS_DATA.filter(m => m.category === AppState.activeMaximFilter);

  grid.innerHTML = filtered.map(m => `
    <div class="card-surface rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4">
      <div>
        <div class="flex items-center justify-between gap-2 text-[11px] font-mono-code mb-2">
          <span class="text-amber-400 uppercase">${m.chapter}</span>
          <span class="px-2 py-0.5 rounded bg-obsidian-800 text-crimson-300 border border-white/10">${m.category}</span>
        </div>
        <h4 class="font-cinzel text-lg font-bold text-white">${m.title}</h4>
        <blockquote class="mt-2 p-2.5 rounded-lg bg-obsidian-950 border-l-2 border-crimson-500 text-xs italic text-slate-200">
          "${m.quote}"
        </blockquote>
        <p class="text-xs text-slate-300 mt-3 leading-relaxed">${m.analysis}</p>
      </div>
      <div class="pt-3 border-t border-white/10 space-y-2">
        <div class="text-xs text-amber-300"><strong>Real-World Execution:</strong> ${m.realWorldMove}</div>
        <button type="button" data-save-maxim="${m.id}" class="save-maxim-btn text-[11px] font-mono-code text-slate-400 hover:text-amber-400 uppercase tracking-wider">
          ★ Save Law to Vault
        </button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.save-maxim-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const m = MAXIMS_DATA.find(x => x.id === btn.getAttribute('data-save-maxim'));
      if (m) saveItemToVault(`${m.title} (${m.chapter})`, 'FLORENTINE MAXIM');
    });
  });
}

// ============================================================================
// 5. WAR GAMES SWITCHER & GAME 1: THE SOVEREIGN'S GAMBIT (HTML5 CANVAS)
// ============================================================================
function switchGameTab(tabId) {
  AppState.activeGameTab = tabId;
  document.querySelectorAll('.game-tab-btn').forEach(btn => {
    const isAct = btn.getAttribute('data-game-tab') === tabId;
    btn.className = isAct
      ? 'game-tab-btn px-4 py-2.5 rounded-xl bg-amber-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition'
      : 'game-tab-btn px-4 py-2.5 rounded-xl bg-obsidian-800 text-slate-200 hover:bg-obsidian-700 border border-white/10 font-semibold text-xs uppercase tracking-wider transition';
  });

  document.getElementById('gamePanelGambit')?.classList.toggle('hidden', tabId !== 'gambit');
  document.getElementById('gamePanelIntrigue')?.classList.toggle('hidden', tabId !== 'intrigue');
  document.getElementById('gamePanelGauntlet')?.classList.toggle('hidden', tabId !== 'gauntlet');

  if (tabId === 'gambit') {
    resizeAndDrawGambitCanvas();
  }
}

function initGambitGame() {
  const g = AppState.gambit;
  g.turn = 1;
  g.score = 0;
  g.fearAura = 100;
  g.foxCharges = 3;
  g.lionCharges = 2;
  g.gameOver = false;
  g.player = { x: 0, y: 0 };
  g.snares = [];
  g.nodes = [
    { x: 2, y: 1 }, { x: 5, y: 1 }, { x: 1, y: 4 },
    { x: 4, y: 4 }, { x: 6, y: 3 }, { x: 3, y: 6 }, { x: 7, y: 7 }
  ];
  g.rebels = [
    { x: 7, y: 1 }, { x: 6, y: 5 }, { x: 2, y: 7 }
  ];
  g.logs = ['[Turn 1] Campaign begun. Seize green Influence Nodes and crush red Rebel factions.'];
  updateGambitHUD();
  resizeAndDrawGambitCanvas();
}

function addGambitLog(entry) {
  AppState.gambit.logs.unshift(entry);
  if (AppState.gambit.logs.length > 15) AppState.gambit.logs.pop();
}

function updateGambitHUD() {
  const g = AppState.gambit;
  if (g.score > g.highScore) {
    g.highScore = g.score;
    savePersistedState();
  }
  document.getElementById('gambitTurnText').textContent = `${g.turn}/${g.maxTurns}`;
  document.getElementById('gambitScoreVal').textContent = String(g.score);
  document.getElementById('gambitFearVal').textContent = `${g.fearAura}%`;
  document.getElementById('gambitHighScoreVal').textContent = String(g.highScore);
  document.getElementById('gambitFoxCharges').textContent = `${g.foxCharges} left`;
  document.getElementById('gambitLionCharges').textContent = `${g.lionCharges} left`;

  const statusEl = document.getElementById('gambitStatusBadge');
  if (statusEl) {
    if (g.gameOver) {
      statusEl.textContent = g.fearAura <= 0 ? 'DEPOSED BY REBELS' : 'CAMPAIGN COMPLETE — SOVEREIGN VICTORY';
      statusEl.className = 'px-2.5 py-1 rounded bg-crimson-700 text-white text-xs font-mono-code font-bold';
    } else {
      statusEl.textContent = `NODES LEFT: ${g.nodes.length} • REBELS: ${g.rebels.length}`;
      statusEl.className = 'px-2.5 py-1 rounded bg-obsidian-800 text-amber-300 text-xs font-mono-code';
    }
  }

  const logEl = document.getElementById('gambitBattleLog');
  if (logEl) {
    logEl.innerHTML = g.logs.map(l => `<div class="py-0.5 border-b border-white/5">${l}</div>`).join('');
  }
}

function stepGambitTurn(dx, dy) {
  const g = AppState.gambit;
  if (g.gameOver) return;

  const nx = Math.max(0, Math.min(g.gridSize - 1, g.player.x + dx));
  const ny = Math.max(0, Math.min(g.gridSize - 1, g.player.y + dy));
  g.player.x = nx;
  g.player.y = ny;
  playTacticalSound('move');

  // Check if player captured an Influence Node
  const nodeIdx = g.nodes.findIndex(n => n.x === nx && n.y === ny);
  if (nodeIdx !== -1) {
    g.nodes.splice(nodeIdx, 1);
    g.score += 150;
    playTacticalSound('capture');
    addGambitLog(`[Turn ${g.turn}] Seized Institutional Node at (${nx + 1},${ny + 1})! +150 Power.`);
  }

  // Move Rebels toward player or randomly
  for (let i = g.rebels.length - 1; i >= 0; i--) {
    const r = g.rebels[i];
    const stepX = r.x < g.player.x ? 1 : (r.x > g.player.x ? -1 : 0);
    const stepY = r.y < g.player.y ? 1 : (r.y > g.player.y ? -1 : 0);
    if (Math.random() < 0.65) {
      if (Math.abs(g.player.x - r.x) >= Math.abs(g.player.y - r.y)) r.x += stepX;
      else r.y += stepY;
    }

    // Check if rebel stepped on a Fox Snare
    const snareIdx = g.snares.findIndex(s => s.x === r.x && s.y === r.y);
    if (snareIdx !== -1) {
      g.snares.splice(snareIdx, 1);
      g.rebels.splice(i, 1);
      g.score += 200;
      playTacticalSound('capture');
      addGambitLog(`[Turn ${g.turn}] Rebel faction ambushed by Fox Deception Snare! +200 Power.`);
      continue;
    }

    // Check if rebel collided with Prince
    if (r.x === g.player.x && r.y === g.player.y) {
      g.fearAura = Math.max(0, g.fearAura - 25);
      g.score = Math.max(0, g.score - 50);
      playTacticalSound('hit');
      addGambitLog(`[Turn ${g.turn}] Conspirator clash at (${r.x + 1},${r.y + 1})! Fear Aura -25%.`);
      // Push rebel back
      r.x = Math.min(g.gridSize - 1, Math.max(0, r.x - stepX));
    }
  }

  // Spawn new node or rebel periodically to keep board dynamic
  if (g.nodes.length === 0) {
    g.score += 500;
    g.gameOver = true;
    addGambitLog(`[Turn ${g.turn}] TOTAL DOMINION ACHIEVED! +500 Sovereign Bonus!`);
    showToast('Citadel Conquered! +500 Bonus Points!');
  } else if (g.fearAura <= 0 || g.turn >= g.maxTurns) {
    g.gameOver = true;
    addGambitLog(`[Turn ${g.turn}] Campaign concluded. Final Power Score: ${g.score}.`);
  } else {
    g.turn += 1;
  }

  updateGambitHUD();
  resizeAndDrawGambitCanvas();
}

function deployFoxSnare() {
  const g = AppState.gambit;
  if (g.gameOver || g.foxCharges <= 0) return;
  if (g.snares.some(s => s.x === g.player.x && s.y === g.player.y)) {
    showToast('Snare already rigged on this tile.');
    return;
  }
  g.foxCharges -= 1;
  g.snares.push({ x: g.player.x, y: g.player.y });
  playTacticalSound('move');
  addGambitLog(`[Turn ${g.turn}] Fox Deception Snare planted at (${g.player.x + 1},${g.player.y + 1}).`);
  updateGambitHUD();
  resizeAndDrawGambitCanvas();
}

function unleashLionPurge() {
  const g = AppState.gambit;
  if (g.gameOver || g.lionCharges <= 0) return;
  g.lionCharges -= 1;
  playTacticalSound('purge');
  let purged = 0;
  for (let i = g.rebels.length - 1; i >= 0; i--) {
    const r = g.rebels[i];
    if (Math.abs(r.x - g.player.x) <= 2 && Math.abs(r.y - g.player.y) <= 2) {
      g.rebels.splice(i, 1);
      purged += 1;
      g.score += 250;
    }
  }
  if (purged > 0) {
    addGambitLog(`[Turn ${g.turn}] LION FEAR PURGE crushed ${purged} rebel faction(s)! +${purged * 250} Power.`);
    showToast(`Lion Purge eliminated ${purged} rebel faction(s)!`);
  } else {
    addGambitLog(`[Turn ${g.turn}] Lion Decree roared, but no rebels were within 2 tiles.`);
  }
  updateGambitHUD();
  resizeAndDrawGambitCanvas();
}

function resizeAndDrawGambitCanvas() {
  const canvas = document.getElementById('sovereignGambitCanvas');
  const container = document.getElementById('gambitCanvasContainer');
  if (!canvas || !container) return;

  const rect = container.getBoundingClientRect();
  const size = Math.max(260, Math.floor(rect.width));
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  const g = AppState.gambit;
  const cell = size / g.gridSize;

  // Draw board background
  ctx.fillStyle = '#070709';
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < g.gridSize; y++) {
    for (let x = 0; x < g.gridSize; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? '#0f111a' : '#161926';
      ctx.fillRect(x * cell, y * cell, cell, cell);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.strokeRect(x * cell, y * cell, cell, cell);
    }
  }

  // Draw Fox Snares (Purple tactical sigils)
  g.snares.forEach(s => {
    const cx = (s.x + 0.5) * cell;
    const cy = (s.y + 0.5) * cell;
    ctx.fillStyle = 'rgba(168, 85, 247, 0.35)';
    ctx.beginPath();
    ctx.arc(cx, cy, cell * 0.34, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Draw Influence Nodes (Emerald Diamonds)
  g.nodes.forEach(n => {
    const cx = (n.x + 0.5) * cell;
    const cy = (n.y + 0.5) * cell;
    const r = cell * 0.28;
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.lineTo(cx + r, cy);
    ctx.lineTo(cx, cy + r);
    ctx.lineTo(cx - r, cy);
    ctx.closePath();
    ctx.fill();
  });

  // Draw Rebel Factions (Crimson Circles)
  g.rebels.forEach(r => {
    const cx = (r.x + 0.5) * cell;
    const cy = (r.y + 0.5) * cell;
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.arc(cx, cy, cell * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.floor(cell * 0.32)}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('R', cx, cy);
  });

  // Draw Player Sovereign (Gold Crown Circle)
  const px = (g.player.x + 0.5) * cell;
  const py = (g.player.y + 0.5) * cell;
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(px, py, cell * 0.36, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#fef3c7';
  ctx.stroke();

  ctx.fillStyle = '#070709';
  ctx.font = `900 ${Math.floor(cell * 0.35)}px Cinzel, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('♛', px, py + 1);
}

// ============================================================================
// 6. GAME 2: COURT INTRIGUE & REALPOLITIK DILEMMA ENGINE
// ============================================================================
function renderIntrigueEngine() {
  const st = AppState.intrigue;
  document.getElementById('intrigueStatFear').textContent = `${st.fear}%`;
  document.getElementById('intrigueBarFear').style.width = `${st.fear}%`;
  document.getElementById('intrigueStatLeverage').textContent = `${st.leverage}%`;
  document.getElementById('intrigueBarLeverage').style.width = `${st.leverage}%`;
  document.getElementById('intrigueStatOptics').textContent = `${st.optics}%`;
  document.getElementById('intrigueBarOptics').style.width = `${st.optics}%`;
  document.getElementById('intrigueStatProtest').textContent = `${st.protest}%`;
  document.getElementById('intrigueBarProtest').style.width = `${st.protest}%`;

  const container = document.getElementById('intrigueStageContainer');
  if (!container) return;

  if (st.fear <= 15 || st.leverage <= 15 || st.protest >= 95) {
    container.innerHTML = `
      <div class="space-y-4 text-center my-auto py-8">
        <span class="px-3 py-1 rounded bg-crimson-900 text-crimson-200 font-mono-code text-xs uppercase">REGIME COLLAPSED</span>
        <h4 class="font-cinzel text-2xl font-black text-white">You Were Overthrown by Subordinate Mutiny</h4>
        <p class="text-sm text-slate-300 max-w-xl mx-auto">
          By violating Machiavelli’s laws—allowing either fear to evaporate or unblurred protests to coalesce—your rivals united and stripped your command.
        </p>
        <button type="button" id="intrigueTryAgainBtn" class="px-6 py-3 rounded-xl bg-amber-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider">
          Reclaim the Throne
        </button>
      </div>
    `;
    document.getElementById('intrigueTryAgainBtn')?.addEventListener('click', resetIntrigueGame);
    return;
  }

  if (st.stageIndex >= INTRIGUE_SCENARIOS.length) {
    container.innerHTML = `
      <div class="space-y-4 text-center my-auto py-6">
        <span class="px-3 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono-code text-xs uppercase">CAMPAIGN COMPLETE</span>
        <h4 class="font-cinzel text-2xl sm:text-3xl font-black text-white">Supreme Sovereign of the Pyramid</h4>
        <p class="text-sm text-slate-300 max-w-xl mx-auto">
          You navigated every corporate, academic, business, and bureaucratic crisis with cold Florentine precision. Final Fear: <strong>${st.fear}%</strong> • Leverage: <strong>${st.leverage}%</strong> • Protest Risk: <strong>${st.protest}%</strong>.
        </p>
        <button type="button" id="intrigueReplayBtn" class="px-6 py-3 rounded-xl bg-amber-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider">
          Play Campaign Again
        </button>
      </div>
    `;
    document.getElementById('intrigueReplayBtn')?.addEventListener('click', resetIntrigueGame);
    return;
  }

  const sc = INTRIGUE_SCENARIOS[st.stageIndex];
  const lastLog = st.history.length > 0 ? st.history[st.history.length - 1] : null;

  container.innerHTML = `
    <div class="space-y-4">
      ${lastLog ? `
        <div class="p-3.5 rounded-xl bg-obsidian-900 border border-amber-500/40 text-xs space-y-1">
          <div class="font-mono-code text-amber-400 font-bold uppercase">PREVIOUS OUTCOME: ${lastLog.verdict}</div>
          <p class="text-slate-300">${lastLog.outcome}</p>
        </div>
      ` : ''}
      <div class="flex items-center justify-between text-xs font-mono-code text-crimson-400">
        <span>CRISIS ${sc.stage} OF ${INTRIGUE_SCENARIOS.length} • ${sc.arena}</span>
      </div>
      <h4 class="font-cinzel text-xl sm:text-2xl font-bold text-white">${sc.title}</h4>
      <p class="text-xs sm:text-sm text-slate-200 leading-relaxed bg-obsidian-900/90 p-4 rounded-xl border border-white/10">
        ${sc.situation}
      </p>
      <div class="space-y-2.5 pt-2">
        ${sc.choices.map((c, idx) => `
          <button type="button" data-choice-idx="${idx}" class="intrigue-choice-btn w-full text-left p-3.5 rounded-xl bg-obsidian-900 hover:bg-obsidian-800 border border-white/10 hover:border-amber-400/60 text-xs sm:text-sm text-slate-200 transition">
            ${c.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.intrigue-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-choice-idx'), 10);
      const choice = sc.choices[idx];
      if (!choice) return;
      st.fear = Math.max(0, Math.min(100, st.fear + choice.delta.fear));
      st.leverage = Math.max(0, Math.min(100, st.leverage + choice.delta.leverage));
      st.optics = Math.max(0, Math.min(100, st.optics + choice.delta.optics));
      st.protest = Math.max(0, Math.min(100, st.protest + choice.delta.protest));
      st.history.push({ verdict: choice.verdict, outcome: choice.outcome });
      st.stageIndex += 1;
      renderIntrigueEngine();
    });
  });
}

function resetIntrigueGame() {
  AppState.intrigue = {
    stageIndex: 0,
    fear: 70,
    leverage: 65,
    optics: 60,
    protest: 20,
    history: []
  };
  renderIntrigueEngine();
}

// ============================================================================
// 7. GAME 3: DARK PSYCHOLOGY & MANIPULATION MASTERY GAUNTLET
// ============================================================================
function renderGauntletQuiz() {
  const container = document.getElementById('gauntletContainer');
  if (!container) return;
  const g = AppState.gauntlet;

  if (g.currentQ >= GAUNTLET_QUESTIONS.length) {
    container.innerHTML = `
      <div class="text-center py-8 space-y-4">
        <span class="px-3 py-1 rounded bg-amber-500/20 text-amber-300 font-mono-code text-xs uppercase">GAUNTLET COMPLETED</span>
        <h3 class="font-cinzel text-2xl sm:text-3xl font-black text-white">Manipulation Mastery Score: ${g.score} / ${GAUNTLET_QUESTIONS.length}</h3>
        <p class="text-sm text-slate-300 max-w-lg mx-auto">
          ${g.score >= 4 ? 'You possess the eyes of the Florentine Fox. Covert gaslighting, status frames, and bureaucratic traps cannot snare you.' : 'Review the Machiavellify Dossiers closely—untrained instincts leave you vulnerable to covert operators.'}
        </p>
        <button type="button" id="restartGauntletBtn" class="px-6 py-3 rounded-xl bg-amber-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider">
          Run Gauntlet Again
        </button>
      </div>
    `;
    document.getElementById('restartGauntletBtn')?.addEventListener('click', () => {
      AppState.gauntlet = { currentQ: 0, score: 0, answered: false };
      renderGauntletQuiz();
    });
    return;
  }

  const item = GAUNTLET_QUESTIONS[g.currentQ];
  container.innerHTML = `
    <div class="space-y-5">
      <div class="flex items-center justify-between text-xs font-mono-code text-amber-400">
        <span>QUESTION ${g.currentQ + 1} OF ${GAUNTLET_QUESTIONS.length}</span>
        <span>SCORE: ${g.score}/${GAUNTLET_QUESTIONS.length}</span>
      </div>
      <h4 class="font-cinzel text-lg sm:text-xl font-bold text-white leading-snug">${item.q}</h4>
      <div class="space-y-3" id="gauntletOptionsList">
        ${item.options.map((opt, i) => `
          <button type="button" data-opt-idx="${i}" class="gauntlet-opt-btn w-full text-left p-4 rounded-xl bg-obsidian-950 hover:bg-obsidian-900 border border-white/10 text-xs sm:text-sm text-slate-200 transition">
            ${opt.text}
          </button>
        `).join('')}
      </div>
      <div id="gauntletFeedbackBox" class="hidden p-4 rounded-xl bg-obsidian-950 border border-amber-500/40 text-xs space-y-2"></div>
    </div>
  `;

  container.querySelectorAll('.gauntlet-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (g.answered) return;
      g.answered = true;
      const idx = parseInt(btn.getAttribute('data-opt-idx'), 10);
      const chosen = item.options[idx];
      if (chosen.correct) g.score += 1;

      const fb = document.getElementById('gauntletFeedbackBox');
      if (fb) {
        fb.classList.remove('hidden');
        fb.innerHTML = `
          <div class="font-bold uppercase ${chosen.correct ? 'text-emerald-400' : 'text-crimson-400'}">${chosen.correct ? '✓ PREDATOR PRECISION' : '✕ TACTICAL ERROR'}</div>
          <p class="text-slate-300">${chosen.rationale}</p>
          <button type="button" id="nextGauntletQBtn" class="mt-2 px-4 py-2 rounded-lg bg-amber-500 text-obsidian-950 font-bold text-xs uppercase">
            Next Scenario →
          </button>
        `;
        document.getElementById('nextGauntletQBtn')?.addEventListener('click', () => {
          g.currentQ += 1;
          g.answered = false;
          renderGauntletQuiz();
        });
      }
    });
  });
}

// ============================================================================
// 8. BLOG DOSSIERS & ARTICLE READER MODAL
// ============================================================================
function renderBlogSection() {
  const grid = document.getElementById('blogGridContainer');
  if (!grid) return;

  const posts = AppState.activeBlogCat === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(b => b.category === AppState.activeBlogCat);

  grid.innerHTML = posts.map(post => `
    <article class="card-surface rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4">
      <div class="space-y-2.5">
        <div class="flex items-center justify-between text-[11px] font-mono-code">
          <span class="px-2.5 py-0.5 rounded bg-crimson-950 text-crimson-300 border border-crimson-500/30">${post.category}</span>
          <span class="text-slate-400">${post.readTime}</span>
        </div>
        <h3 class="font-cinzel text-lg sm:text-xl font-bold text-white leading-snug">${post.title}</h3>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${post.excerpt}</p>
      </div>
      <div class="pt-4 border-t border-white/10 flex items-center justify-between">
        <button type="button" data-read-blog="${post.id}" class="read-blog-btn text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300">
          Read Full Dossier →
        </button>
        <button type="button" data-save-blog="${post.id}" class="save-blog-btn text-xs font-mono-code text-slate-400 hover:text-white">
          ★ Vault
        </button>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.read-blog-btn').forEach(btn => {
    btn.addEventListener('click', () => openArticleModal(btn.getAttribute('data-read-blog')));
  });
  grid.querySelectorAll('.save-blog-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = BLOG_POSTS.find(x => x.id === btn.getAttribute('data-save-blog'));
      if (p) saveItemToVault(`Dossier: ${p.title}`, 'BLOG DOSSIER');
    });
  });
}

function openArticleModal(blogId) {
  const post = BLOG_POSTS.find(b => b.id === blogId);
  if (!post) return;
  AppState.currentArticleId = post.id;
  const modal = document.getElementById('articleReaderModal');
  const catEl = document.getElementById('modalArticleCategory');
  const contentEl = document.getElementById('modalArticleContent');
  if (!modal || !contentEl) return;

  if (catEl) catEl.textContent = `${post.category} • ${post.readTime}`;
  contentEl.innerHTML = `
    <div class="text-xs font-mono-code text-amber-400">${post.date}</div>
    <h2 class="font-cinzel text-2xl sm:text-3xl font-black text-white leading-tight">${post.title}</h2>
    <div class="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed pt-2">
      ${post.body.map(p => `<p>${p}</p>`).join('')}
    </div>
    <div class="mt-6 p-5 rounded-xl bg-obsidian-950 border border-amber-500/40 space-y-2">
      <div class="font-cinzel font-bold text-amber-400 text-sm uppercase">Tactical Execution Checklist</div>
      <ul class="space-y-1.5 text-xs sm:text-sm text-slate-300">
        ${post.checklist.map(item => `<li class="flex items-start gap-2"><span class="text-crimson-400 font-bold">✓</span><span>${item}</span></li>`).join('')}
      </ul>
    </div>
  `;
  modal.classList.remove('hidden');
}

// ============================================================================
// 9. COUNSELLING: SHEEP-TO-WOLF AUDIT, RETAINER TIERS & BOOKING
// ============================================================================
function renderAuditQuestions() {
  const container = document.getElementById('auditQuestionsContainer');
  if (!container) return;
  container.innerHTML = AUDIT_QUESTIONS.map((q, idx) => `
    <div class="p-3.5 rounded-xl bg-obsidian-950 border border-white/10 space-y-2">
      <div class="text-xs sm:text-sm font-semibold text-white">${q.prompt}</div>
      <select data-audit-q="${q.id}" aria-label="${q.prompt}" class="audit-select w-full px-3 py-2 rounded-lg bg-obsidian-900 border border-white/15 text-xs text-slate-200 focus:border-amber-400 focus:outline-none">
        <option value="20" ${idx % 2 === 0 ? 'selected' : ''}>🐺 Wolf: ${q.wolfOption}</option>
        <option value="10" ${idx % 2 === 1 ? 'selected' : ''}>🦊 Fox-Initiate: ${q.hybridOption}</option>
        <option value="0">🐑 Sheep Costume: ${q.sheepOption}</option>
      </select>
    </div>
  `).join('');
}

function calculateAuditQuotient() {
  let total = 0;
  document.querySelectorAll('.audit-select').forEach(sel => {
    total += parseInt(sel.value, 10) || 0;
  });
  const scoreEl = document.getElementById('auditScoreDisplay');
  const presEl = document.getElementById('auditPrescriptionText');
  const headerRank = document.getElementById('headerMindsetRank');

  let rank = 'SOVEREIGN WOLF (PQ ' + total + '/100)';
  let pres = 'You already reject sentimental illusions and command structural leverage. Commission the Sovereign Apex retainer to engineer complete boardroom or institutional dominion.';
  if (total < 45) {
    rank = 'CONDITIONED SHEEP (PQ ' + total + '/100)';
    pres = 'URGENT DEPROGRAMMING NEEDED: You are trading your autonomy for approval. Start with The Courtier tier and study Chapter XVII (Fear vs. Love) immediately.';
  } else if (total < 80) {
    rank = 'ASCENDANT FOX (PQ ' + total + '/100)';
    pres = 'You recognize the game but occasionally hesitate to drop the hammer. Commission The Consigliere tier to master line-blurring and ruthless execution.';
  }

  if (scoreEl) scoreEl.textContent = rank;
  if (presEl) presEl.textContent = pres;
  if (headerRank) headerRank.textContent = rank;
  showToast(`Predator Quotient Calculated: ${total}/100`);
}

function renderCounsellingTiers() {
  const grid = document.getElementById('counsellingTiersGrid');
  if (!grid) return;
  grid.innerHTML = COUNSELLING_TIERS.map(t => {
    const price = AppState.annualBilling ? t.annualPrice : t.monthlyPrice;
    const borderCls = t.featured ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-white/10';
    return `
      <div class="card-surface rounded-2xl p-5 border ${borderCls} flex flex-col justify-between space-y-4">
        <div class="space-y-2">
          <span class="px-2 py-0.5 rounded bg-crimson-950 text-amber-300 font-mono-code text-[10px] uppercase">${t.badge}</span>
          <h4 class="font-cinzel text-lg font-bold text-white">${t.name}</h4>
          <div class="text-xs text-slate-400">${t.subtitle}</div>
          <div class="pt-2">
            <span class="font-cinzel text-2xl font-black text-amber-400">$${price}</span>
            <span class="text-xs text-slate-400">/ month ${AppState.annualBilling ? '(billed annually)' : ''}</span>
          </div>
          <ul class="space-y-1.5 pt-2 text-xs text-slate-300">
            ${t.features.map(f => `<li class="flex items-start gap-1.5"><span class="text-amber-400">•</span><span>${f}</span></li>`).join('')}
          </ul>
        </div>
        <button type="button" data-select-tier="${t.name} ($${price})" class="select-tier-btn w-full py-2.5 rounded-xl bg-obsidian-800 hover:bg-amber-500 hover:text-obsidian-950 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30 transition">
          Select ${t.name}
        </button>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.select-tier-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-select-tier');
      const sel = document.getElementById('bookingTierSelect');
      if (sel) {
        sel.innerHTML = `<option value="${val}" selected>${val}</option>` + sel.innerHTML;
      }
      document.getElementById('bookingAlias')?.focus();
      showToast(`Selected ${val} for War Room Booking.`);
    });
  });
}

// ============================================================================
// 10. FAQ ACCORDION, VAULT & AUTHENTICATION
// ============================================================================
function renderFaqAccordion() {
  const container = document.getElementById('faqAccordionContainer');
  if (!container) return;
  container.innerHTML = FAQ_ITEMS.map((item, i) => `
    <div class="card-surface rounded-xl border border-white/10 overflow-hidden">
      <button type="button" data-faq-idx="${i}" class="faq-toggle-btn w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-cinzel font-bold text-white hover:text-amber-400">
        <span>${item.q}</span>
        <span class="text-amber-400 font-mono-code">+</span>
      </button>
      <div id="faqBody-${i}" class="${i === 0 ? '' : 'hidden'} px-4 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
        ${item.a}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-faq-idx');
      const body = document.getElementById(`faqBody-${idx}`);
      if (body) body.classList.toggle('hidden');
    });
  });
}

function saveItemToVault(title, category) {
  if (!AppState.savedVaultItems.some(x => x.title === title)) {
    AppState.savedVaultItems.unshift({ title, category, time: new Date().toLocaleTimeString() });
    savePersistedState();
  }
  updateVaultUI();
  showToast(`Saved "${title}" to your Sovereign Vault.`);
}

function updateVaultUI() {
  const countEl = document.getElementById('savedVaultCount');
  if (countEl) countEl.textContent = String(AppState.savedVaultItems.length + AppState.bookings.length);

  const authBtnLabel = document.getElementById('authHeaderBtnLabel');
  if (authBtnLabel) {
    authBtnLabel.textContent = AppState.user ? `Citadel: ${AppState.user.alias}` : 'Inner Circle Login';
  }

  const userAliasEl = document.getElementById('vaultUserAlias');
  const userEmailEl = document.getElementById('vaultUserEmail');
  if (userAliasEl && userEmailEl) {
    if (AppState.user) {
      userAliasEl.textContent = AppState.user.alias;
      userEmailEl.textContent = AppState.user.email;
    } else {
      userAliasEl.textContent = 'Unauthenticated Initiate (Local Session)';
      userEmailEl.textContent = 'Sign in above to bind your encrypted dossier archive';
    }
  }

  const listEl = document.getElementById('vaultSavedList');
  if (listEl) {
    if (AppState.savedVaultItems.length === 0) {
      listEl.innerHTML = '<div class="text-slate-500">No dossiers or laws saved yet. Click "★ Save to Vault" on any Arena, Maxim, or Blog post.</div>';
    } else {
      listEl.innerHTML = AppState.savedVaultItems.map((item, idx) => `
        <div class="p-2.5 rounded-lg bg-obsidian-950 border border-white/10 flex items-center justify-between gap-2">
          <div>
            <span class="text-[10px] font-mono-code text-amber-400 block">${item.category}</span>
            <span class="text-white font-medium">${item.title}</span>
          </div>
          <button type="button" data-remove-vault="${idx}" class="remove-vault-btn text-slate-400 hover:text-crimson-400 text-xs px-2">✕</button>
        </div>
      `).join('');
      listEl.querySelectorAll('.remove-vault-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.getAttribute('data-remove-vault'), 10);
          AppState.savedVaultItems.splice(i, 1);
          savePersistedState();
          updateVaultUI();
        });
      });
    }
  }

  const bookEl = document.getElementById('vaultBookingsList');
  if (bookEl) {
    if (AppState.bookings.length === 0) {
      bookEl.innerHTML = '<div class="text-slate-500">No War Room briefings commissioned yet.</div>';
    } else {
      bookEl.innerHTML = AppState.bookings.map(b => `
        <div class="p-2.5 rounded-lg bg-obsidian-950 border border-emerald-500/30 text-xs">
          <div class="font-mono-code text-emerald-400">CIPHER #${b.code} • ${b.tier}</div>
          <div class="text-white font-semibold">${b.alias} — ${b.arena}</div>
        </div>
      `).join('');
    }
  }
}

// ============================================================================
// 11. MASTER INITIALIZATION & EVENT LISTENERS
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
  loadPersistedState();

  // Render all interactive views
  renderPyramidVisualizer();
  renderArenasSection();
  updateMachiavelliTelemetry();
  renderMaximsGrid();
  initGambitGame();
  renderIntrigueEngine();
  renderGauntletQuiz();
  renderBlogSection();
  renderAuditQuestions();
  renderCounsellingTiers();
  renderFaqAccordion();
  updateVaultUI();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  mobileMenuBtn?.addEventListener('click', () => {
    mobileNavDrawer?.classList.toggle('hidden');
  });
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => mobileNavDrawer?.classList.add('hidden'));
  });

  // Header Search Jump & Ctrl+K Shortcut
  document.getElementById('headerSearchBtn')?.addEventListener('click', () => {
    document.getElementById('centralSearchAnchor')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('centralSearchInput')?.focus(), 350);
  });
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      document.getElementById('centralSearchAnchor')?.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('centralSearchInput')?.focus();
    }
  });

  // Hero Audit Quick Jump
  document.getElementById('heroQuickAuditBtn')?.addEventListener('click', () => {
    document.getElementById('counsellingSection')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Central Search Bar Listeners
  document.getElementById('centralSearchInput')?.addEventListener('input', executeCentralSearch);
  document.getElementById('centralSearchCategory')?.addEventListener('change', executeCentralSearch);
  document.getElementById('clearCentralSearchBtn')?.addEventListener('click', () => {
    const inp = document.getElementById('centralSearchInput');
    if (inp) inp.value = '';
    executeCentralSearch();
  });
  document.querySelectorAll('.search-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const inp = document.getElementById('centralSearchInput');
      if (inp) {
        inp.value = chip.getAttribute('data-search-tag') || '';
        executeCentralSearch();
      }
    });
  });

  // Machiavelli's Corner Telemetry Sliders
  ['sliderFear', 'sliderLove', 'sliderBlur', 'sliderDep', 'sliderFox'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', updateMachiavelliTelemetry);
  });
  document.getElementById('resetTelemetryBtn')?.addEventListener('click', () => {
    document.getElementById('sliderFear').value = '85';
    document.getElementById('sliderLove').value = '25';
    document.getElementById('sliderBlur').value = '90';
    document.getElementById('sliderDep').value = '80';
    document.getElementById('sliderFox').value = '88';
    updateMachiavelliTelemetry();
    showToast('Restored Optimal Florentine Sovereign Equilibrium.');
  });

  // Maxim Category Filters
  document.querySelectorAll('.maxim-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      AppState.activeMaximFilter = btn.getAttribute('data-maxim-filter') || 'all';
      document.querySelectorAll('.maxim-filter-btn').forEach(b => {
        const act = b.getAttribute('data-maxim-filter') === AppState.activeMaximFilter;
        b.className = act
          ? 'maxim-filter-btn px-3 py-1.5 rounded-lg bg-crimson-600 text-white text-xs font-semibold'
          : 'maxim-filter-btn px-3 py-1.5 rounded-lg bg-obsidian-800 text-slate-300 hover:text-white text-xs';
      });
      renderMaximsGrid();
    });
  });

  // Game Switcher Tabs
  document.querySelectorAll('.game-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchGameTab(btn.getAttribute('data-game-tab')));
  });

  // Game 1: The Sovereign's Gambit Controls (Canvas Click, D-Pad, Keyboard, Decrees, Resize)
  const canvas = document.getElementById('sovereignGambitCanvas');
  canvas?.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = Math.floor(((e.clientX - rect.left) / rect.width) * AppState.gambit.gridSize);
    const clickY = Math.floor(((e.clientY - rect.top) / rect.height) * AppState.gambit.gridSize);
    const dx = Math.max(-1, Math.min(1, clickX - AppState.gambit.player.x));
    const dy = Math.max(-1, Math.min(1, clickY - AppState.gambit.player.y));
    stepGambitTurn(dx, dy);
  });

  document.querySelectorAll('.gambit-dir-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = btn.getAttribute('data-gambit-dir');
      if (dir === 'up') stepGambitTurn(0, -1);
      else if (dir === 'down') stepGambitTurn(0, 1);
      else if (dir === 'left') stepGambitTurn(-1, 0);
      else if (dir === 'right') stepGambitTurn(1, 0);
      else stepGambitTurn(0, 0);
    });
  });

  document.getElementById('gambitFoxTrapBtn')?.addEventListener('click', deployFoxSnare);
  document.getElementById('gambitLionDecreeBtn')?.addEventListener('click', unleashLionPurge);
  document.getElementById('gambitRestartBtn')?.addEventListener('click', initGambitGame);
  document.getElementById('gambitSoundToggleBtn')?.addEventListener('click', (e) => {
    AppState.gambit.soundEnabled = !AppState.gambit.soundEnabled;
    e.currentTarget.textContent = AppState.gambit.soundEnabled ? '🔊 Audio: ON' : '🔇 Audio: OFF';
  });

  window.addEventListener('keydown', (e) => {
    if (AppState.activeGameTab !== 'gambit') return;
    const tag = (document.activeElement?.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (['ArrowUp', 'w', 'W'].includes(e.key)) { e.preventDefault(); stepGambitTurn(0, -1); }
    else if (['ArrowDown', 's', 'S'].includes(e.key)) { e.preventDefault(); stepGambitTurn(0, 1); }
    else if (['ArrowLeft', 'a', 'A'].includes(e.key)) { e.preventDefault(); stepGambitTurn(-1, 0); }
    else if (['ArrowRight', 'd', 'D'].includes(e.key)) { e.preventDefault(); stepGambitTurn(1, 0); }
    else if (e.key === '1') { e.preventDefault(); deployFoxSnare(); }
    else if (e.key === '2') { e.preventDefault(); unleashLionPurge(); }
  });

  window.addEventListener('resize', resizeAndDrawGambitCanvas);
  document.getElementById('restartIntrigueBtn')?.addEventListener('click', resetIntrigueGame);

  // Blog Category Filters & Article Modal
  document.querySelectorAll('.blog-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      AppState.activeBlogCat = btn.getAttribute('data-blog-cat') || 'all';
      document.querySelectorAll('.blog-cat-btn').forEach(b => {
        const act = b.getAttribute('data-blog-cat') === AppState.activeBlogCat;
        b.className = act
          ? 'blog-cat-btn px-3 py-1.5 rounded-lg bg-amber-500 text-obsidian-950 font-bold text-xs'
          : 'blog-cat-btn px-3 py-1.5 rounded-lg bg-obsidian-800 text-slate-300 hover:text-white text-xs';
      });
      renderBlogSection();
    });
  });

  document.getElementById('closeArticleModalBtn')?.addEventListener('click', () => {
    document.getElementById('articleReaderModal')?.classList.add('hidden');
  });
  document.getElementById('modalBookmarkBtn')?.addEventListener('click', () => {
    const post = BLOG_POSTS.find(b => b.id === AppState.currentArticleId);
    if (post) saveItemToVault(`Dossier: ${post.title}`, 'BLOG DOSSIER');
  });

  // Counselling Audit, Billing Toggle & Booking Form
  document.getElementById('calculateAuditBtn')?.addEventListener('click', calculateAuditQuotient);
  document.getElementById('billingToggleBtn')?.addEventListener('click', (e) => {
    AppState.annualBilling = !AppState.annualBilling;
    e.currentTarget.textContent = AppState.annualBilling
      ? 'Annual Billing (-20% Active)'
      : 'Monthly (Switch to Annual -20%)';
    renderCounsellingTiers();
  });

  document.getElementById('counsellingBookingForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const alias = document.getElementById('bookingAlias')?.value.trim() || 'Operative';
    const arena = document.getElementById('bookingArena')?.value || 'Corporate';
    const tier = document.getElementById('bookingTierSelect')?.value || 'The Consigliere';
    const code = 'MCV-' + Math.floor(100000 + Math.random() * 900000);

    AppState.bookings.unshift({ alias, arena, tier, code });
    savePersistedState();
    updateVaultUI();

    const conf = document.getElementById('bookingConfirmationBox');
    if (conf) {
      conf.classList.remove('hidden');
      conf.innerHTML = `
        <div class="font-mono-code font-bold text-emerald-300">✓ WAR ROOM DOSSIER LOCKED — CIPHER #${code}</div>
        <div>Operative <strong>${alias}</strong> scheduled for <strong>${arena}</strong> under <strong>${tier}</strong>. Saved to your Inner Circle Vault.</div>
      `;
    }
    showToast(`War Room Briefing Confirmed (#${code})`);
    e.target.reset();
  });

  // Contact Dispatch Form
  document.getElementById('contactDispatchForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim() || 'Envoy';
    const subj = document.getElementById('contactSubject')?.value || 'General';
    const urg = document.getElementById('contactUrgency')?.value || 'Standard';
    const stamp = new Date().toLocaleTimeString();

    AppState.dispatches.unshift({ name, subj, urg, stamp });
    const logEl = document.getElementById('contactDispatchLog');
    if (logEl) {
      logEl.innerHTML = AppState.dispatches.map(d => `
        <div class="p-2 rounded bg-obsidian-950 border border-white/10 text-slate-300">
          <span class="text-amber-400 font-mono-code">[${d.stamp}]</span> <strong>${d.name}</strong> — ${d.subj} (${d.urg})
        </div>
      `).join('');
    }
    showToast('Encrypted Dispatch Transmitted to the Chancery.');
    e.target.reset();
  });

  // Auth & Vault Modal Controls
  const authModal = document.getElementById('authVaultModal');
  document.getElementById('openAuthModalBtn')?.addEventListener('click', () => authModal?.classList.remove('hidden'));
  document.getElementById('openVaultQuickBtn')?.addEventListener('click', () => authModal?.classList.remove('hidden'));
  document.getElementById('closeAuthModalBtn')?.addEventListener('click', () => authModal?.classList.add('hidden'));

  document.getElementById('tabLoginBtn')?.addEventListener('click', () => {
    document.getElementById('registerAliasField')?.classList.add('hidden');
  });
  document.getElementById('tabRegisterBtn')?.addEventListener('click', () => {
    document.getElementById('registerAliasField')?.classList.remove('hidden');
  });

  document.getElementById('authForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('authEmailInput')?.value.trim() || 'sovereign@machiavellify.io';
    const aliasInput = document.getElementById('authAliasInput')?.value.trim();
    const alias = aliasInput || email.split('@')[0].toUpperCase();
    AppState.user = { alias, email };
    savePersistedState();
    updateVaultUI();
    showToast(`Welcome to the Inner Circle, ${alias}.`);
  });

  document.getElementById('demoSovereignLoginBtn')?.addEventListener('click', () => {
    AppState.user = { alias: 'PRINCE NICCOLÒ (APEX)', email: 'prince@machiavellify.io' };
    if (AppState.savedVaultItems.length === 0) {
      AppState.savedVaultItems.push(
        { title: 'Chapter XVII: Better to Be Feared Than Loved', category: 'FLORENTINE MAXIM', time: '15:13' },
        { title: 'Corporate Office Warfare Playbook', category: 'ARENA PLAYBOOK', time: '15:14' }
      );
    }
    savePersistedState();
    updateVaultUI();
    showToast('Instant Sovereign Access Activated.');
  });

  document.getElementById('logoutOperativeBtn')?.addEventListener('click', () => {
    AppState.user = null;
    savePersistedState();
    updateVaultUI();
    showToast('Operative Session Locked.');
  });
});
