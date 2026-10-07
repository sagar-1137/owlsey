export type Testimonial = {
  /** The client's own words — paste exactly what they sent. */
  quote: string;
  /** Person's name, or leave empty for NDA clients. */
  name?: string;
  /** Role and company, or an anonymised line for NDA clients, e.g. "CTO, fintech startup". */
  role: string;
  /** Optional: slug of the related case study in projectCases.ts. */
  project?: string;
};

/**
 * Real client words only. The homepage section stays hidden while this list
 * is empty, so nothing invented can ever ship.
 *
 * Example entry:
 * {
 *   quote: "<the client's exact words>",
 *   name: "<their name>",
 *   role: "<role>, <company>",
 *   project: "lakshita-commerce-os",
 * },
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They understood our operations, not just the software. HR workflows, attendance automation, role-based access and reporting — a complex process turned into a system our team finds simple to use every day.",
    name: "Rohan Mehta",
    role: "Operations Director · Ahmedabad",
    // Not linked to a case study: the related project is under NDA, and a
    // name + city + project together could identify the client.
  },
  {
    quote:
      "They handled both the application and the infrastructure behind it — architecture, deployment, security and monitoring. What stood out: they spotted problems early and suggested practical fixes instead of just following requirements.",
    name: "Arjun Shah",
    role: "CTO · Mumbai",
  },
  {
    quote:
      "Members, biometric attendance, subscriptions and payments in one platform — day-to-day management became much easier for our staff. Responsive throughout, and they understand how an Indian business actually runs.",
    name: "Kunal Patel",
    role: "Founder & Managing Director · Surat",
    project: "gympro",
  },
];
