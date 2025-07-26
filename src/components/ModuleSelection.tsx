import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ModuleSelection.css';

interface Module {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  coins: number;
  status: 'available' | 'coming-soon';
  featured?: boolean;
}

interface ModuleSelectionProps {
  completedLessons: number[];
}

const ModuleSelection: React.FC<ModuleSelectionProps> = ({ completedLessons }) => {
  const navigate = useNavigate();

  const modules: Module[] = [
    {
      id: 'home-inspections',
      title: 'Understanding Home Inspections',
      description: 'Learn what inspectors look for and how to interpret reports. Master the fundamentals of home inspections to make informed decisions.',
      lessonCount: 3,
      coins: 50,
      status: 'available',
      featured: true
    },
    {
      id: 'mortgage-basics',
      title: 'Mortgage Basics',
      description: 'Understanding different types of mortgages, loan terms, and financing options. Navigate the complex world of home financing.',
      lessonCount: 4,
      coins: 75,
      status: 'coming-soon'
    },
    {
      id: 'home-buying-process',
      title: 'Home Buying Process',
      description: 'Step-by-step guide through the home buying journey. From pre-approval to closing, understand every stage of the process.',
      lessonCount: 5,
      coins: 100,
      status: 'coming-soon'
    }
  ];

  const handleModuleSelect = (moduleId: string) => {
    if (moduleId === 'home-inspections') {
      navigate('/module');
    } else {
      alert('This module is coming soon!');
    }
  };

  const getProgressForModule = (moduleId: string) => {
    if (moduleId === 'home-inspections') {
      return completedLessons.length;
    }
    return 0;
  };

  const getProgressPercentage = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const completed = getProgressForModule(moduleId);
    return (completed / module.lessonCount) * 100;
  };

  return (
    <div className="module-selection-page">
      <div className="selection-header">
        <h1>Learning Modules</h1>
        <p>Choose a module to begin your home buying education journey</p>
        
        <div className="overall-progress">
          <div className="progress-info">
            <span>Overall Progress</span>
            <span>{completedLessons.length} lessons completed</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(completedLessons.length / 12) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="modules-grid">
        {modules.map((module) => {
          const progress = getProgressForModule(module.id);
          const progressPercentage = getProgressPercentage(module.id);
          const isCompleted = progress === module.lessonCount;
          
          return (
            <div 
              key={module.id} 
              className={`module-card ${module.featured ? 'featured' : ''} ${module.status === 'coming-soon' ? 'disabled' : ''}`}
            >
              <div className="module-card-header">
                <h3>{module.title}</h3>
                <div className={`module-badge ${module.status === 'coming-soon' ? 'coming-soon' : module.featured ? 'featured' : 'available'}`}>
                  {module.status === 'coming-soon' ? 'Coming Soon' : module.featured ? 'Featured' : 'Available'}
                </div>
              </div>
              
              <p className="module-description">{module.description}</p>
              
              <div className="module-meta">
                <span>{module.lessonCount} lessons</span>
                <span>🪙 {module.coins} coins</span>
              </div>

              {module.status === 'available' && (
                <div className="module-progress">
                  <div className="progress-info">
                    <span>Progress: {progress}/{module.lessonCount} lessons</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <button 
                className={`module-card-btn ${module.status === 'coming-soon' ? 'disabled' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => handleModuleSelect(module.id)}
                disabled={module.status === 'coming-soon'}
              >
                {module.status === 'coming-soon' 
                  ? 'Coming Soon' 
                  : isCompleted 
                    ? 'Review Module' 
                    : progress > 0 
                      ? 'Continue Module' 
                      : 'Start Module'
                }
              </button>
            </div>
          );
        })}
      </div>

      <div className="selection-footer">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default ModuleSelection; 