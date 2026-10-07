import { execFileSync } from "node:child_process";
import { MetadataRoute } from "next";
import { PROJECT_CASES } from "@/data/projectCases";

const BASE_URL = "https://owlsey.com";

export const dynamic = "force-static";

/**
 * `lastmod` is only useful while it is true. Stamping every URL with the build
 * time told crawlers the whole site changed on every deploy, which teaches
 * Google to ignore the field. Each URL instead carries the date of the last
 * commit that touched the files it is built from. If git is unavailable the
 * field is omitted rather than guessed.
 *
 * priority / changefreq are left out: Google and Bing both ignore them.
 */
const lastCommit = (...paths: string[]): Date | undefined => {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
};

const STATIC_ROUTES: Array<{ path: string; sources: string[] }> = [
  { path: "", sources: ["src/app/page.tsx", "src/components/page/HomeContent.tsx", "src/components/sections"] },
  { path: "/services", sources: ["src/app/services", "src/components/page/ServicesContent.tsx"] },
  { path: "/projects", sources: ["src/app/projects/page.tsx", "src/components/page/ProjectsContent.tsx", "src/data/projectCases.ts"] },
  { path: "/experience", sources: ["src/app/experience", "src/components/page/ExperienceContent.tsx"] },
  { path: "/contact", sources: ["src/app/contact", "src/components/page/ContactContent.tsx"] },
  { path: "/privacy", sources: ["src/app/privacy", "src/components/page/PrivacyContent.tsx"] },
  { path: "/terms", sources: ["src/app/terms", "src/components/page/TermsContent.tsx"] },
  { path: "/cookies", sources: ["src/app/cookies", "src/components/page/CookiesContent.tsx"] },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: lastCommit(...route.sources),
  }));

  const projectsModified = lastCommit(
    "src/data/projectCases.ts",
    "src/app/projects/[slug]",
    "src/components/page/ProjectDetailContent.tsx",
  );

  // Real product screenshots go in as image entries so they can surface in
  // image search. NDA work never ships a screenshot, so it has none to list.
  const projectEntries: MetadataRoute.Sitemap = PROJECT_CASES.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: projectsModified,
    ...(project.image && !project.confidential ? { images: [`${BASE_URL}${project.image}`] } : {}),
  }));

  return [...staticEntries, ...projectEntries];
}
