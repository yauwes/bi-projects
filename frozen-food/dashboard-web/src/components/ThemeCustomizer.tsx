import React, { useEffect, useState } from "react";
import { Sun, Moon, Palette } from "lucide-react";
import styles from "./ThemeCustomizer.module.css";

export type ThemeMode = "light" | "dark";
export type AccentColor = "blue" | "green" | "violet" | "amber" | "coral";

const ACCENTS: { id: AccentColor; label: string; color: string }[] = [
  { id: "blue", label: "Ocean Blue", color: "#2563eb" },
  { id: "green", label: "Emerald Green", color: "#059669" },
  { id: "violet", label: "Royal Violet", color: "#7c3aed" },
  { id: "amber", label: "Amber Gold", color: "#d97706" },
  { id: "coral", label: "Coral Flame", color: "#e11d48" },
];

export function ThemeCustomizer() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem("bi_theme") as ThemeMode) || "light";
  });
  const [accent, setAccent] = useState<AccentColor>(() => {
    return (localStorage.getItem("bi_accent") as AccentColor) || "blue";
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bi_theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
    localStorage.setItem("bi_accent", accent);
  }, [accent]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={styles.wrapper}>
      {/* Light / Dark Mode Quick Toggle */}
      <button
        type="button"
        className={styles.themeToggleBtn}
        onClick={toggleTheme}
        title={theme === "light" ? "Beralih ke Dark Mode" : "Beralih ke Light Mode"}
        aria-label="Toggle tema gelap/terang"
      >
        {theme === "light" ? <Moon size={16} /> : <Sun size={16} className={styles.sunIcon} />}
        <span className={styles.themeLabel}>{theme === "light" ? "Gelap" : "Terang"}</span>
      </button>

      {/* Accent Color Palette Selector Trigger */}
      <div className={styles.paletteWrapper}>
        <button
          type="button"
          className={`${styles.paletteBtn} ${isOpen ? styles.paletteBtnActive : ""}`}
          onClick={() => setIsOpen(v => !v)}
          title="Pilih warna aksen tema"
          aria-label="Pilih palet warna aksen"
        >
          <Palette size={16} />
          <span className={styles.activeDot} style={{ background: ACCENTS.find(a => a.id === accent)?.color }} />
        </button>

        {/* Dropdown Color Popover */}
        {isOpen && (
          <div className={styles.popover}>
            <span className={styles.popoverTitle}>Aksen Warna Tema:</span>
            <div className={styles.accentGrid}>
              {ACCENTS.map(a => (
                <button
                  key={a.id}
                  type="button"
                  className={`${styles.accentChoice} ${accent === a.id ? styles.accentChoiceActive : ""}`}
                  onClick={() => {
                    setAccent(a.id);
                    setIsOpen(false);
                  }}
                  title={a.label}
                >
                  <span className={styles.colorPill} style={{ background: a.color }} />
                  <span className={styles.choiceLabel}>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
