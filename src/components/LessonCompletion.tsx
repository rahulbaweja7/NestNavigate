import React, { useState, useEffect } from 'react';
import '../styles/LessonCompletion.css';

interface LessonCompletionProps {
  lessonNumber: number;
  lessonTitle: string;
  coinsEarned: number;
  onContinue: () => void;
  onBackToSelection: () => void;
}

const LessonCompletion: React.FC<LessonCompletionProps> = ({
  lessonNumber,
  lessonTitle,
  coinsEarned,
  onContinue,
  onBackToSelection
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [coinCount, setCoinCount] = useState(0);

  useEffect(() => {
    // Start the animation sequence
    setShowAnimation(true);
    
    // Show content after animation starts
    setTimeout(() => setShowContent(true), 500);
    
    // Animate coin count
    const coinInterval = setInterval(() => {
      setCoinCount(prev => {
        if (prev < coinsEarned) {
          return prev + 1;
        }
        clearInterval(coinInterval);
        return coinsEarned;
      });
    }, 50);

    return () => clearInterval(coinInterval);
  }, [coinsEarned]);

  return (
    <div className={`lesson-completion ${showAnimation ? 'show' : ''}`}>
      <div className="completion-overlay">
        <div className="completion-card">
          {/* Success Animation */}
          <div className="success-animation">
            <div className="checkmark-circle">
              <div className="checkmark">✓</div>
            </div>
            <div className="confetti-container">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className={`confetti confetti-${i % 4}`}
                  style={{
                    '--delay': `${i * 0.1}s`,
                    '--rotation': `${i * 30}deg`
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          {showContent && (
            <div className="completion-content">
              <h2 className="completion-title">Lesson Complete!</h2>
              <p className="lesson-info">
                You've successfully completed <strong>Lesson {lessonNumber}: {lessonTitle}</strong>
              </p>
              
              <div className="achievement-section">
                <div className="achievement-icon">🏆</div>
                <div className="achievement-text">
                  <span>Great job!</span>
                  <span>You're making excellent progress</span>
                </div>
              </div>

              <div className="coins-earned">
                <div className="coin-animation">
                  <div className="coin-icon">🪙</div>
                  <div className="coin-text">
                    <span className="coin-amount">+{coinCount}</span>
                    <span className="coin-label">coins earned</span>
                  </div>
                </div>
              </div>

              <div className="completion-actions">
                <button className="action-btn secondary" onClick={onBackToSelection}>
                  Back to Lessons
                </button>
                <button className="action-btn primary" onClick={onContinue}>
                  Continue Learning
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonCompletion; 