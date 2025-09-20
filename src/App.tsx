/**
 * Componente Principal da Aplicação (App) - Sistema Vida Plus
 *
 * Este é o componente raiz da aplicação React. Ele serve como o ponto de
 * entrada principal para todas as outras visualizações e componentes.
 *
 * Funcionalidades principais:
 * - Atualmente, renderiza a `LoginPage` como a tela inicial do sistema.
 * - Futuramente, este componente será o local ideal para configurar o
 * sistema de rotas (utilizando React Router DOM) para gerenciar a

 * navegação entre as diferentes páginas da aplicação.
 *
 * @author Meirielli S. Sousa do N. 
 * @version 1.0.0
 * @since 2025
 */

// --- Importações ---
// Importa a página de Login para ser usada como a tela inicial.
import { LoginPage } from "./pages/Auth/LoginPage";

/**
 * A função principal do componente App.
 */
function App() {
  // Atualmente, a aplicação retorna diretamente a página de login.
  // Em uma próxima etapa, aqui ficará o gerenciador de rotas.
  return <LoginPage />;
}

// Exporta o componente App para ser utilizado pelo index.tsx
export default App;