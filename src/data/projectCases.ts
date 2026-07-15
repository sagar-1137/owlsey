export type ProjectCase = {
  slug: string;
  index: string;
  label: string;
  title: string;
  eyebrow: string;
  summary: string;
  body: string;
  result: string;
  meta: string;
  challenge: string;
  system: string;
  outcome: string;
  scope: string[];
  stack: string[];
  proof: Array<{
    label: string;
    value: string;
  }>;
};

export const PROJECT_CASES: ProjectCase[] = [
  {
    slug: "order-control-system",
    index: "01",
    label: "Operations",
    title: "Order control system",
    eyebrow: "Inventory / Admin / Reporting",
    summary: "A single workspace for order flow, stock visibility, approvals, and exception handling.",
    body: "Built for teams that were running critical operations across spreadsheets, messages, and repeated manual checks.",
    result: "Manual checks reduced into clear operational ownership.",
    meta: "Inventory / Admin / Reporting",
    challenge: "Orders, stock, and approvals were moving through separate places, so ownership was unclear.",
    system: "We shaped one operational route with tracked states, exception handling, admin control, and reporting.",
    outcome: "The team gained a dependable daily workspace instead of chasing status across tools.",
    scope: ["Order workflow", "Inventory visibility", "Admin permissions", "Operational reports"],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Role-based access"],
    proof: [
      { label: "Primary fit", value: "Daily operations" },
      { label: "Main gain", value: "Clear ownership" },
      { label: "Support model", value: "Iterative releases" },
    ],
  },
  {
    slug: "client-portal",
    index: "02",
    label: "Product",
    title: "Client portal",
    eyebrow: "Portal / Documents / Status",
    summary: "A customer-facing platform for requests, documents, status, communication, and account workflows.",
    body: "Designed for a service process where clients needed clarity without adding more internal admin overhead.",
    result: "A scattered service process became one trackable experience.",
    meta: "Portal / Documents / Status",
    challenge: "Client updates, documents, and request status were spread across calls, mail, and internal follow-ups.",
    system: "We created a portal that gives clients one place to submit, track, upload, and understand progress.",
    outcome: "The business kept control internally while clients saw a cleaner, more dependable experience.",
    scope: ["Client accounts", "Request tracking", "Document uploads", "Status communication"],
    stack: ["React", "NestJS", "PostgreSQL", "Secure storage"],
    proof: [
      { label: "Primary fit", value: "Client service" },
      { label: "Main gain", value: "Visible progress" },
      { label: "Support model", value: "Feature increments" },
    ],
  },
  {
    slug: "data-bridge",
    index: "03",
    label: "Automation",
    title: "Data bridge",
    eyebrow: "APIs / Sync / Automation",
    summary: "API connections and scheduled flows between existing tools, without forcing a full stack replacement.",
    body: "Made for a business that already had useful tools, but needed those tools to stop behaving like separate islands.",
    result: "The current toolset started working as one system.",
    meta: "APIs / Sync / Automation",
    challenge: "Useful data existed, but it moved late, manually, or not at all between systems.",
    system: "We mapped the reliable source of truth, then built API flows, scheduled sync, and failure visibility.",
    outcome: "The team kept the tools they trusted while removing repeated transfer work.",
    scope: ["API integration", "Scheduled sync", "Data mapping", "Failure monitoring"],
    stack: ["Node.js", "REST APIs", "Queues", "PostgreSQL"],
    proof: [
      { label: "Primary fit", value: "Connected tools" },
      { label: "Main gain", value: "Less repetition" },
      { label: "Support model", value: "Monitored flows" },
    ],
  },
  {
    slug: "release-framework",
    index: "04",
    label: "Delivery",
    title: "Release framework",
    eyebrow: "Architecture / Releases / Support",
    summary: "A maintainable architecture, release route, and support model for an existing product that needed control.",
    body: "Built around an existing product where shipping new work safely mattered more than a cosmetic rebuild.",
    result: "New work could ship without losing the original product logic.",
    meta: "Architecture / Releases / Support",
    challenge: "The product had value, but every change carried too much risk and unclear release ownership.",
    system: "We improved structure, release practice, technical documentation, and support rhythm without discarding what worked.",
    outcome: "The product became easier to change, review, and evolve with real business priorities.",
    scope: ["Architecture review", "Release process", "Code cleanup", "Support workflow"],
    stack: ["Next.js", "TypeScript", "CI checks", "Observability"],
    proof: [
      { label: "Primary fit", value: "Existing product" },
      { label: "Main gain", value: "Safer releases" },
      { label: "Support model", value: "Continuous improvement" },
    ],
  },
];

export function getProjectCase(slug: string) {
  return PROJECT_CASES.find((project) => project.slug === slug);
}
