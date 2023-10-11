import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';

export const useAppRedireact = () => {
  const { i18n: { options, language } } = useTranslation();

  const isDefault = language === options?.defaultLocale;
  const currentLanguage = useMemo(() => {
    return  isDefault ? '' : language;
  }, [language]);

  const generateRouter = (route) => {
    const prefix = isDefault ? '' : '/';
    const router = `${prefix}${currentLanguage}/${route}`;
    return router;
  };
  return [generateRouter];
};
