export type ProjectVisual =
  | "commerce"
  | "dashboard"
  | "docs"
  | "pipeline"
  | "security"
  | "workflow"
  | "messaging"
  | "monitor";

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
  /** Our own product (built and run by Owlsey) vs work delivered for a client. */
  kind?: "product" | "client";
  /** Client work under NDA: the client is never named anywhere on the site. */
  confidential?: boolean;
  /** Real screenshot of the live product, under /public. */
  image?: string;
  /** Public URL when the product is live and shareable. */
  url?: string;
  /** Illustration style used when there is no (shareable) screenshot. */
  visual?: ProjectVisual;
  /** One measured, headline number — shown large where there's no screenshot. */
  metric?: {
    value: string;
    label: string;
  };
};

export const PROJECT_CASES: ProjectCase[] = [
  {
    slug: "lakshita-commerce-os",
    index: "01",
    label: "Jewellery commerce",
    title: "Lakshita Jewels OS",
    eyebrow: "Catalogue / Inventory / Admin",
    summary: "Jewellery commerce and back-office control in one connected system.",
    body: "Designed to keep the customer-facing catalogue and internal jewellery operations connected through one dependable control layer.",
    result: "One catalogue. One control layer.",
    meta: "Catalogue / Inventory / Admin",
    challenge: "Rich product variants, stock information, and administrative workflows needed to stay accurate across the complete commerce experience.",
    system: "A connected commerce architecture combining the jewellery catalogue, operational data, and a purpose-built administration panel.",
    outcome: "The business gained a clearer route for managing catalogue information and the operational work behind every product.",
    scope: ["Jewellery catalogue", "Variant management", "Inventory control", "Admin workflows"],
    stack: ["Commerce frontend", "Admin console", "API layer", "Operational database"],
    visual: "commerce",
    proof: [
      { label: "Primary fit", value: "Jewellery operations" },
      { label: "Core system", value: "Commerce + admin" },
      { label: "Main gain", value: "Central control" },
    ],
    image: "/images/projects/lakshita.webp",
    url: "https://lakshitajewels.com",
  },
  {
    slug: "gympro",
    index: "02",
    label: "Fitness SaaS",
    title: "GymPro",
    eyebrow: "Members / Check-ins / Billing",
    summary: "Gym operations in one workspace — members, renewals, biometric check-ins, and GST billing.",
    body: "A multi-branch gym management product built so the front desk stops juggling registers, spreadsheets, and WhatsApp groups.",
    result: "One clear workspace per gym.",
    meta: "Members / Check-ins / Billing",
    challenge: "Gyms tracked members, renewals, attendance, and payments across paper registers, Excel sheets, and chat groups — renewals slipped and branch numbers never matched.",
    system: "A SaaS workspace with member and membership management, renewal follow-ups, eSSL and ZKTeco biometric attendance, GST invoicing across cash, UPI, and card, and multi-branch reporting.",
    outcome: "Owners see active members, today's check-ins, collections, and upcoming expiries on one dashboard, branch by branch.",
    scope: ["Member management", "Renewal follow-ups", "Biometric attendance", "GST billing"],
    stack: ["SaaS web app", "Device integrations", "Billing engine", "Multi-branch data"],
    kind: "product",
    visual: "dashboard",
    proof: [
      { label: "Primary fit", value: "Gyms + studios" },
      { label: "Core system", value: "Front-desk ops" },
      { label: "Main gain", value: "No missed renewals" },
    ],
    image: "/images/projects/gympro.webp",
    url: "https://gympro.owlsey.com",
  },
  {
    slug: "owlsey-console",
    index: "03",
    label: "Multi-SaaS control plane",
    title: "Owlsey Console",
    eyebrow: "Enquiries / Clients / Subscriptions",
    summary: "One console for every client across every product — enquiries, clients, and subscriptions.",
    body: "A centralised sales and subscription back office that sits behind several SaaS products at once.",
    result: "Every product, one sales desk.",
    meta: "Enquiries / Clients / Subscriptions",
    challenge: "Each SaaS product collected its own demo requests and ran its own trials, so the same business appeared in several places and renewals were easy to miss.",
    system: "A control plane that pulls enquiries from every product site into one queue, keeps each business once with every product it uses, and tracks trials, renewals, and expiries.",
    outcome: "The sales team works one queue and sees each client's full product footprint before every call.",
    scope: ["Unified enquiry queue", "Client records", "Subscription tracking", "Renewal alerts"],
    stack: ["Next.js console", "Product webhooks", "Subscription engine", "Role-based access"],
    visual: "dashboard",
    proof: [
      { label: "Primary fit", value: "SaaS portfolios" },
      { label: "Core system", value: "Sales back office" },
      { label: "Main gain", value: "One client view" },
    ],
    image: "/images/projects/cms.webp",
  },
  {
    slug: "veilguard",
    index: "04",
    label: "Security intelligence",
    title: "VeilGuard",
    eyebrow: "VPN / Tor / Risk signals",
    summary: "VPN and Tor detection for clearer, safer access decisions.",
    body: "Built for products that need better visibility into masked network traffic without turning every edge case into manual investigation.",
    result: "Masked traffic, clearly classified.",
    meta: "VPN / Tor / Risk",
    challenge: "VPN and Tor traffic made it difficult to distinguish normal access from sessions that required additional review.",
    system: "A detection route that evaluates network signals, classifies anonymised traffic, and returns a clear result to the product layer.",
    outcome: "Access flows gained a consistent risk signal that could be used for review, rules, or additional verification.",
    scope: ["VPN detection", "Tor detection", "Risk classification", "Decision API"],
    stack: ["Detection service", "Network intelligence", "API integration", "Event logging"],
    kind: "client",
    confidential: true,
    visual: "security",
    proof: [
      { label: "Primary fit", value: "Access security" },
      { label: "Core signal", value: "Network identity" },
      { label: "Main gain", value: "Risk visibility" },
    ],
    metric: { value: "<300ms", label: "Detection response" },
  },
  {
    slug: "mailproof",
    index: "05",
    label: "Data quality",
    title: "MailProof",
    eyebrow: "Email / Validation / Delivery",
    summary: "Email quality checks before data enters critical workflows.",
    body: "Created to reduce unreliable contact data and give downstream systems a clear validation result they can act on.",
    result: "Cleaner inputs before delivery.",
    meta: "Email / Validation / API",
    challenge: "Invalid and low-quality addresses created avoidable delivery failures and unreliable contact records.",
    system: "A staged validation pipeline that checks address structure, domain signals, and delivery readiness through one consistent interface.",
    outcome: "Forms, imports, and automation flows could validate addresses before committing them to the next step.",
    scope: ["Syntax checks", "Domain validation", "Quality signals", "Validation API"],
    stack: ["Rust validation engine", "NestJS API", "Next.js dashboard", "DNS + mailbox checks"],
    kind: "client",
    confidential: true,
    visual: "pipeline",
    proof: [
      { label: "Primary fit", value: "Contact quality" },
      { label: "Core route", value: "Pre-flight checks" },
      { label: "Main gain", value: "Cleaner inputs" },
    ],
    metric: { value: "<1s", label: "Validation latency" },
  },
  {
    slug: "hr-project-workspace",
    index: "06",
    label: "HR + project management",
    title: "HR & Project Workspace",
    eyebrow: "HRMS / PMS / Workspace",
    summary: "HR and project management in one workspace — people, leave, sprints, and tasks together.",
    body: "One platform combining HR administration and project management, for teams that wanted employee operations and project delivery in one system instead of two subscriptions.",
    result: "One system, people and work.",
    meta: "HRMS / PMS / Workspace",
    challenge: "People records, attendance, and leave lived in one tool while projects, sprints, and tasks lived in another, so ownership and capacity were hard to see together.",
    system: "A role-aware workspace connecting employee records, attendance and leave, payroll inputs, projects, boards, sprints, and task assignments.",
    outcome: "Managers see who is available, who owns what, and what is moving — from one login.",
    scope: ["Employee records", "Attendance + leave", "Projects + sprints", "Task boards"],
    stack: ["Role-based portal", "Workflow engine", "Reporting views", "Operational database"],
    kind: "client",
    confidential: true,
    visual: "dashboard",
    proof: [
      { label: "Primary fit", value: "Growing teams" },
      { label: "Core view", value: "People + projects" },
      { label: "Main gain", value: "One login" },
    ],
  },
  {
    slug: "retention-panel",
    index: "07",
    label: "Email marketing",
    title: "Retention Panel",
    eyebrow: "Segments / Campaigns / Win-back",
    summary: "A customer retention panel that turns purchase and activity data into targeted email campaigns.",
    body: "Built for teams that wanted to keep existing customers coming back instead of only buying new traffic.",
    result: "Customers come back on schedule.",
    meta: "Segments / Campaigns / Win-back",
    challenge: "Customer data sat in the store and CRM while campaigns were sent as one blast to everyone, so loyal, new, and slipping customers all got the same message.",
    system: "A panel that segments customers by behaviour and value, schedules lifecycle and win-back campaigns, and reports on who returned.",
    outcome: "Marketing can target the right customers at the right moment and see which campaigns actually bring them back.",
    scope: ["Customer segments", "Lifecycle campaigns", "Win-back flows", "Retention reports"],
    stack: ["Admin panel", "Segmentation engine", "Email delivery", "Campaign analytics"],
    visual: "monitor",
    proof: [
      { label: "Primary fit", value: "Repeat-purchase brands" },
      { label: "Core system", value: "Retention CRM" },
      { label: "Main gain", value: "Targeted campaigns" },
    ],
  },
  {
    slug: "crypto-gateway-docs",
    index: "08",
    label: "Developer documentation",
    title: "Crypto Gateway Docs",
    eyebrow: "API / Widgets / Guides",
    summary: "Documentation portal for a crypto payments ecosystem — a merchant gateway and a self-custody wallet.",
    body: "A searchable docs experience that takes merchants from product overview to a working crypto checkout, payouts, and invoicing.",
    result: "From overview to live checkout.",
    meta: "API / Widgets / Guides",
    challenge: "Merchants had to understand the gateway, the companion wallet, supported chains, checkout widgets, and the API before integrating — knowledge spread across PDFs and support chats.",
    system: "A structured docs portal with product overviews, getting-started paths, account and treasury guides, no-code widgets, a full API reference, and Ask-or-search.",
    outcome: "Merchants self-serve the integration path, and support answers link to one source of truth.",
    scope: ["Product overview", "Integration guides", "API reference", "Search"],
    stack: ["Docs framework", "MDX content", "Search index", "Dark + light themes"],
    kind: "client",
    confidential: true,
    visual: "docs",
    proof: [
      { label: "Primary fit", value: "Fintech platforms" },
      { label: "Core surface", value: "Developer docs" },
      { label: "Main gain", value: "Self-serve onboarding" },
    ],
  },
  {
    slug: "gaming-operator-guide",
    index: "09",
    label: "Platform user guide",
    title: "Operator Guide",
    eyebrow: "Content / Back office / CRM / Admin",
    summary: "One user guide for a B2B gaming platform's operator tools — content, back office, CRM, and administration.",
    body: "A focused documentation hub where each operator team opens the guide for the product they actually use.",
    result: "Four products, one clear guide.",
    meta: "Content / Back office / CRM / Admin",
    challenge: "Operators worked across four separate admin products, and help content for each lived in different places and languages.",
    system: "A product-picker landing page leading into dedicated documentation spaces, with AI-assisted search, language switching, and dark mode.",
    outcome: "Each team finds the right guide in one click and gets answers without raising a ticket.",
    scope: ["Product picker", "Per-product docs", "Ask AI search", "Multi-language"],
    stack: ["Docs platform", "AI search", "i18n", "Theme switching"],
    kind: "client",
    confidential: true,
    visual: "docs",
    proof: [
      { label: "Primary fit", value: "Multi-product platforms" },
      { label: "Core surface", value: "User guide" },
      { label: "Main gain", value: "Fewer tickets" },
    ],
  },
  {
    slug: "barrierflow",
    index: "10",
    label: "Workforce operations",
    title: "BarrierFlow",
    eyebrow: "Punches / Attendance / Admin",
    summary: "Barrier punches, attendance rules, and corrections in one workflow.",
    body: "Built around the reality that physical access punches and attendance records need reconciliation, not just passive storage.",
    result: "Every punch becomes traceable.",
    meta: "Punches / Attendance / Admin",
    challenge: "Raw barrier events, missing punches, and corrections were difficult to reconcile into dependable attendance records.",
    system: "A management layer that ingests punch events, applies attendance logic, exposes exceptions, and supports controlled corrections.",
    outcome: "Operations gained one place to understand daily attendance and resolve discrepancies without losing the original event trail.",
    scope: ["Punch ingestion", "Attendance rules", "Exception review", "Admin corrections"],
    stack: ["Device integration", "Event processing", "Admin dashboard", "Audit history"],
    visual: "dashboard",
    proof: [
      { label: "Primary fit", value: "Attendance ops" },
      { label: "Core input", value: "Barrier punches" },
      { label: "Main gain", value: "Clear exceptions" },
    ],
  },
  {
    slug: "sentinel-monitor",
    index: "11",
    label: "Observability",
    title: "Sentinel Monitor",
    eyebrow: "Health / Alerts / Visibility",
    summary: "Service health, failures, and alerts in one focused view.",
    body: "Designed so important failures become visible early and the team can understand what needs attention without scanning disconnected tools.",
    result: "Important signals surface sooner.",
    meta: "Health / Alerts / Visibility",
    challenge: "Critical service signals were spread across logs and tools, delaying a clear understanding of active issues.",
    system: "A monitoring layer that collects health signals, organises events, and routes meaningful alerts into an operational dashboard.",
    outcome: "The team gained faster awareness and a clearer starting point for investigating system issues.",
    scope: ["Health monitoring", "Alert routing", "Event visibility", "Operational dashboard"],
    stack: ["Signal collectors", "Alert rules", "Monitoring console", "Event history"],
    visual: "monitor",
    proof: [
      { label: "Primary fit", value: "System health" },
      { label: "Core signal", value: "Actionable alerts" },
      { label: "Main gain", value: "Early visibility" },
    ],
  },
  {
    slug: "commerce-sidecar",
    index: "12",
    label: "Browser tooling",
    title: "Commerce Sidecar",
    eyebrow: "Chrome / Ecommerce / Workflow",
    summary: "Ecommerce tools placed directly inside the browser workflow.",
    body: "Built to remove repeated tab switching and make useful ecommerce actions available alongside the active store or marketplace page.",
    result: "Less switching. Faster operations.",
    meta: "Chrome / Ecommerce / Tools",
    challenge: "Daily ecommerce tasks required repetitive copying, checking, and movement between browser tabs and internal tools.",
    system: "A contextual browser sidecar with page-aware actions, structured data capture, and direct connections to the supporting workflow.",
    outcome: "Operators could complete common ecommerce tasks with less switching and more consistent inputs.",
    scope: ["Chrome extension", "Page-aware tools", "Data capture", "Workflow actions"],
    stack: ["Browser APIs", "Side panel UI", "Content scripts", "Backend integration"],
    visual: "commerce",
    proof: [
      { label: "Primary fit", value: "Ecommerce ops" },
      { label: "Core surface", value: "Browser sidecar" },
      { label: "Main gain", value: "Fewer switches" },
    ],
  },
  {
    slug: "flowforge",
    index: "13",
    label: "Workflow automation",
    title: "FlowForge",
    eyebrow: "n8n / Integrations / Automation",
    summary: "n8n workflows connecting tools, schedules, and business events.",
    body: "Created to turn repeated multi-tool tasks into visible, maintainable workflows instead of isolated scripts and manual handoffs.",
    result: "Repeated work runs automatically.",
    meta: "n8n / Workflows / APIs",
    challenge: "Teams were repeating the same transfers and follow-ups across tools with limited visibility when a step failed.",
    system: "Modular n8n workflows with clear triggers, transformations, integrations, error routes, and operational handoff points.",
    outcome: "Routine processes could run consistently while still remaining understandable and adjustable by the team.",
    scope: ["Workflow design", "API connections", "Scheduled automation", "Failure routes"],
    stack: ["n8n", "Webhooks", "REST APIs", "Workflow monitoring"],
    visual: "workflow",
    proof: [
      { label: "Primary fit", value: "Repeated workflows" },
      { label: "Core route", value: "Connected tools" },
      { label: "Main gain", value: "Less manual work" },
    ],
  },
  {
    slug: "telegram-ops",
    index: "14",
    label: "Messaging automation",
    title: "Telegram Ops",
    eyebrow: "Bots / Messages / Workflows",
    summary: "Bot-led commands, notifications, and workflows inside Telegram.",
    body: "Built for use cases where Telegram is more than a notification channel and needs to participate directly in a business workflow.",
    result: "Messages become direct actions.",
    meta: "Telegram / Bots / Workflows",
    challenge: "Important actions and updates required manual messaging even though the surrounding process was already digital.",
    system: "A bot-driven interaction layer connecting commands, structured responses, notifications, and backend workflow actions.",
    outcome: "Teams could receive updates and complete supported actions from a familiar messaging interface.",
    scope: ["Telegram bots", "Command flows", "Automated alerts", "Backend actions"],
    stack: ["Telegram APIs", "Bot workflows", "Webhook service", "Automation layer"],
    visual: "messaging",
    proof: [
      { label: "Primary fit", value: "Messaging ops" },
      { label: "Core surface", value: "Telegram bot" },
      { label: "Main gain", value: "Direct actions" },
    ],
  },
  {
    slug: "guidestack",
    index: "15",
    label: "Knowledge platform",
    title: "GuideStack",
    eyebrow: "Guidance / Docs / Admin",
    summary: "Website guidance and documentation managed from one panel.",
    body: "Designed for products that need contextual guidance to stay current without requiring code changes for every content update.",
    result: "Guidance stays current and controlled.",
    meta: "Guidance / Docs / Admin",
    challenge: "Website guidance was difficult to organise, update, and keep aligned with changing product experiences.",
    system: "A documentation control panel with structured content, publishing workflows, and delivery into the relevant website context.",
    outcome: "Teams gained control over guidance content while users received clearer help inside the product experience.",
    scope: ["Guidance content", "Documentation panel", "Publishing workflow", "Contextual delivery"],
    stack: ["Admin CMS", "Content API", "Structured documents", "Website integration"],
    visual: "docs",
    proof: [
      { label: "Primary fit", value: "Product guidance" },
      { label: "Core surface", value: "Docs panel" },
      { label: "Main gain", value: "Content control" },
    ],
  },
];

export function getProjectCase(slug: string) {
  return PROJECT_CASES.find((project) => project.slug === slug);
}
