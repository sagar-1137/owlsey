import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Framework, deployment, test, and local-tool output.
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    ".vercel/**",
    ".wrangler/**",
    "coverage/**",
    "test-results/**",
    "playwright-report/**",
    "blob-report/**",
    "recordings/**",
    "screenshots/**",
    "visualizations/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
