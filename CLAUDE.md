# Owlsey — project rules

Marketing site for Owlsey, a custom software studio. Next.js (App Router, static
export to Cloudflare Pages), Tailwind v4, GSAP + Lenis. Dark "engineering
blueprint" design: a measured grid of cells, condensed display type, one indigo
accent.

## Background decoration (motifs)

Decoration is a system, not sprinkling. Every motif has a meaning and a fixed
place, so the page reads as designed rather than random.

1. **One motif per section, at most.** Put it in an *empty* cell — a heading,
   lead or CTA cell — anchored to a corner. Never behind body text, form fields
   or anything the reader must read.
2. **Each motif means one thing.** Use the matching motif; don't pick by taste.

   | Motif | Meaning | Use in |
   |---|---|---|
   | `pattern--dots` | data / proof | proof strip, stack, numbers |
   | `pattern--cross` | action | CTA cells ("Start a project", "Ask us", closing CTA) |
   | `pattern--ticks` | process / steps | process, engagement models, case-study story |
   | `pattern--weave` | build / system | own products, case-study hero |
   | `pattern--zigzag` | opening statement | home hero only |
   | Large faint line icon | category | cards that represent a category (industries, projects) |
   | Large faint quote mark | client words | testimonial cards |

3. **Paper (light) sections use the same motifs** re-inked by `.theme-paper`
   tokens — never a separate light-only decoration.
4. **CSS/SVG only.** No raster images for decoration; motifs must cost nothing
   to load and render the same on every visit (no randomness).
5. **Quiet by default.** Motif ink stays in the 0.10–0.35 alpha range and fades
   out from its corner. If it is the first thing you notice, it is too loud.
   Adjust `--pattern-ink`, not `opacity`.
6. **Don't add to busy sections.** Hero, pinned chapters and anything with a
   screenshot or illustration already carry enough; leave them alone.
7. Decorative elements are `aria-hidden="true"` and `pointer-events: none`.

Pattern classes live in `src/app/globals.css` (`.pattern`, `.pattern--*`,
placement `.pattern--tr|tl|br|bl`, size `.pattern--lg`).

## Grid and theme

- Sections are `modular-grid … technical-grid-host` with a
  `<TechnicalGrid className="section-technical-grid" />` first child. The grid
  is **measured** from the real cells, so rails and nodes always land on cell
  edges — don't hand-place lines.
- Grid colours come from tokens (`--grid-rail`, `--grid-node-border`, …) in
  `src/styles/grid-system.css`; restyle via tokens, not per-section overrides.
- Light sections: add `.theme-paper` to the section. It re-points the text,
  line, accent and grid tokens. Light is used at deliberate reading moments
  (engagement models, testimonials, FAQ) — not everywhere.

## Motion

- A section that runs its own scroll timeline sets `data-motion-own` so the
  generic `MotionLayer` leaves it alone (otherwise its SplitText/parallax fight
  the timeline).
- Pinned/scrubbed effects are desktop + fine pointer only, and respect
  `prefers-reduced-motion`.

## Content honesty

- Never invent testimonials, client names, logos, numbers or promises. Real
  testimonials go in `src/data/testimonials.ts`; the section stays hidden while
  it is empty.
- Confirmed facts: building since 2020 · 28+ projects · 7–8 core engineers plus
  a specialist network · clients in India · free discovery · fixed estimate ·
  code and IP belong to the client · NDA on request · weekly demos · first
  months of support free per agreement · replies within three business days.
- NDA work (`confidential: true` in `src/data/projectCases.ts`): never show the
  client's name, product brand, screenshots or live URL. Use a generic title
  and a `ProjectIllustration` instead.

## Privacy

- No tracking cookies. The consent banner only appears when
  `OPTIONAL_COOKIES_IN_USE` (`src/lib/cookieConsent.ts`) is true — flip it in
  the same change that adds any cookie-setting script.
- Analytics is cookie-less Cloudflare Web Analytics, enabled only when
  `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` is set. Keep the Cookies/Privacy copy in sync
  with what actually runs.
