import React from 'react';
import '../styles/LessonSelection.css';

interface LessonSelectionProps {
  onSelectLesson: (lessonNumber: number) => void;
  onBackToOverview: () => void;
  completedLessons: number[];
}

const LessonSelection: React.FC<LessonSelectionProps> = ({
  onSelectLesson,
  onBackToOverview,
  completedLessons
}) => {
  const lessons = [
    {
      id: 1,
      title: "What is a Home Inspection?",
      description: "Learn the basics of home inspections, what inspectors do, and why they're important.",
      duration: "5-7 minutes",
      topics: ["Definition", "Inspector's Role", "Key Areas Covered"],
      icon: "🔍",
      coins: 10
    },
    {
      id: 2,
      title: "Types of Inspections",
      description: "Explore different types of inspections and when you might need specialized services.",
      duration: "6-8 minutes",
      topics: ["General Inspection", "Specialized Services", "When to Consider"],
      icon: "📋",
      coins: 15
    },
    {
      id: 3,
      title: "Red Flags to Watch For",
      description: "Identify common warning signs and potential problems during home inspections.",
      duration: "7-9 minutes",
      topics: ["Structural Issues", "Electrical Problems", "Plumbing Concerns", "HVAC Issues"],
      icon: "⚠️",
      coins: 25
    }
  ];

  const getProgressPercentage = () => {
    return (completedLessons.length / 3) * 100;
  };

  return (
    <div className="lesson-selection" role="main">
      <div className="selection-header">
        <h1>Understanding Home Inspections</h1>
        <p>Choose a lesson to begin your learning journey</p>
        
        <div className="overall-progress" role="progressbar" aria-valuenow={completedLessons.length} aria-valuemin={0} aria-valuemax={3} aria-label="Overall progress">
          <div className="progress-info">
            <span>Overall Progress</span>
            <span>{completedLessons.length} of 3 lessons completed</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="lessons-grid" role="list" aria-label="Available lessons">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isAvailable = lesson.id === 1 || completedLessons.includes(lesson.id - 1);
          
          return (
            <div 
              key={lesson.id} 
              className={`lesson-card ${isCompleted ? 'completed' : ''} ${!isAvailable ? 'locked' : ''}`}
              onClick={() => isAvailable && onSelectLesson(lesson.id)}
              onKeyDown={(e) => {
                if (isAvailable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onSelectLesson(lesson.id);
                }
              }}
              tabIndex={isAvailable ? 0 : -1}
              role="listitem"
              aria-label={`${lesson.title} - ${isCompleted ? 'Completed' : isAvailable ? 'Available' : 'Locked'}`}
            >
              <div className="lesson-icon" aria-hidden="true">{lesson.icon}</div>
              
              <div className="lesson-info">
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                
                <div className="lesson-topics">
                  <span>Topics covered:</span>
                  <div className="topic-tags" role="list" aria-label="Topics covered in this lesson">
                    {lesson.topics.map((topic, index) => (
                      <span key={index} className="topic-tag" role="listitem">{topic}</span>
                    ))}
                  </div>
                </div>
                
                <div className="lesson-meta">
                  <span className="duration" aria-label={`Duration: ${lesson.duration}`}>⏱️ {lesson.duration}</span>
                  <span className="coins-reward" aria-label={`Reward: ${lesson.coins} coins`}>🪙 {lesson.coins} coins</span>
                  {isCompleted && <span className="completed-badge" aria-label="Lesson completed">✅ Completed</span>}
                  {!isAvailable && <span className="locked-badge" aria-label="Lesson locked">🔒 Locked</span>}
                </div>
              </div>
              
              <div className="lesson-status">
                {isCompleted ? (
                  <div className="status-icon completed" aria-label="Lesson completed">✓</div>
                ) : !isAvailable ? (
                  <div className="status-icon locked" aria-label="Lesson locked">🔒</div>
                ) : (
                  <div className="status-icon available" aria-label="Lesson available">→</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="selection-actions">
        <button 
          className="back-btn" 
          onClick={onBackToOverview}
          aria-label="Go back to module overview"
        >
          ← Back to Module Overview
        </button>
      </div>
    </div>
  );
};

export default LessonSelection; 