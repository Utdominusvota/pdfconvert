import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Globe, DollarSign, Shield, Star, Info, HelpCircle } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import imageHeader from './imageHeader.jpg';

const Header = ({ language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [isAllToolsOpen, setIsAllToolsOpen] = useState(false);
  const moreMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const convertTools = [
    { name: 'Convert to PDF', submenu: ['JPG to PDF', 'WORD to PDF', 'POWERPOINT to PDF', 'EXCEL to PDF', 'HTML to PDF'] },
    { name: 'Convert from PDF', submenu: ['PDF to JPG', 'PDF to WORD', 'PDF to POWERPOINT', 'PDF to EXCEL', 'PDF to PDF/A'] }
  ];

  const allTools = [
    { name: 'Organize PDF', submenu: ['Merge PDF', 'Split PDF', 'Remove pages', 'Extract pages', 'Organize PDF', 'Scan to PDF'] },
    { name: 'Optimize PDF', submenu: ['Compress PDF', 'Repair PDF', 'OCR PDF'] },
    { name: 'Convert to PDF', submenu: ['JPG to PDF', 'WORD to PDF', 'POWERPOINT to PDF', 'EXCEL to PDF', 'HTML to PDF'] },
    { name: 'Convert from PDF', submenu: ['PDF to JPG', 'PDF to WORD', 'PDF to POWERPOINT', 'PDF to EXCEL', 'PDF to PDF/A'] },
    { name: 'Edit PDF', submenu: ['Rotate PDF', 'Add page numbers', 'Add watermark', 'Crop PDF', 'Edit PDF'] },
    { name: 'PDF security', submenu: ['Unlock PDF', 'Protect PDF', 'Sign PDF', 'Redact PDF', 'Compare PDF'] }
  ];

  const otherProducts = [
    { name: 'iLoveIMG', description: 'Effortless image editing' },
    { name: 'iLoveSign', description: 'e-Signing made simple' },
    { name: 'iLoveAPI', description: 'Document automation for developers' }
  ];

  const solutions = [
    { name: 'Business', description: 'Streamlined PDF editing and workflows for business teams' },
    { name: 'Applications', description: 'Desktop App Available for Mac and Windows' },
    { name: 'Mobile App', description: 'Available for iOS and Android' }
  ];

  // French/English translations
  const labels = {
    fr: {
      merge: 'Fusionner PDF',
      split: 'Diviser PDF',
      compress: 'Compresser PDF',
      convert: 'Convertir PDF',
      convertTo: 'Convertir en PDF',
      convertFrom: 'Convertir depuis PDF',
      allTools: 'Tous les outils PDF',
      organize: 'Organiser PDF',
      optimize: 'Optimiser PDF',
      edit: 'Éditer PDF',
      security: 'Sécurité PDF',
      rotate: 'Faire pivoter PDF',
      addPageNumbers: 'Ajouter des numéros de page',
      addWatermark: 'Ajouter un filigrane',
      crop: 'Rogner PDF',
      editPdf: 'Éditer PDF',
      unlock: 'Déverrouiller PDF',
      protect: 'Protéger PDF',
      sign: 'Signer PDF',
      redact: 'Rédiger PDF',
      compare: 'Comparer PDF',
      login: 'Connexion',
      signup: 'S\'inscrire',
      language: 'Français',
      otherProducts: 'Autres produits',
      solutions: 'Solutions',
      applications: 'Applications',
      pricing: 'Tarifs',
      securityMenu: 'Sécurité',
      features: 'Fonctionnalités',
      about: 'À propos',
      help: 'Aide',
      business: 'Entreprise',
      resources: 'Ressources',
      company: 'Entreprise',
    },
    en: {
      merge: 'MERGE PDF',
      split: 'SPLIT PDF',
      compress: 'COMPRESS PDF',
      convert: 'CONVERT PDF',
      convertTo: 'Convert to PDF',
      convertFrom: 'Convert from PDF',
      allTools: 'ALL PDF TOOLS',
      organize: 'Organize PDF',
      optimize: 'Optimize PDF',
      edit: 'Edit PDF',
      security: 'PDF security',
      rotate: 'Rotate PDF',
      addPageNumbers: 'Add page numbers',
      addWatermark: 'Add watermark',
      crop: 'Crop PDF',
      editPdf: 'Edit PDF',
      unlock: 'Unlock PDF',
      protect: 'Protect PDF',
      sign: 'Sign PDF',
      redact: 'Redact PDF',
      compare: 'Compare PDF',
      login: 'Login',
      signup: 'Sign up',
      language: 'English',
      otherProducts: 'OTHER PRODUCTS',
      solutions: 'SOLUTIONS',
      applications: 'APPLICATIONS',
      pricing: 'Pricing',
      securityMenu: 'Security',
      features: 'Features',
      about: 'About us',
      help: 'Help',
      business: 'Business',
      resources: 'Resources',
      company: 'Company',
    }
  };

  // helper to turn a tool name into a route-friendly slug
  const slug = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

  return (
    <header id="ilovepdf-header" className="header">
      <div className="container">
        <div className="header-content">
          <button className="hamburger-menu">
            <Menu size={20} />
          </button>
          
          <div className="logo">
            <Link to="/" className="logo-link">
              <img src={imageHeader} alt="Logo" className="logo-image" />
            </Link>
          </div>

          <button 
            ref={moreMenuRef}
            className="more-menu"
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
          >
            <div className="circled-menu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <nav className="nav-desktop">
            <NavLink to={`/tools/${slug(labels[language].merge)}`} className="nav-item">{labels[language].merge}</NavLink>
            <NavLink to={`/tools/${slug(labels[language].split)}`} className="nav-item">{labels[language].split}</NavLink>
            <NavLink to={`/tools/${slug(labels[language].compress)}`} className="nav-item">{labels[language].compress}</NavLink>
            
            <div className="nav-item dropdown" onMouseEnter={() => setIsConvertOpen(true)} onMouseLeave={() => setIsConvertOpen(false)}>
              <span>{labels[language].convert}</span>
              <ChevronDown size={16} />
              {isConvertOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-section">
                    <h4>{labels[language].convertTo}</h4>
                    <div className="dropdown-items">
                      {convertTools[0].submenu.map((t) => (
                        <Link key={t} to={`/tools/${slug(t)}`}>{language === 'fr' ? 
                          (t === 'JPG to PDF' ? 'JPG vers PDF' :
                          t === 'WORD to PDF' ? 'Word vers PDF' :
                          t === 'POWERPOINT to PDF' ? 'PowerPoint vers PDF' :
                          t === 'EXCEL to PDF' ? 'Excel vers PDF' :
                          t === 'HTML to PDF' ? 'HTML vers PDF' : t) : t}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="dropdown-section">
                    <h4>{labels[language].convertFrom}</h4>
                    <div className="dropdown-items">
                      {convertTools[1].submenu.map((t) => (
                        <Link key={t} to={`/tools/${slug(t)}`}>{language === 'fr' ? 
                          (t === 'PDF to JPG' ? 'PDF vers JPG' :
                          t === 'PDF to WORD' ? 'PDF vers Word' :
                          t === 'PDF to POWERPOINT' ? 'PDF vers PowerPoint' :
                          t === 'PDF to EXCEL' ? 'PDF vers Excel' :
                          t === 'PDF to PDF/A' ? 'PDF vers PDF/A' : t) : t}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="nav-item dropdown" onMouseEnter={() => setIsAllToolsOpen(true)} onMouseLeave={() => setIsAllToolsOpen(false)}>
              <span>{labels[language].allTools}</span>
              <ChevronDown size={16} />
              {isAllToolsOpen && (
                <div className="dropdown-menu">
                  {allTools.map((section, index) => (
                    <div key={index} className="dropdown-section">
                      <h4>{language === 'fr'
                        ? section.name === 'Organize PDF' ? labels.fr.organize
                        : section.name === 'Optimize PDF' ? labels.fr.optimize
                        : section.name === 'Convert to PDF' ? labels.fr.convertTo
                        : section.name === 'Convert from PDF' ? labels.fr.convertFrom
                        : section.name === 'Edit PDF' ? labels.fr.edit
                        : section.name === 'PDF security' ? labels.fr.security
                        : section.name
                        : section.name}
                      </h4>
                      <div className="dropdown-items">
                        {section.submenu.map((tool, toolIndex) => (
                          <Link key={toolIndex} to={`/tools/${slug(tool)}`}>
                            {language === 'fr'
                              ? tool === 'Merge PDF' ? labels.fr.merge
                              : tool === 'Split PDF' ? labels.fr.split
                              : tool === 'Remove pages' ? 'Supprimer des pages'
                              : tool === 'Extract pages' ? 'Extraire des pages'
                              : tool === 'Organize PDF' ? labels.fr.organize
                              : tool === 'Scan to PDF' ? 'Scanner vers PDF'
                              : tool === 'Compress PDF' ? labels.fr.compress
                              : tool === 'Repair PDF' ? 'Réparer PDF'
                              : tool === 'OCR PDF' ? 'OCR PDF'
                              : tool === 'JPG to PDF' ? 'JPG vers PDF'
                              : tool === 'WORD to PDF' ? 'Word vers PDF'
                              : tool === 'POWERPOINT to PDF' ? 'PowerPoint vers PDF'
                              : tool === 'EXCEL to PDF' ? 'Excel vers PDF'
                              : tool === 'HTML to PDF' ? 'HTML vers PDF'
                              : tool === 'PDF to JPG' ? 'PDF vers JPG'
                              : tool === 'PDF to WORD' ? 'PDF vers Word'
                              : tool === 'PDF to POWERPOINT' ? 'PDF vers PowerPoint'
                              : tool === 'PDF to EXCEL' ? 'PDF vers Excel'
                              : tool === 'PDF to PDF/A' ? 'PDF vers PDF/A'
                              : tool === 'Rotate PDF' ? labels.fr.rotate
                              : tool === 'Add page numbers' ? labels.fr.addPageNumbers
                              : tool === 'Add watermark' ? labels.fr.addWatermark
                              : tool === 'Crop PDF' ? labels.fr.crop
                              : tool === 'Edit PDF' ? labels.fr.editPdf
                              : tool === 'Unlock PDF' ? labels.fr.unlock
                              : tool === 'Protect PDF' ? labels.fr.protect
                              : tool === 'Sign PDF' ? labels.fr.sign
                              : tool === 'Redact PDF' ? labels.fr.redact
                              : tool === 'Compare PDF' ? labels.fr.compare
                              : tool
                              : tool}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="header-actions">
            <div
              className="language-selector"
              style={{ cursor: 'pointer' }}
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              title={language === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              <Globe size={16} />
              <span>{labels[language].language}</span>
            </div>
            <Link to="/login"><button className="btn-secondary">{labels[language].login}</button></Link>
            <Link to="/signup"><button className="btn-primary">{labels[language].signup}</button></Link>
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMoreMenuOpen && (
          <div className="more-menu-dropdown">
            <div className="more-menu-section">
              <h4>Other Products</h4>
              <div className="more-menu-items">
                <Link to="/products/iloveimg">iLoveIMG</Link>
                <Link to="/products/ilovesign">iLoveSign</Link>
                <Link to="/products/iloveapi">iLoveAPI</Link>
                <Link to="/integrations">Integrations</Link>
              </div>
            </div>
            <div className="more-menu-section">
              <h4>Solutions</h4>
              <div className="more-menu-items">
                <Link to="/business">Business</Link>
                <Link to="/applications">Applications</Link>
              </div>
            </div>
            <div className="more-menu-section">
              <h4>Company</h4>
              <div className="more-menu-items">
                <Link to="/pricing">Pricing</Link>
                <Link to="/security">Security</Link>
                <Link to="/features">Features</Link>
                <Link to="/about">About us</Link>
                <Link to="/help">Help</Link>
              </div>
            </div>
          </div>
        )}

        {isMenuOpen && (
          <nav className="nav-mobile">
            <div className="mobile-nav-item dropdown">
              <span>{labels[language].otherProducts}</span>
              <ChevronDown size={16} />
            </div>
            <div className="mobile-nav-item dropdown">
              <span>{labels[language].solutions}</span>
              <ChevronDown size={16} />
            </div>
            <div className="mobile-nav-item dropdown">
              <span>{labels[language].applications}</span>
              <ChevronDown size={16} />
            </div>
            <Link to="/pricing" className="mobile-nav-item">
              <DollarSign size={16} />
              {labels[language].pricing}
            </Link>
            <Link to="/security" className="mobile-nav-item">
              <Shield size={16} />
              {labels[language].securityMenu}
            </Link>
            <Link to="/features" className="mobile-nav-item">
              <Star size={16} />
              {labels[language].features}
            </Link>
            <Link to="/about" className="mobile-nav-item">
              <Info size={16} />
              {labels[language].about}
            </Link>
            <Link to="/help" className="mobile-nav-item">
              <HelpCircle size={16} />
              {labels[language].help}
            </Link>
           
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
