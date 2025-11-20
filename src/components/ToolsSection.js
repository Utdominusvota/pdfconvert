import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ToolsSection.css';

// Small safe icon content (uses emoji so no missing-symbol errors)
const ICON = {
  merge: <span style={{ fontSize: 40 }}>🔗</span>,
  split: <span style={{ fontSize: 40 }}>✂️</span>,
  compress: <span style={{ fontSize: 40 }}>📉</span>,
  word: <span style={{ fontSize: 40 }}>🔤</span>,
  powerpoint: <span style={{ fontSize: 40 }}>📽️</span>,
  excel: <span style={{ fontSize: 40 }}>📊</span>,
  genericDoc: <span style={{ fontSize: 40 }}>📄</span>,
  edit: <span style={{ fontSize: 40 }}>✏️</span>,
  image: <span style={{ fontSize: 40 }}>🖼️</span>,
  sign: <span style={{ fontSize: 40 }}>✍️</span>,
  watermark: <span style={{ fontSize: 40 }}>💧</span>,
  rotate: <span style={{ fontSize: 40 }}>🔄</span>,
  html: <span style={{ fontSize: 40 }}>🌐</span>,
  lock: <span style={{ fontSize: 40 }}>🔒</span>,
  unlock: <span style={{ fontSize: 40 }}>🔓</span>,
  repair: <span style={{ fontSize: 40 }}>🛠️</span>,
  crop: <span style={{ fontSize: 40 }}>📐</span> ,
  scan : <span style={{ fontSize: 40 }}>📱</span>,
  organize: <span style={{ fontSize: 40 }}>🗂️</span>,
  pagenumbers: <span style={{ fontSize: 40 }}>🔢</span>,
  ocd: <span style={{ fontSize: 40 }}>🔍</span>,
  compare: <span style={{ fontSize: 40 }}>⚖️</span>,
  redact: <span style={{ fontSize: 40 }}>🛡️</span>,
  default: <span style={{ fontSize: 40 }}>📁</span>,
};

const filters = {
  fr: ['Tout', 'Flux de travail', 'Organiser PDF', 'Optimiser PDF', 'Convertir PDF', 'Éditer PDF', 'Sécurité PDF'],
  en: ['All', 'Workflows', 'Organize PDF', 'Optimize PDF', 'Convert PDF', 'Edit PDF', 'PDF Security']
};

