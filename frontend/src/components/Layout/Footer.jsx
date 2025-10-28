import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-3 border-t border-gray-700">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">Made with</span>
          <Heart size={14} className="text-red-500 animate-pulse" fill="currentColor" />
          <span className="text-white text-sm">by</span>
          <span className="text-yellow-400 font-semibold text-sm">Nakul</span>
        </div>
        <p className="text-gray-300 text-xs text-center">
          © 2024 CipherStudio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;