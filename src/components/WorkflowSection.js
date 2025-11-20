import React from 'react';
import { Plus, Monitor, Smartphone, Building } from 'lucide-react';
import './WorkflowSection.css';

const labels = {
  fr: {
    title: 'Automatisez votre flux de travail PDF',
    step1: 'Téléchargez vos fichiers PDF',
    step2: 'Choisissez un outil PDF',
    step3: 'Téléchargez le résultat',
    description: 'Gagnez du temps en automatisant les tâches PDF courantes avec nos outils simples et rapides.',
  },
  en: {
    title: 'Automate your PDF workflow',
    step1: 'Upload your PDF files',
    step2: 'Choose a PDF tool',
    step3: 'Download the result',
    description: 'Save time by automating common PDF tasks with our simple and fast tools.',
  }
};

const WorkflowSection = ({ language }) => {
  return (
    <section className="workflow-section">
      <div className="container">
        <div className="workflow-header">
          <h2 className="section-title">{labels[language].title}</h2>
        </div>

        <div className="workflow-grid">
          <div className="workflow-card">
            <div className="workflow-icon">
              <Monitor size={32} />
            </div>
            <h3>Work offline with Desktop</h3>
            <p>Batch edit and manage documents locally, with no internet and no limits.</p>
          </div>

          <div className="workflow-card">
            <div className="workflow-icon">
              <Smartphone size={32} />
            </div>
            <h3>On-the-go with Mobile</h3>
            <p>Your favorite tools, right in your pocket. Keep working on your projects anytime, anywhere.</p>
          </div>

          <div className="workflow-card">
            <div className="workflow-icon">
              <Building size={32} />
            </div>
            <h3>Built for business</h3>
            <p>Automate document management, onboard teams easily, and scale with flexible plans.</p>
          </div>
        </div>

        <div className="workflow-cta wrapper">
          <button className="btn-primary-large">Create a workflow</button>
          <div className="workflow-counter">
            <span className="counter-text">Add a workflow</span>
            <span className="counter-number">1 of 6</span>
            <span className="counter-free">1 x free</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
