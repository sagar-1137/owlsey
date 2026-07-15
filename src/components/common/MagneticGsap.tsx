"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  as?: "a" | "button" | "div";
};

export const MagneticGsap: React.FC<Props> = ({
  children,
  className,
  strength = 0.35,
  href,
  onClick,
  as = "div",
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const gsap = ensureGsap();
    const el = ref.current;
    if (!el) return;
    const qx = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      qx(x * strength);
      qy(y * strength);
    };
    const handleLeave = () => {
      qx(0);
      qy(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  if (as === "a") {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={className}
      >
        {children}
      </a>
    );
  }
  if (as === "button") {
    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        onClick={onClick}
        className={className}
      >
        {children}
      </button>
    );
  }
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
};
