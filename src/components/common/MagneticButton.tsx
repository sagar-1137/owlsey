"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  onClick,
  title,
  strength = 0.35,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = ensureGsap();
    const el = ref.current;
    if (!el) return;

    const qx = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      qx((e.clientX - (rect.left + rect.width / 2)) * strength);
      qy((e.clientY - (rect.top + rect.height / 2)) * strength);
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

  return (
    <div
      ref={ref}
      onClick={onClick}
      title={title}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
};
