import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleModuleClick = () => {
    navigate('/module');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={handleLogoClick}>
          <div className="brand-logo">🏠</div>
          <div className="brand-text">
            <h1>Nest Navigate</h1>
            <span>Learning Platform</span>
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
          <div className="user-profile">
            <div className="avatar">👤</div>
            <div className="user-info">
              <span className="username">Welcome!</span>
              <span className="user-level">Beginner</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 