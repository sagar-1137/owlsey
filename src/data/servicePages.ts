/**
 * Service landing pages (/services/[slug]). Each answers one thing people
 * search for — "custom software development in Surat", "web application
 * development", … — with real content: what we build, when it fits, the
 * shipped projects behind it, and honest answers.
 *
 * Rules (see CLAUDE.md → Content honesty):
 * - Only confirmed facts and copy the site already states.
 * - `projects` lists real case studies that prove the service. Skip NDA work
 *   whose brand name is still unconfirmed for public use.
 * - Child pages later get `parent: "<slug>"`; the template and sitemap pick
 *   them up without changes.
 */

export type ServicePage = {
  slug: string;
  /** Set on child pages; the parent's slug. */
  parent?: string;
  /** Short name used in breadcrumbs, cards and links. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  /** H1 split so one word can carry the accent colour. */
  heading: { before: string; accent: string; after?: string };
  intro: string;
  fits: string[];
  offers: Array<{ title: string; text: string; href?: string }>;
  projects: string[];
  faqs: Array<{ q: string; a: string }>;
};

const PROCESS_FAQ_COST = {
  q: "How much does it cost?",
  a: "It depends on scope, integrations and timeline. We start with a free discovery, then give you a written scope and a fixed estimate before any build work begins — no open-ended billing.",
};

