import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Every tool you need to work with PDFs in one place
          </h1>
          <p className="hero-subtitle">
            Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! 
            Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          </p>
          <div className="hero-actions">
            <button className="btn-primary-large">Get Started</button>
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
