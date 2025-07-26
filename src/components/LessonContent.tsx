import React, { useState, useEffect } from 'react';
import '../styles/LessonContent.css';

interface LessonContentProps {
  currentLesson: number;
  onNextLesson: () => void;
  onPreviousLesson: () => void;
  onBackToOverview: () => void;
}

interface IconItem {
  icon: string;
  text: string;
}

interface InteractiveItem {
  id: number;
  label: string;
  correct: boolean;
}

interface InteractivePair {
  left: string;
  right: string;
}

interface InteractiveData {
  items?: InteractiveItem[];
  pairs?: InteractivePair[];
}

interface ContentSection {
  title: string;
  content: string | string[] | IconItem[];
  type: 'text' | 'list' | 'icons' | 'interactive';
  interactiveElement?: {
    type: 'clickable' | 'drag' | 'highlight';
    data: InteractiveData;
  };
}

interface Lesson {
  title: string;
  content: {
    sections: ContentSection[];
  };
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
}

const LessonContent: React.FC<LessonContentProps> = ({
  currentLesson,
  onNextLesson,
  onBackToOverview
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [clickedItems, setClickedItems] = useState<Set<number>>(new Set());
  const [showInteractiveFeedback, setShowInteractiveFeedback] = useState(false);
  
  // Matching state
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [wrongSelection, setWrongSelection] = useState<boolean>(false);
  const [shuffledRightOrder, setShuffledRightOrder] = useState<number[]>([]);

  // Initialize shuffled order when component mounts or section changes
  useEffect(() => {
    const currentSectionData = lessons[currentLesson - 1]?.content.sections[currentSection];
    if (currentSectionData?.type === 'interactive' && 
        currentSectionData.interactiveElement?.type === 'drag' && 
        currentSectionData.interactiveElement.data.pairs) {
      const pairs = currentSectionData.interactiveElement.data.pairs;
      
      // Create a more randomized shuffle
      const indices = Array.from({ length: pairs.length }, (_, i) => i);
      const shuffled = [];
      
      while (indices.length > 0) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        shuffled.push(indices.splice(randomIndex, 1)[0]);
      }
      
      // Ensure it's not in the same order as original
      const isSameOrder = shuffled.every((val, index) => val === index);
      if (isSameOrder && shuffled.length > 1) {
        // If it's the same order, swap the first two elements
        [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
      }
      
      setShuffledRightOrder(shuffled);
    }
  }, [currentLesson, currentSection]);

  // Check for matches
  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      // Get the original index from the shuffled order for the right selection
      const originalRightIndex = shuffledRightOrder[selectedRight];
      
      if (selectedLeft === originalRightIndex) {
        setMatchedPairs(prev => new Set([...prev, selectedLeft]));
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongSelection(false);
      } else {
        // Wrong match, show feedback and reset after a delay
        setWrongSelection(true);
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setWrongSelection(false);
        }, 1500);
      }
    }
  }, [selectedLeft, selectedRight, shuffledRightOrder]);

  const lessons: Lesson[] = [
    {
      title: "What is a Home Inspection?",
      content: {
        sections: [
          {
            title: "Definition",
            content: "A home inspection is a thorough, visual examination of a property's condition, typically performed by a qualified inspector before a home purchase. It's designed to identify potential problems and safety issues.",
            type: "text"
          },
          {
            title: "What Inspectors Do",
            content: [
              "Examine the home's major systems and components",
              "Look for safety hazards and code violations",
              "Identify maintenance issues and potential problems",
              "Provide a detailed written report with findings"
            ],
            type: "list"
          },
          {
            title: "Key Areas Covered",
            content: [
              { icon: "🏠", text: "Foundation and structural integrity" },
              { icon: "⚡", text: "Electrical systems and wiring" },
              { icon: "🚰", text: "Plumbing systems and fixtures" },
              { icon: "🌡️", text: "HVAC (heating, ventilation, air conditioning)" },
              { icon: "🏠", text: "Roof condition and drainage" },
              { icon: "🪟", text: "Windows, doors, and insulation" }
            ],
            type: "icons"
          },
          {
            title: "Interactive Knowledge Check",
            content: "Click on the areas of a home that are typically inspected:",
            type: "interactive",
            interactiveElement: {
              type: "clickable",
              data: {
                items: [
                  { id: 1, label: "Foundation", correct: true },
                  { id: 2, label: "Electrical Panel", correct: true },
                  { id: 3, label: "Kitchen Sink", correct: true },
                  { id: 4, label: "Wall Paint Color", correct: false },
                  { id: 5, label: "HVAC System", correct: true },
                  { id: 6, label: "Furniture Arrangement", correct: false }
                ]
              }
            }
          }
        ]
      },
      quiz: {
        question: "What is the primary purpose of a home inspection?",
        options: [
          "To determine the home's market value",
          "To identify potential problems and safety issues",
          "To decorate the home for sale",
          "To clean the home thoroughly"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Types of Inspections",
      content: {
        sections: [
          {
            title: "General Home Inspection",
            content: "The most common type, covering all major systems and components of the home. This is typically required by lenders and provides a comprehensive overview.",
            type: "text"
          },
          {
            title: "Specialized Inspections",
            content: [
              "Pest/Termite Inspection - Checks for wood-destroying insects",
              "Radon Testing - Measures radon gas levels",
              "Mold Inspection - Identifies mold growth and moisture issues",
              "Lead Paint Inspection - Important for homes built before 1978",
              "Asbestos Inspection - Checks for asbestos-containing materials",
              "Septic System Inspection - Evaluates septic tank and drain field"
            ],
            type: "list"
          },
          {
            title: "When to Consider Specialized Inspections",
            content: [
              { icon: "🐜", text: "If you see signs of pests or termites" },
              { icon: "☢️", text: "If the home is in a radon-prone area" },
              { icon: "🦠", text: "If there are visible signs of mold or moisture" },
              { icon: "🏚️", text: "If the home was built before 1978" },
              { icon: "🏗️", text: "If the home has older construction materials" },
              { icon: "🚽", text: "If the home uses a septic system" }
            ],
            type: "icons"
          },
          {
            title: "Interactive Matching",
            content: "Match the inspection type with its purpose by clicking on corresponding items:",
            type: "interactive",
            interactiveElement: {
              type: "drag",
              data: {
                pairs: [
                  { left: "Pest Inspection", right: "Checks for wood-destroying insects" },
                  { left: "Radon Testing", right: "Measures radon gas levels" },
                  { left: "Mold Inspection", right: "Identifies mold growth and moisture" }
                ]
              }
            }
          }
        ]
      },
      quiz: {
        question: "Which type of inspection is typically required by lenders?",
        options: [
          "Pest inspection",
          "General home inspection",
          "Radon testing",
          "Mold inspection"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Red Flags to Watch For",
      content: {
        sections: [
          {
            title: "Structural Red Flags",
            content: [
              "Cracks in foundation walls or floors",
              "Uneven or sloping floors",
              "Doors and windows that don't close properly",
              "Gaps between walls and ceilings",
              "Visible water damage or stains"
            ],
            type: "list"
          },
          {
            title: "Electrical Red Flags",
            content: [
              "Outdated electrical panels or wiring",
              "Exposed electrical wires",
              "Flickering lights or frequent circuit breaker trips",
              "Non-functioning outlets or switches",
              "Aluminum wiring (common in homes built 1965-1973)"
            ],
            type: "list"
          },
          {
            title: "Plumbing Red Flags",
            content: [
              { icon: "💧", text: "Low water pressure throughout the home" },
              { icon: "🚰", text: "Leaking pipes or fixtures" },
              { icon: "🛁", text: "Slow drains or backed-up plumbing" },
              { icon: "🌊", text: "Water heater issues or age" },
              { icon: "🚽", text: "Sewer line problems" },
              { icon: "🏠", text: "Water damage around plumbing fixtures" }
            ],
            type: "icons"
          },
          {
            title: "Interactive Red Flag Identifier",
            content: "Click on the items that are red flags during a home inspection:",
            type: "interactive",
            interactiveElement: {
              type: "highlight",
              data: {
                items: [
                  { id: 1, label: "Cracked foundation", correct: true },
                  { id: 2, label: "Fresh paint", correct: false },
                  { id: 3, label: "Exposed wiring", correct: true },
                  { id: 4, label: "Modern appliances", correct: false },
                  { id: 5, label: "Water stains on ceiling", correct: true },
                  { id: 6, label: "Well-maintained garden", correct: false }
                ]
              }
            }
          }
        ]
      },
      quiz: {
        question: "Which of the following is NOT typically a structural red flag?",
        options: [
          "Cracks in foundation walls",
          "Uneven floors",
          "Fresh paint on walls",
          "Doors that don't close properly"
        ],
        correctAnswer: 2
      }
    }
  ];

  const currentLessonData = lessons[currentLesson - 1];
  const totalSections = currentLessonData.content.sections.length;
  const progressPercentage = ((currentSection + 1) / totalSections) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setIsCorrect(answerIndex === currentLessonData.quiz.correctAnswer);
  };

  const handleNext = () => {
    if (showQuiz) {
      setShowQuiz(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
      onNextLesson();
    } else {
      setShowQuiz(true);
    }
  };

  const handleNextSection = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }
    if (currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
      // Reset interactive state for new section
      setClickedItems(new Set());
      setShowInteractiveFeedback(false);
      setMatchedPairs(new Set());
      setSelectedLeft(null);
      setSelectedRight(null);
      setShuffledRightOrder([]);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePreviousSection = () => {
    if (showQuiz) {
      // If we're in quiz mode, go back to the last section
      setShowQuiz(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else if (currentSection > 0) {
      // If we're not in quiz mode and not on the first section, go back
      setCurrentSection(currentSection - 1);
      // Reset interactive state for new section
      setClickedItems(new Set());
      setShowInteractiveFeedback(false);
      setMatchedPairs(new Set());
      setSelectedLeft(null);
      setSelectedRight(null);
      setShuffledRightOrder([]);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

    const renderInteractiveElement = (section: ContentSection) => {
    if (section.type !== 'interactive' || !section.interactiveElement) {
      return null;
    }

    const { type, data } = section.interactiveElement;

    if (type === 'clickable' && data.items) {
      const handleItemClick = (item: InteractiveItem) => {
        const newClickedItems = new Set(clickedItems);
        if (newClickedItems.has(item.id)) {
          newClickedItems.delete(item.id);
        } else {
          newClickedItems.add(item.id);
        }
        setClickedItems(newClickedItems);
        
        // Show feedback after a short delay
        setTimeout(() => {
          setShowInteractiveFeedback(true);
        }, 500);
      };

      const correctItems = data.items.filter(item => item.correct);
      const selectedCorrectItems = data.items.filter(item => 
        item.correct && clickedItems.has(item.id)
      );
      const selectedIncorrectItems = data.items.filter(item => 
        !item.correct && clickedItems.has(item.id)
      );

      return (
        <div className="interactive-clickable">
          <div className="interactive-instructions">
            <p>Click on the areas that are typically inspected during a home inspection:</p>
          </div>
          
          <div className="clickable-grid">
            {data.items.map((item: InteractiveItem) => {
              const isClicked = clickedItems.has(item.id);
              const isCorrect = item.correct;
              
              let className = "clickable-item";
              if (isClicked) {
                className += isCorrect ? " correct" : " incorrect";
              }
              
              return (
                <button
                  key={item.id}
                  className={className}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                  {isClicked && (
                    <span className="feedback-icon">
                      {isCorrect ? "✅" : "❌"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          {showInteractiveFeedback && (
            <div className="interactive-feedback">
              <h4>Great job! Here's what you selected:</h4>
              <div className="feedback-results">
                <div className="correct-selections">
                  <h5>✅ Correctly Selected:</h5>
                  <ul>
                    {selectedCorrectItems.map(item => (
                      <li key={item.id}>{item.label}</li>
                    ))}
                  </ul>
                </div>
                {selectedIncorrectItems.length > 0 && (
                  <div className="incorrect-selections">
                    <h5>❌ Incorrectly Selected:</h5>
                    <ul>
                      {selectedIncorrectItems.map(item => (
                        <li key={item.id}>{item.label}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="feedback-summary">
                  <p>
                    <strong>Score:</strong> {selectedCorrectItems.length} out of {correctItems.length} correct areas selected
                  </p>
                  <p>
                    <strong>Tip:</strong> Home inspectors focus on structural and safety-related components, 
                    not cosmetic details like paint colors or furniture arrangement.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (type === 'drag' && data.pairs) {
      const handleLeftClick = (index: number) => {
        if (matchedPairs.has(index)) return;
        setSelectedLeft(selectedLeft === index ? null : index);
      };

      const handleRightClick = (displayIndex: number) => {
        // Get the original index from the shuffled order
        const originalIndex = shuffledRightOrder[displayIndex];
        if (matchedPairs.has(originalIndex)) return;
        setSelectedRight(selectedRight === displayIndex ? null : displayIndex);
      };

      const allMatched = matchedPairs.size === data.pairs.length;

      return (
        <div className="interactive-matching">
          <div className="interactive-instructions">
            <p>Match the inspection type with its purpose by clicking on corresponding items:</p>
          </div>
          
          <div className="matching-container">
            <div className="matching-left">
              <h4>Inspection Types</h4>
              {data.pairs.map((pair, index) => (
                <button
                  key={`left-${index}`}
                  className={`matching-item left ${
                    selectedLeft === index ? 'selected' : ''
                  } ${
                    matchedPairs.has(index) ? 'matched' : ''
                  } ${
                    wrongSelection && selectedLeft === index ? 'wrong' : ''
                  }`}
                  onClick={() => handleLeftClick(index)}
                  disabled={matchedPairs.has(index)}
                >
                  {pair.left}
                  {matchedPairs.has(index) && <span className="match-icon">✅</span>}
                  {wrongSelection && selectedLeft === index && <span className="wrong-icon">❌</span>}
                </button>
              ))}
            </div>
            
            <div className="matching-right">
              <h4>Purposes</h4>
              {shuffledRightOrder.length > 0 && shuffledRightOrder.map((originalIndex, displayIndex) => {
                const pair = data.pairs![originalIndex];
                return (
                  <button
                    key={`right-${displayIndex}`}
                    className={`matching-item right ${
                      selectedRight === displayIndex ? 'selected' : ''
                    } ${
                      matchedPairs.has(originalIndex) ? 'matched' : ''
                    } ${
                      wrongSelection && selectedRight === displayIndex ? 'wrong' : ''
                    }`}
                    onClick={() => handleRightClick(displayIndex)}
                    disabled={matchedPairs.has(originalIndex)}
                  >
                    {pair.right}
                    {matchedPairs.has(originalIndex) && <span className="match-icon">✅</span>}
                    {wrongSelection && selectedRight === displayIndex && <span className="wrong-icon">❌</span>}
                  </button>
                );
              })}
            </div>
          </div>
          
          {wrongSelection && (
            <div className="wrong-feedback">
              <p>❌ That's not a match! Try again.</p>
            </div>
          )}
          
          {allMatched && (
            <div className="interactive-feedback">
              <h4>🎉 Excellent! All matches are correct!</h4>
              <div className="feedback-summary">
                <p>
                  <strong>Perfect Score!</strong> You've successfully matched all inspection types with their purposes.
                </p>
                <p>
                  <strong>Tip:</strong> Understanding the different types of inspections helps you know when to request 
                  specialized inspections based on your specific situation and the home's characteristics.
                </p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (type === 'highlight' && data.items) {
      const handleItemClick = (item: InteractiveItem) => {
        const newClickedItems = new Set(clickedItems);
        if (newClickedItems.has(item.id)) {
          newClickedItems.delete(item.id);
        } else {
          newClickedItems.add(item.id);
        }
        setClickedItems(newClickedItems);
        
        // Show feedback after a short delay
        setTimeout(() => {
          setShowInteractiveFeedback(true);
        }, 500);
      };

      const correctItems = data.items.filter(item => item.correct);
      const selectedCorrectItems = data.items.filter(item => 
        item.correct && clickedItems.has(item.id)
      );
      const selectedIncorrectItems = data.items.filter(item => 
        !item.correct && clickedItems.has(item.id)
      );

      return (
        <div className="interactive-highlight">
          <div className="interactive-instructions">
            <p>Click on the items that are red flags during a home inspection:</p>
          </div>
          
          <div className="highlight-grid">
            {data.items.map((item: InteractiveItem) => {
              const isClicked = clickedItems.has(item.id);
              const isCorrect = item.correct;
              
              let className = "highlight-item";
              if (isClicked) {
                className += isCorrect ? " correct" : " incorrect";
              }
              
              return (
                <button
                  key={item.id}
                  className={className}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                  {isClicked && (
                    <span className="feedback-icon">
                      {isCorrect ? "✅" : "❌"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          
          {showInteractiveFeedback && (
            <div className="interactive-feedback">
              <h4>Great job! Here's what you identified:</h4>
              <div className="feedback-results">
                <div className="correct-selections">
                  <h5>✅ Correctly Identified Red Flags:</h5>
                  <ul>
                    {selectedCorrectItems.map(item => (
                      <li key={item.id}>{item.label}</li>
                    ))}
                  </ul>
                </div>
                {selectedIncorrectItems.length > 0 && (
                  <div className="incorrect-selections">
                    <h5>❌ Incorrectly Selected:</h5>
                    <ul>
                      {selectedIncorrectItems.map(item => (
                        <li key={item.id}>{item.label}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="feedback-summary">
                  <p>
                    <strong>Score:</strong> {selectedCorrectItems.length} out of {correctItems.length} red flags correctly identified
                  </p>
                  <p>
                    <strong>Tip:</strong> Red flags are serious issues that could affect the home's safety, 
                    structural integrity, or require expensive repairs. Always pay attention to these during inspections.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return <div className="interactive-placeholder">Interactive element coming soon...</div>;
  };

  const renderContent = () => {
    if (showQuiz) {
      return (
        <div className="quiz-section">
          <h3>Lesson Quiz</h3>
          <div className="quiz-question">
            <p>{currentLessonData.quiz.question}</p>
            <div className="quiz-options">
              {currentLessonData.quiz.options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${
                    selectedAnswer === index
                      ? isCorrect
                        ? 'correct'
                        : 'incorrect'
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswer !== null && (
              <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? (
                  <div>
                    <p>✅ Correct! You've completed this lesson!</p>
                  </div>
                ) : (
                  <div>
                    <p>❌ Incorrect. Try again!</p>
                    <button 
                      className="try-again-btn"
                      onClick={handleTryAgain}
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    const currentSectionData = currentLessonData.content.sections[currentSection];

    return (
      <div className="lesson-body">
        <div className="section-progress">
          <span>Section {currentSection + 1} of {totalSections}</span>
          <div className="section-progress-bar">
            <div 
              className="section-progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="lesson-section">
          <h3>{currentSectionData.title}</h3>
          {currentSectionData.type === 'text' && <p>{currentSectionData.content as string}</p>}
          {currentSectionData.type === 'list' && (
            <ul>
              {(currentSectionData.content as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {currentSectionData.type === 'icons' && (
            <div className="icon-grid">
              {(currentSectionData.content as IconItem[]).map((item, i) => (
                <div key={i} className="icon-item">
                  <span className="icon">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          )}
          {currentSectionData.type === 'interactive' && renderInteractiveElement(currentSectionData)}
        </div>
      </div>
    );
  };

  return (
    <div className="lesson-content">
      <div className="lesson-header">
        <h2>Lesson {currentLesson}: {currentLessonData.title}</h2>
        <div className="lesson-progress">
          <span>{currentSection + 1} of {totalSections} sections</span>
          <div className="lesson-progress-bar">
            <div 
              className="lesson-progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {renderContent()}
      
      <div className="lesson-actions">
        <button 
          className="lesson-btn secondary"
          onClick={currentSection === 0 && !showQuiz ? onBackToOverview : handlePreviousSection}
        >
          {currentSection === 0 && !showQuiz ? 'Back to Selection' : '← Previous Section'}
        </button>
        <button 
          className="lesson-btn primary"
          onClick={showQuiz ? handleNext : handleNextSection}
          disabled={showQuiz && selectedAnswer === null}
        >
          {showQuiz 
            ? 'Complete Lesson'
            : currentSection === totalSections - 1 
              ? 'Take Quiz'
              : 'Next Section →'
          }
        </button>
      </div>
    </div>
  );
};

export default LessonContent; 