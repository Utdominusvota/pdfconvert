import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import './ToolLayout.css';

const ToolLayout = ({ 
  title, 
  description, 
  children, 
  showBackButton = true,
  showHomeButton = true 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="tool-layout">
      <div className="tool-header">
        <div className="tool-header-content">
          <div className="tool-header-actions">
            {showBackButton && (
              <button 
                className="tool-header-btn back-btn"
                onClick={handleBack}
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
                Back
              </button>
            )}
            {showHomeButton && (
              <button 
                className="tool-header-btn home-btn"
                onClick={handleHome}
                aria-label="Go to home"
              >
                <Home size={20} />
                Home
              </button>
            )}
          </div>
          <div className="tool-title-section">
            <h1 className="tool-title">{title}</h1>
            {description && (
              <p className="tool-description">{description}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="tool-content">
        <div className="tool-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ToolLayout;
