/**
 * Componente ActionCard - Sistema Vida Plus
 *
 * Este componente representa um card de ação clicável, utilizado para
 * destacar funcionalidades ou atalhos no sistema. O card exibe um ícone,
 * um título e pode disparar uma ação personalizada ao ser clicado.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

// ----------------------------
// Tipos e interfaces
// ----------------------------
type ActionCardProps = {
  icon: string;         // Classe do ícone (FontAwesome)
  title: string;        // Texto do card
  onClick?: () => void; // Função opcional executada ao clicar
};

// ----------------------------
// Componente ActionCard
// ----------------------------
export function ActionCard({ icon, title, onClick }: ActionCardProps) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault(); // Evita redirecionamento padrão do link
        if (onClick) onClick(); // Executa a função passada (se existir)
      }}
      className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition-all transform hover:-translate-y-1 hover:shadow-lg h-full"
    >
      {/* Ícone dentro de um círculo colorido */}
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl mb-3">
        <i className={`fas ${icon}`}></i>
      </div>

      {/* Texto/Título do card */}
      <div className="font-bold text-gray-700 text-sm">{title}</div>
    </a>
  );
}
