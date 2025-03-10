import React, { useState } from 'react';
import './VibeCodeGame.css'; // Import the CSS file

const VibeCodeGame = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'feedback', 'complete'
  const [selectedChoice, setSelectedChoice] = useState(null);
  
  // Scenarios array remains the same...
  const scenarios = [
    {
      setting: "Tech Startup Office",
      description: "You've just joined a trendy tech startup. It's your first day, and you notice everyone is dressed casually and working with headphones on. Someone mentions a 'stand-up' happening in 5 minutes.",
      question: "What's the appropriate vibe code response?",
      choices: [
        { text: "Put on formal attire for the stand-up meeting to make a good impression", correct: false, 
          feedback: "Too formal! Tech startups often have casual dress codes. 'Stand-up' refers to a quick daily team check-in where people literally stand up, not a formal presentation." },
        { text: "Grab your laptop and join the circle of people gathering in the open space area", correct: true, 
          feedback: "Correct! In tech environments, 'stand-up' refers to a quick daily meeting where team members briefly share updates while standing up." },
        { text: "Start practicing your comedy routine since they want you to perform", correct: false, 
          feedback: "Not that kind of stand-up! In tech, a 'stand-up' is a brief team meeting to share progress and blockers, not a comedy performance." },
        { text: "Ignore it since you're new and it probably doesn't apply to you", correct: false, 
          feedback: "Missing out! Stand-ups are specifically designed to include everyone on the team, especially new members." }
      ]
    },
    // Other scenarios remain unchanged...
  ];

  const currentQuestion = scenarios[currentScenario];

  const handleChoiceSelection = (index) => {
    setSelectedChoice(index);
    setGameState('feedback');
    
    if (currentQuestion.choices[index].correct) {
      setScore(score + 1);
    }
  };

  const handleContinue = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedChoice(null);
      setGameState('playing');
    } else {
      setGameState('complete');
    }
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setScore(0);
    setSelectedChoice(null);
    setGameState('playing');
  };

  return (
    <div className="vibe-container">
      <h1 className="vibe-title">Vibe Code Decoder</h1>
      
      <div className="vibe-score">
        Score: {score}
      </div>
      
      {gameState === 'complete' ? (
        <div style={{textAlign: 'center'}}>
          <h2 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px'}}>Game Complete!</h2>
          <p style={{fontSize: '18px', marginBottom: '16px'}}>You scored {score} out of {scenarios.length}!</p>
          {score === scenarios.length ? (
            <p style={{marginBottom: '16px', fontWeight: '600', color: '#16a34a'}}>Perfect score! You're a vibe code master!</p>
          ) : score >= scenarios.length * 0.7 ? (
            <p style={{marginBottom: '16px', fontWeight: '600', color: '#2563eb'}}>Great job! You've got a strong sense of social vibes.</p>
          ) : (
            <p style={{marginBottom: '16px', fontWeight: '600', color: '#ea580c'}}>Good effort! Social vibe codes can be tricky to navigate.</p>
          )}
          <p style={{marginBottom: '24px'}}>Understanding vibe codes helps with social integration, but remember: explicit communication creates more accessible environments for everyone.</p>
          <button 
            onClick={resetGame}
            className="vibe-button"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <div style={{marginBottom: '24px'}}>
            <div style={{textAlign: 'center', marginBottom: '8px'}}>Question {currentScenario + 1} of {scenarios.length}</div>
            <p className="vibe-question">{currentQuestion.description}</p>
            <p className="vibe-prompt">{currentQuestion.question}</p>
          </div>
          
          {gameState === 'playing' ? (
            <div>
              {currentQuestion.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoiceSelection(index)}
                  className="vibe-option"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          ) : (
            <div>
              {currentQuestion.choices[selectedChoice].correct ? (
                <div className="vibe-correct">
                  <p style={{fontWeight: 'bold', marginBottom: '8px'}}>✓ Correct!</p>
                  <p>{currentQuestion.choices[selectedChoice].feedback}</p>
                </div>
              ) : (
                <div className="vibe-incorrect">
                  <p style={{fontWeight: 'bold', marginBottom: '8px'}}>✗ Not quite!</p>
                  <p>{currentQuestion.choices[selectedChoice].feedback}</p>
                </div>
              )}
              
              <button
                onClick={handleContinue}
                className="vibe-button"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VibeCodeGame;