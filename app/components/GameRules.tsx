import React, { useState } from 'react';

const GameRules: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full max-w-4xl mb-4 sm:mb-6 px-2 sm:px-0">
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center p-4 bg-[#2E233D] hover:bg-[#3F3351] border-2 border-[#3F3351] transition-colors focus:outline-none rounded-lg"
      >
        <h2 className="text-lg font-semibold text-gray-300">Game Rules</h2>
        <div className="flex items-center">
          <span className="mr-2 text-gray-300">{isOpen ? 'Hide' : 'Show'}</span>
          <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 p-3 sm:p-4 bg-[#2E233D] rounded-lg text-gray-300 text-xs sm:text-sm">
          <ul className="list-disc list-inside space-y-1">
            <li>Fire beats Earth (Fire engulfs Earth)</li>
            <li>Earth beats Water (Earth absorbs Water)</li>
            <li>Water beats Fire (Water extinguishes Fire)</li>
            <li>Each player starts with 5 HP.</li>
            <li>Select an element to battle the AI.</li>
            <li>The winner of each round deals 1 damage to the opponent.</li>
            <li>The first player to reach 0 HP loses.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameRules;
//.