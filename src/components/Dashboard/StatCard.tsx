/**
 * Componente StatCard - Sistema Vida Plus
 *
 * Este componente representa um card estatístico simples,
 * utilizado para exibir valores numéricos ou informações
 * resumidas no dashboard.
 *
 * Ele contém um ícone, um valor em destaque e um rótulo
 * descritivo, além de uma linha de gradiente no topo para
 * dar identidade visual ao card.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

// ----------------------------
// Tipos e interfaces
// ----------------------------
type StatCardProps = {
  icon: string;             // Nome do ícone do FontAwesome (ex.: 'fa-calendar-check')
  value: string | number;   // Valor principal exibido
  label: string;            // Texto descritivo do valor
};

// ----------------------------
// Componente StatCard
// ----------------------------
export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center transition-transform transform hover:-translate-y-1 relative overflow-hidden">
      
      {/* Linha de gradiente no topo do card */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>

      {/* Ícone em círculo colorido */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl mb-4">
        <i className={`fas ${icon}`}></i>
      </div>

      {/* Valor principal */}
      <div className="text-3xl font-bold text-gray-800">{value}</div>

      {/* Rótulo descritivo */}
      <div className="text-gray-500 mt-1">{label}</div>
    </div>
  );
}
