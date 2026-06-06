/**
 * ============================================================================
 *  DEMO SCRIPT — all human-readable copy lives here.
 * ----------------------------------------------------------------------------
 *  Every line the demo speaks, types, or labels is in this file so it can be
 *  rewritten without ever touching the component/JSX. Edit text here and the
 *  whole scripted sequence updates.
 * ============================================================================
 */

export const LOGO_PATH = "/logo.png";

/* ---- Chrome / window ---------------------------------------------------- */
export const WINDOW = {
  appName: "NowQuant",
  title: "NQ Studio — New Strategy",
  monitorTitle: "NQ Studio — Live Monitor",
};

/* ---- Hints shown to the demo driver ------------------------------------- */
export const HINTS = {
  start: "Click anywhere to start",
  send: "Click to send",
  reply: "Click for reply",
  build: "Click to build it",
  working: "Building your strategy…",
  open: "Click to open the live monitor",
};

/* ---- The conversation --------------------------------------------------- */
export const CHAT = {
  /** First thing the assistant says, already on screen. */
  greeting:
    "Hi — I'm NQ. Describe a trading idea in plain words and I'll design it, back-test it, and put it live.",

  /**
   * The scripted turns, played one click at a time.
   *  - role "user"      → typed character-by-character into the composer, then sent
   *  - role "assistant" → preceded by a typing indicator, then spoken
   */
  turns: [
    {
      role: "user",
      text:
        "I found a trading idea: Sector rotation, when one sector raises, look into its downstream sector.",
    },
    {
      role: "assistant",
      text: "This is a promising idea. What asset and market are you looking at?",
    },
    {
      role: "user",
      text: "UK Stock.",
    },
  ],
} as const;

/* ---- The "build" sequence (auto-plays after the last user turn) ---------- */
/**
 * Each block is revealed in order, on a timer, to look like the agent
 * thinking out loud and assembling the strategy. Block kinds:
 *   say      — a normal assistant line
 *   think    — a dim mono "working" line (gets a ✓ once the next block appears)
 *   design   — renders the DESIGN cards below
 *   backtest — renders the BACKTEST stats below
 *   deploy   — renders a deployment progress bar
 *   online   — the final, highlighted "it's live" line
 */
export const BUILD = {
  blocks: [
    { kind: "say", text: "Great — UK equities it is. Let me turn this into a real strategy." },
    { kind: "think", text: "Defining the universe → FTSE 350 constituents, filtered for liquidity." },
    { kind: "think", text: "Building the sector supply-chain graph (upstream → downstream)." },
    { kind: "think", text: "Energy is leading this week → downstream = Oil Services & Chemicals." },
    { kind: "say", text: "Here are the key design decisions I'd ship with:" },
    { kind: "design" },
    { kind: "think", text: "Back-testing 2014–2025, walk-forward, costs & slippage included." },
    { kind: "backtest" },
    { kind: "say", text: "Edge holds out-of-sample. Provisioning the live execution pipeline…" },
    { kind: "deploy" },
    {
      kind: "online",
      text: "Your strategy is live and trading. 6 positions opened on the UK open.",
    },
  ],

  /** The "key design" cards discussed mid-build. */
  design: [
    {
      tag: "UNIVERSE",
      title: "FTSE 350 · UK",
      body: "Liquid London-listed names, grouped into 11 sectors with a directed supply-chain map.",
    },
    {
      tag: "SIGNAL",
      title: "Downstream momentum",
      body: "When a sector's 20-day return leads, go long its downstream sector basket on the next open.",
    },
    {
      tag: "RISK",
      title: "Vol-target 10%",
      body: "Equal-risk weighting, 6-name cap, hard stop at −8% per name, sector-neutral to the index.",
    },
    {
      tag: "EXECUTION",
      title: "VWAP, T+0 open",
      body: "Rebalance weekly on the London open, sliced VWAP to keep market impact under 5 bps.",
    },
  ],

  /** Back-test headline stats. */
  backtest: {
    title: "Walk-forward back-test · 2014–2025",
    stats: [
      { k: "CAGR", v: "18.4%" },
      { k: "Sharpe", v: "1.62" },
      { k: "Max DD", v: "−11.3%" },
      { k: "Hit rate", v: "57%" },
    ],
  },

  deployLabel: "Deploying to live · paper → broker",
  ctaLabel: "Open live monitor",
} as const;

/* ========================================================================== *
 *  MONITORING PAGE
 * ========================================================================== */
export const MONITOR = {
  strategyName: "Sector Rotation · UK Equity",
  strategyId: "STRAT-UK-ROT-001",
  statusLabel: "LIVE",
  navItems: ["Holdings", "P&L", "Signals"],

  pnlLabel: "Unrealised P&L · today",
  navLabel: "NAV",
  exposureLabel: "Gross exposure",
  startNav: 1_000_000, // £ base capital

  rotationTitle: "Active rotation",
  rotationFrom: "Energy",
  rotationArrow: "leads →",
  rotationTo: "Oil Services + Chemicals",
  rotationNote: "Signal fired 2 days ago · holding downstream basket",

  holdingsTitle: "Holdings",
  holdingsCols: ["Ticker", "Name", "Sector", "Qty", "Last", "Day", "P&L"],

  chartTitle: "Intraday equity curve",
  chartTagLive: "● live",

  footerNote: "Simulated data for demonstration · NowQuant Studio",
} as const;

/**
 * Opening book. Prices live-walk on the monitor; everything else is fixed.
 *  trigger=true marks the upstream name (Energy) whose move fired the signal.
 */
export const HOLDINGS = [
  { ticker: "WEIR", name: "Weir Group", sector: "Oil Services", qty: 9200, avg: 21.4, price: 22.18, trigger: false },
  { ticker: "ROR", name: "Rotork", sector: "Oil Services", sub: true, qty: 41000, avg: 3.62, price: 3.71, trigger: false },
  { ticker: "JMAT", name: "Johnson Matthey", sector: "Chemicals", qty: 11800, avg: 16.9, price: 17.42, trigger: false },
  { ticker: "CRDA", name: "Croda Intl", sector: "Chemicals", qty: 4600, avg: 38.1, price: 38.74, trigger: false },
  { ticker: "SMIN", name: "Smiths Group", sector: "Industrials", qty: 9800, avg: 19.2, price: 19.05, trigger: false },
  { ticker: "SHEL", name: "Shell", sector: "Energy", qty: 5400, avg: 27.8, price: 28.61, trigger: true },
] as const;
