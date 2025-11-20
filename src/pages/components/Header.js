import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Globe, DollarSign, Shield, Star, Info, HelpCircle } from 'lucide-react';
import './Header.css';

const Header = () => {
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

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <button className="hamburger-menu">
            <Menu size={20} />
          </button>
          
          <div className="logo">
            <span className="logo-text">iLovePDF</span>
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
            <a href="#merge" className="nav-item">MERGE PDF</a>
            <a href="#split" className="nav-item">SPLIT PDF</a>
            <a href="#compress" className="nav-item">COMPRESS PDF</a>
            
            <div className="nav-item dropdown" onMouseEnter={() => setIsConvertOpen(true)} onMouseLeave={() => setIsConvertOpen(false)}>
              <span>CONVERT PDF</span>
              <ChevronDown size={16} />
              {isConvertOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-section">
                    <h4>Convert to PDF</h4>
                    <div className="dropdown-items">
                      <a href="#jpg-to-pdf">JPG to PDF</a>
                      <a href="#word-to-pdf">WORD to PDF</a>
                      <a href="#powerpoint-to-pdf">POWERPOINT to PDF</a>
                      <a href="#excel-to-pdf">EXCEL to PDF</a>
                      <a href="#html-to-pdf">HTML to PDF</a>
                    </div>
                  </div>
                  <div className="dropdown-section">
                    <h4>Convert from PDF</h4>
                    <div className="dropdown-items">
                      <a href="#pdf-to-jpg">PDF to JPG</a>
                      <a href="#pdf-to-word">PDF to WORD</a>
                      <a href="#pdf-to-powerpoint">PDF to POWERPOINT</a>
                      <a href="#pdf-to-excel">PDF to EXCEL</a>
                      <a href="#pdf-to-pdfa">PDF to PDF/A</a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="nav-item dropdown" onMouseEnter={() => setIsAllToolsOpen(true)} onMouseLeave={() => setIsAllToolsOpen(false)}>
              <span>ALL PDF TOOLS</span>
              <ChevronDown size={16} />
              {isAllToolsOpen && (
                <div className="dropdown-menu">
                  {allTools.map((section, index) => (
                    <div key={index} className="dropdown-section">
                      <h4>{section.name}</h4>
                      <div className="dropdown-items">
                        {section.submenu.map((tool, toolIndex) => (
                          <a key={toolIndex} href={`#${tool.toLowerCase().replace(/\s+/g, '-')}`}>{tool}</a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="header-actions">
            <div className="language-selector">
              <Globe size={16} />
              <span>English</span>
            </div>
            <button className="btn-secondary">Login</button>
            <button className="btn-primary">Sign up</button>
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
                <a href="#iloveimg">iLoveIMG</a>
                <a href="#ilovesign">iLoveSign</a>
                <a href="#iloveapi">iLoveAPI</a>
                <a href="#integrations">Integrations</a>
              </div>
            </div>
            <div className="more-menu-section">
              <h4>Solutions</h4>
              <div className="more-menu-items">
                <a href="#business">Business</a>
                <a href="#applications">Applications</a>
              </div>
            </div>
            <div className="more-menu-section">
              <h4>Company</h4>
              <div className="more-menu-items">
                <a href="#pricing">Pricing</a>
                <a href="#security">Security</a>
                <a href="#features">Features</a>
                <a href="#about">About us</a>
                <a href="#help">Help</a>
              </div>
            </div>
          </div>
        )}

        {isMenuOpen && (
          <nav className="nav-mobile">
            <div className="mobile-nav-item dropdown">
              <span>OTHER PRODUCTS</span>
              <ChevronDown size={16} />
            </div>
            <div className="mobile-nav-item dropdown">
              <span>SOLUTIONS</span>
              <ChevronDown size={16} />
            </div>
            <div className="mobile-nav-item dropdown">
              <span>APPLICATIONS</span>
              <ChevronDown size={16} />
            </div>
            <a href="#pricing" className="mobile-nav-item">
              <DollarSign size={16} />
              Pricing
            </a>
            <a href="#security" className="mobile-nav-item">
              <Shield size={16} />
              Security
            </a>
            <a href="#features" className="mobile-nav-item">
              <Star size={16} />
              Features
            </a>
            <a href="#about" className="mobile-nav-item">
              <Info size={16} />
              About us
            </a>
            <a href="#help" className="mobile-nav-item">
              <HelpCircle size={16} />
              Help
            </a>
            <div className="mobile-actions">
              <button className="btn-secondary">Login</button>
              <button className="btn-primary">Sign up</button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
