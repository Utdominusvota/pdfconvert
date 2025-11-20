import React from 'react';
import { Crown, Check, ArrowRight } from 'lucide-react';
import './PremiumSection.css';

const labels = {
  fr: {
    title: 'Passez à Premium',
    subtitle: 'Profitez de fonctionnalités avancées et d\'une expérience sans publicité.',
    cta: 'En savoir plus',
  },
  en: {
    title: 'Upgrade to Premium',
    subtitle: 'Enjoy advanced features and an ad-free experience.',
    cta: 'Learn More',
  }
};

const PremiumSection = ({ language }) => {
  const features = [
    'Get full access to iLovePDF and work offline with Desktop',
    'Edit PDFs, get advanced OCR for scanned documents and request secure e-Signatures',
    'Connect tools and create custom workflows'
  ];

  return (
    <section className="premium-section">
      <div className="container">
        <div className="premium-content">
          <div className="premium-header">
            <Crown size={48} className="crown-icon" />
            <h2 className="section-title">{labels[language].title}</h2>
          </div>

          <div className="premium-features">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <Check size={20} className="check-icon" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <button className="btn-premium">
            {labels[language].cta}
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="iloveimg-section">
          <h2 className="section-title">Image editing made simple with iLoveIMG</h2>
          <p className="section-subtitle">
            Experience the speed, simplicity, and security you expect from iLovePDF tailored for image editing. 
            Compress, resize, and enhance your images with AI.
          </p>
          <button className="btn-secondary-large">Go to iLoveIMG</button>
        </div>

        <div className="trust-section">
          <h3>The PDF software trusted by millions of users</h3>
          <p>
            iLovePDF is your number one web app for editing PDF with ease. Enjoy all the tools you need to work 
            efficiently with your digital documents while keeping your data safe and secure.
          </p>
          <div className="trust-badges">
            <div className="badge">ISO27001 certified</div>
            <div className="badge">Secure connection</div>
            <div className="badge">HTTPS</div>
            <div className="badge">PDF Association</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
