import React, { useState, useRef, useEffect } from "react";
import { useI18n } from "@/hooks";
import { FaDownload, FaChevronDown } from "react-icons/fa";
import clsx from "clsx";
import { CVOption, ENGLISH_CV, HEBREW_CV, downloadCV } from "@/utils/cvDownload";

type CVDownloadSelectVariant = "nav" | "secondary";

interface CVDownloadSelectProps {
  variant?: CVDownloadSelectVariant;
  className?: string;
  showLabel?: boolean;
}

const CVDownloadSelect: React.FC<CVDownloadSelectProps> = ({
  variant = "nav",
  className,
  showLabel = true,
}) => {
  const { t, direction } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const cvOptions: CVOption[] = [
    {
      ...ENGLISH_CV,
      label: t("actions.downloadEnglishCV") || ENGLISH_CV.label,
    },
    {
      ...HEBREW_CV,
      label: t("actions.downloadHebrewCV") || HEBREW_CV.label,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const triggerLabel = t(
    variant === "secondary" ? "hero.downloadCV" : "actions.downloadCV"
  );

  return (
    <div className={clsx("relative inline-flex", className)} ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={clsx(
          "inline-flex items-center gap-2 rounded-lg font-semibold transition-all duration-150",
          variant === "nav" &&
            "bg-brand-accent px-4 py-2 text-white shadow-sm hover:bg-brand-accent-hover hover:shadow-md",
          variant === "secondary" &&
            "border border-brand-border bg-brand-elevated/40 px-[22px] py-[10px] text-brand-text hover:border-brand-accent/40 hover:bg-brand-accent-subtle/10 hover:text-brand-accent",
          direction === "rtl" && "flex-row-reverse"
        )}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={triggerLabel}
      >
        {variant === "nav" && <FaDownload className="h-4 w-4 shrink-0" aria-hidden />}
        {(showLabel || variant === "secondary") && (
          <span className={clsx(variant === "nav" && "hidden sm:inline")}>
            {triggerLabel}
          </span>
        )}
        <FaChevronDown
          className={clsx(
            "h-3 w-3 shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute start-0 top-[calc(100%+0.5rem)] z-50 min-w-full overflow-hidden rounded-lg border border-brand-border/50 bg-brand-surface py-1 shadow-xl"
        >
          {cvOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitem"
              onClick={() => {
                downloadCV(option);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-start text-sm text-brand-muted transition-colors hover:bg-brand-elevated/50 hover:text-brand-text"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CVDownloadSelect;
