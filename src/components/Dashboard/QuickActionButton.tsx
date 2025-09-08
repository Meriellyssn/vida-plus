import React from 'react';

type ButtonProps = {
  icon: string;
  label: string;
  onClick?: () => void;
};

export function QuickActionButton({ icon, label, onClick }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className="text-center p-2 flex flex-col items-center justify-center space-y-2 rounded-lg hover:bg-gray-100 transition-colors w-full"
    >
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl shadow-md">
        <i className={`fas ${icon}`}></i>
      </div>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </button>
  );
}