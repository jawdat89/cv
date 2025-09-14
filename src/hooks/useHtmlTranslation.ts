import { useTranslation } from 'react-i18next';
import { HtmlRenderer } from '@/utils/htmlRenderer';

export const useHtmlTranslation = () => {
  const { t } = useTranslation();
  
  const getHtmlTranslation = (key: string, className?: string) => {
    const translation = t(key);
    return <HtmlRenderer content={translation} className={className} />;
  };

  return { getHtmlTranslation };
};
