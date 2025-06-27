import { createContext } from 'react';
import { useLocalStorage } from "../hooks/useProductSearch";


export const LanguageContext = createContext({
  language: 'fr',        
  setLanguage: () => {}, 
});


export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage('language', 'fr');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};