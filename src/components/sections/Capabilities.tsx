import React from "react";

const capabilities = [
  {
    label: "Web platforms",
    title: "Web applications.",
    body: "Production-grade web applications built with React and Next.js — dashboards, portals, and internal platforms engineered for scale, reliability, and clear ownership.",
  },
  {
    label: "Mobile",
    title: "Mobile apps.",
    body: "Native-feeling mobile applications delivered with Flutter, sharing one codebase across iOS and Android without compromising on performance or feel.",
  },
  {
    label: "Internal tools",
    title: "Internal tools.",
    body: "Custom operations software, admin systems, and workflow automation that replace scattered spreadsheets and manual checks with one dependable daily workspace.",
  },
  {
    label: "Integrations",
    title: "Integrations.",
    body: "Software integrations and delivery architecture that connect the tools a business already runs on, shaped around real requirements rather than a fixed template.",
  },
];

export const Capabilities: React.FC = () => {
  return (
    <section
      className="section-dark chapter-ink"
      data-chapter="Capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="modular-grid modular-grid--viewport home-method-grid has-complete-junctions">
        <div className="modular-box md:col-span-2 lg:col-span-2 flex flex-col justify-between">
          <p className="display-kicker text-[color:var(--text-dim)]">What we build</p>
          <div>
            <h2
              id="capabilities-title"
              className="modular-display max-w-[11ch] text-[clamp(2.8rem,6vw,6rem)] text-[color:var(--text-strong)]"
            >
              Custom software,
              <br />
              built to <span className="home-accent-word">fit</span>
              <span className="accent-stop">.</span>
            </h2>
            <p className="mt-8 max-w-[46ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7] text-[color:var(--text-muted)]">
              Owlsey is a custom software engineering studio. We design and ship
              web applications, mobile apps, internal tools, and integrations —
              one system shaped around your requirement, not a reused template.
              Requirement first, stack second, engineered for scale and
              reliability.
            </p>
          </div>
        </div>

        {capabilities.map((capability) => (
          <article
            key={capability.label}
            className="modular-box home-method-step group flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.075]"
          >
            <p className="display-kicker text-[color:var(--text-faint)]">
              {capability.label}
            </p>
            <div>
              <h3 className="modular-display max-w-[10ch] text-[clamp(1.9rem,3.2vw,3.4rem)] text-[color:var(--text-strong)]">
                {capability.title}
              </h3>
              <p className="mt-6 max-w-[34ch] text-sm leading-6 text-[color:var(--text-muted)]">
                {capability.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
