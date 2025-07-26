// Debug utilities for localStorage testing
export const debugUtils = {
  // Log all localStorage data for NestNavigate
  logAllData: () => {
    console.log('=== NestNavigate localStorage Debug ===');
    const keys = Object.keys(localStorage).filter(key => key.startsWith('nestNavigate_'));
    
    if (keys.length === 0) {
      console.log('No NestNavigate data found in localStorage');
      return;
    }
    
    keys.forEach(key => {
      try {
        const value = localStorage.getItem(key);
        console.log(`${key}:`, value ? JSON.parse(value) : null);
      } catch (error) {
        console.log(`${key}: Error parsing -`, error);
      }
    });
  },

  // Clear all NestNavigate data
  clearAllData: () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('nestNavigate_'));
    keys.forEach(key => localStorage.removeItem(key));
    console.log('Cleared all NestNavigate data from localStorage');
  },

  // Simulate completed lessons for testing
  simulateProgress: (lessonCount: number = 2) => {
    const completedLessons = Array.from({ length: lessonCount }, (_, i) => i + 1);
    const userCoins = lessonCount * 15;
    
    localStorage.setItem('nestNavigate_completedLessons', JSON.stringify(completedLessons));
    localStorage.setItem('nestNavigate_userCoins', JSON.stringify(userCoins));
    
    console.log(`Simulated progress: ${lessonCount} lessons completed, ${userCoins} coins earned`);
  },

  // Check localStorage availability
  checkStorageAvailability: () => {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      console.log('✅ localStorage is available');
      return true;
    } catch (error) {
      console.log('❌ localStorage is not available:', error);
      return false;
    }
  }
};

export default debugUtils; 