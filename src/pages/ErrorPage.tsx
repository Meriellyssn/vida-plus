/**
 * Página de Erro - Sistema Vida Plus
 *
 * Este componente é renderizado como uma página de fallback sempre que
 * a aplicação encontra um erro de rota, como uma página não encontrada (erro 404).
 * Ele utiliza o hook `useRouteError` do React Router DOM para capturar
 * e exibir detalhes sobre o erro ocorrido.
 *
 * Funcionalidades principais:
 * - Apresenta uma mensagem de erro amigável para o usuário.
 * - Exibe detalhes técnicos do erro para fins de depuração.
 * - Oferece um link claro para que o usuário possa retornar à página inicial
 * e continuar a navegação.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

// --- Importações ---
import { useRouteError, Link } from "react-router-dom";

// --- Tipos ---
/**
 * Interface para ajudar o TypeScript a entender o formato do objeto de erro
 * retornado pelo hook `useRouteError`.
 */
interface RouteError {
  statusText?: string;
  message?: string;
}

export function ErrorPage() {
  // --- Hooks ---
  /**
   * Captura o objeto de erro da rota. Este hook é fornecido pelo React Router
   * para acessar informações sobre o erro que causou a renderização desta página.
   */
  const error = useRouteError() as RouteError;
  console.error(error); // Loga o erro completo no console para depuração

  // --- Renderização do Componente ---
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
      {/* Ícone de Alerta */}
      <i className="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>

      {/* Título Principal */}
      <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>

      {/* Mensagem para o Usuário */}
      <p className="text-lg text-gray-600 mt-2">
        Desculpe, um erro inesperado ocorreu. A página que você procura não foi encontrada.
      </p>

      {/* Detalhes do Erro */}
      <p className="text-gray-500 mt-2">
        <i>{error.statusText || error.message}</i>
      </p>

      {/* Link de Retorno */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}