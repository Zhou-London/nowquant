"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BUILD,
  CHAT,
  HINTS,
  HOLDINGS,
  LOGO_PATH,
  MONITOR,
  WINDOW,
} from "./script";
import "./demo.css";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
type Msg =
  | { id: number; role: "user" | "assistant"; text: string }
  | { id: number; role: "build" };

/* tiny helpers ----------------------------------------------------- */
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const gbp0 = (n: number) =>
  "£" + Math.round(n).toLocaleString("en-GB");
const gbpSigned = (n: number) =>
  (n >= 0 ? "+£" : "−£") + Math.abs(Math.round(n)).toLocaleString("en-GB");

/* ================================================================== */
/*  ROOT                                                              */
/* ================================================================== */
export default function DemoPage() {
  const [view, setView] = useState<"chat" | "monitor">("chat");
  const [zooming, setZooming] = useState(false);

  const goMonitor = useCallback(() => {
    setZooming(true);
    setTimeout(() => {
      setView("monitor");
      setZooming(false);
    }, 820);
  }, []);

  return (
    <div className="desk">
      <div className="desk__glow" aria-hidden />
      <div className="desk__grid" aria-hidden />

      {view === "chat" && (
        <ChatScene zooming={zooming} onOpenMonitor={goMonitor} />
      )}
      {view === "monitor" && <MonitorScene />}
    </div>
  );
}

/* ================================================================== */
/*  CHAT SCENE                                                        */
/* ================================================================== */
function ChatScene({
  zooming,
  onOpenMonitor,
}: {
  zooming: boolean;
  onOpenMonitor: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, role: "assistant", text: CHAT.greeting },
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [phase, setPhase] = useState(0); // index into the click sequence
  const [busy, setBusy] = useState(false);
  const [revealed, setRevealed] = useState(0); // build blocks shown
  const [ctaReady, setCtaReady] = useState(false);

  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const aliveRef = useRef(true);
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  // keep the transcript pinned to the latest line
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, revealed, thinking, draft]);

  const push = (
    m: { role: "user" | "assistant"; text: string } | { role: "build" }
  ) => setMessages((prev) => [...prev, { ...m, id: idRef.current++ } as Msg]);

  /* --- scripted actions ------------------------------------------ */
  const typeUser = useCallback(async (text: string) => {
    for (let i = 1; i <= text.length; i++) {
      if (!aliveRef.current) return;
      setDraft(text.slice(0, i));
      await wait(text.length > 40 ? 18 : 38);
    }
    await wait(360);
    if (!aliveRef.current) return;
    setDraft("");
    push({ role: "user", text });
  }, []);

  const assistantSay = useCallback(async (text: string) => {
    setThinking(true);
    await wait(1050);
    if (!aliveRef.current) return;
    setThinking(false);
    push({ role: "assistant", text });
  }, []);

  const runBuild = useCallback(async () => {
    setThinking(true);
    await wait(900);
    if (!aliveRef.current) return;
    setThinking(false);
    push({ role: "build" });
    // reveal blocks one at a time, on a timer
    for (let i = 1; i <= BUILD.blocks.length; i++) {
      const kind = BUILD.blocks[i - 1].kind;
      const dwell =
        kind === "design" ? 1500 : kind === "backtest" ? 1400 : kind === "deploy" ? 1700 : 950;
      await wait(dwell);
      if (!aliveRef.current) return;
      setRevealed(i);
    }
    await wait(500);
    if (!aliveRef.current) return;
    setCtaReady(true);
  }, []);

  /* --- the single click handler ---------------------------------- */
  const advance = useCallback(async () => {
    if (busy || ctaReady) return;
    setBusy(true);
    if (phase === 0) {
      await typeUser(CHAT.turns[0].text);
      setPhase(1);
    } else if (phase === 1) {
      await assistantSay(CHAT.turns[1].text);
      setPhase(2);
    } else if (phase === 2) {
      await typeUser(CHAT.turns[2].text);
      setPhase(3);
    } else if (phase === 3) {
      await runBuild();
      setPhase(4);
    }
    if (aliveRef.current) setBusy(false);
  }, [busy, ctaReady, phase, typeUser, assistantSay, runBuild]);

  /* --- hint text -------------------------------------------------- */
  let hint = "";
  if (ctaReady) hint = HINTS.open;
  else if (busy) hint = phase === 3 ? HINTS.working : "";
  else if (phase === 0) hint = HINTS.start;
  else if (phase === 1) hint = HINTS.reply;
  else if (phase === 2) hint = HINTS.send;
  else if (phase === 3) hint = HINTS.build;

  const clickable = !busy && !ctaReady && phase < 4;

  return (
    <div className={`stage ${zooming ? "stage--zoom" : ""}`}>
      <Hint text={hint} pulse={clickable} />

      <section
        className={`win ${clickable ? "win--hot" : ""}`}
        onClick={clickable ? advance : undefined}
      >
        <TitleBar title={WINDOW.title} />

        <div className="chat" ref={scrollRef}>
          <div className="chat__inner">
            {messages.map((m) =>
              m.role === "build" ? (
                <BuildPanel key={m.id} revealed={revealed} />
              ) : (
                <Bubble key={m.id} role={m.role} text={m.text} />
              )
            )}
            {thinking && <TypingBubble />}
          </div>
        </div>

        <Composer
          draft={draft}
          ctaReady={ctaReady}
          onCta={onOpenMonitor}
        />
      </section>
    </div>
  );
}

