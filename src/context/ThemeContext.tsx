"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "cozy" | "sunset" | "forest" | "arctic-winter" | "como" | "pumpkin";

const THEMES: Theme[] = ["cozy", "sunset", "forest", "arctic-winter", "como", "pumpkin"];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  antigravityActive: boolean;
  toggleAntigravity: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const disableTransitions = () => {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);

  // Force a repaint
  if (typeof window !== "undefined") {
    window.getComputedStyle(document.body);
  }

  setTimeout(() => {
    document.head.removeChild(css);
  }, 1);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme && THEMES.includes(savedTheme)) {
        return savedTheme;
      }
    }
    return "cozy";
  });
  const [antigravityActive, setAntigravityActive] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("antigravity") === "true";
    }
    return false;
  });
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && THEMES.includes(savedTheme)) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "cozy");
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    disableTransitions();
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleTheme = () => {
    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
  };

  const toggleAntigravity = () => {
    const nextState = !antigravityActive;
    setAntigravityActive(nextState);
    localStorage.setItem("antigravity", String(nextState));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        antigravityActive,
        toggleAntigravity,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
