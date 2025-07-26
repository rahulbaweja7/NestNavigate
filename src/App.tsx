import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import LearningModule from './components/LearningModule'
import { useLocalStorage } from './hooks/useLocalStorage'
import './styles/App.css'

function App() {
  const [completedLessons, setCompletedLessons] = useLocalStorage<number[]>('nestNavigate_completedLessons', []);
  const [userCoins, setUserCoins] = useLocalStorage<number>('nestNavigate_userCoins', 0);

  const handleLessonComplete = (lessonNumber: number) => {
    if (!completedLessons.includes(lessonNumber)) {
      setCompletedLessons([...completedLessons, lessonNumber]);
      // Add coins for completing a lesson
      setUserCoins(prevCoins => prevCoins + 15);
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
          <Route path="/" element={<HomePage onResetProgress={resetProgress} />} />
          <Route 
            path="/module" 
            element={
              <LearningModule 
                onLessonComplete={handleLessonComplete}
                completedLessons={completedLessons}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
