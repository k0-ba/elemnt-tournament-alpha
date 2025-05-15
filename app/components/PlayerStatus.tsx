import React from 'react';
import Image from 'next/image';

interface PlayerStatusProps {
  playerName: string;
  avatarUrl?: string;
  isUser: boolean;
  onAvatarChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlayerStatus: React.FC<PlayerStatusProps> = ({ playerName, avatarUrl, isUser, onAvatarChange }) => {
  return (
    <div className={`flex flex-col items-center p-2 sm:p-3 rounded-lg bg-opacity-50 w-full`}>
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 border-2 border-[#3F3351] rounded-full overflow-hidden group">
        <Image
          src={avatarUrl || '/default-avatar.svg'}
          alt={`${playerName} avatar`}
          layout="fill"
          objectFit="cover"
          className={`${isUser && onAvatarChange ? 'border-[#8A63D2]' : 'border-gray-300'}`}
        />
        {isUser && onAvatarChange && (
          <>
            <label htmlFor={`avatarUpload-${playerName}`} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs sm:text-sm">Change</span>
            </label>
            <input type="file" id={`avatarUpload-${playerName}`} accept="image/*" className="hidden" onChange={onAvatarChange} />
          </>
        )}
      </div>
      <span className="text-sm sm:text-md font-semibold text-white text-center">{playerName}</span>
    </div>
  );
};

export default PlayerStatus;
