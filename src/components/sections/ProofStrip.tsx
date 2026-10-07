import React from "react";
import { Dumbbell, Gem, LayoutDashboard, type LucideIcon } from "lucide-react";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";

/**
 * The first thing after the hero: plain, verifiable proof. Numbers come from
 * the team; brands are only ones we have permission to show (a client and
 * our own product), so the strip is labelled "brands we've built", not
 * "clients". They are set as monochrome wordmarks in the site's own type —
 * the raster logos were drawn for light backgrounds and fought the theme.
 */
const stats = [
  { value: "2020", label: "Building software since" },
  { value: "28+", label: "Projects delivered" },
  { value: "7–8", label: "Core engineers, plus a specialist network" },
];

// Only brands we may show: a client with permission and our own products.
// NDA work is never listed here.
const brands: Array<{ name: string; tag: string; Icon: LucideIcon; style: "serif" | "impact" | "sans" }> = [
  { name: "Lakshita Jewels", tag: "Jewellery commerce", Icon: Gem, style: "serif" },
  { name: "GymPro", tag: "Fitness SaaS", Icon: Dumbbell, style: "impact" },
  { name: "Owlsey Console", tag: "Multi-SaaS control plane", Icon: LayoutDashboard, style: "sans" },
];

export const ProofStrip: React.FC = () => (
  <section className="section-dark chapter-ink" data-chapter="Proof" aria-label="Owlsey in numbers">
    <div className="modular-grid proof-strip-grid technical-grid-host">
      <TechnicalGrid className="section-technical-grid" />

      {stats.map(({ value, label }, index) => (
        <div key={label} className="modular-box proof-strip-stat flex flex-col justify-between">
          {index === 0 && <span className="pattern pattern--dots pattern--tr" aria-hidden="true" />}
          <span className="proof-strip-value">{value}</span>
          <span className="proof-strip-label">{label}</span>
        </div>
      ))}

      <div className="modular-box proof-strip-brands flex flex-col justify-between">
        <span className="proof-strip-label">Brands we&apos;ve built</span>
        <ul className="proof-strip-logos">
          {brands.map(({ name, tag, Icon, style }) => (
            <li key={name} className="proof-wordmark">
              <Icon aria-hidden="true" strokeWidth={1.25} />
              <span>
                <strong className={`proof-wordmark-name is-${style}`}>{name}</strong>
                <small>{tag}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
