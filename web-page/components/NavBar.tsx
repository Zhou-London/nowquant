"use client";

import { LOGO_PATH, NAV } from "@/app/copy";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <div className="nav__inner shell">
        <a className="nav__brand" href="#top" aria-label="NQ home">
          <Image
            src={LOGO_PATH}
            alt="NQ"
            width={64}
            height={64}
            priority
            className="nav__logo"
          />
        </a>

        <nav className={`nav__links ${open ? "is-open" : ""}`}>
          {NAV.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <a className="nav__cta" href="#collaborate">
            {NAV.cta}
            <span className="nav__cta-arrow">→</span>
          </a>
          <button
            className="nav__burger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
