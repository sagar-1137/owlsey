import React from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { TechnicalGrid } from "@/components/common/TechnicalGrid";

/**
 * The page's one light chapter — the site's own grid in "paper" mode: same
 * rails, nodes, type and indigo accent, inverted to ink-on-light. Every other section is dark; a single calm,
 * readable break before the closing CTA answers the questions buyers ask
 * before they write in — and gives the long dark scroll a breath.
 *
 * Native <details> keeps it accessible and JS-free.
 */
const faqs = [
  {
    q: "How much does a custom software project cost?",
    a: "It depends on scope, integrations, and timeline. We start with a free discovery, then give you a written scope and a fixed estimate before any build work begins — no open-ended billing.",
  },
  {
    q: "How will we see progress?",
    a: "A demo every week — sometimes sooner. Each finished part is tested and handed to you for review as it is built, so changes surface early, and bigger changes come with a walkthrough and documentation. The full timeline is agreed in the written scope.",
  },
  {
    q: "Who owns the code and the product?",
    a: "You do. The source code, designs, and accounts are handed over to you, and the repository can live in your own organisation from day one.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes. We sign an NDA whenever you need one, before you share any details about the product or your business.",
  },
  {
    q: "Can you take over or fix an existing product?",
    a: "Yes. We begin with a code and architecture review, tell you plainly what is worth keeping, and then stabilise, extend, or rebuild in stages — without stopping the business.",
  },
  {
    q: "What happens after launch?",
    a: "We stay on for monitoring, fixes, updates, and new features on a monthly support plan — the first months after launch are included at no cost, as set in your agreement. Or we hand everything over to your team with documentation. Your choice.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export const Faq: React.FC = () => (
  <section id="faq" className="home-faq theme-paper" data-chapter="Questions" aria-labelledby="faq-title">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <div className="modular-grid home-faq-grid technical-grid-host">
      <TechnicalGrid className="section-technical-grid" />
      <div className="modular-box home-faq-lead-cell md:col-span-2 lg:col-span-2" data-motion-static>
      <div className="home-faq-lead">
        <p className="home-faq-kicker">Before you write in</p>
        <h2 id="faq-title" className="home-faq-title">
          Questions,
          <br />
          answered<span className="home-faq-stop">.</span>
        </h2>
        <p className="home-faq-intro">
          The things most teams ask us first. Anything else — ask directly. We reply within three business days with a considered answer, not an auto-reply.
        </p>
        <Link href="/contact" data-cursor="START" className="home-faq-cta group">
          Ask a question
          <ArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
      </div>

      <div className="modular-box home-faq-list-cell md:col-span-2 lg:col-span-2" data-motion-static>
      <div className="home-faq-list">
        {faqs.map(({ q, a }, index) => (
          <details key={q} className="home-faq-item" open={index === 0}>
            <summary>
              <span className="home-faq-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="home-faq-q">{q}</span>
              <Plus aria-hidden="true" className="home-faq-icon" />
            </summary>
            <p className="home-faq-a">{a}</p>
          </details>
        ))}
      </div>
      </div>
    </div>
  </section>
);