/* ---- window chrome ------------------------------------------------ */
function TitleBar({ title }: { title: string }) {
  return (
    <div className="bar">
      <div className="bar__lights">
        <span className="bar__light bar__light--r" />
        <span className="bar__light bar__light--y" />
        <span className="bar__light bar__light--g" />
      </div>
      <div className="bar__title">
        <Image src={LOGO_PATH} alt="" width={18} height={18} className="bar__logo" />
        <span>{title}</span>
      </div>
      <span className="bar__app">{WINDOW.appName}</span>
    </div>
  );
}

/* ---- message bubbles --------------------------------------------- */
function Bubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  return (
    <div className={`row row--${role}`}>
      {role === "assistant" && <Avatar />}
      <div className={`bubble bubble--${role}`}>{text}</div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="row row--assistant">
      <Avatar />
      <div className="bubble bubble--assistant bubble--typing">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="avatar">
      <Image src={LOGO_PATH} alt="NQ" width={26} height={26} />
    </div>
  );
}

/* ---- composer / input -------------------------------------------- */
function Composer({
  draft,
  ctaReady,
  onCta,
}: {
  draft: string;
  ctaReady: boolean;
  onCta: () => void;
}) {
  if (ctaReady) {
    return (
      <div className="composer composer--cta">
        <button
          className="cta"
          onClick={(e) => {
            e.stopPropagation();
            onCta();
          }}
        >
          {BUILD.ctaLabel}
          <span className="cta__arrow">→</span>
        </button>
      </div>
    );
  }
  return (
    <div className="composer">
      <div className="field">
        {draft ? (
          <span className="field__text">
            {draft}
            <span className="caret" />
          </span>
        ) : (
          <span className="field__ph">Message NQ…</span>
        )}
      </div>
      <button className="send" aria-label="Send" tabIndex={-1}>
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M4 12l16-8-6 8 6 8z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}

/* ================================================================== */
/*  BUILD PANEL  (the "thinking / designing" stream)                  */
/* ================================================================== */
function BuildPanel({ revealed }: { revealed: number }) {
  const blocks = BUILD.blocks.slice(0, revealed);
  return (
    <div className="row row--assistant">
      <Avatar />
      <div className="build">
        {blocks.map((b, i) => {
          const last = i === revealed - 1;
          if (b.kind === "say")
            return (
              <p className="build__say block-in" key={i}>
                {b.text}
              </p>
            );
          if (b.kind === "think")
            return (
              <p className="build__think block-in" key={i}>
                <span className={`tick ${last ? "tick--spin" : "tick--done"}`} />
                {b.text}
              </p>
            );
          if (b.kind === "design")
            return (
              <div className="design block-in" key={i}>
                {BUILD.design.map((d) => (
                  <div className="card" key={d.tag}>
                    <span className="card__tag">{d.tag}</span>
                    <span className="card__title">{d.title}</span>
                    <span className="card__body">{d.body}</span>
                  </div>
                ))}
              </div>
            );
          if (b.kind === "backtest")
            return (
              <div className="bt block-in" key={i}>
                <span className="bt__title">{BUILD.backtest.title}</span>
                <div className="bt__stats">
                  {BUILD.backtest.stats.map((s) => (
                    <div className="bt__stat" key={s.k}>
                      <span className="bt__v">{s.v}</span>
                      <span className="bt__k">{s.k}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          if (b.kind === "deploy")
            return (
              <div className="deploy block-in" key={i}>
                <span className="deploy__label">{BUILD.deployLabel}</span>
                <span className="deploy__track">
                  <span className="deploy__fill" />
                </span>
              </div>
            );
          // online
          return (
            <p className="online pop-in" key={i}>
              <span className="online__dot" />
              {b.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}

/* ---- click hint --------------------------------------------------- */
function Hint({ text, pulse }: { text: string; pulse: boolean }) {
  return (
    <div className={`hint ${text ? "hint--on" : ""} ${pulse ? "hint--pulse" : ""}`}>
      {pulse && <span className="hint__ring" />}
      <span className="hint__txt">{text}</span>
    </div>
  );
}

/* ================================================================== */
/*  MONITOR SCENE                                                     */
/* ================================================================== */
type Row = {
  ticker: string;
  name: string;
  sector: string;
  qty: number;
  avg: number;
  price: number;
  trigger: boolean;
  dir: -1 | 0 | 1;
};

function MonitorScene() {
  // live position state — only the price walks
  const [rows, setRows] = useState<Row[]>(
    HOLDINGS.map((h) => ({
      ticker: h.ticker,
      name: h.name,
      sector: h.sector,
      qty: h.qty,
      avg: h.avg,
      price: h.price,
      trigger: h.trigger,
      dir: 0,
    }))
  );
  const [tick, setTick] = useState(0);
  const [curve, setCurve] = useState<number[]>(() => seedCurve(MONITOR.startNav));

  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) =>
        prev.map((r) => {
          const drift = r.trigger ? 0.0006 : 0.0002;
          const shock = (Math.random() - 0.5) * 0.006 + drift;
          const next = Math.max(0.5, r.price * (1 + shock));
          return { ...r, price: next, dir: next > r.price ? 1 : next < r.price ? -1 : 0 };
        })
      );
      setTick((t) => t + 1);
    }, 1150);
    return () => clearInterval(id);
  }, []);

  // recompute P&L + push the equity point whenever prices move
  const pnl = rows.reduce((s, r) => s + (r.price - r.avg) * r.qty, 0);
  const gross = rows.reduce((s, r) => s + r.price * r.qty, 0);
  const nav = MONITOR.startNav + pnl;

  useEffect(() => {
    setCurve((c) => [...c.slice(-59), nav]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return (
    <div className="mon mon--enter">
      <header className="mon__top">
        <div className="mon__brand">
          <Image src={LOGO_PATH} alt="NQ" width={30} height={30} />
          <div className="mon__brandtxt">
            <span className="mon__app">{WINDOW.monitorTitle}</span>
            <span className="mon__sid">{MONITOR.strategyId}</span>
          </div>
        </div>
        <div className="mon__title">
          <span className="mon__sname">{MONITOR.strategyName}</span>
          <span className="status">
            <span className="status__dot" />
            {MONITOR.statusLabel}
          </span>
        </div>
        <nav className="mon__nav">
          {MONITOR.navItems.map((n, i) => (
            <span key={n} className={i === 0 ? "on" : ""}>
              {n}
            </span>
          ))}
        </nav>
      </header>

      <section className="mon__grid">
        {/* P&L hero */}
        <div className="panel pnl">
          <span className="panel__h">{MONITOR.pnlLabel}</span>
          <span className={`pnl__big ${pnl >= 0 ? "pos" : "neg"}`}>
            {gbpSigned(pnl)}
          </span>
          <div className="pnl__sub">
            <span>
              {MONITOR.navLabel} <b>{gbp0(nav)}</b>
            </span>
            <span>
              {MONITOR.exposureLabel} <b>{gbp0(gross)}</b>
            </span>
          </div>
        </div>

        {/* rotation card */}
        <div className="panel rot">
          <span className="panel__h">{MONITOR.rotationTitle}</span>
          <div className="rot__flow">
            <span className="rot__from">{MONITOR.rotationFrom}</span>
            <span className="rot__arrow">{MONITOR.rotationArrow}</span>
            <span className="rot__to">{MONITOR.rotationTo}</span>
          </div>
          <span className="rot__note">{MONITOR.rotationNote}</span>
        </div>

        {/* equity chart */}
        <div className="panel chart">
          <div className="chart__head">
            <span className="panel__h">{MONITOR.chartTitle}</span>
            <span className="chart__live">{MONITOR.chartTagLive}</span>
          </div>
          <EquityChart data={curve} up={pnl >= 0} />
        </div>

        {/* holdings */}
        <div className="panel hold">
          <span className="panel__h">{MONITOR.holdingsTitle}</span>
          <div className="tbl">
            <div className="tbl__head">
              {MONITOR.holdingsCols.map((c, i) => (
                <span key={c} className={i >= 3 ? "num" : ""}>
                  {c}
                </span>
              ))}
            </div>
            {rows.map((r) => {
              const dayPct = ((r.price - r.avg) / r.avg) * 100;
              const rowPnl = (r.price - r.avg) * r.qty;
              return (
                <div className={`tr ${r.trigger ? "tr--trigger" : ""}`} key={r.ticker}>
                  <span className="tk">
                    {r.ticker}
                    {r.trigger && <span className="tk__flag">signal</span>}
                  </span>
                  <span className="nm">{r.name}</span>
                  <span className="sc">{r.sector}</span>
                  <span className="num qty">{r.qty.toLocaleString("en-GB")}</span>
                  <span key={tick} className={`num last flash-${r.dir}`}>
                    {r.price.toFixed(2)}
                  </span>
                  <span className={`num ${dayPct >= 0 ? "pos" : "neg"}`}>
                    {dayPct >= 0 ? "+" : "−"}
                    {Math.abs(dayPct).toFixed(2)}%
                  </span>
                  <span className={`num ${rowPnl >= 0 ? "pos" : "neg"}`}>
                    {gbpSigned(rowPnl)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="mon__foot">{MONITOR.footerNote}</footer>
    </div>
  );
}

/* seed a gently rising intraday curve that lands near the live NAV (no cliff) */
function seedCurve(base: number): number[] {
  const out: number[] = [];
  const start = base + 9000;
  const end = base + 22000;
  for (let i = 0; i < 40; i++) {
    const t = i / 39;
    const v = start + (end - start) * t + Math.sin(i / 3) * 900 - 450;
    out.push(v);
  }
  return out;
}

/* ---- live equity chart (SVG) ------------------------------------- */
function EquityChart({ data, up }: { data: number[]; up: boolean }) {
  const W = 760;
  const H = 200;
  const pad = 8;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = Math.max(1, max - min);
  const stepX = (W - pad * 2) / Math.max(1, data.length - 1);
  const pts = data.map((d, i) => {
    const x = pad + i * stepX;
    const y = pad + (H - pad * 2) * (1 - (d - min) / span);
    return [x, y] as const;
  });
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = `${line} L ${pts[pts.length - 1][0].toFixed(1)} ${H} L ${pts[0][0].toFixed(1)} ${H} Z`;
  const lastPt = pts[pts.length - 1];
  const stroke = up ? "var(--up)" : "var(--down)";

  return (
    <svg className="eq" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="eqfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#eqfill)" />
      <path d={line} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      <circle cx={lastPt[0]} cy={lastPt[1]} r="4.5" fill={stroke} className="eq__pulse" />
    </svg>
  );
}
