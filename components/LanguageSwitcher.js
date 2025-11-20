import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div>
      <button onClick={() => i18n.changeLanguage('fr')}>Français</button>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
    </div>
  );
};

export default LanguageSwitcher;
