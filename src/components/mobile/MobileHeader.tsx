'use client';

import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  onBack?: () => void;
  onMenu?: () => void;
  showBack?: boolean;
  showMenu?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  onBack,
  onMenu,
  showBack = true,
  showMenu = false,
}) => {
  return (
    <div className="bg-in-dark text-in-cream px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {showBack && (
          <button
            onClick={onBack}
            className="hover:opacity-75 transition-opacity"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="font-playfair text-lg font-bold">{title}</h1>
      </div>
      {showMenu && (
        <button onClick={onMenu} className="hover:opacity-75 transition-opacity">
          <Menu size={24} />
        </button>
      )}
    </div>
  );
};
