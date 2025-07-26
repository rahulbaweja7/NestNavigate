import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  userCoins?: number;
  onResetProgress?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userCoins = 0, onResetProgress }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogoClick = () => { navigate('/'); };
  const handleModuleClick = () => { navigate('/modules'); };
  
  const handleResetProgress = () => {
    if (onResetProgress && window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
      onResetProgress();
      setShowSettings(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={handleLogoClick}>
          <div className="brand-icon">🏠</div>
          <div className="brand-text">
            <span className="brand-title">Nest Navigate</span>
            <span className="brand-subtitle">Learn • Navigate • Succeed</span>
          </div>
        </div>
        
        <div className="navbar-menu">
          <button 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
            onClick={handleLogoClick}
          >
            Home
          </button>
          <button 
            className={`nav-link ${location.pathname === '/module' ? 'active' : ''}`} 
            onClick={handleModuleClick}
          >
            Learning Modules
          </button>
        </div>
        
        <div className="navbar-actions">
          <div className="coin-counter">
            <div className="coin-icon">🪙</div>
            <div className="coin-info">
              <span className="coin-amount">{userCoins}</span>
              <span className="coin-label">coins</span>
            </div>
          </div>
          
          <div className="user-profile">
            <div className="user-avatar">👤</div>
            <div className="user-info">
              <span className="user-name">Rahul Baweja</span>
              <span className="user-level">Beginner</span>
            </div>
          </div>
          
          <div className="settings-dropdown">
            <button 
              className="settings-toggle"
              onClick={() => setShowSettings(!showSettings)}
            >
              ⚙️
            </button>
            {showSettings && (
              <div className="settings-menu">
                <button 
                  className="settings-item"
                  onClick={handleResetProgress}
                >
                  🔄 Reset Progress
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 