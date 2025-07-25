import React from 'react';
import '../styles/ModuleOverview.css';

interface ModuleOverviewProps {
  onStartModule: () => void;
}

const ModuleOverview: React.FC<ModuleOverviewProps> = ({ onStartModule }) => {
  return (
    <div className="module-overview">
      <div className="module-header">
        <h1 className="module-title">Understanding Home Inspections</h1>
        <div className="module-subtitle">Learn the essentials of home inspection process</div>
      </div>
      
      <div className="module-stats">
        <div className="progress-section">
          <div className="progress-label">Progress</div>
          <div className="progress-indicator">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '0%' }}></div>
            </div>
            <span className="progress-text">0/3 lessons completed</span>
          </div>
        </div>
        
        <div className="reward-section">
          <div className="reward-label">Potential Reward</div>
          <div className="coin-reward">
            <div className="coin-icon">🪙</div>
            <span className="coin-amount">50 coins</span>
          </div>
        </div>
      </div>
      
      <div className="module-description">
        <p>
          Master the fundamentals of home inspections to make informed decisions 
          when purchasing your first home. Learn what inspectors look for, 
          common issues to watch out for, and how to interpret inspection reports.
        </p>
      </div>
      
      <button className="start-module-btn" onClick={onStartModule}>
        Start Module
      </button>
    </div>
  );
};

export default ModuleOverview; 