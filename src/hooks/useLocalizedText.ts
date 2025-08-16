import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useLocalizedText = () => {
  const { t, i18n } = useTranslation();

  const getText = useCallback((key: string, fallback?: string) => {
    const translation = t(key);
    // If the translation is the same as the key, it means the key wasn't found
    if (translation === key && fallback) {
      return fallback;
    }
    return translation;
  }, [t]);

  const getTextWithParams = useCallback((key: string, params: Record<string, unknown>, fallback?: string) => {
    const translation = t(key, params);
    if (translation === key && fallback) {
      return fallback;
    }
    return translation;
  }, [t]);

  const hasTranslation = useCallback((key: string) => {
    return i18n.exists(key);
  }, [i18n]);

  return {
    getText,
    getTextWithParams,
    hasTranslation,
    currentLanguage: i18n.language,
  };
};
