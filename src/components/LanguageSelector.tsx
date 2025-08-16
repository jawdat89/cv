import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store";
import { setLanguage } from "@/store/cvSlice";
import { FaGlobe, FaChevronDown } from "react-icons/fa";
import { US, SA, IL } from "country-flag-icons/react/3x2";
import { useI18n } from "@/hooks";
import clsx from "clsx";

interface Language {
  code: string;
  name: string;
  flag: React.ComponentType<{ className?: string }>;
  nativeName: string;
  countryCode: string;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    flag: US,
    nativeName: "English",
    countryCode: "US",
  },
  {
    code: "ar",
    name: "Arabic",
    flag: SA,
    nativeName: "العربية",
    countryCode: "SA",
  },
  {
    code: "he",
    name: "Hebrew",
    flag: IL,
    nativeName: "עברית",
    countryCode: "IL",
  },
];

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { direction } = useI18n();
  const currentLanguage = useSelector(
    (state: RootState) => state.cv.currentLanguage
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLanguageChange = (languageCode: string) => {
    dispatch(setLanguage(languageCode as "en" | "ar" | "fr" | "he"));
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];
  const CurrentFlag = currentLang.flag;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={clsx(
          "flex items-center px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          direction === "rtl" ? "space-x-reverse space-x-2" : "space-x-2"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Current language: ${currentLang.name}. Click to change language.`}
      >
        <FaGlobe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <div
          className={clsx(
            "w-5 h-4 rounded-sm overflow-hidden border border-gray-200",
            direction === "rtl" ? "ml-2" : ""
          )}
        >
          <CurrentFlag className="w-full h-full object-cover" />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
          {currentLang.name}
        </span>
        <FaChevronDown
          className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute top-full mt-1 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50",
            direction === "rtl" ? "right-0" : "left-0"
          )}
          role="listbox"
          aria-label="Language options"
        >
          <div className="py-1">
            {languages.map((language) => {
              const FlagComponent = language.flag;
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleLanguageChange(language.code);
                    }
                  }}
                  className={clsx(
                    "w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-600",
                    direction === "rtl"
                      ? "space-x-reverse space-x-3"
                      : "space-x-3",
                    currentLanguage === language.code
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                  role="option"
                  aria-selected={currentLanguage === language.code}
                >
                  <div
                    className={clsx(
                      "w-6 h-4 rounded-sm overflow-hidden border border-gray-200 flex-shrink-0",
                      direction === "rtl" ? "ml-2" : ""
                    )}
                  >
                    <FlagComponent className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">
                      {language.name}
                    </span>
                    <span className="text-xs opacity-75 truncate">
                      {language.nativeName}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
