import { useEffect, useMemo, useState } from "react";
import { initTheme, setTheme, getInitialTheme, type ThemeMode } from "../../lib/theme/toggle";

/**
 * ThemeToggle
 * Client-side React island to toggle theme: light | dark | auto
 * Progressive enhancement: reads current state from DOM/localStorage on mount.
 */
export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(() => getInitialTheme());
  const buttons = [
    { value: "light", label: "Light", icon: "🌞" },
    { value: "dark", label: "Dark", icon: "🌚" },
    { value: "auto", label: "Auto", icon: "🌓" },
  ];
  const currentIdx = buttons.findIndex(b => b.value === mode);

  useEffect(() => {
    // Initialize once on mount to sync with stored/system preference
    initTheme();
  }, []);

  useEffect(() => {
    setTheme(mode);
  }, [mode]);

  const label = useMemo(() => {
    if (mode === "auto") return "Theme: Auto";
    if (mode === "light") return "Theme: Light";
    return "Theme: Dark";
  }, [mode]);

  // Keyboard arrow navigation for roving tabindex
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      let nextIdx = currentIdx;
      if (e.key === "ArrowLeft") nextIdx = (currentIdx + buttons.length - 1) % buttons.length;
      if (e.key === "ArrowRight") nextIdx = (currentIdx + 1) % buttons.length;
      setMode(buttons[nextIdx].value as ThemeMode);
    }
  }

  return (
    <div
      className="inline-flex items-center gap-2"
      role="group"
      aria-label="Theme toggle"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <span className="sr-only" id="theme-toggle-label">Theme mode</span>
      {buttons.map((btn, i) => (
        <ToggleButton
          key={btn.value}
          pressed={mode === btn.value}
          onClick={() => setMode(btn.value as ThemeMode)}
          ariaPressed={mode === btn.value}
          label={btn.label}
          tabIndex={mode === btn.value ? 0 : -1}
        >
          {btn.icon}
        </ToggleButton>
      ))}
      <span className="ml-2 text-xs text-muted" aria-live="polite">{label}</span>
    </div>
  );
}

function ToggleButton({
  pressed,
  onClick,
  ariaPressed,
  label,
  children,
  tabIndex,
}: {
  pressed: boolean;
  onClick: () => void;
  ariaPressed: boolean;
  label: string;
  children: React.ReactNode;
  tabIndex?: number;
}) {
  return (
    <button
      type="button"
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border",
        "bg-card text-fg hover:bg-bg/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        pressed ? "ring-2 ring-ring" : "",
      ].join(" ")}
      aria-pressed={ariaPressed}
      aria-label={`Set theme ${label}`}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
}