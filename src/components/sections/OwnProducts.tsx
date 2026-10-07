import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Lightbulb } from "lucide-react";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";
import { PROJECT_CASES } from "@/data/projectCases";

/**
 * Products Owlsey builds and runs itself. A studio that ships and operates
 * its own SaaS is a stronger signal than client work alone: the same team
 * carries releases, uptime, and support in production.
 */
const products = PROJECT_CASES.filter((project) => project.kind === "product");

/* Products share the row with the "your idea" cell (3 + 1 columns). One
   product becomes a wide feature card; two split it 2 + 1; three or more
   take one column each. */
const spanFor = (index: number) => {
  if (products.length === 1) return "own-product-card--wide md:col-span-2 lg:col-span-3";
  if (products.length === 2 && index === 0) return "lg:col-span-2";
  return "";
};

export const OwnProducts: React.FC = () => (
  <section id="products" className="section-dark chapter-ink" data-chapter="Products" aria-labelledby="products-title">
    <div className="modular-grid own-products-grid technical-grid-host">
      <TechnicalGrid className="section-technical-grid" />

      <div className="modular-box own-products-lead md:col-span-2 flex flex-col justify-between">
        <span className="pattern pattern--weave pattern--tr" aria-hidden="true" />
        <p className="display-kicker text-[color:var(--text-dim)]">Our own products</p>
        <h2 id="products-title" className="modular-display max-w-[10ch] text-[clamp(3.2rem,6vw,6.4rem)] text-[color:var(--text-strong)]">
          We run <span className="home-accent-word">software</span> too<span className="accent-stop">.</span>
        </h2>
      </div>

      <div className="modular-box own-products-note md:col-span-2 flex flex-col justify-between">
        <p className="display-kicker text-[color:var(--text-faint)]">Why it matters</p>
        <p className="max-w-[38ch] text-[clamp(1.2rem,1.8vw,1.7rem)] leading-[1.25] tracking-[-0.02em] text-[color:var(--text-body)]" style={{ fontFamily: "var(--font-display)" }}>
          Besides client work, we build and run our own SaaS in production — releases, uptime, and support included. Your product gets the same team and the same standards.
        </p>
      </div>

      {products.map((product, index) => (
        <Link
          key={product.slug}
          href={`/projects/${product.slug}`}
          data-cursor="VIEW"
          data-motion-link
          className={`modular-box own-product-card group flex flex-col justify-between ${spanFor(index)}`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="display-kicker text-[color:var(--text-faint)]">{product.label}</span>
            <span className="own-product-status">
              <span aria-hidden="true" />
              {product.url ? "Live" : "In production"}
            </span>
          </div>

          {product.image ? (
            <div className="home-project-shot own-product-visual">
              <Image
                src={product.image}
                alt={`${product.title} — live product screenshot`}
                width={1440}
                height={900}
                sizes="(min-width: 1024px) 25vw, 100vw"
              />
            </div>
          ) : product.metric ? (
            <div className="own-product-visual own-product-metric">
              <span>{product.metric.value}</span>
              <small>{product.metric.label}</small>
            </div>
          ) : null}

          <div>
            <h3 className="modular-display text-[clamp(2rem,3vw,3rem)] text-[color:var(--text-strong)]">{product.title}</h3>
            <p className="mt-3 max-w-[34ch] text-sm leading-6 text-[color:var(--text-muted)] line-clamp-2">{product.summary}</p>
            <div className="mt-5 flex items-center justify-between border-t border-[color:var(--line-subtle)] pt-4">
              <span data-motion-label className="modular-copy text-[color:var(--text-faint)]">{product.meta}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[color:var(--text-strong)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      ))}

      <Link
        href="/contact"
        data-cursor="START"
        data-motion-link
        className="modular-box modular-box-dark own-product-card own-product-idea group flex flex-col justify-between"
      >
        <span className="display-kicker text-white/55">Your idea next</span>
        <span className="ring-icon" aria-hidden="true">
          <Lightbulb className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
        <div>
          <p className="modular-display text-[clamp(2.4rem,3.8vw,4rem)] text-white">
            Have a <span className="home-accent-word">product</span> idea<span className="accent-stop">?</span>
          </p>
          <p className="mt-4 max-w-[30ch] text-sm leading-6 text-white/70">
            We have taken our own from idea to live product. Let&apos;s scope yours.
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
            <span data-motion-label className="display-kicker text-white/65">Talk to us</span>
            <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </div>
  </section>
);
