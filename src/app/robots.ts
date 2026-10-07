import { MetadataRoute } from "next";

const BASE_URL = "https://owlsey.com";

export const dynamic = "force-static";

/* AI search and answer agents — the crawlers that fetch pages to answer a
   question and cite the source (ChatGPT search, Claude, Perplexity, …).
   Being reachable by these is what makes Owlsey quotable in AI answers. */
const AI_SEARCH_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "MistralAI-User",
];

/* Model-training crawlers. Allowed here, but note the zone's Cloudflare
   "Block AI bots" setting decides what actually gets through: today it
   answers GPTBot, ClaudeBot, CCBot and Amazonbot with 403. Change it in the
   dashboard (Security → Bots), not here, if that decision changes. */
const AI_TRAINING_AGENTS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
  "Amazonbot",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /api/ is reserved for the contact endpoint; nothing there is a page.
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_SEARCH_AGENTS, allow: "/", disallow: "/api/" },
      { userAgent: AI_TRAINING_AGENTS, allow: "/", disallow: "/api/" },
      // Ignores crawl etiquette and sends heavy traffic for no search value.
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
