import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  userCoins?: number;
}

const Navbar: React.FC<NavbarProps> = ({ userCoins = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => { navigate('/'); };
  const handleModuleClick = () => { navigate('/modules'); };
  const handleSettingsClick = () => { navigate('/settings'); };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div 
          className="navbar-brand" 
          onClick={handleLogoClick}
          onKeyDown={(e) => handleKeyDown(e, handleLogoClick)}
          tabIndex={0}
          role="button"
          aria-label="Go to home page"
        >
          <div className="brand-icon" aria-hidden="true">🏠</div>
          <div className="brand-text">
            <span className="brand-title">Nest Navigate</span>
            <span className="brand-subtitle">Learn • Navigate • Succeed</span>
          </div>
        </div>
        
        <div className="navbar-menu" role="menubar">
          <button 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
            onClick={handleLogoClick}
            role="menuitem"
            aria-current={location.pathname === '/' ? 'page' : undefined}
            aria-label="Go to home page"
          >
            Home
          </button>
          <button 
            className={`nav-link ${location.pathname === '/module' ? 'active' : ''}`} 
            onClick={handleModuleClick}
            role="menuitem"
            aria-current={location.pathname === '/module' ? 'page' : undefined}
            aria-label="Go to learning modules"
          >
            Learning Modules
          </button>
        </div>
        
        <div className="navbar-actions">
          <div 
            className="coin-counter"
            role="status"
            aria-live="polite"
            aria-label={`You have ${userCoins} coins`}
          >
            <div className="coin-icon" aria-hidden="true">🪙</div>
            <div className="coin-info">
              <span className="coin-amount">{userCoins}</span>
              <span className="coin-label">coins</span>
            </div>
          </div>
          
          <div 
            className="user-profile"
            role="button"
            tabIndex={0}
            aria-label="User profile - Rahul Baweja, Beginner level"
          >
            <div className="user-avatar" aria-hidden="true">👤</div>
            <div className="user-info">
              <span className="user-name">Rahul Baweja</span>
              <span className="user-level">Beginner</span>
            </div>
          </div>
          
          <div className="settings-button">
            <button 
              className="settings-toggle"
              onClick={handleSettingsClick}
              aria-label="Open settings"
            >
              <span aria-hidden="true">⚙️</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 