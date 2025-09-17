import React from 'react';

// Define o "formato" dos dados que nosso card vai receber
type StatCardProps = {
  icon: string; // O nome do ícone do Font Awesome (ex: 'fa-calendar-check')
  value: string | number;
  label: string;
};

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center transition-transform transform hover:-translate-y-1 relative overflow-hidden">
      
      {/* 2. Adicione este novo div para a linha de gradiente */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl mb-4">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      <div className="text-gray-500 mt-1">{label}</div>
    </div>
  );
}