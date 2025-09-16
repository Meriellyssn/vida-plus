// src/components/Dashboard/KpiCard.tsx
import React from 'react';

type KpiCardProps = {
  icon: string;
  value: string;
  label: string;
  trend: string;
  trendDirection: 'up' | 'down' | 'stable';
  iconBgClass: string;
};

const trendClasses = {
  up: 'text-green-600',
  down: 'text-red-600',
  stable: 'text-gray-500',
};

export function KpiCard({ icon, value, label, trend, trendDirection, iconBgClass }: KpiCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center transition-transform transform hover:-translate-y-1 relative overflow-hidden">
      {/* Linha colorida no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
      
      {/* Ícone */}
      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white text-2xl mb-4 ${iconBgClass}`}>
        <i className={`fas ${icon}`}></i>
      </div>
      
      {/* Valor e Rótulo */}
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      <div className="text-gray-500 mt-1">{label}</div>
      
      {/* Tendência */}
      <div className={`text-sm font-semibold mt-2 ${trendClasses[trendDirection]}`}>
        <i className={`fas fa-arrow-${trendDirection === 'stable' ? 'right' : trendDirection} mr-1`}></i>
        {trend}
      </div>
    </div>
  );
}