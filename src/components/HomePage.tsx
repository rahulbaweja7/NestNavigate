import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/module');
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-highlight">Nest Navigate</span>
          </h1>
          <p className="hero-subtitle">
            Your comprehensive learning platform for first-time homebuyers
          </p>
          <p className="hero-description">
            Master the essentials of home buying through interactive modules, 
            earn rewards, and build confidence in your homeownership journey.
          </p>
          
          <div className="hero-features">
            <div className="feature">
              <div className="feature-icon">📚</div>
              <span>Interactive Learning</span>
            </div>
            <div className="feature">
              <div className="feature-icon">🏆</div>
              <span>Earn Rewards</span>
            </div>
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <span>Expert Guidance</span>
            </div>
          </div>
          
          <button className="cta-button" onClick={handleStartLearning}>
            Start Your Learning Journey
          </button>
        </div>
      </div>
      
      <div className="modules-preview">
        <h2 className="section-title">Available Learning Modules</h2>
        <div className="modules-grid">
          <div className="module-card featured">
            <div className="module-card-header">
              <h3>Understanding Home Inspections</h3>
              <div className="module-badge">Featured</div>
            </div>
            <p>Learn what inspectors look for and how to interpret reports</p>
            <div className="module-meta">
              <span>3 lessons</span>
              <span>🪙 50 coins</span>
            </div>
            <button 
              className="module-card-btn"
              onClick={handleStartLearning}
            >
              Start Module
            </button>
          </div>
          
          <div className="module-card">
            <div className="module-card-header">
              <h3>Mortgage Basics</h3>
              <div className="module-badge coming-soon">Coming Soon</div>
            </div>
            <p>Understanding different types of mortgages and loan terms</p>
            <div className="module-meta">
              <span>4 lessons</span>
              <span>🪙 75 coins</span>
            </div>
            <button className="module-card-btn disabled" disabled>
              Coming Soon
            </button>
          </div>
          
          <div className="module-card">
            <div className="module-card-header">
              <h3>Home Buying Process</h3>
              <div className="module-badge coming-soon">Coming Soon</div>
            </div>
            <p>Step-by-step guide through the home buying journey</p>
            <div className="module-meta">
              <span>5 lessons</span>
              <span>🪙 100 coins</span>
            </div>
            <button className="module-card-btn disabled" disabled>
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 