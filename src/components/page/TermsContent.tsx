"use client";

import React from "react";
import { LegalPageContent } from "@/components/page/LegalPageContent";

const TERMS_CLAUSES = [
  {
    title: "Site information",
    body: "This website explains Owlsey's custom software and delivery services. It is informational and does not create a project agreement by itself.",
  },
  {
    title: "Project agreement",
    body: "Paid work is governed by the accepted proposal, statement of work, invoice terms, or written agreement between Owlsey and the client.",
  },
  {
    title: "Client inputs",
    body: "Clients provide accurate requirements, timely feedback, access, approvals, and any third-party licences or assets required for delivery.",
  },
  {
    title: "Delivery changes",
    body: "Scope, timelines, and pricing follow the agreed brief. New requirements, delayed feedback, or external dependencies may change delivery plans.",
  },
  {
    title: "Ownership",
    body: "Ownership follows the written project agreement. Owlsey may retain reusable methods, internal know-how, tooling patterns, and general engineering knowledge.",
  },
  {
    title: "Limits",
    body: "Third-party platforms have their own terms and availability. Questions about project terms can be sent to hello@owlsey.com before work begins.",
  },
];

export default function TermsContent() {
  return (
    <LegalPageContent
      kind="terms"
      eyebrow="Terms of service"
      title="Terms"
      accent="clear"
      summary="These terms explain how the site, project discussions, and software delivery relationship should be understood."
      updated="June 15, 2026"
      primaryNote="The real operating document for paid work is the accepted proposal or written agreement. This page keeps the baseline clear."
      supportNote="A clear agreement keeps the work focused, practical, and fair."
      clauses={TERMS_CLAUSES}
    />
  );
}
