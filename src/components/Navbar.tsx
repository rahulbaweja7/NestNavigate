import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  completedLessons?: number[];
}

const Navbar: React.FC<NavbarProps> = ({ completedLessons = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userCoins = 0; // Mock coin data

  const handleLogoClick = () => { navigate('/'); };
  const handleModuleClick = () => { navigate('/module'); };

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
              <span className="user-name">John Doe</span>
              <span className="user-level">Beginner</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 