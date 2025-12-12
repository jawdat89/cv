import React, { useState, useRef, useEffect } from "react";
import { useI18n } from "@/hooks";
import { FaDownload, FaChevronDown } from "react-icons/fa";
import clsx from "clsx";

interface CVOption {
  value: string;
  label: string;
  file: string;
  filename: string;
}

const CVDownloadSelect: React.FC = () => {
  const { t, direction } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const cvOptions: CVOption[] = [
    {
      value: "english",
      label: t("actions.downloadEnglishCV") || "English CV",
      file: "/static/Jawdat Abdullah - 2025.pdf",
      filename: "Jawdat Abdullah - CV.pdf",
    },
    {
      value: "hebrew",
      label: t("actions.downloadHebrewCV") || "Hebrew CV",
      file: "/static/גודאת עבדאללה - קורות חיים 2025.pdf",
      filename: "גודאת עבדאללה - קורות חיים 2025.pdf",
    },
  ];

  const handleDownload = (option: CVOption) => {
    const link = document.createElement("a");
    link.href = option.file;
    link.download = option.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors",
          direction === "rtl" && "space-x-reverse"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaDownload className="w-4 h-4" />
        <span className="hidden sm:inline">{t("actions.downloadCV") || "Download CV"}</span>
        <FaChevronDown
          className={clsx(
            "w-3 h-3 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute z-50 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700",
            direction === "rtl" ? "left-0" : "right-0"
          )}
        >
          <div className="py-1">
            {cvOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleDownload(option)}
                className={clsx(
                  "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                  direction === "rtl" && "text-right"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CVDownloadSelect;

