"use client";

import React from "react";

interface AnimatedGradientBGProps {
  variant?: "primary" | "secondary" | "accent" | "subtle";
  className?: string;
}

/**
 * Animated gradient background with subtle motion.
 * Used as decorative element for sections and containers.
 */
export const AnimatedGradientBackground: React.FC<AnimatedGradientBGProps> = ({
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary: {
      className:
        "absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
      animation: "gradient-shift 15s ease-in-out infinite",
    },
    secondary: {
      className:
        "absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20",
      animation: "gradient-drift 20s ease-in-out infinite",
    },
    accent: {
      className:
        "absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10",
      animation: "gradient-pulse 25s ease-in-out infinite",
    },
    subtle: {
      className:
        "absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent",
      animation: "gradient-fade 30s ease-in-out infinite",
    },
  };

  const selected = variants[variant];

  return (
    <>
      <div
        className={`${selected.className} ${className} pointer-events-none opacity-0 animate-pulse`}
        style={{
          animation: selected.animation,
        }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
            opacity: 0.4;
          }
          50% {
            background-position: 100% 50%;
            opacity: 0.6;
          }
        }

        @keyframes gradient-drift {
          0% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(20px, -20px);
            opacity: 0.5;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
        }

        @keyframes gradient-pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes gradient-fade {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </>
  );
};
