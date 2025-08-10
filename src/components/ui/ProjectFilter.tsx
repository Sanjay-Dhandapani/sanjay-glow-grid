import React, { useEffect, useId, useMemo, useState } from "react";

type Category = "all" | "frontend" | "backend" | "fullstack" | "mobile";

export type ProjectFilterProps = {
  categories?: Exclude<Category, "all">[];
  onChange?: (opts: { category: Exclude<Category, "all"> | "all" }) => void;
  initialCategory?: Category;
  className?: string;
};

/**
 * Accessible, keyboard-navigable category filter.
 * Client-side island: keep JS minimal, no external deps.
 */
export default function ProjectFilter({
  categories = ["frontend", "backend", "fullstack", "mobile"],
  onChange,
  initialCategory = "all",
  className,
}: ProjectFilterProps) {
  const [active, setActive] = useState<Category>(initialCategory);
  const groupId = useId();

  const options = useMemo<{ key: Category; label: string }[]>(
    () => [
      { key: "all", label: "All" },
      ...categories.map((c) => ({ key: c as Category, label: labelFor(c as Exclude<Category, "all">) })),
    ],
    [categories]
  );

  useEffect(() => {
    onChange?.({ category: active === "all" ? "all" : (active as Exclude<Category, "all">) });
  }, [active, onChange]);

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")}>
      <fieldset aria-labelledby={`${groupId}-label`} className="flex flex-wrap gap-2">
        <legend id={`${groupId}-label`} className="sr-only">
          Filter projects by category
        </legend>
        {options.map(({ key, label }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setActive(key)}
              className={[
                "px-3 py-1.5 rounded-md text-sm border transition-colors focus:outline-none focus-visible:ring-2",
                isActive
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-card border-border text-fg hover:border-primary/60",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </fieldset>
    </div>
  );
}

function labelFor(cat: Exclude<Category, "all">): string {
  switch (cat) {
    case "frontend":
      return "Frontend";
    case "backend":
      return "Backend";
    case "fullstack":
      return "Full Stack";
    case "mobile":
      return "Mobile";
    default:
      return cat;
  }
}