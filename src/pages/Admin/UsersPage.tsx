// (No futuro, podemos criar um componente de Layout para evitar repetir o Header)
import { Header } from '../../components/Layout/Header';


export function UsersPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header/>
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Página de Usuários</h1>
        <p className="mt-2 text-gray-600">O conteúdo completo de gerenciamento de usuários virá aqui.</p>
      </main>
    </div>
  );
}