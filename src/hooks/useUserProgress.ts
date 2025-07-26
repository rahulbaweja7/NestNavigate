import { useState, useEffect, useCallback } from 'react';
import { localStorageUtils } from '../utils/localStorage';
import type { UserProgress } from '../utils/localStorage';

interface UseUserProgressReturn {
  completedLessons: number[];
  totalCoins: number;
  lastActivity: string;
  modulesCompleted: number;
  totalLessons: number;
  addCompletedLesson: (lessonNumber: number) => void;
  addCoins: (coins: number) => void;
  resetProgress: () => void;
  isStorageAvailable: boolean;
}

export const useUserProgress = (): UseUserProgressReturn => {
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    totalCoins: 0,
    lastActivity: new Date().toISOString(),
    modulesCompleted: 0,
    totalLessons: 3
  });
  
  const [isStorageAvailable, setIsStorageAvailable] = useState(true);

  // Load progress from localStorage on component mount
  useEffect(() => {
    const checkStorage = localStorageUtils.isAvailable();
    setIsStorageAvailable(checkStorage);
    
    if (checkStorage) {
      const savedProgress = localStorageUtils.loadUserProgress();
      setProgress(savedProgress);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (isStorageAvailable) {
      localStorageUtils.saveUserProgress(progress);
      localStorageUtils.updateLastActivity();
    }
  }, [progress, isStorageAvailable]);

  // Add a completed lesson
  const addCompletedLesson = useCallback((lessonNumber: number) => {
    setProgress(prevProgress => {
      // Don't add if already completed
      if (prevProgress.completedLessons.includes(lessonNumber)) {
        return prevProgress;
      }

      const newCompletedLessons = [...prevProgress.completedLessons, lessonNumber];
      const newTotalCoins = prevProgress.totalCoins + 15; // Each lesson gives 15 coins
      
      // Calculate modules completed (assuming 3 lessons per module)
      const newModulesCompleted = Math.floor(newCompletedLessons.length / 3);

      return {
        ...prevProgress,
        completedLessons: newCompletedLessons,
        totalCoins: newTotalCoins,
        modulesCompleted: newModulesCompleted,
        lastActivity: new Date().toISOString()
      };
    });
  }, []);

  // Add coins (for future features like achievements, streaks, etc.)
  const addCoins = useCallback((coins: number) => {
    setProgress(prevProgress => ({
      ...prevProgress,
      totalCoins: prevProgress.totalCoins + coins,
      lastActivity: new Date().toISOString()
    }));
  }, []);

  // Reset all progress
  const resetProgress = useCallback(() => {
    const resetProgress: UserProgress = {
      completedLessons: [],
      totalCoins: 0,
      lastActivity: new Date().toISOString(),
      modulesCompleted: 0,
      totalLessons: 3
    };
    
    setProgress(resetProgress);
    
    if (isStorageAvailable) {
      localStorageUtils.clearAllData();
    }
  }, [isStorageAvailable]);

  return {
    completedLessons: progress.completedLessons,
    totalCoins: progress.totalCoins,
    lastActivity: progress.lastActivity,
    modulesCompleted: progress.modulesCompleted,
    totalLessons: progress.totalLessons,
    addCompletedLesson,
    addCoins,
    resetProgress,
    isStorageAvailable
  };
};

export default useUserProgress; 