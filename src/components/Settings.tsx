import React from 'react';
import '../styles/Settings.css';

interface SettingsProps {
  userCoins: number;
  completedLessons: number[];
  onResetProgress: () => void;
}

const Settings: React.FC<SettingsProps> = ({ userCoins, completedLessons, onResetProgress }) => {
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
      onResetProgress();
    }
  };

  const totalLessons = 12; // Assuming there are 12 total lessons
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>⚙️ Settings</h1>
          <p>Track your progress and manage your account</p>
        </div>

        <div className="settings-sections">
          {/* Progress Section */}
          <div className="settings-section">
            <h2>📊 Progress & Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🪙</div>
                <div className="stat-info">
                  <span className="stat-value">{userCoins}</span>
                  <span className="stat-label">Total Coins Earned</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <span className="stat-value">{completedLessons.length}</span>
                  <span className="stat-label">Lessons Completed</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-info">
                  <span className="stat-value">{progressPercentage}%</span>
                  <span className="stat-label">Course Progress</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <span className="stat-value">{totalLessons - completedLessons.length}</span>
                  <span className="stat-label">Lessons Remaining</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions Section */}
          <div className="settings-section">
            <h2>🔧 Account Actions</h2>
            <div className="action-buttons">
              <button 
                className="action-button danger"
                onClick={handleResetProgress}
              >
                <span className="action-icon">🔄</span>
                <div className="action-content">
                  <span className="action-title">Reset All Progress</span>
                  <span className="action-description">Clear all completed lessons, coins, and start fresh</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 