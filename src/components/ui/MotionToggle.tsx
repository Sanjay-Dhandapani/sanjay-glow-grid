import { useEffect, useMemo, useState } from "react";
import { initMotion, setMotion, getInitialMotion, type MotionMode } from "../../lib/motion/settings";

/**
 * MotionToggle
 * Client-side React island to toggle motion: full | reduced | off | auto
 * Respects prefers-reduced-motion in auto mode.
 */
export default function MotionToggle() {
  const [mode, setMode] = useState<MotionMode>(() => getInitialMotion());
  const buttons = [
    { value: "full", label: "Full", icon: "✨" },
    { value: "reduced", label: "Reduced", icon: "➖" },
    { value: "off", label: "Off", icon: "⛔" },
    { value: "auto", label: "Auto", icon: "⚙️" },
  ];
  const currentIdx = buttons.findIndex(b => b.value === mode);

  useEffect(() => {
    initMotion();
  }, []);

  useEffect(() => {
    setMotion(mode);
  }, [mode]);

  const label = useMemo(() => {
    switch (mode) {
      case "full":
        return "Motion: Full";
      case "reduced":
        return "Motion: Reduced";
      case "off":
        return "Motion: Off";
      default:
        return "Motion: Auto";
    }
  }, [mode]);

  // Keyboard arrow navigation for roving tabindex
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      let nextIdx = currentIdx;
      if (e.key === "ArrowLeft") nextIdx = (currentIdx + buttons.length - 1) % buttons.length;
      if (e.key === "ArrowRight") nextIdx = (currentIdx + 1) % buttons.length;
      setMode(buttons[nextIdx].value as MotionMode);
    }
  }

  return (
    <div
      className="inline-flex items-center gap-2"
      role="group"
      aria-label="Motion toggle"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <span className="sr-only" id="motion-toggle-label">Motion mode</span>
      {buttons.map((btn, i) => (
        <ToggleButton
          key={btn.value}
          pressed={mode === btn.value}
          onClick={() => setMode(btn.value as MotionMode)}
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
      aria-label={`Set motion ${label}`}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
}