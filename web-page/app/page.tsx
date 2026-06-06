import Image from "next/image";
import NavBar from "@/components/NavBar";
import Reveal from "@/components/Reveal";
import "./landing.css";
import {
  COLLAB,
  DEMO,
  FEATURES,
  FEATURES_SECTION,
  FEEDBACK,
  FEEDBACK_SECTION,
  FOOTER,
  HERO,
  LOGO_PATH,
  STATS,
} from "./copy";

export default function Home() {
  return (
    <main id="top">
      <NavBar />

      {/* ===== HERO — description over background ===== */}
      <section id="overview" className="hero">
        <div className="hero__bg" aria-hidden />
        <div className="hero__grid" aria-hidden />
        <div className="shell hero__inner">
          <Reveal as="p" className="eyebrow" delay={0}>
            {HERO.eyebrow}
          </Reveal>
          <Reveal as="h1" className="h-display hero__title" delay={120}>
            <span className="hero__logo">
              <Image
                src={LOGO_PATH}
                alt="NQ"
                width={220}
                height={220}
                priority
                className="hero__logo-img"
              />
            </span>
            <div>{HERO.title.pre}</div>
            {HERO.title.pre2}
            <em>{HERO.title.em}</em>
          </Reveal>
          <Reveal as="p" className="lead hero__lead" delay={240}>
            {HERO.lead}
          </Reveal>
          <Reveal className="hero__actions" delay={340}>
            <a className="btn btn--primary" href="#demo">
              {HERO.watchDemo} <span>→</span>
            </a>
            <a className="btn btn--ghost" href="#features">
              {HERO.exploreFeatures}
            </a>
          </Reveal>

          <Reveal className="hero__stats" delay={460}>
            {STATS.map((s, i) => (
              <div className="stat" key={i}>
                <span className="stat__v h-display">{s.v}</span>
                <span className="stat__k">{s.k}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="hero__scroll" aria-hidden>
          <span>{HERO.scroll}</span>
          <span className="hero__scroll-line" />
        </div>
      </section>

      {/* ===== DEMO VIDEO ===== */}
      <section id="demo" className="section">
        <div className="shell">
          <div className="sec-head">
            <Reveal as="p" className="eyebrow">
              {DEMO.eyebrow}
            </Reveal>
            <Reveal as="h2" className="h-display sec-title" delay={100}>
              {DEMO.title.pre}
              <em>{DEMO.title.em}</em>
              {DEMO.title.post}
            </Reveal>
          </div>

          <Reveal className="video" delay={120}>
            <div className="video__frame">
              <div className="video__chrome">
                <span />
                <span />
                <span />
                <p className="video__url">{DEMO.url}</p>
              </div>
              <div className="video__stage">
                <button className="video__play" aria-label="Play demo">
                  <svg viewBox="0 0 24 24" width="26" height="26">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </button>
                <p className="video__caption">{DEMO.caption}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="section">
        <div className="shell">
          <div className="sec-head sec-head--split">
            <div>
              <Reveal as="p" className="eyebrow">
                {FEATURES_SECTION.eyebrow}
              </Reveal>
              <Reveal as="h2" className="h-display sec-title" delay={100}>
                {FEATURES_SECTION.title.pre}
                <em>{FEATURES_SECTION.title.em}</em>
                {FEATURES_SECTION.title.post}
              </Reveal>
            </div>
            <Reveal as="p" className="lead" delay={160}>
              {FEATURES_SECTION.lead}
            </Reveal>
          </div>

          <div className="features">
            {FEATURES.map((f, i) => (
              <Reveal className="feature" delay={i * 90} key={f.n}>
                <span className="index-tag feature__n">[{f.n}]</span>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__body">{f.body}</p>
                <span className="feature__arrow">→</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEEDBACK ===== */}
      <section id="feedback" className="section">
        <div className="shell">
          <div className="sec-head">
            <Reveal as="p" className="eyebrow">
              {FEEDBACK_SECTION.eyebrow}
            </Reveal>
            <Reveal as="h2" className="h-display sec-title" delay={100}>
              {FEEDBACK_SECTION.title.pre}
              <em>{FEEDBACK_SECTION.title.em}</em>
              {FEEDBACK_SECTION.title.post}
            </Reveal>
          </div>

          <div className="feedback">
            {FEEDBACK.map((t, i) => (
              <Reveal className="quote" delay={i * 110} key={i}>
                <p className="quote__mark" aria-hidden>
                  {"“"}
                </p>
                <p className="quote__text">{t.quote}</p>
                <div className="quote__who">
                  <span className="quote__avatar" aria-hidden />
                  <div>
                    <p className="quote__name">{t.who}</p>
                    <p className="quote__role">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COLLABORATION ===== */}
      <section id="collaborate" className="section collab">
        <div className="collab__glow" aria-hidden />
        <div className="shell collab__inner">
          <Reveal as="p" className="eyebrow">
            {COLLAB.eyebrow}
          </Reveal>
          <Reveal as="h2" className="h-display collab__title" delay={100}>
            {COLLAB.title.pre}
            <em>{COLLAB.title.em}</em>
            {COLLAB.title.post}
          </Reveal>
          <Reveal as="p" className="lead collab__lead" delay={200}>
            {COLLAB.lead}
          </Reveal>
          <Reveal className="collab__actions" delay={300}>
            <a className="btn btn--primary" href="#">
              {COLLAB.startConversation} <span>→</span>
            </a>
            <a className="btn btn--ghost" href="#">
              {COLLAB.partner}
            </a>
          </Reveal>

          <Reveal className="collab__logos" delay={400}>
            {COLLAB.logos.map((l, i) => (
              <span className="collab__logo" key={i}>
                {l}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="shell footer__inner">
          <div className="footer__brand">
            <span className="nav__wordmark">{FOOTER.wordmark}</span>
            <p className="footer__tag">{FOOTER.tagline}</p>
          </div>
          <div className="footer__cols">
            {FOOTER.cols.map((col, i) => (
              <div className="footer__col" key={i}>
                <p className="footer__h">{col.heading}</p>
                {col.links.map((link) => (
                  <a href={link.href} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="shell footer__base">
          <span className="index-tag">{FOOTER.copyright}</span>
          <span className="index-tag">{FOOTER.legal}</span>
        </div>
      </footer>
    </main>
  );
}
