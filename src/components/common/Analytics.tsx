import Script from "next/script";

/**
 * Cloudflare Web Analytics — cookie-less page-view counting. It sets no
 * cookies and stores nothing on the visitor's device, so it doesn't need the
 * consent banner (OPTIONAL_COOKIES_IN_USE stays false).
 *
 * The token comes from the Cloudflare dashboard and is inlined at build time.
 * Without it nothing loads, so local dev and preview builds send no data.
 */
export const ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ?? "";
export const ANALYTICS_ENABLED = ANALYTICS_TOKEN.length > 0;

export function Analytics() {
  if (!ANALYTICS_ENABLED) return null;

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token: ANALYTICS_TOKEN })}
    />
  );
}
