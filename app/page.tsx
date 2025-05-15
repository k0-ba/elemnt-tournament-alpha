"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect, useState, useRef } from "react";
import Header from './components/Header';
import HealthDisplay from './components/HealthDisplay';
import GameRules from './components/GameRules';
import CollapsibleBattleLog from './components/CollapsibleBattleLog';


// Game elements and rules
const elements = ['Fire 🔥', 'Earth 🌍', 'Water 💧'];

// Element colors
const elementColors = {
  'Fire 🔥': '#E89B4B',
  'Earth 🌍': '#5EA9BE',
  'Water 💧': '#8A63D2',
};

// Element descriptions
const elementDescriptions = {
  'Fire 🔥': 'Burns and consumes Earth, but is extinguished by Water',
  'Earth 🌍': 'Absorbs Water, but is consumed by Fire',
  'Water 💧': 'Extinguishes Fire, but is absorbed by Earth',
};

type BattleLogEntry = {
  userChoice: string;
  aiChoice: string;
  result: string;
  timestamp: number;
};

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [userHealth, setUserHealth] = useState(5);
  const [aiHealth, setAiHealth] = useState(5);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [aiChoice, setAiChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [battleLogs, setBattleLogs] = useState<BattleLogEntry[]>([]);

  const [userAvatar, setUserAvatar] = useState('/default-avatar.svg');
  const [gameOver, setGameOver] = useState(false);
  // We still need setSelectedElement but can mark selectedElement as unused
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const gameOverRef = useRef(gameOver);


  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
    
    // Try to get user avatar from localStorage or use default
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setUserAvatar(savedAvatar);
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  useEffect(() => {
    if ((userHealth === 0 || aiHealth === 0) && (userHealth !== 5 || aiHealth !== 5) && !gameOver) {
      setGameOver(true);
    }
  }, [userHealth, aiHealth, gameOver]);


  const handleElementClick = (element: string) => {
    if (gameOver || userChoice) return; // Prevent action if game over or choice already made for current round
    
    setSelectedElement(element);
    setUserChoice(element);
    
    // AI makes a random choice
    const computerChoice = elements[Math.floor(Math.random() * elements.length)];
    setAiChoice(computerChoice);
    
    // Calculate result
    let battleResult: string;
    if (element === computerChoice) {
      battleResult = 'Tie';
    } else if (
      (element === 'Fire 🔥' && computerChoice === 'Earth 🌍') ||
      (element === 'Earth 🌍' && computerChoice === 'Water 💧') ||
      (element === 'Water 💧' && computerChoice === 'Fire 🔥')
    ) {
      battleResult = 'Win';
      setAiHealth(prev => Math.max(0, prev - 1));
    } else {
      battleResult = 'Lose';
      setUserHealth(prev => Math.max(0, prev - 1));
    }
    
    setResult(battleResult);
    
    // Add to battle log
    const newLog = {
      userChoice: element,
      aiChoice: computerChoice,
      result: battleResult,
      timestamp: Date.now(),
    };
    
    setBattleLogs(prev => [...prev, newLog]);
    
    // Auto-proceed to next round after a delay
    setTimeout(() => {
      if (!gameOverRef.current) {
        setUserChoice(null);
        setAiChoice(null);
        setResult(null);
        setSelectedElement(null);
      }
    }, 3000); // 3-second delay to show results
  };

  const resetGame = () => {
    setUserHealth(5);
    setAiHealth(5);
    setUserChoice(null);
    setAiChoice(null);
    setResult(null);
    setGameOver(false);
    setSelectedElement(null);
  };

  // Handle file upload for avatar
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUserAvatar(result);
        localStorage.setItem('userAvatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#17101f] text-white flex flex-col items-center justify-start p-4 sm:p-6">
      <Header />
      <HealthDisplay 
        userHP={userHealth} 
        aiHP={aiHealth} 
        userName="Player"
        aiName="AI Opponent"
        userAvatar={userAvatar}
        // aiAvatar={aiAvatar} // Placeholder for AI avatar if added later
        onAvatarChange={handleAvatarUpload}
      />
      <div className="w-full max-w-4xl bg-[#2E233D] rounded-xl shadow-lg overflow-hidden mb-6">
        {/* Arena Header - can be used for a title or kept minimal */}
        <div className="flex justify-between p-2 sm:p-4 border-b border-[#3F3351]">
          {/* This space can be used for a title like 'Battle Arena' if desired */}
          <h2 className="text-xl sm:text-2xl font-semibold text-white w-full text-center">Battle Arena</h2>
        </div>
        
        {/* Unified Arena Content Area */}
        <div className="relative p-4 sm:p-6 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[350px] w-full">
          {isFrameReady && (
            <div className="w-full flex flex-col items-center flex-grow justify-between">
              {/* Choices and Result Display Area */}
              <div className="flex justify-around items-center w-full mb-4 sm:mb-6 min-h-[100px] sm:min-h-[120px]">
                {/* User's Choice */}
                <div className="text-center w-1/3 px-1">
                  <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center text-2xl sm:text-4xl border-2 border-opacity-50"
                    style={{
                      backgroundColor: userChoice ? elementColors[userChoice as keyof typeof elementColors] + '40' : '#3A3A3A',
                      borderColor: userChoice ? elementColors[userChoice as keyof typeof elementColors] : '#4D4D4D'
                    }}
                  >
                    {userChoice ? userChoice.split(' ')[1] : '?'}
                  </div>
                  <p className="mt-2 text-xs sm:text-sm">Your Choice</p>
                </div>
                
                {/* Result Text */}
                <div className="text-center w-1/3 px-1">
                  {result ? (
                    <p className={`text-xl sm:text-2xl font-bold ${result === 'Win' ? 'text-green-400' : result === 'Lose' ? 'text-red-400' : 'text-yellow-400'}`}>
                      {result}!
                    </p>
                  ) : (
                    <p className="text-xl sm:text-2xl font-bold text-gray-500">VS</p>
                  )}
                </div>
                
                {/* AI's Choice */}
                <div className="text-center w-1/3 px-1">
                  <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center text-2xl sm:text-4xl border-2 border-opacity-50"
                    style={{
                      backgroundColor: aiChoice ? elementColors[aiChoice as keyof typeof elementColors] + '40' : '#3A3A3A',
                      borderColor: aiChoice ? elementColors[aiChoice as keyof typeof elementColors] : '#4D4D4D'
                    }}
                  >
                    {aiChoice ? aiChoice.split(' ')[1] : '?'}
                  </div>
                  <p className="mt-2 text-xs sm:text-sm">AI's Choice</p>
                </div>
              </div>

              {/* Element Selection Area */}
              <div className="text-center w-full mt-auto pt-4 border-t border-[#3A3A3A]">
                {!userChoice && !gameOver && (
                  <p className="text-md sm:text-lg mb-3 sm:mb-4">Choose your element:</p>
                )}
                {(userChoice && !gameOver) && (
                  <p className="text-md sm:text-lg mb-3 sm:mb-4 text-gray-400 italic">Next round in a moment...</p>
                )}
                {gameOver && (
                   <p className="text-md sm:text-lg mb-3 sm:mb-4 text-gray-400 italic">Game Over. Select 'Play Again?' below.</p>
                )}
                <div className="flex justify-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                  {elements.map((element) => (
                    <div 
                      key={element}
                      className="relative flex flex-col items-center"
                      onMouseEnter={() => !gameOver && !userChoice && setHoveredElement(element)}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      <button
                        onClick={() => handleElementClick(element)}
                        disabled={gameOver || userChoice !== null}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-all transform hover:scale-105 flex items-center justify-center text-3xl sm:text-4xl focus:outline-none 
                                    ${gameOver || userChoice !== null ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}`}
                        style={{ 
                          backgroundColor: elementColors[element as keyof typeof elementColors] + '90', 
                          borderColor: elementColors[element as keyof typeof elementColors],
                          borderWidth: '2px'
                        }}
                      >
                        {element.split(' ')[1]}
                      </button>
                      <span className={`block mt-1 text-xs sm:text-sm ${gameOver || userChoice !== null ? 'text-gray-500' : ''}`}>{element.split(' ')[0]}</span>
                      
                      {hoveredElement === element && !gameOver && !userChoice && (
                        <div className="absolute bottom-full mb-2 w-36 sm:w-48 p-2 bg-[#4D4D4D] border border-gray-600 rounded-lg text-xs z-20 shadow-lg pointer-events-none text-left">
                          <strong className='block mb-1'>{element.split(' ')[0]}</strong>
                          {elementDescriptions[element as keyof typeof elementDescriptions]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center rounded-xl z-10 p-4">
              <p className={`text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-center ${userHealth === 0 ? 'text-red-500' : 'text-green-500'}`}>
                {userHealth === 0 ? "GAME OVER" : "YOU WIN!"}
              </p>
              {userHealth === 0 && <p className="text-lg sm:text-xl mb-4 text-gray-300 text-center">Better luck next time!</p>}
              {aiHealth === 0 && <p className="text-lg sm:text-xl mb-4 text-gray-300 text-center">Victory is yours!</p>}
              <button
                onClick={resetGame}
                className="bg-[#8A63D2] hover:bg-[#7B58BB] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-md sm:text-xl transition-colors shadow-md hover:shadow-lg"
              >
                Play Again?
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Rules card */}
      <GameRules />

      {/* Collapsible Battle Log */}
      <CollapsibleBattleLog battleLogs={battleLogs} />
    </div>
  );
}
