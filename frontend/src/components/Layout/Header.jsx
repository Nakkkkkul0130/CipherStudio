import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">🔐 CipherStudio</h1>
          <p className="text-gray-300 text-sm">Browser-based React IDE</p>
        </div>
      </div>
    </header>
  );
};

export default Header;