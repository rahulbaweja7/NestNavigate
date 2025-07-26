import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import LearningModule from './components/LearningModule'
import './styles/App.css'

function App() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const handleLessonComplete = (lessonNumber: number) => {
    if (!completedLessons.includes(lessonNumber)) {
      setCompletedLessons([...completedLessons, lessonNumber]);
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar completedLessons={completedLessons} />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