const tools = {
  fr: [
    { id: 'merge', route: '/tools/merge-pdf', name: 'Fusionner PDF', description: 'Combinez des PDF dans l\'ordre souhaité avec le fusionneur de PDF le plus simple.', icon: ICON.merge, category: 'Organiser PDF', isNew: false },
    { id: 'split', route: '/tools/split-pdf', name: 'Diviser PDF', description: 'Séparez les pages en fichiers PDF indépendants.', icon: ICON.split, category: 'Organiser PDF', isNew: false },
    { id: 'compress', route: '/tools/compress-pdf', name: 'Compresser PDF', description: 'Réduisez la taille du fichier tout en optimisant la qualité.', icon: ICON.compress, category: 'Optimiser PDF', isNew: false },
    { id: 'pdf-to-word', route: '/tools/pdf-to-word', name: 'PDF vers Word', description: 'Convertissez des PDF en DOCX modifiables.', icon: ICON.word, category: 'Convertir PDF', isNew: false },
    { id: 'pdf-to-powerpoint', route: '/tools/pdf-to-powerpoint', name: 'PDF vers PowerPoint', description: 'Transformez des PDF en diapositives PPTX modifiables.', icon: ICON.powerpoint, category: 'Convertir PDF', isNew: false },
    { id: 'pdf-to-excel', route: '/tools/pdf-to-excel', name: 'PDF vers Excel', description: 'Extrayez des tableaux de PDF vers Excel.', icon: ICON.excel, category: 'Convertir PDF', isNew: false },
    { id: 'word-to-pdf', route: '/tools/word-to-pdf', name: 'Word vers PDF', description: 'Convertissez DOC/DOCX en PDF.', icon: ICON.genericDoc, category: 'Convertir PDF', isNew: true },
    { id: 'powerpoint-to-pdf', route: '/tools/powerpoint-to-pdf', name: 'PowerPoint vers PDF', description: 'Convertissez PPT/PPTX en PDF.', icon: ICON.powerpoint, category: 'Convertir PDF', isNew: false },
    { id: 'excel-to-pdf', route: '/tools/excel-to-pdf', name: 'Excel vers PDF', description: 'Convertissez des feuilles de calcul Excel en PDF.', icon: ICON.excel, category: 'Convertir PDF', isNew: false },
    { id: 'edit-pdf', route: '/tools/edit-pdf', name: 'Éditer PDF', description: 'Ajoutez du texte, des images, des formes ou des annotations.', icon: ICON.edit, category: 'Éditer PDF', isNew: true },
    { id: 'pdf-to-jpg', route: '/tools/pdf-to-jpg', name: 'PDF vers JPG', description: 'Convertissez des pages ou extrayez des images en JPG.', icon: ICON.image, category: 'Convertir PDF', isNew: false },
    { id: 'jpg-to-pdf', route: '/tools/jpg-to-pdf', name: 'JPG vers PDF', description: 'Convertissez des images JPG en PDF.', icon: ICON.image, category: 'Convertir PDF', isNew: false },
    { id: 'sign-pdf', route: '/tools/sign-pdf', name: 'Signer PDF', description: 'Signez ou demandez des signatures électroniques.', icon: ICON.sign, category: 'Sécurité PDF', isNew: true },
    { id: 'watermark', route: '/tools/watermark', name: 'Filigrane', description: 'Apposez une image ou un texte sur votre PDF.', icon: ICON.watermark, category: 'Éditer PDF', isNew: true },
    { id: 'rotate-pdf', route: '/tools/rotate-pdf', name: 'Faire pivoter PDF', description: 'Faites pivoter des PDF individuellement ou en lot.', icon: ICON.rotate, category: 'Éditer PDF', isNew: false },
    { id: 'html-to-pdf', route: '/tools/html-to-pdf', name: 'HTML vers PDF', description: 'Convertissez des pages web en PDF à partir d\'une URL.', icon: ICON.html, category: 'Convertir PDF', isNew: false },
    { id: 'unlock-pdf', route: '/tools/unlock-pdf', name: 'Déverrouiller PDF', description: 'Supprimez la protection par mot de passe des PDF.', icon: ICON.unlock, category: 'Sécurité PDF', isNew: false },
    { id: 'protect-pdf', route: '/tools/protect-pdf', name: 'Protéger PDF', description: 'Cryptez les PDF avec un mot de passe.', icon: ICON.lock, category: 'Sécurité PDF', isNew: true },
    { id: 'organize-pdf', route: '/tools/organize-pdf', name: 'Organiser PDF', description: 'Triez ou supprimez des pages PDF.', icon: ICON.organize, category: 'Optimiser PDF', isNew: false },
    { id: 'pdf-to-pdfa', route: '/tools/pdf-to-pdfa', name: 'PDF vers PDF/A', description: 'Convertissez PDF en PDF/A pour l\'archivage.', icon: ICON.default, category: 'Convertir PDF', isNew: false },
    { id: 'repair-pdf', route: '/tools/repair-pdf', name: 'Réparer PDF', description: 'Réparez des PDF corrompus.', icon: ICON.repair, category: '', isNew: true },
    { id: 'page-numbers', route: '/tools/page-numbers', name: 'Numéros de page', description: 'Ajoutez des numéros de page aux PDF.', icon: ICON.pagenumbers, category: '', isNew: false },
    { id: 'scan-to-pdf', route: '/tools/scan-to-pdf', name: 'Scanner vers PDF', description: 'Scannez des documents depuis le mobile vers le navigateur.', icon: ICON.scan, category: '', isNew: false },
    { id: 'ocd-pdf', route: '/tools/ocd-pdf', name: 'OCR PDF', description: 'Rendez les PDF scannés consultables (OCR).', icon: ICON.ocd, category: '', isNew: true },
    { id: 'compare-pdf', route: '/tools/compare-pdf', name: 'Comparer PDF', description: 'Comparez des PDF côte à côte.', icon: ICON.compare, category: '', isNew: false },
    { id: 'redact-pdf', route: '/tools/redact-pdf', name: 'Rédiger PDF', description: 'Supprimez définitivement le contenu sensible.', icon: ICON.redact, category: '', isNew: false },
    { id: 'crop-pdf', route: '/tools/crop-pdf', name: 'Rogner PDF', description: 'Rognez les marges ou sélectionnez des zones à rogner.', icon: ICON.crop, category: '', isNew: true },
  ],
  en: [
    { id: 'merge', route: '/tools/merge-pdf', name: 'Merge PDF', description: 'Combine PDFs in the order you want with the easiest PDF merger available.', icon: ICON.merge, category: 'Organize PDF', isNew: false },
    { id: 'split', route: '/tools/split-pdf', name: 'Split PDF', description: 'Separate pages into standalone PDF files.', icon: ICON.split, category: 'Organize PDF', isNew: false },
    { id: 'compress', route: '/tools/compress-pdf', name: 'Compress PDF', description: 'Reduce file size while optimizing quality.', icon: ICON.compress, category: 'Optimize PDF', isNew: false },
    { id: 'pdf-to-word', route: '/tools/pdf-to-word', name: 'PDF to Word', description: 'Convert PDFs to editable DOCX files.', icon: ICON.word, category: 'Convert PDF', isNew: false },
    { id: 'pdf-to-powerpoint', route: '/tools/pdf-to-powerpoint', name: 'PDF to PowerPoint', description: 'Transform PDFs into editable PPTX slides.', icon: ICON.powerpoint, category: 'Convert PDF', isNew: false },
    { id: 'pdf-to-excel', route: '/tools/pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables from PDFs to Excel.', icon: ICON.excel, category: 'Convert PDF', isNew: false },
    { id: 'word-to-pdf', route: '/tools/word-to-pdf', name: 'Word to PDF', description: 'Convert DOC/DOCX files to PDF.', icon: ICON.genericDoc, category: 'Convert PDF', isNew: true },
    { id: 'powerpoint-to-pdf', route: '/tools/powerpoint-to-pdf', name: 'PowerPoint to PDF', description: 'Convert PPT/PPTX files to PDF.', icon: ICON.powerpoint, category: 'Convert PDF', isNew: false },
    { id: 'excel-to-pdf', route: '/tools/excel-to-pdf', name: 'Excel to PDF', description: 'Convert Excel spreadsheets to PDF.', icon: ICON.excel, category: 'Convert PDF', isNew: false },
    { id: 'edit-pdf', route: '/tools/edit-pdf', name: 'Edit PDF', description: 'Add text, images, shapes, or annotations.', icon: ICON.edit, category: 'Edit PDF', isNew: true },
    { id: 'pdf-to-jpg', route: '/tools/pdf-to-jpg', name: 'PDF to JPG', description: 'Convert pages or extract images as JPG.', icon: ICON.image, category: 'Convert PDF', isNew: false },
    { id: 'jpg-to-pdf', route: '/tools/jpg-to-pdf', name: 'JPG to PDF', description: 'Convert JPG images to PDF.', icon: ICON.image, category: 'Convert PDF', isNew: false },
    { id: 'sign-pdf', route: '/tools/sign-pdf', name: 'Sign PDF', description: 'Sign or request electronic signatures.', icon: ICON.sign, category: 'PDF Security', isNew: true },
    { id: 'watermark', route: '/tools/watermark', name: 'Watermark', description: 'Overlay an image or text on your PDF.', icon: ICON.watermark, category: 'Edit PDF', isNew: true },
    { id: 'rotate-pdf', route: '/tools/rotate-pdf', name: 'Rotate PDF', description: 'Rotate PDFs individually or in batch.', icon: ICON.rotate, category: 'Edit PDF', isNew: false },
    { id: 'html-to-pdf', route: '/tools/html-to-pdf', name: 'HTML to PDF', description: 'Convert web pages to PDF from a URL.', icon: ICON.html, category: 'Convert PDF', isNew: false },
    { id: 'unlock-pdf', route: '/tools/unlock-pdf', name: 'Unlock PDF', description: 'Remove password protection from PDFs.', icon: ICON.unlock, category: 'PDF Security', isNew: false },
    { id: 'protect-pdf', route: '/tools/protect-pdf', name: 'Protect PDF', description: 'Encrypt PDFs with a password.', icon: ICON.lock, category: 'PDF Security', isNew: true },
    { id: 'organize-pdf', route: '/tools/organize-pdf', name: 'Organize PDF', description: 'Sort or delete PDF pages.', icon: ICON.organize, category: 'Optimize PDF', isNew: false },
    { id: 'pdf-to-pdfa', route: '/tools/pdf-to-pdfa', name: 'PDF to PDF/A', description: 'Convert PDF to PDF/A for archiving.', icon: ICON.default, category: 'Convert PDF', isNew: false },
    { id: 'repair-pdf', route: '/tools/repair-pdf', name: 'Repair PDF', description: 'Repair corrupted PDFs.', icon: ICON.repair, category: '', isNew: true },
    { id: 'page-numbers', route: '/tools/page-numbers', name: 'Page Numbers', description: 'Add page numbers to PDFs.', icon: ICON.pagenumbers, category: '', isNew: false },
    { id: 'scan-to-pdf', route: '/tools/scan-to-pdf', name: 'Scan to PDF', description: 'Scan documents from mobile to browser.', icon: ICON.scan, category: '', isNew: false },
    { id: 'ocd-pdf', route: '/tools/ocd-pdf', name: 'OCR PDF', description: 'Make scanned PDFs searchable (OCR).', icon: ICON.ocd, category: '', isNew: true },
    { id: 'compare-pdf', route: '/tools/compare-pdf', name: 'Compare PDF', description: 'Compare PDFs side by side.', icon: ICON.compare, category: '', isNew: false },
    { id: 'redact-pdf', route: '/tools/redact-pdf', name: 'Redact PDF', description: 'Permanently remove sensitive content.', icon: ICON.redact, category: '', isNew: false },
    { id: 'crop-pdf', route: '/tools/crop-pdf', name: 'Crop PDF', description: 'Crop margins or select areas to crop.', icon: ICON.crop, category: '', isNew: true },
  ]
};

const sectionTitle = { fr: 'Outils PDF', en: 'PDF Tools' };

const ToolsSection = ({ language }) => {
  const [activeFilter, setActiveFilter] = useState(filters[language][0]);

  useEffect(() => {
    setActiveFilter(filters[language][0]); // Reset filter when language changes
  }, [language]);

  const filteredTools = activeFilter === filters[language][0]
    ? tools[language]
    : tools[language].filter(tool => tool.category === activeFilter);

  return (
    <section className="tools-section">
      <div className="container">
        <div className="tools-header">
          <h2 className="section-title">{sectionTitle[language]}</h2>
          <div className="tools-filters">
            {filters[language].map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
                style={{ backgroundColor: activeFilter === filter ? 'blue' : '#f0f0f0', color: activeFilter === filter ? 'white' : 'black' }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="tools-grid">
          {filteredTools.map(tool => (
            <Link to={tool.route} key={tool.id} className="tool-link" title={tool.name}>
              <div className="tool-card" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                {tool.isNew && <span className="new-badge">{language === 'fr' ? 'Nouveau !' : 'New!'}</span>}
                <div className="tool-icon">{tool.icon}</div>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-description">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;