import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

const loadTranslations = async (lang) => {
  try {
    const translations = await import(`../../translations/${lang}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
    return null;
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    loadTranslations(savedLanguage).then(setTranslations);
  }, []);

  const changeLanguage = async (lang) => {
    const newTranslations = await loadTranslations(lang);
    if (newTranslations) {
      setLanguage(lang);
      setTranslations(newTranslations);
      localStorage.setItem('language', lang);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
