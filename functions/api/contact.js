const MAX_LENGTH = { name: 120, email: 254, company: 160, direction: 80, budget: 80, timeline: 80, context: 2000 };

const clean = (value, limit) => typeof value === "string" ? value.trim().slice(0, limit) : "";

export async function submissionSecurity(request, env) {
  const ip = request.cf ? request.headers.get("cf-connecting-ip") : null;
  let ipHash;
  if (ip) {
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.OWLSEY_CONSOLE_PRODUCT_KEY), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("contact-ip:v1:" + ip));
    ipHash = Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  let referrer;
  try {
    const url = new URL(request.headers.get("referer"));
    if (["https:", "http:"].includes(url.protocol)) referrer = (url.origin + url.pathname).slice(0, 500);
  } catch { /* Missing or malformed referrer is normal. */ }
  const country = request.cf?.country;
  return {
    receivedAt: new Date().toISOString(),
    requestId: clean(request.headers.get("cf-ray"), 80) || crypto.randomUUID(),
    sourcePage: new URL("/contact", request.url).href,
    userAgent: clean(request.headers.get("user-agent"), 300) || undefined,
    referrer,
    country: typeof country === "string" && /^[A-Z]{2}$/.test(country) ? country : undefined,
    ipHash,
    botCheck: "NOT_CONFIGURED",
  };
}

export async function onRequestPost({ request, env }) {
  if (Number(request.headers.get("content-length") ?? 0) > 8192) {
    return Response.json({ error: "Request is too large" }, { status: 413 });
  }
  if (!env.OWLSEY_CONSOLE_API_URL || !env.OWLSEY_CONSOLE_PRODUCT_KEY) {
    return Response.json({ error: "Contact service is not configured" }, { status: 503 });
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 8192) return Response.json({ error: "Request is too large" }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  if (body.website) return Response.json({ ok: true });

  const brief = Object.fromEntries(Object.entries(MAX_LENGTH).map(([field, limit]) => [field, clean(body[field], limit)]));
  if (!brief.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email) || !brief.direction || !brief.context) {
    return Response.json({ error: "Name, email, direction and context are required" }, { status: 400 });
  }

  const endpoint = new URL("/api/public/v1/leads", env.OWLSEY_CONSOLE_API_URL);
  const sourceLeadId = typeof body.submissionId === "string" && /^[0-9a-f-]{36}$/i.test(body.submissionId)
    ? body.submissionId : undefined;
  const attribution = Object.fromEntries(
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
      .map((key) => [key, clean(body.attribution?.[key], 100)])
      .filter(([, value]) => value),
  );
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-product-key": env.OWLSEY_CONSOLE_PRODUCT_KEY },
      body: JSON.stringify({
        name: brief.name,
        email: brief.email,
        company: brief.company || undefined,
        message: brief.context,
        intent: "CONTACT",
        source: "owlsey.com/contact",
        security: await submissionSecurity(request, env),
        meta: { direction: brief.direction, budget: brief.budget, timeline: brief.timeline, sourceLeadId, ...attribution },
      }),
    });
    if (!response.ok) return Response.json({ error: "Could not save enquiry" }, { status: 502 });
  } catch {
    return Response.json({ error: "Could not reach enquiry service" }, { status: 502 });
  }
  return Response.json({ ok: true }, { status: 201 });
}
