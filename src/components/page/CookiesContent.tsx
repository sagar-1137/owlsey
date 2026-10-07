"use client";

import React from "react";
import { LegalPageContent } from "@/components/page/LegalPageContent";
import { ANALYTICS_ENABLED } from "@/components/common/Analytics";

/**
 * Written against what the site actually stores today: a few first-party
 * browser-storage entries for consent and the intro. No
 * analytics or advertising scripts run; the optional categories stay off
 * until a visitor turns them on.
 */
const COOKIE_CLAUSES = [
  {
    title: "What we store",
    body: "We use a small amount of browser storage to make the site work: your cookie choice and whether you have already seen the opening animation this visit.",
  },
  {
    title: "Essential",
    body: "Essential storage keeps the site working and remembers the choices you make here. It is always on and never used to identify or track you.",
  },
  {
    title: "Analytics",
    // Stays truthful whether or not the analytics token is configured.
    body: ANALYTICS_ENABLED
      ? "We count page visits with Cloudflare Web Analytics. It is cookie-less: it sets no cookies, stores nothing on your device, and does not identify you. Optional analytics cookies stay off and none are in use."
      : "Optional and off by default. If enabled, it would help us understand which pages are useful. No analytics tools currently run on this site.",
  },
  {
    title: "Preferences",
    body: "Optional and off by default. If enabled, it would let the site remember optional settings between visits.",
  },
  {
    title: "No advertising",
    body: "We do not use advertising cookies, sell data, or share browsing information with ad networks.",
  },
  {
    title: "Your control",
    body: "Change your choice at any time with “Manage cookie settings” on this page, or clear site data in your browser. Questions: hello@owlsey.com.",
  },
];

export default function CookiesContent() {
  return (
    <LegalPageContent
      kind="cookies"
      eyebrow="Cookie policy"
      title="Cookies"
      accent="minimal"
      summary="We keep only what the site needs to work and remember your choices. Everything optional stays off until you turn it on."
      updated="October 6, 2026"
      primaryNote="No advertising cookies and no cross-site tracking. Optional categories are off by default."
      supportNote="Only what the site needs, and nothing you didn't choose."
      clauses={COOKIE_CLAUSES}
    />
  );
}
