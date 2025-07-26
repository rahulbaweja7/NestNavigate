import React, { useState } from 'react';
import ModuleOverview from './ModuleOverview';
import LessonSelection from './LessonSelection';
import LessonContent from './LessonContent';
import LessonCompletion from './LessonCompletion';
import '../styles/LearningModule.css';

interface LearningModuleProps {
  onLessonComplete?: (lessonNumber: number) => void;
  completedLessons?: number[];
}

const LearningModule: React.FC<LearningModuleProps> = ({ 
  onLessonComplete,
  completedLessons: externalCompletedLessons = []
}) => {
  const [currentView, setCurrentView] = useState<'overview' | 'selection' | 'lesson' | 'completion'>('overview');
  const [currentLesson, setCurrentLesson] = useState(1);
  const [internalCompletedLessons, setInternalCompletedLessons] = useState<number[]>(externalCompletedLessons);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completionData, setCompletionData] = useState({
    lessonNumber: 1,
    lessonTitle: '',
    coinsEarned: 0
  });

  // Use external completed lessons if provided, otherwise use internal state
  const completedLessons = externalCompletedLessons.length > 0 ? externalCompletedLessons : internalCompletedLessons;

  const lessonTitles = [
    "What is a Home Inspection?",
    "Types of Inspections", 
    "Red Flags to Watch For"
  ];

  const handleStartModule = () => {
    setCurrentView('selection');
  };

  const handleSelectLesson = (lessonNumber: number) => {
    setCurrentLesson(lessonNumber);
    setCurrentView('lesson');
  };

  const handleLessonComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      const newCompletedLessons = [...completedLessons, currentLesson];
      
      // Update internal state
      setInternalCompletedLessons(newCompletedLessons);
      
      // Notify parent component
      if (onLessonComplete) {
        onLessonComplete(currentLesson);
      }
    }
    
    // Set completion data
    setCompletionData({
      lessonNumber: currentLesson,
      lessonTitle: lessonTitles[currentLesson - 1],
      coinsEarned: 15 // Each lesson gives 15 coins
    });
    
    setShowCompletion(true);
    setCurrentView('completion');
  };

  const handleContinueFromCompletion = () => {
    setShowCompletion(false);
    setCurrentView('selection');
  };

  const handleBackToSelectionFromCompletion = () => {
    setShowCompletion(false);
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
          <ModuleOverview 
            onStartModule={handleStartModule} 
            completedLessons={completedLessons}
          />
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
        {currentView === 'completion' && showCompletion && (
          <LessonCompletion
            lessonNumber={completionData.lessonNumber}
            lessonTitle={completionData.lessonTitle}
            coinsEarned={completionData.coinsEarned}
            onContinue={handleContinueFromCompletion}
            onBackToSelection={handleBackToSelectionFromCompletion}
          />
        )}
      </main>
    </div>
  );
};

export default LearningModule; 