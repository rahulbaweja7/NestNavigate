import React from 'react';
import '../styles/ModuleOverview.css';

interface ModuleOverviewProps {
  onStartModule: () => void;
  completedLessons?: number[];
}

const ModuleOverview: React.FC<ModuleOverviewProps> = ({ 
  onStartModule, 
  completedLessons = [] 
}) => {
  const totalLessons = 3;
  const completedCount = completedLessons.length;
  const progressPercentage = (completedCount / totalLessons) * 100;

  const getProgressStatus = () => {
    if (completedCount === 0) return 'Not Started';
    if (completedCount === totalLessons) return 'Completed';
    return 'In Progress';
  };

  const getProgressColor = () => {
    if (completedCount === 0) return '#e5e7eb';
    if (completedCount === totalLessons) return '#10b981';
    return '#f59e0b';
  };

  return (
    <div className="module-overview">
      <div className="module-header">
        <h1 className="module-title">Understanding Home Inspections</h1>
        <p className="module-description">
          Learn the fundamentals of home inspections, different types of inspections, 
          and how to identify potential red flags when buying a home.
        </p>
      </div>

      <div className="module-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <span className="stat-number">{totalLessons}</span>
            <span className="stat-label">Lessons</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <span className="stat-number">15-20</span>
            <span className="stat-label">Minutes</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🪙</div>
          <div className="stat-content">
            <span className="stat-number">50</span>
            <span className="stat-label">Coins</span>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <h3>Module Progress</h3>
          <span className={`progress-status ${getProgressStatus().toLowerCase().replace(' ', '-')}`}>
            {getProgressStatus()}
          </span>
        </div>
        
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${progressPercentage}%`,
                backgroundColor: getProgressColor()
              }}
            ></div>
          </div>
          <div className="progress-text">
            <span className="progress-count">
              {completedCount} of {totalLessons} lessons completed
            </span>
            <span className="progress-percentage">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>

        {completedCount > 0 && (
          <div className="completed-lessons">
            <h4>Completed Lessons:</h4>
            <div className="lesson-tags">
              {completedLessons.map((lessonNumber) => {
                const lessonTitles = [
                  "What is a Home Inspection?",
                  "Types of Inspections",
                  "Red Flags to Watch For"
                ];
                return (
                  <span key={lessonNumber} className="lesson-tag">
                    ✓ {lessonTitles[lessonNumber - 1]}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="module-actions">
        <button 
          className={`start-module-btn ${completedCount > 0 ? 'resume' : ''}`}
          onClick={onStartModule}
        >
          {completedCount === 0 ? 'Start Module' : 
           completedCount === totalLessons ? 'Review Module' : 'Continue Module'}
        </button>
        
        {completedCount > 0 && (
          <div className="module-tip">
            <span className="tip-icon">💡</span>
            <span className="tip-text">
              {completedCount === totalLessons 
                ? "Great job! You can review any lesson to refresh your knowledge."
                : "You're making great progress! Keep going to earn more coins."
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleOverview; 