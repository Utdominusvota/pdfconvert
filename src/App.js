import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ToolPage from './pages/ToolPage';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolsSection from './components/ToolsSection';
import WorkflowSection from './components/WorkflowSection';
import PremiumSection from './components/PremiumSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [language, setLanguage] = useState('fr'); // French default

  return (
    <div className="App">
      <Header language={language} setLanguage={setLanguage} />
      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero language={language} />
                <ToolsSection language={language} />
                <WorkflowSection language={language} />
                <PremiumSection language={language} />
              </>
            }
          />
          <Route path="/tools/:toolName" element={<ToolPage language={language} />} />
        </Routes>
      </main>
      <Footer language={language} setLanguage={setLanguage} />
    </div>
  );
}

export default App;

