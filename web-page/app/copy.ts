/**
 * Centralized site copy.
 *
 * Every placeholder sentence on the landing page lives here so it can be
 * replaced in one place without touching JSX. Headings that contain an
 * emphasized fragment are split into { pre, em, post } — rendered as
 * {pre}<em>{em}</em>{post}.
 */

export const LOGO_PATH = "/logo.png";

export type SplitHeading = { pre: string; em: string; post: string };

export const NAV = {
  links: [
    { label: "{overview}", href: "#overview" },
    { label: "{demo}", href: "#demo" },
    { label: "{features}", href: "#features" },
    { label: "{feedback}", href: "#feedback" },
    { label: "{collaborate}", href: "#collaborate" },
  ],
  cta: "{get started}",
};

export const HERO = {
  eyebrow: "AI QUANT INVESTMENT",
  title: {
    pre: "Now Trade, ",
    pre2: "Now ",
    em: "Quant.",
    post: "",
  } as SplitHeading,
  lead: "Start production-level quant investment from roughest idea.",
  watchDemo: "Book a demo",
  exploreFeatures: "Features",
  scroll: "",
};

export const STATS = [
  { v: "24/7", k: "Trading" },
  { v: "AI", k: "Automation" },
  { v: "Trade Everything", k: "" },
];

export const DEMO = {
  eyebrow: "Video Demo",
  title: { pre: "Quant trading platform powered by ", em: "Agentic AI", post: "." } as SplitHeading,
  url: "Video",
  caption: "Demo",
};

export const FEATURES_SECTION = {
  eyebrow: "Features",
  title: { pre: "Why", em: "?", post: "" } as SplitHeading,
  lead: "Not just an AI product.",
};

export const FEATURES = [
  { n: "01", title: "Professional", body: "NQ is not a AI toy project. It is a production-level trading system even without AI." },
  { n: "02", title: "Aims for efficiency", body: "NQ isn't going to replace anyone. It's a tool for fast prototyping and deployment." },
  { n: "03", title: "{feature three}", body: "{feature three description placeholder}" },
  { n: "04", title: "{feature four}", body: "{feature four description placeholder}" },
];

export const FEEDBACK_SECTION = {
  eyebrow: "{from the field}",
  title: { pre: "{What people ", em: "are saying", post: "}" } as SplitHeading,
};

export const FEEDBACK = [
  { quote: "{testimonial quote placeholder — one}", who: "{name}", role: "{role · company}" },
  { quote: "{testimonial quote placeholder — two}", who: "{name}", role: "{role · company}" },
  { quote: "{testimonial quote placeholder — three}", who: "{name}", role: "{role · company}" },
];

export const COLLAB = {
  eyebrow: "{collaborate}",
  title: { pre: "{Let’s build ", em: "together", post: "}" } as SplitHeading,
  lead: "{Invitation to partner / collaborate / get in touch. Placeholder copy describing how to work with NQ.}",
  startConversation: "{start a conversation}",
  partner: "{partner with us}",
  logos: ["{logo}", "{logo}", "{logo}", "{logo}", "{logo}"],
};

export const FOOTER = {
  tagline: "{one-line product tagline placeholder}",
  wordmark: "NQ",
  cols: [
    {
      heading: "{product}",
      links: [
        { label: "{overview}", href: "#overview" },
        { label: "{features}", href: "#features" },
        { label: "{demo}", href: "#demo" },
      ],
    },
    {
      heading: "{company}",
      links: [
        { label: "{about}", href: "#" },
        { label: "{careers}", href: "#" },
        { label: "{stories}", href: "#feedback" },
      ],
    },
    {
      heading: "{connect}",
      links: [
        { label: "{twitter}", href: "#" },
        { label: "{linkedin}", href: "#" },
        { label: "{contact}", href: "#collaborate" },
      ],
    },
  ],
  copyright: "© {year} NowQuant — {all rights reserved}",
  legal: "{terms}  ·  {privacy}",
};
