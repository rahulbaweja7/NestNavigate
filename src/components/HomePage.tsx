import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/modules');
  };

  const handleStartModule = () => {
    navigate('/module');
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="home-page" role="main">
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
          
          <div className="hero-features" role="list" aria-label="Platform features">
            <div className="feature" role="listitem">
              <div className="feature-icon" aria-hidden="true">📚</div>
              <span>Interactive Learning</span>
            </div>
            <div className="feature" role="listitem">
              <div className="feature-icon" aria-hidden="true">🏆</div>
              <span>Earn Rewards</span>
            </div>
            <div className="feature" role="listitem">
              <div className="feature-icon" aria-hidden="true">🎯</div>
              <span>Expert Guidance</span>
            </div>
          </div>
          
          <button 
            className="cta-button" 
            onClick={handleStartLearning}
            aria-label="Start your learning journey and explore all modules"
          >
            Start Your Learning Journey
          </button>
        </div>
      </div>
      
      <div className="modules-preview">
        <h2 className="section-title">Available Learning Modules</h2>
        <div className="modules-grid" role="list" aria-label="Available learning modules">
          <div className="module-card featured" role="listitem">
            <div className="module-card-header">
              <h3>Understanding Home Inspections</h3>
              <div className="module-badge" aria-label="Featured module">Featured</div>
            </div>
            <p>Learn what inspectors look for and how to interpret reports</p>
            <div className="module-meta">
              <span>3 lessons</span>
              <span aria-label="50 coins reward">🪙 50 coins</span>
            </div>
            <button 
              className="module-card-btn"
              onClick={handleStartModule}
              aria-label="Start Understanding Home Inspections module - 3 lessons, 50 coins reward"
            >
              Start Module
            </button>
          </div>
          
          <div className="module-card" role="listitem">
            <div className="module-card-header">
              <h3>Mortgage Basics</h3>
              <div className="module-badge coming-soon" aria-label="Coming soon">Coming Soon</div>
            </div>
            <p>Understanding different types of mortgages and loan terms</p>
            <div className="module-meta">
              <span>4 lessons</span>
              <span aria-label="75 coins reward">🪙 75 coins</span>
            </div>
            <button 
              className="module-card-btn disabled" 
              disabled
              aria-label="Mortgage Basics module - coming soon, 4 lessons, 75 coins reward"
            >
              Coming Soon
            </button>
          </div>
          
          <div className="module-card" role="listitem">
            <div className="module-card-header">
              <h3>Home Buying Process</h3>
              <div className="module-badge coming-soon" aria-label="Coming soon">Coming Soon</div>
            </div>
            <p>Step-by-step guide through the home buying journey</p>
            <div className="module-meta">
              <span>5 lessons</span>
              <span aria-label="100 coins reward">🪙 100 coins</span>
            </div>
            <button 
              className="module-card-btn disabled" 
              disabled
              aria-label="Home Buying Process module - coming soon, 5 lessons, 100 coins reward"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 