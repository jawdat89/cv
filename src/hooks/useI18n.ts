import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";

export const useI18n = () => {
  const { t, i18n } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsInitialized(true);
    } else {
      const handleInitialized = () => setIsInitialized(true);
      i18n.on("initialized", handleInitialized);
      return () => i18n.off("initialized", handleInitialized);
    }
  }, [i18n]);

  const changeLanguage = useCallback(
    async (language: string) => {
      try {
        await i18n.changeLanguage(language);
        return true;
      } catch (error) {
        console.error("Failed to change language:", error);
        return false;
      }
    },
    [i18n]
  );

  const getCurrentLanguage = useCallback(() => {
    return i18n.language;
  }, [i18n]);

  const getAvailableLanguages = useCallback(() => {
    return Object.keys(i18n.options.resources || {});
  }, [i18n]);

  const getText = useCallback(
    (key: string, fallback?: string) => {
      const translation = t(key);
      if (translation === key && fallback) {
        return fallback;
      }
      return translation;
    },
    [t]
  );

  const getTextWithParams = useCallback(
    (key: string, params: Record<string, unknown>, fallback?: string) => {
      const translation = t(key, params);
      if (translation === key && fallback) {
        return fallback;
      }
      return translation;
    },
    [t]
  );

  const hasTranslation = useCallback(
    (key: string) => {
      return i18n.exists(key);
    },
    [i18n]
  );

  const getDirection = useCallback(() => {
    const currentLang = getCurrentLanguage();
    // RTL languages
    const rtlLanguages = ["ar", "he"];
    return rtlLanguages.includes(currentLang) ? "rtl" : "ltr";
  }, [getCurrentLanguage]);

  return {
    // Translation functions
    t,
    getText,
    getTextWithParams,
    hasTranslation,

    // Language management
    currentLanguage: getCurrentLanguage(),
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,

    // State
    isInitialized,
    direction: getDirection(),

    // Direct access to i18n instance
    i18n,
  };
};
