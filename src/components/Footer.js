import React from 'react';
import { Globe } from 'lucide-react';
import './Footer.css';

const labels = {
  fr: {
    product: 'Produit',
    resources: 'Ressources',
    solutions: 'Solutions',
    legal: 'Mentions légales',
    company: 'Entreprise',
    download: 'Télécharger',
    copyright: '© iLovePDF 2025 ® - Votre éditeur PDF',
    language: 'Français',
  },
  en: {
    product: 'Product',
    resources: 'Resources',
    solutions: 'Solutions',
    legal: 'Legal',
    company: 'Company',
    download: 'Download',
    copyright: '© iLovePDF 2025 ® - Your PDF Editor',
    language: 'English',
  }
};

const Footer = ({ language, setLanguage }) => {
  const productLinks = [
    'Home',
    'Features',
    'Pricing',
    'Tools',
    'FAQ'
  ];
  

  const resourceLinks = [
    'iLovePDF Desktop',
    'iLovePDF Mobile',
    'iLoveSign',
    'iLoveAPI',
    'iLoveIMG'
  ];

  const solutionLinks = [
    'Business',
    'Education'
  ];

  const legalLinks = [
    'Security',
    'Privacy policy',
    'Terms & conditions',
    'Cookies'
  ];

  const companyLinks = [
    'About us',
    'Contact us',
    'Blog',
    'Press'
  ];

  const storeLinks = [
    'Google Play',
    'App Store',
    'Mac Store',
    'Microsoft Store'
  ];

  const downloadLinks = [
    'Google Play',
    'App Store',
    'Mac Store',
    'Microsoft Store',
    'Chrome Extension',
    'Firefox Extension'
  ];

  const languages = [
    'English', 'Español', 'Français', 'Deutsch', 'Italiano', 'Português',
    '日本語', 'Pусский', '한국어', '中文 (简体)', '中文 (繁體)', 'العربية'
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{labels[language].product}</h4>
            <ul>
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase()}`}>{language === 'fr'
                    ? link === 'Home' ? 'Accueil'
                    : link === 'Features' ? 'Fonctionnalités'
                    : link === 'Pricing' ? 'Tarifs'
                    : link === 'Tools' ? 'Outils'
                    : link === 'FAQ' ? 'FAQ'
                    : link
                    : link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4>{labels[language].resources}</h4>
            <ul>
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4>{labels[language].solutions}</h4>
            <ul>
              {solutionLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase()}`}>{language === 'fr'
                    ? link === 'Business' ? 'Entreprise'
                    : link === 'Education' ? 'Éducation'
                    : link
                    : link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4>{labels[language].legal}</h4>
            <ul>
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{language === 'fr'
                    ? link === 'Security' ? 'Sécurité'
                    : link === 'Privacy policy' ? 'Politique de confidentialité'
                    : link === 'Terms & conditions' ? 'Conditions générales'
                    : link === 'Cookies' ? 'Cookies'
                    : link
                    : link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4>{labels[language].company}</h4>
            <ul>
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{language === 'fr'
                    ? link === 'About us' ? 'À propos'
                    : link === 'Contact us' ? 'Contact'
                    : link === 'Blog' ? 'Blog'
                    : link === 'Press' ? 'Presse'
                    : link
                    : link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4>{labels[language].download}</h4>
            <ul>
              {downloadLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div
            className="language-selector"
            style={{ cursor: 'pointer' }}
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            title={language === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            <Globe size={16} />
            <span>{labels[language].language}</span>
          </div>
          <div className="footer-copyright">
            <p>{labels[language].copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
