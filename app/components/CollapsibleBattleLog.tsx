// app/components/CollapsibleBattleLog.tsx
import React, { useState } from 'react';

interface BattleLogEntry {
  userChoice: string;
  aiChoice: string;
  result: string;
  timestamp: number;
}

interface CollapsibleBattleLogProps {
  battleLogs: BattleLogEntry[];
}

const CollapsibleBattleLog: React.FC<CollapsibleBattleLogProps> = ({ battleLogs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full max-w-4xl mb-4 sm:mb-6 px-2 sm:px-0">
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center p-4 bg-[#2E233D] hover:bg-[#3F3351] border-2 border-[#3F3351] transition-colors focus:outline-none rounded-lg"
      >
        <h2 className="text-lg font-semibold text-gray-300">Battle Logs</h2>
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
        <div className="mt-2 p-4 bg-[#2E233D] rounded-lg max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 text-gray-300 text-xs sm:text-sm">
          {battleLogs.length === 0 ? (
            <p className="text-gray-400">No battles have been logged yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {battleLogs.slice().reverse().map((log, index) => (
                <li key={index} className="p-2 bg-[#333333] rounded-md text-gray-300">
                  Round {battleLogs.length - index}: You chose {log.userChoice.split(' ')[0]} vs AI chose {log.aiChoice.split(' ')[0]}. Result: {log.result}.
                  <span className="block text-xs text-gray-500 mt-1">{new Date(log.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CollapsibleBattleLog;
