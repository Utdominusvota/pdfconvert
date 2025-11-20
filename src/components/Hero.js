import React from 'react';
import './Hero.css';

const labels = {
  fr: {
    title: 'Éditeur PDF en ligne gratuit',
    subtitle: 'Modifiez, convertissez et gérez vos fichiers PDF facilement.',
    cta: 'Commencer',
  },
  en: {
    title: 'Free Online PDF Editor',
    subtitle: 'Edit, convert, and manage your PDF files easily.',
    cta: 'Get Started',
  }
};

const Hero = ({ language }) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            {labels[language].title}
          </h1>
          <p className="hero-subtitle">
            {labels[language].subtitle}
          </p>
          <div className="hero-actions">
            <button className="btn-primary-large">{labels[language].cta}</button>
            <button className="btn-secondary-large">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          {/* <div className="hero-graphic"> */}
            {/* Hero content removed as requested */}
          {/*</div>*/}
        </div>
      </div>
    </section>
  );
};

export default Hero;