const PROCESS_FAQ_OWNERSHIP = {
  q: "Who owns the code?",
  a: "You do. The source code, designs and IP are handed over to you, and the repository can live in your own organisation from day one. We sign an NDA whenever you need one.",
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "custom-software-development",
    name: "Custom software development",
    metaTitle: "Custom Software Development Company in Surat | Owlsey",
    metaDescription:
      "Owlsey builds custom software in Surat, Gujarat — web apps, SaaS and internal tools shaped around how your business works. Free discovery, fixed estimate.",
    kicker: "Custom software development · Surat",
    heading: { before: "Custom software, built in", accent: "Surat" },
    intro:
      "Owlsey is a custom software development company in Surat, Gujarat. We design, build and support software shaped around how your business actually runs — not a template bent to fit it. Since 2020 we have delivered 28+ projects for growing businesses.",
    fits: [
      "Spreadsheets and manual handoffs are slowing the team down",
      "Ready-made tools cover part of the job and the rest is workarounds",
      "You have a product idea and need a team to build and run it",
      "An existing system needs fixing, extending or rebuilding",
    ],
    offers: [
      {
        title: "Web applications",
        text: "Customer portals, booking systems and business platforms that are fast, secure and easy to use.",
        href: "/services/web-application-development",
      },
      {
        title: "SaaS products",
        text: "Subscription products with accounts, billing and roles — ready to sell to many customers.",
        href: "/services/saas-development",
      },
      {
        title: "Internal tools & ERP",
        text: "Dashboards, admin panels and workflow systems that replace spreadsheets and manual handoffs.",
        href: "/services/internal-tools-development",
      },
      {
        title: "Integrations",
        text: "Link your CRM, ERP, payments and other tools so data moves without copy-paste.",
      },
    ],
    projects: ["lakshita-commerce-os", "gympro", "hr-project-workspace", "owlsey-console"],
    faqs: [
      {
        q: "Do you only work with businesses in Surat?",
        a: "No. Owlsey is based in Surat, Gujarat and works with clients across India. Discovery, weekly demos and reviews run online, so you do not need to be in the same city.",
      },
      PROCESS_FAQ_COST,
      {
        q: "Which technology do you use?",
        a: "Whatever fits the project — we don't keep a fixed stack. Common choices are Next.js, React and TypeScript on the web, Flutter for mobile, Node.js, NestJS, Go or Python on the server, and PostgreSQL for data. When a different technology will give a better result, we suggest it, with the reason, before building.",
      },
      PROCESS_FAQ_OWNERSHIP,
    ],
  },
  {
    slug: "web-application-development",
    name: "Web application development",
    metaTitle: "Web Application Development Company in Surat | Owlsey",
    metaDescription:
      "Custom web applications — customer portals, dashboards and business platforms — designed, built and supported by Owlsey in Surat, India.",
    kicker: "Web application development",
    heading: { before: "Web applications that fit the", accent: "work" },
    intro:
      "Customer portals, booking systems, dashboards and business platforms, built as fast and secure web apps that your team and your customers actually use. Designed, built and supported by Owlsey from Surat.",
    fits: [
      "Customers need to log in, order, book or track something online",
      "Your team runs the business across disconnected tools",
      "An old web app is slow, fragile or hard to change",
      "You need a back office that matches how you really operate",
    ],
    offers: [
      {
        title: "Customer portals",
        text: "Accounts, orders, bookings and self-service, so customers stop waiting on email and calls.",
      },
      {
        title: "Business platforms",
        text: "Commerce, operations and back office connected in one system instead of five tools.",
      },
      {
        title: "Dashboards & admin panels",
        text: "The numbers and controls your team needs, in one place, with roles and access built in.",
        href: "/services/internal-tools-development",
      },
      {
        title: "Modernising an existing app",
        text: "We review the code and architecture, keep what works, and stabilise, extend or rebuild in stages.",
      },
    ],
    projects: ["lakshita-commerce-os", "gympro", "owlsey-console"],
    faqs: [
      {
        q: "Which framework do you build web apps with?",
        a: "Most of our web apps use Next.js, React and TypeScript, with Node.js or NestJS on the server and PostgreSQL for data. We choose per project, and explain the choice in the written scope.",
      },
      {
        q: "Will it work on phones?",
        a: "Yes — web apps are designed to work on phones, tablets and desktops. If your users really need an installable mobile app, we will say so during discovery.",
      },
      {
        q: "Can you take over a web app someone else built?",
        a: "Yes. We begin with a code and architecture review, tell you plainly what is worth keeping, and then stabilise, extend or rebuild in stages — without stopping the business.",
      },
      PROCESS_FAQ_COST,
    ],
  },
  {
    slug: "saas-development",
    name: "SaaS development",
    metaTitle: "SaaS Product Development Company in India | Owlsey",
    metaDescription:
      "Owlsey builds SaaS products — accounts, subscriptions, billing and roles — and runs its own SaaS in production. Based in Surat, Gujarat, India.",
    kicker: "SaaS product development",
    heading: { before: "SaaS, built by a team that", accent: "runs", after: " one" },
    intro:
      "We build subscription products with accounts, billing and roles, ready to sell to many customers. We also build and run our own SaaS in production — releases, uptime and support included — so your product gets a team that knows what running one takes.",
    fits: [
      "You want to turn an internal tool or idea into a product you sell",
      "You need a first version in customers' hands, then grow it",
      "Several customers or branches must share one system safely",
      "Billing, renewals and access control are eating your time",
    ],
    offers: [
      {
        title: "First version to first customers",
        text: "A focused first release built around the core job, shipped in parts you review every week.",
      },
      {
        title: "Accounts, roles & multi-tenancy",
        text: "Many customers, branches or teams on one platform, each seeing only what they should.",
      },
      {
        title: "Subscriptions & billing",
        text: "Plans, renewals and invoicing built into the product — including GST billing for India.",
      },
      {
        title: "Running it after launch",
        text: "Monitoring, fixes, updates and new features, with the first months of support included as agreed.",
      },
    ],
    projects: ["gympro", "owlsey-console"],
    faqs: [
      {
        q: "Can you start with a smaller first version?",
        a: "Yes, and we usually recommend it. The written scope separates what the first release needs from what can follow, and each finished part is handed to you for review as it is built.",
      },
      {
        q: "Have you built SaaS before?",
        a: "Yes — including our own. GymPro, a gym management SaaS, is built and run by Owlsey in production, and Owlsey Console manages clients and subscriptions across products.",
      },
      {
        q: "What happens after launch?",
        a: "We stay on for monitoring, fixes, updates and new features on a monthly support plan — the first months after launch are included at no cost, as set in your agreement. Or we hand everything over to your team with documentation.",
      },
      PROCESS_FAQ_OWNERSHIP,
    ],
  },
  {
    slug: "internal-tools-development",
    name: "Internal tools & ERP",
    metaTitle: "Internal Tools & Custom ERP Software Development | Owlsey",
    metaDescription:
      "Dashboards, admin panels, HR and workflow systems that replace spreadsheets and manual handoffs — custom built and supported by Owlsey in Surat.",
    kicker: "Internal tools & custom ERP",
    heading: { before: "Internal tools that replace the", accent: "spreadsheet" },
    intro:
      "Dashboards, admin panels, approval flows and ERP-style systems shaped around how your team already works, so repeated manual work and spreadsheet handoffs go away — and the data finally lives in one place.",
    fits: [
      "Work moves between people through spreadsheets, chats and email",
      "Nobody trusts the numbers because they live in five places",
      "A ready-made ERP forces you to change how you work",
      "Approvals, attendance or reporting take hours every week",
    ],
    offers: [
      {
        title: "Admin panels & dashboards",
        text: "One place to see and control operations, with roles so each person sees what they need.",
      },
      {
        title: "HR & people workflows",
        text: "People, leave, attendance and project work together, with the rules your company follows.",
      },
      {
        title: "Operations & back office",
        text: "Orders, stock, approvals and reporting connected, instead of re-typed between tools.",
      },
      {
        title: "Connecting what you already use",
        text: "Your CRM, payments and other tools linked in, so data moves without copy-paste.",
      },
    ],
    projects: ["hr-project-workspace", "retention-panel", "lakshita-commerce-os", "owlsey-console"],
    faqs: [
      {
        q: "Why not use a ready-made ERP?",
        a: "Sometimes you should, and we will tell you when. Custom makes sense when a ready-made tool forces the team to work around it, or when the part that makes your business different is exactly what it cannot do.",
      },
      {
        q: "Can it connect to the tools we already use?",
        a: "Yes. We connect CRM, ERP, payment and other systems through their APIs so data moves between them without copy-paste.",
      },
      {
        q: "Can we start with one department?",
        a: "Yes. Starting with the workflow that hurts most is usually the right first release; the rest is added in stages on the same system.",
      },
      PROCESS_FAQ_COST,
    ],
  },
];

export const getServicePage = (slug: string) => SERVICE_PAGES.find((page) => page.slug === slug);
