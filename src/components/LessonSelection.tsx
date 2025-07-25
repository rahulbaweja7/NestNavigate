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
      icon: "🔍"
    },
    {
      id: 2,
      title: "Types of Inspections",
      description: "Explore different types of inspections and when you might need specialized services.",
      duration: "6-8 minutes",
      topics: ["General Inspection", "Specialized Services", "When to Consider"],
      icon: "📋"
    },
    {
      id: 3,
      title: "Red Flags to Watch For",
      description: "Identify common warning signs and potential problems during home inspections.",
      duration: "7-9 minutes",
      topics: ["Structural Issues", "Electrical Problems", "Plumbing Concerns", "HVAC Issues"],
      icon: "⚠️"
    }
  ];

  const getProgressPercentage = () => {
    return (completedLessons.length / 3) * 100;
  };

  return (
    <div className="lesson-selection">
      <div className="selection-header">
        <h1>Understanding Home Inspections</h1>
        <p>Choose a lesson to begin your learning journey</p>
        
        <div className="overall-progress">
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

      <div className="lessons-grid">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isAvailable = lesson.id === 1 || completedLessons.includes(lesson.id - 1);
          
          return (
            <div 
              key={lesson.id} 
              className={`lesson-card ${isCompleted ? 'completed' : ''} ${!isAvailable ? 'locked' : ''}`}
              onClick={() => isAvailable && onSelectLesson(lesson.id)}
            >
              <div className="lesson-icon">{lesson.icon}</div>
              
              <div className="lesson-info">
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                
                <div className="lesson-topics">
                  <span>Topics covered:</span>
                  <div className="topic-tags">
                    {lesson.topics.map((topic, index) => (
                      <span key={index} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                </div>
                
                <div className="lesson-meta">
                  <span className="duration">⏱️ {lesson.duration}</span>
                  {isCompleted && <span className="completed-badge">✅ Completed</span>}
                  {!isAvailable && <span className="locked-badge">🔒 Locked</span>}
                </div>
              </div>
              
              <div className="lesson-status">
                {isCompleted ? (
                  <div className="status-icon completed">✓</div>
                ) : !isAvailable ? (
                  <div className="status-icon locked">🔒</div>
                ) : (
                  <div className="status-icon available">→</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="selection-actions">
        <button className="back-btn" onClick={onBackToOverview}>
          ← Back to Module Overview
        </button>
      </div>
    </div>
  );
};

export default LessonSelection; 