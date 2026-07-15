/**
 * Central animation configuration for consistent timing, easing, and responsive breakpoints
 * Used across all motion components in Owlsey
 */

export const MOTION_CONFIG = {
  // Timing presets (in seconds)
  timing: {
    // Primary reveals
    primaryReveal: 1.0,
    primaryRevealLong: 1.3,
    // Supporting reveals
    supportingReveal: 0.7,
    supportingRevealShort: 0.55,
    // Interactions
    hover: 0.25,
    hoverLong: 0.35,
    // Parallax/scrub
    scrub: 0.8,
    scrubSmooth: 1.0,
  },

  // Easing curves
  easing: {
    // Standard out eases for entrances
    revealOut: "power3.out",
    revealOutStrong: "power4.out",
    // In-out for smooth transitions
    smooth: "power2.inOut",
    // For hover states
    hoverEase: "power2.out",
    // Parallax (linear for consistent motion)
    parallax: "none",
  },

  // Stagger delays (in seconds)
  stagger: {
    tight: 0.06,
    standard: 0.12,
    loose: 0.16,
    minimal: 0.04,
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: 640,
    tablet: 1024,
    desktop: 1025,
  },

  // Pinning ranges (viewport heights)
  pinning: {
    desktopLong: "160vh",
    desktopStandard: "120vh",
    tabletStandard: "80vh",
    tabletShort: "60vh",
    mobileLong: "120vh",
    mobileStandard: "80vh",
  },

  // Text reveal specific
  textReveal: {
    // Mask container easing
    maskEase: "power3.out",
    maskDuration: 1.0,
    // Inner text animation
    textDuration: 1.1,
    textEase: "power4.out",
    // Subtle rotation for depth (in degrees)
    rotateX: 0.5,
    skewY: 0.2,
  },

  // Card animations
  card: {
    enterDuration: 0.9,
    enterEase: "power3.out",
    enterScale: 0.97,
    enterYPercent: 70,
    enterXPercent: 8,
    stagger: 0.12,
    hoverLift: -2, // pixels
  },

  // Parallax settings
  parallax: {
    // Scrub timing for smooth parallax
    desktopScrub: 0.8,
    tabletScrub: 0.6,
    mobileScrub: false, // Disable on mobile
    // Common parallax values
    slowParallax: 0.4, // 40% speed
    standardParallax: 0.6, // 60% speed
    fastParallax: 0.8, // 80% speed
  },

  // Scroll trigger markers (for debugging)
  debug: false,

  // Utility function to get responsive value
  getResponsiveValue: (
    mobileValue: string | number | boolean,
    tabletValue: string | number | boolean,
    desktopValue: string | number | boolean,
    currentWidth: number
  ) => {
    if (currentWidth < MOTION_CONFIG.breakpoints.tablet) {
      return mobileValue;
    }
    if (currentWidth < MOTION_CONFIG.breakpoints.desktop) {
      return tabletValue;
    }
    return desktopValue;
  },
} as const;

export type MotionConfig = typeof MOTION_CONFIG;
