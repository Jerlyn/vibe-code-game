import React, { useState } from 'react';

const VibeCodeGame = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'feedback', 'complete'
  const [selectedChoice, setSelectedChoice] = useState(null);
  
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
    {
      setting: "Creative Agency",
      description: "You're at a collaborative brainstorming session at a design agency. The project lead says they want to 'blue sky' some ideas before getting 'down in the weeds'.",
      question: "According to this creative environment's vibe code, what should you do?",
      choices: [
        { text: "Start discussing detailed technical limitations of each potential approach", correct: false, 
          feedback: "That's getting 'in the weeds' too early! Blue sky thinking is about exploring possibilities without immediate constraints." },
        { text: "Suggest looking at the sky for inspiration and stepping outside", correct: false, 
          feedback: "While creative, that's not what 'blue sky' means in this context. It's about unconstrained ideation, not literal sky-gazing." },
        { text: "Share bold, imaginative ideas without worrying about practical limitations yet", correct: true, 
          feedback: "Exactly right! 'Blue sky' thinking means brainstorming without constraints, while 'getting in the weeds' means dealing with details later." },
        { text: "Focus only on blue-colored design elements in your suggestions", correct: false, 
          feedback: "That's taking the term too literally! 'Blue sky' refers to thinking without limitations, not the color blue." }
      ]
    },
    {
      setting: "Remote Work Meeting",
      description: "You're joining a video call with a team you haven't met before. As people join, some have cameras on and others off. The meeting organizer says, 'Let's do a quick round-robin check-in.'",
      question: "What's the expected vibe code behavior here?",
      choices: [
        { text: "Turn your camera on and prepare to introduce yourself briefly when your turn comes", correct: true, 
          feedback: "Perfect! A 'round-robin' means everyone takes a turn to speak, and having your camera on (if possible) shows engagement in a new group." },
        { text: "Post a lengthy introduction about yourself in the chat", correct: false, 
          feedback: "This might disrupt the flow. 'Round-robin' suggests a verbal, turn-based check-in, not written introductions." },
        { text: "Stay silent until directly asked a specific question", correct: false, 
          feedback: "Too passive! A round-robin means everyone is expected to participate by sharing a brief update or introduction." },
        { text: "Immediately begin describing your work on the project without waiting", correct: false, 
          feedback: "Jumping ahead! Round-robin format means waiting for your turn in an organized sequence." }
      ]
    },
    {
      setting: "Design Critique Session",
      description: "You're participating in a design critique. A colleague presents their work and asks for 'constructive feedback, not just what's working.'",
      question: "Based on the vibe code of critique sessions, how should you respond?",
      choices: [
        { text: "List everything you dislike about the design", correct: false, 
          feedback: "Too negative! Constructive feedback includes both strengths and specific suggestions for improvement." },
        { text: "Focus only on positive aspects to avoid hurting feelings", correct: false, 
          feedback: "While kind, this ignores their specific request for more than just 'what's working.'" },
        { text: "Offer specific observations with suggestions for improvements, while also noting strengths", correct: true, 
          feedback: "Excellent! Constructive feedback is balanced, specific, and actionable - exactly what they requested." },
        { text: "Suggest they start over with a completely different approach", correct: false, 
          feedback: "Rarely helpful! Constructive feedback builds on existing work rather than dismissing it entirely." }
      ]
    },
    {
      setting: "Accessibility-Focused Team",
      description: "You've joined a team that emphasizes inclusive design. During a presentation, the lead says, 'Remember our mantra: nothing about us without us.'",
      question: "What vibe code principle is being communicated here?",
      choices: [
        { text: "All team decisions must be unanimous", correct: false, 
          feedback: "Not quite. While inclusive, this phrase has a more specific meaning about representation." },
        { text: "Never design for users with disabilities without their direct involvement and feedback", correct: true, 
          feedback: "Exactly right! 'Nothing about us without us' is a core principle in accessibility advocacy, emphasizing that those affected should be involved in the process." },
        { text: "Team members shouldn't talk about each other when they're not present", correct: false, 
          feedback: "While respectful, this phrase has a more specific meaning in accessibility contexts." },
        { text: "Documentation should be comprehensive and include everyone's contributions", correct: false, 
          feedback: "Good practice, but not what this specific phrase is referencing in accessibility contexts." }
      ]
    }
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
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4 text-purple-800">Vibe Code Decoder</h1>
      
      {gameState === 'complete' ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Game Complete!</h2>
          <p className="text-lg mb-4">You scored {score} out of {scenarios.length}!</p>
          {score === scenarios.length ? (
            <p className="mb-4 font-semibold text-green-600">Perfect score! You're a vibe code master!</p>
          ) : score >= scenarios.length * 0.7 ? (
            <p className="mb-4 font-semibold text-blue-600">Great job! You've got a strong sense of social vibes.</p>
          ) : (
            <p className="mb-4 font-semibold text-orange-600">Good effort! Social vibe codes can be tricky to navigate.</p>
          )}
          <p className="mb-6">Understanding vibe codes helps with social integration, but remember: explicit communication creates more accessible environments for everyone.</p>
          <button 
            onClick={resetGame}
            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-purple-100 p-4 rounded-lg mb-4">
            <div className="text-sm font-semibold text-purple-800 uppercase tracking-wider mb-1">{currentQuestion.setting}</div>
            <p className="mb-3">{currentQuestion.description}</p>
            <p className="font-bold">{currentQuestion.question}</p>
          </div>
          
          {gameState === 'playing' ? (
            <div className="space-y-3">
              {currentQuestion.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoiceSelection(index)}
                  className="w-full text-left p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="mb-6">
              <div className={`p-4 rounded-lg mb-4 ${currentQuestion.choices[selectedChoice].correct ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
                <p className="font-bold mb-2">
                  {currentQuestion.choices[selectedChoice].correct ? '✓ Correct!' : '✗ Not quite!'}
                </p>
                <p>{currentQuestion.choices[selectedChoice].feedback}</p>
              </div>
              <button
                onClick={handleContinue}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Continue
              </button>
            </div>
          )}
          
          <div className="mt-4 flex justify-between text-sm">
            <div>Question {currentScenario + 1} of {scenarios.length}</div>
            <div>Score: {score}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VibeCodeGame;