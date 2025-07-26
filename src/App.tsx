import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import ModuleSelection from './components/ModuleSelection'
import LearningModule from './components/LearningModule'
import Settings from './components/Settings'
import { useLocalStorage } from './hooks/useLocalStorage'
import './styles/App.css'

function App() {
  const [completedLessons, setCompletedLessons] = useLocalStorage<number[]>('nestNavigate_completedLessons', []);
  const [userCoins, setUserCoins] = useLocalStorage<number>('nestNavigate_userCoins', 0);

  const lessonCoins = [10, 15, 25]; // Coins earned per lesson

  const handleLessonComplete = (lessonNumber: number) => {
    if (!completedLessons.includes(lessonNumber)) {
      setCompletedLessons([...completedLessons, lessonNumber]);
      // Add lesson-specific coins
      const coinsEarned = lessonCoins[lessonNumber - 1] || 15;
      setUserCoins(prevCoins => prevCoins + coinsEarned);
    }
  };

  const resetProgress = () => {
    setCompletedLessons([]);
    setUserCoins(0);
  };

  return (
    <Router>
      <div className="app">
        <Navbar userCoins={userCoins} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/modules" 
            element={
              <ModuleSelection 
                completedLessons={completedLessons}
              />
            } 
          />
          <Route 
            path="/module" 
            element={
              <LearningModule 
                onLessonComplete={handleLessonComplete}
                completedLessons={completedLessons}
              />
            } 
          />
          <Route 
            path="/settings" 
            element={
              <Settings 
                userCoins={userCoins}
                completedLessons={completedLessons}
                onResetProgress={resetProgress}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
