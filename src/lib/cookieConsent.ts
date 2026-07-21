/**
 * Cookie consent state — a tiny, dependency-free store persisted to
 * localStorage. Categories mirror the Cookie Policy page: essential cookies
 * are always on; analytics and preferences are opt-in.
 */

export type ConsentCategories = {
  /** Always true — required for the site to function. */
  essential: true;
  analytics: boolean;
  preferences: boolean;
};

export type StoredConsent = {
  version: number;
  timestamp: string;
  categories: ConsentCategories;
};

/** Bump when the consent schema/policy changes so we can re-prompt users. */
export const CONSENT_VERSION = 1;
const STORAGE_KEY = "owlsey:cookie-consent";

/** Fired on the window whenever consent is saved, so listeners (e.g. an
 *  analytics loader) can react without a page reload. */
export const CONSENT_EVENT = "owlsey:consent-change";

export function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    // Re-prompt if the stored consent predates the current schema version.
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(categories: Omit<ConsentCategories, "essential">) {
  if (typeof window === "undefined") return;
  const record: StoredConsent = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: { essential: true, ...categories },
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* storage unavailable (private mode / disabled) — fail silent */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
}

/** Accept everything. */
export function acceptAll() {
  saveConsent({ analytics: true, preferences: true });
}

/** Essential only. */
export function rejectAll() {
  saveConsent({ analytics: false, preferences: false });
}
