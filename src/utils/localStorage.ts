// Local storage keys
const STORAGE_KEYS = {
  COMPLETED_LESSONS: 'nestNavigate_completedLessons',
  USER_COINS: 'nestNavigate_userCoins',
  USER_PROGRESS: 'nestNavigate_userProgress',
  LAST_ACTIVITY: 'nestNavigate_lastActivity'
} as const;

// User progress interface
export interface UserProgress {
  completedLessons: number[];
  totalCoins: number;
  lastActivity: string;
  modulesCompleted: number;
  totalLessons: number;
}

// Local storage utility functions
export const localStorageUtils = {
  // Save completed lessons
  saveCompletedLessons: (completedLessons: number[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completedLessons));
    } catch (error) {
      console.error('Failed to save completed lessons:', error);
    }
  },

  // Load completed lessons
  loadCompletedLessons: (): number[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load completed lessons:', error);
      return [];
    }
  },

  // Save user coins
  saveUserCoins: (coins: number): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_COINS, JSON.stringify(coins));
    } catch (error) {
      console.error('Failed to save user coins:', error);
    }
  },

  // Load user coins
  loadUserCoins: (): number => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_COINS);
      return saved ? JSON.parse(saved) : 0;
    } catch (error) {
      console.error('Failed to load user coins:', error);
      return 0;
    }
  },

  // Save complete user progress
  saveUserProgress: (progress: UserProgress): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save user progress:', error);
    }
  },

  // Load complete user progress
  loadUserProgress: (): UserProgress => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load user progress:', error);
    }
    
    // Return default progress if nothing is saved
    return {
      completedLessons: [],
      totalCoins: 0,
      lastActivity: new Date().toISOString(),
      modulesCompleted: 0,
      totalLessons: 3
    };
  },

  // Update last activity timestamp
  updateLastActivity: (): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, new Date().toISOString());
    } catch (error) {
      console.error('Failed to update last activity:', error);
    }
  },

  // Get last activity
  getLastActivity: (): string => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
      return saved || new Date().toISOString();
    } catch (error) {
      console.error('Failed to get last activity:', error);
      return new Date().toISOString();
    }
  },

  // Clear all stored data (for testing or reset functionality)
  clearAllData: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  },

  // Check if local storage is available
  isAvailable: (): boolean => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
};

export default localStorageUtils; 