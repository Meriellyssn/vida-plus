/**
 * Componente KpiCard - Sistema Vida Plus
 *
 * Este componente representa um card de KPI (Key Performance Indicator),
 * utilizado para exibir indicadores de desempenho no dashboard.
 *
 * Cada card mostra um ícone, valor principal, rótulo descritivo
 * e uma indicação de tendência (subindo, descendo ou estável).
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

import React from 'react';

// ----------------------------
// Tipos e interfaces
// ----------------------------
type KpiCardProps = {
  icon: string;                  // Classe do ícone (FontAwesome)
  value: string;                 // Valor do indicador
  label: string;                 // Texto descritivo do KPI
  trend: string;                 // Texto da tendência (ex.: "+15%")
  trendDirection: 'up' | 'down' | 'stable'; // Direção da tendência
  iconBgClass: string;           // Classe de estilo para fundo do ícone
};

// ----------------------------
// Estilos dinâmicos
// ----------------------------
// Define as cores da tendência com base na direção
const trendClasses = {
  up: 'text-green-600',
  down: 'text-red-600',
  stable: 'text-gray-500',
};

// ----------------------------
// Componente KpiCard
// ----------------------------
export function KpiCard({
  icon,
  value,
  label,
  trend,
  trendDirection,
  iconBgClass,
}: KpiCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center transition-transform transform hover:-translate-y-1 relative overflow-hidden">
      
      {/* Linha colorida no topo do card */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
      
      {/* Ícone principal dentro de círculo colorido */}
      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white text-2xl mb-4 ${iconBgClass}`}>
        <i className={`fas ${icon}`}></i>
      </div>
      
      {/* Valor numérico do KPI */}
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      
      {/* Rótulo do KPI */}
      <div className="text-gray-500 mt-1">{label}</div>
      
      {/* Tendência (ícone + valor) */}
      <div className={`text-sm font-semibold mt-2 ${trendClasses[trendDirection]}`}>
        <i className={`fas fa-arrow-${trendDirection === 'stable' ? 'right' : trendDirection} mr-1`}></i>
        {trend}
      </div>
    </div>
  );
}
