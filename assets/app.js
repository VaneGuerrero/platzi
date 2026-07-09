const SNAPSHOT_URL = 'snapshots/daily/2026-07-09-ai-news-signals.json';

const state = {
  snapshot: null,
  selectedStatus: 'all',
};

const elements = {
  signalCount: document.querySelector('#signal-count'),
  snapshotDate: document.querySelector('#snapshot-date'),
  contractVersion: document.querySelector('#contract-version'),
  statusFilter: document.querySelector('#status-filter'),
  signalsList: document.querySelector('#signals-list'),
};

async function loadSnapshot() {
  const response = await fetch(SNAPSHOT_URL);

  if (!response.ok) {
    throw new Error(`No se pudo cargar el snapshot: ${response.status}`);
  }

  return response.json();
}

function getStatuses(signals) {
  return [...new Set(signals.map((signal) => signal.status.stage))].sort();
}

function renderSummary(snapshot) {
  elements.signalCount.textContent = snapshot.signals.length;
  elements.snapshotDate.textContent = snapshot.search.runDate;
  elements.contractVersion.textContent = `v${snapshot.contractVersion}`;
}

function renderFilters(signals) {
  const statuses = getStatuses(signals);
  const options = ['<option value="all">Todos</option>']
    .concat(statuses.map((status) => `<option value="${status}">${status}</option>`));

  elements.statusFilter.innerHTML = options.join('');
}

function renderSignals() {
  const signals = state.snapshot.signals.filter((signal) => {
    return state.selectedStatus === 'all' || signal.status.stage === state.selectedStatus;
  });

  elements.signalsList.innerHTML = signals.map(renderSignalCard).join('');
}

function renderSignalCard(signal) {
  const impactClass = signal.impact.level;
  const statusClass = signal.status.stage;

  return `
    <article class="signal-card">
      <div class="badges" aria-label="Clasificación de señal">
        <span class="badge ${impactClass}">impacto: ${signal.impact.level}</span>
        <span class="badge ${statusClass}">estado: ${signal.status.stage}</span>
        <span class="badge">confianza: ${signal.status.confidence}</span>
      </div>
      <div>
        <p class="signal-meta">${signal.category} · ${signal.source.publisher}</p>
        <h3>${signal.title}</h3>
      </div>
      <p><strong>Evidencia:</strong> ${signal.evidence.summary}</p>
      <p><strong>Impacto:</strong> ${signal.impact.summary}</p>
      <p><strong>Acción:</strong> ${signal.action.recommendation}</p>
      <a href="${signal.source.url}" target="_blank" rel="noreferrer">Ver fuente original</a>
    </article>
  `;
}

function renderError(error) {
  elements.signalsList.innerHTML = `
    <article class="signal-card">
      <h3>No se pudo cargar AI Radar</h3>
      <p>${error.message}</p>
    </article>
  `;
}

async function init() {
  try {
    state.snapshot = await loadSnapshot();
    renderSummary(state.snapshot);
    renderFilters(state.snapshot.signals);
    renderSignals();
  } catch (error) {
    renderError(error);
  }
}

elements.statusFilter.addEventListener('change', (event) => {
  state.selectedStatus = event.target.value;
  renderSignals();
});

init();
