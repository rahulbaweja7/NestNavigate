import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModuleOverview from './ModuleOverview';
import LessonSelection from './LessonSelection';
import LessonContent from './LessonContent';
import '../styles/LearningModule.css';

const LearningModule: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'overview' | 'selection' | 'lesson'>('overview');
  const [currentLesson, setCurrentLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const handleStartModule = () => {
    setCurrentView('selection');
  };

  const handleSelectLesson = (lessonNumber: number) => {
    setCurrentLesson(lessonNumber);
    setCurrentView('lesson');
  };

  const handleLessonComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
    setCurrentView('selection');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
  };

  const handleBackToSelection = () => {
    setCurrentView('selection');
  };

  return (
    <div className="learning-module-page">
      <main className="module-main">
        {currentView === 'overview' && (
          <ModuleOverview onStartModule={handleStartModule} />
        )}
        {currentView === 'selection' && (
          <LessonSelection
            onSelectLesson={handleSelectLesson}
            onBackToOverview={handleBackToOverview}
            completedLessons={completedLessons}
          />
        )}
        {currentView === 'lesson' && (
          <LessonContent
            currentLesson={currentLesson}
            onNextLesson={handleLessonComplete}
            onPreviousLesson={() => setCurrentView('selection')}
            onBackToOverview={handleBackToSelection}
          />
        )}
      </main>
    </div>
  );
};

export default LearningModule; 