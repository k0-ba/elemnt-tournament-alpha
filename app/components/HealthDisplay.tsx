import React from 'react';
import PlayerStatus from './PlayerStatus';

interface HealthBarProps {
  currentHP: number;
  maxHP: number;
  isUser?: boolean;
}

const HealthBar: React.FC<HealthBarProps> = ({ currentHP, maxHP, isUser }) => {
  const percentage = Math.max(0, (currentHP / maxHP) * 100); // Ensure percentage doesn't go below 0
  const barColor = isUser ? 'bg-emerald-600' : 'bg-rose-600';

  return (
    <div className="w-full h-3 sm:h-4 bg-gray-700 rounded-full overflow-hidden border border-[#3F3351] my-1">
      <div 
        className={`h-full ${barColor} transition-all duration-300 ease-out`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

interface HealthDisplayProps {
  userHP: number;
  aiHP: number;
  userName?: string;
  aiName?: string;
  userAvatar: string; // userAvatar is required as per page.tsx
  // aiAvatar?: string; // Future: for AI's avatar. Can be added to PlayerStatus if needed.
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // onAvatarChange is required
}

const HealthDisplay: React.FC<HealthDisplayProps> = ({ userHP, aiHP, userName, aiName, userAvatar, onAvatarChange }) => {
  const maxHP = 5; // Max HP for the game

  return (
    <div className="w-full max-w-3xl flex items-start justify-between p-3 sm:p-4 mb-2 sm:mb-4 bg-[#2E233D] rounded-xl shadow-lg">
      {/* Player Section (Left) */}
      <div className="flex-1 flex flex-col items-center text-center px-1 sm:px-2 max-w-[40%]">
        <PlayerStatus 
          playerName={userName || 'Player'} 
          avatarUrl={userAvatar} // Already has a default in page.tsx if not set by user
          isUser={true} 
          onAvatarChange={onAvatarChange} 
        />
        <HealthBar currentHP={userHP} maxHP={maxHP} isUser={true} />
        <p className="text-xs sm:text-sm text-gray-300 mt-1">HP: {userHP}/{maxHP}</p>
      </div>

      {/* VS Separator (Center) */}
      <div className="px-1 sm:px-3 flex items-center h-full pt-8 sm:pt-10">
        <p className="text-lg sm:text-2xl font-bold text-gray-400">VS</p>
      </div>

      {/* AI Section (Right) */}
      <div className="flex-1 flex flex-col items-center text-center px-1 sm:px-2 max-w-[40%]">
        <PlayerStatus 
          playerName={aiName || 'AI Opponent'} 
          avatarUrl={'/images/ai-avatar.png'} // Standard AI avatar path
          isUser={false} 
        />
        <HealthBar currentHP={aiHP} maxHP={maxHP} isUser={false} />
        <p className="text-xs sm:text-sm text-gray-300 mt-1">HP: {aiHP}/{maxHP}</p>
      </div>
    </div>
  );
};

export default HealthDisplay;
