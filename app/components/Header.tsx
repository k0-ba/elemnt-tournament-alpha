import React from 'react';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => (
  <div className="w-full flex justify-center items-center p-4 mb-4">
    <h1 className="text-3xl font-bold text-white">Elemental Clash</h1>
  </div>
);

export default Header;
