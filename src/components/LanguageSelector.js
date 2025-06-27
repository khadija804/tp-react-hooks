import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="mb-3">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="form-select"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
