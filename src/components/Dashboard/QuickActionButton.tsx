/**
 * Componente QuickActionButton - Sistema Vida Plus
 *
 * Este componente representa um botão de ação rápida,
 * utilizado para atalhos no sistema. Ele exibe um ícone
 * dentro de um círculo colorido e um rótulo abaixo.
 *
 * Pode disparar uma função personalizada ao ser clicado.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

// ----------------------------
// Tipos e interfaces
// ----------------------------
type ButtonProps = {
  icon: string;         // Classe do ícone (FontAwesome)
  label: string;        // Texto do botão
  onClick?: () => void; // Função opcional executada ao clicar
};

// ----------------------------
// Componente QuickActionButton
// ----------------------------
export function QuickActionButton({ icon, label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-center p-2 flex flex-col items-center justify-center space-y-2 rounded-lg hover:bg-gray-100 transition-colors w-full"
    >
      {/* Ícone dentro de círculo colorido */}
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl shadow-md">
        <i className={`fas ${icon}`}></i>
      </div>

      {/* Rótulo do botão */}
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </button>
  );
}
