import React from 'react';

type ActionCardProps = {
  icon: string;
  title: string;
  onClick?: () => void; // Ação a ser executada ao clicar (opcional)
};

export function ActionCard({ icon, title, onClick }: ActionCardProps) {
  return (
    <a 
      href="#" 
      onClick={(e) => {
        e.preventDefault(); // Previne que a página recarregue
        if (onClick) {
          onClick();
        }
      }}
      className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition-all transform hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl mb-4">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="font-bold text-gray-700">{title}</div>
    </a>
  );
}