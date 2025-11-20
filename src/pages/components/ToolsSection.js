import React, { useState } from 'react';
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
  default: <span style={{ fontSize: 40 }}>📁</span>,
};

const ToolsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Workflows', 'Organize PDF', 'Optimize PDF', 'Convert PDF', 'Edit PDF', 'PDF Security'];

  const tools = [
    { id: 'merge', route: '/merge-pdf', name: 'Merge PDF', description: 'Combine PDFs in the order you want with the easiest PDF merger available.', icon: ICON.merge, category: 'Organize PDF', isNew: false },
    { id: 'split', route: '/split-pdf', name: 'Split PDF', description: 'Separate pages into independent PDF files.', icon: ICON.split, category: 'Organize PDF', isNew: false },
    { id: 'compress', route: '/compress-pdf', name: 'Compress PDF', description: 'Reduce file size while optimizing quality.', icon: ICON.compress, category: 'Optimize PDF', isNew: false },
    { id: 'pdf-to-word', route: '/pdf-to-word', name: 'PDF to Word', description: 'Convert PDFs to editable DOCX.', icon: ICON.word, category: 'Convert PDF', isNew: false },
    { id: 'pdf-to-powerpoint', route: '/pdf-to-powerpoint', name: 'PDF to PowerPoint', description: 'Turn PDFs into editable PPTX slides.', icon: ICON.powerpoint, category: 'Convert PDF', isNew: false },
    { id: 'pdf-to-excel', route: '/pdf-to-excel', name: 'PDF to Excel', description: 'Extract tables from PDF to Excel.', icon: ICON.excel, category: 'Convert PDF', isNew: false },
    { id: 'word-to-pdf', route: '/word-to-pdf', name: 'Word to PDF', description: 'Convert DOC/DOCX to PDF.', icon: ICON.genericDoc, category: 'Convert PDF', isNew: true },
    { id: 'powerpoint-to-pdf', route: '/powerpoint-to-pdf', name: 'PowerPoint to PDF', description: 'Convert PPT/PPTX to PDF.', icon: ICON.powerpoint, category: 'Convert PDF', isNew: false },
    { id: 'excel-to-pdf', route: '/excel-to-pdf', name: 'Excel to PDF', description: 'Convert Excel spreadsheets to PDF.', icon: ICON.excel, category: 'Convert PDF', isNew: false },
    { id: 'edit-pdf', route: '/edit-pdf', name: 'Edit PDF', description: 'Add text, images, shapes or annotations.', icon: ICON.edit, category: 'Edit PDF', isNew: true },
    { id: 'pdf-to-jpg', route: '/pdf-to-jpg', name: 'PDF to JPG', description: 'Convert pages or extract images to JPG.', icon: ICON.image, category: 'Convert PDF', isNew: false },
    { id: 'jpg-to-pdf', route: '/jpg-to-pdf', name: 'JPG to PDF', description: 'Convert JPG images to PDF', icon: ICON.image, category: 'Convert PDF', isNew: false },
    { id: 'sign-pdf', route: '/sign-pdf', name: 'Sign PDF', description: 'Sign or request electronic signatures.', icon: ICON.sign, category: 'PDF Security', isNew: true },
    { id: 'watermark', route: '/add-watermark', name: 'Watermark', description: 'Stamp an image or text over your PDF.', icon: ICON.watermark, category: 'Edit PDF', isNew: true },
    { id: 'rotate-pdf', route: '/rotate-pdf', name: 'Rotate PDF', description: 'Rotate PDFs individually or in batch.', icon: ICON.rotate, category: 'Edit PDF', isNew: false },
    { id: 'html-to-pdf', route: '/html-to-pdf', name: 'HTML to PDF', description: 'Convert webpages to PDF using URL.', icon: ICON.html, category: 'Convert PDF', isNew: false },
    { id: 'unlock-pdf', route: '/unlock-pdf', name: 'Unlock PDF', description: 'Remove password protection from PDFs.', icon: ICON.unlock, category: 'PDF Security', isNew: false },
    { id: 'protect-pdf', route: '/protect-pdf', name: 'Protect PDF', description: 'Encrypt PDFs with a password.', icon: ICON.lock, category: 'PDF Security', isNew: true },
    { id: 'organize-pdf', route: '/organize-pdf', name: 'Organize PDF', description: 'Sort or remove PDF pages.', icon: ICON.default, category: 'Optimize PDF', isNew: false },
    { id: 'pdf-to-pdfa', route: '/pdf-to-pdfa', name: 'PDF to PDF/A', description: 'Convert PDF to PDF/A for archiving.', icon: ICON.default, category: 'Convert PDF', isNew: false },
    { id: 'repair-pdf', route: '/repair-pdf', name: 'Repair PDF', description: 'Repair corrupted PDFs.', icon: ICON.repair, category: '', isNew: true },
    { id: 'page-numbers', route: '/page-numbers', name: 'Page numbers', description: 'Add page numbers to PDFs.', icon: ICON.default, category: '', isNew: false },
    { id: 'scan-to-pdf', route: '/scan-to-pdf', name: 'Scan to PDF', description: 'Scan documents from mobile to the browser.', icon: ICON.default, category: '', isNew: false },
    { id: 'ocd-pdf', route: '/ocd-pdf', name: 'OCD PDF', description: 'Make scanned PDFs searchable (OCR).', icon: ICON.default, category: '', isNew: true },
    { id: 'compare-pdf', route: '/compare-pdf', name: 'Compare PDF', description: 'Compare PDFs side-by-side.', icon: ICON.default, category: '', isNew: false },
    { id: 'redact-pdf', route: '/redact-pdf', name: 'Redact PDF', description: 'Permanently remove sensitive content.', icon: ICON.default, category: '', isNew: false },
    { id: 'crop-pdf', route: '/crop-pdf', name: 'Crop PDF', description: 'Crop margins or select areas to crop.', icon: ICON.default, category: '', isNew: true },
  ];

  const filteredTools = activeFilter === 'All' ? tools : tools.filter(tool => tool.category === activeFilter);

  return (
    <section className="tools-section">
      <div className="container">
        <div className="tools-header">
          <h2 className="section-title">PDF Tools</h2>
          <div className="tools-filters">
            {filters.map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="tools-grid">
          {filteredTools.map(tool => (
            <Link to={tool.route} key={tool.id} className="tool-link" title={tool.name}>
              <div className="tool-card">
                {tool.isNew && <span className="new-badge">New!</span>}
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