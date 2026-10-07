/**
 * Opt-in interface sound. Off by default — a business site must never make
 * noise a visitor didn't ask for — and remembered per browser once enabled.
 *
 * Sounds are synthesised with WebAudio (no audio files to download): a soft
 * high "tick" for hover and a short low "tap" for clicks, both kept quiet so
 * they read as texture rather than effects.
 */

const STORAGE_KEY = "owlsey:sound";

let context: AudioContext | null = null;
// Read lazily from storage on first use (never during SSR).
let enabled: boolean | null = null;
const listeners = new Set<(on: boolean) => void>();

const readStored = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
};

export const isSoundOn = () => {
  if (enabled === null) enabled = readStored();
  return enabled;
};

export const subscribeSound = (listener: (on: boolean) => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getContext = () => {
  if (!context) {
    const AudioCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return null;
    context = new AudioCtor();
  }
  // Browsers start contexts suspended until a user gesture; every call below
  // happens inside one (toggle, hover after interaction, click).
  if (context.state === "suspended") void context.resume();
  return context;
};

const blip = (frequency: number, endFrequency: number, duration: number, volume: number, type: OscillatorType) => {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
};

let lastHover = 0;

export const playHover = () => {
  if (!isSoundOn()) return;
  const now = performance.now();
  // Sweeping across a dense grid must not become a buzz.
  if (now - lastHover < 70) return;
  lastHover = now;
  blip(2400, 1800, 0.045, 0.018, "sine");
};

export const playClick = () => {
  if (!isSoundOn()) return;
  blip(520, 180, 0.09, 0.06, "triangle");
};

/** Rising two-note chime confirming sound was switched on. */
const playEnabledChime = () => {
  blip(660, 660, 0.08, 0.04, "sine");
  window.setTimeout(() => blip(990, 990, 0.12, 0.035, "sine"), 70);
};

export const setSoundOn = (on: boolean) => {
  enabled = on;
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // Private mode: the choice simply lasts for this page view.
  }
  if (on) playEnabledChime();
  listeners.forEach((listener) => listener(on));
};
