import { useRouteError, Link } from "react-router-dom";

// Interface para ajudar o TypeScript a entender o formato do erro
interface RouteError {
  statusText?: string;
  message?: string;
}

export function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
      <i className="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
      <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
      <p className="text-lg text-gray-600 mt-2">
        Desculpe, um erro inesperado ocorreu. A página que você procura não foi encontrada.
      </p>
      <p className="text-gray-500 mt-2">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link 
        to="/" 
        className="mt-6 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}