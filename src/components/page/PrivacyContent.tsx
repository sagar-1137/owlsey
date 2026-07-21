"use client";

import React from "react";
import { LegalPageContent } from "@/components/page/LegalPageContent";

const PRIVACY_CLAUSES = [
  {
    title: "Information we receive",
    body: "We collect the details you choose to share with us: project context, contact information, brief material, email conversations, and files needed to understand a requirement.",
  },
  {
    title: "How we use it",
    body: "We use that information to respond to enquiries, shape recommendations, prepare estimates, deliver agreed work, and support systems after launch.",
  },
  {
    title: "Project material",
    body: "Briefs, screenshots, documents, credentials, and technical context are treated as client material. We only use them for the work they were provided for.",
  },
  {
    title: "Sharing",
    body: "We do not sell personal information. We may share limited information with trusted tools or service providers when it is required to deliver, secure, or maintain the work.",
  },
  {
    title: "Retention",
    body: "We keep information only as long as needed for the enquiry, project, support relationship, legal requirement, or operational record.",
  },
  {
    title: "Your request",
    body: "You can ask us to review, correct, or delete information we hold where the request is practical and legally permitted. Contact us at hello@owlsey.com.",
  },
];

export default function PrivacyContent() {
  return (
    <LegalPageContent
      kind="privacy"
      eyebrow="Privacy policy"
      title="Privacy"
      accent="handled"
      summary="We collect only the context needed to understand, recommend, build, and support useful software."
      updated="June 15, 2026"
      primaryNote="Client context stays tied to the work. We do not turn project information into a marketing asset without permission."
      supportNote="Your context is used to build the right system, not to create noise."
      clauses={PRIVACY_CLAUSES}
    />
  );
}
