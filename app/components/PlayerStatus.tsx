import React from 'react';
import Image from 'next/image';

interface PlayerStatusProps {
  playerName: string;
  avatarUrl?: string;
  isUser: boolean;
  onAvatarChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlayerStatus: React.FC<PlayerStatusProps> = ({ playerName, avatarUrl, isUser, onAvatarChange }) => {
  // Truncate long usernames with ellipsis
  const displayName = playerName.length > 12 
    ? `${playerName.substring(0, 10)}...` 
    : playerName;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative group">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#3F3351] bg-[#2A2A2A] flex items-center justify-center">
          <Image
            src={avatarUrl || '/default-avatar.svg'}
            alt={`${playerName} avatar`}
            width={64}
            height={64}
            className={`w-full h-full object-cover ${!isUser ? 'opacity-90' : ''}`}
            onError={(e) => {
              // Fallback to default avatar on error
              const target = e.target as HTMLImageElement;
              target.src = '/default-avatar.svg';
            }}
          />
        </div>
        
        {isUser && onAvatarChange && (
          <>
            <label 
              htmlFor={`avatarUpload-${playerName}`} 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="text-white text-xs">Change</span>
            </label>
            <input 
              type="file" 
              id={`avatarUpload-${playerName}`} 
              accept="image/*" 
              className="hidden" 
              onChange={onAvatarChange} 
            />
          </>
        )}
      </div>
      <span 
        className="text-sm font-medium text-white text-center mt-2 max-w-full truncate px-1"
        title={playerName} // Show full name on hover
      >
        {displayName}
      </span>
    </div>
  );
};

export default PlayerStatus;
