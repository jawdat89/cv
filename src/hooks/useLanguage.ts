import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
  }, [i18n]);

  const getCurrentLanguage = useCallback(() => {
    return i18n.language;
  }, [i18n]);

  const getAvailableLanguages = useCallback(() => {
    return Object.keys(i18n.options.resources || {});
  }, [i18n]);

  return {
    currentLanguage: getCurrentLanguage(),
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
  };
};
