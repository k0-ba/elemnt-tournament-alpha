import React from 'react';
import PlayerStatus from './PlayerStatus';

interface HealthBarProps {
  currentHP: number;
  maxHP: number;
  isUser?: boolean;
}

const HealthBar: React.FC<HealthBarProps> = ({ currentHP, maxHP, isUser }) => {
  const percentage = Math.max(0, (currentHP / maxHP) * 100);
  const barColor = isUser ? 'from-emerald-500 to-emerald-400' : 'from-rose-500 to-rose-400';
  const bgColor = isUser ? 'bg-emerald-900/30' : 'bg-rose-900/30';

  return (
    <div className={`w-full h-2.5 rounded-full overflow-hidden ${bgColor} border border-[#3F3351]/50`}>
      <div 
        className={`h-full bg-gradient-to-r ${barColor} transition-all duration-500 ease-out`}
        style={{ 
          width: `${percentage}%`,
          borderRadius: '9999px',
          boxShadow: isUser 
            ? '0 0 8px rgba(16, 185, 129, 0.5)' 
            : '0 0 8px rgba(244, 63, 94, 0.5)'
        }}
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
    <div className="w-full max-w-3xl flex items-start justify-between p-4 sm:p-5 mb-3 sm:mb-5 bg-[#24153B] rounded-xl border border-[#3F3351] shadow-lg">
      {/* Player Section (Left) */}
      <div className="flex-1 flex flex-col items-center px-1 sm:px-2 max-w-[40%]">
        <PlayerStatus 
          playerName={userName || 'Player'} 
          avatarUrl={userAvatar}
          isUser={true} 
          onAvatarChange={onAvatarChange} 
        />
        <div className="w-full mt-2">
          <HealthBar currentHP={userHP} maxHP={maxHP} isUser={true} />
          <p className="text-xs text-gray-300 mt-1">HP: {userHP}/{maxHP}</p>
        </div>
      </div>

      {/* VS Separator (Center) */}
      <div className="px-2 sm:px-3 flex items-center h-full pt-10 sm:pt-12">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2A2A2A] border-2 border-[#3F3351] flex items-center justify-center">
          <p className="text-sm sm:text-lg font-bold text-gray-400">VS</p>
        </div>
      </div>

      {/* AI Section (Right) */}
      <div className="flex-1 flex flex-col items-center px-1 sm:px-2 max-w-[40%]">
        <PlayerStatus 
          playerName={aiName || 'AI Opponent'} 
          avatarUrl={'/images/ai-avatar.png'}
          isUser={false} 
        />
        <div className="w-full mt-2">
          <HealthBar currentHP={aiHP} maxHP={maxHP} isUser={false} />
          <p className="text-xs text-gray-300 mt-1">HP: {aiHP}/{maxHP}</p>
        </div>
      </div>
    </div>
  );
};

export default HealthDisplay;
