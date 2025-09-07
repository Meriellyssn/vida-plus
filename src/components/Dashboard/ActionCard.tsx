import React from 'react';

type ActionCardProps = {
  icon: string;
  title: string;
  onClick?: () => void;
};

export function ActionCard({ icon, title, onClick }: ActionCardProps) {
  return (
    <a 
      href="#" 
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition-all transform hover:-translate-y-1 hover:shadow-lg h-full"
    >
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl mb-3">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="font-bold text-gray-700 text-sm">{title}</div>
    </a>
  );
}