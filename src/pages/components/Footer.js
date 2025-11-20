import React from 'react';
import { Globe } from 'lucide-react';
import './Footer.css';

const Footer = () => {
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
            <h4>Product</h4>
            <ul>
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase()}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Solutions</h4>
            <ul>
              {solutionLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase()}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Download</h4>
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
          <div className="language-selector">
            <Globe size={16} />
            <select>
              <option>English</option>
              {languages.slice(1).map((lang, index) => (
                <option key={index}>{lang}</option>
              ))}
            </select>
          </div>
          
          <div className="footer-copyright">
            <p>&copy; iLovePDF 2025 ® - Your PDF Editor</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
