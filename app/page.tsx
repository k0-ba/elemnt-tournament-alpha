"use client";

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";

// Game elements and rules
const elements = ['Fire 🔥', 'Earth 🌍', 'Water 💧'];

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [aiChoice, setAiChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleElementClick = (element: string) => {
    // User choice
    setUserChoice(element);
    
    // AI makes a random choice
    const computerChoice = elements[Math.floor(Math.random() * elements.length)];
    setAiChoice(computerChoice);
    
    // Calculate result
    if (element === computerChoice) {
      setResult('Tie');
    } else if (element === 'Fire 🔥' && computerChoice === 'Earth 🌍') {
      setResult('Win');
    } else if (element === 'Earth 🌍' && computerChoice === 'Water 💧') {
      setResult('Win');
    } else if (element === 'Water 💧' && computerChoice === 'Fire 🔥') {
      setResult('Win');
    } else {
      setResult('Lose');
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setAiChoice(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-8">Elemental Clash: Challenge the AI!</h1>
      
      {!userChoice ? (
        <div className="text-center mb-8">
          <p className="text-xl mb-4">Pick an element to battle against the AI:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {elements.map((element) => (
              <button
                key={element}
                onClick={() => handleElementClick(element)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
              >
                {element}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mb-8 bg-gray-800 p-6 rounded-lg w-full max-w-md">
          <p className="text-xl mb-2">
            You chose: <span className="font-bold text-blue-400">{userChoice}</span>
          </p>
          <p className="text-xl mb-4">
            AI chose: <span className="font-bold text-red-400">{aiChoice}</span>
          </p>
          <p className="text-2xl font-bold mb-6">
            Result: You {result === 'Win' ? (
              <span className="text-green-400">Win!</span>
            ) : result === 'Lose' ? (
              <span className="text-red-400">Lose!</span>
            ) : (
              <span className="text-yellow-400">Tie!</span>
            )}
          </p>
          <button
            onClick={resetGame}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mt-8">
        <h2 className="text-xl font-bold mb-4">Game Rules:</h2>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Fire 🔥 beats Earth 🌍</li>
          <li>Earth 🌍 beats Water 💧</li>
          <li>Water 💧 beats Fire 🔥</li>
        </ul>
        <p className="text-sm text-gray-400">This is Phase 0 (MVP): Play against an AI opponent that makes random choices.</p>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <a 
          href="/api/frame" 
          target="_blank" 
          className="text-blue-400 hover:underline"
        >
          View Farcaster Frame Version
        </a>
      </div>
    </div>
  );
}
