// (No futuro, podemos criar um componente de Layout para evitar repetir o Header)
import { Header } from '../../components/Layout/Header';

// Defina os links para o header desta página
const adminNavLinks = [
  { path: '/dashboard-admin', label: 'Início', icon: 'fa-home' },
  { path: '/usuarios', label: 'Usuários', icon: 'fa-users' },
  { path: '/relatorios', label: 'Relatórios', icon: 'fa-chart-bar' },
  { path: '/sistema', label: 'Sistema', icon: 'fa-cog' },
];

export function UsersPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        userName="Dr. João Admin" // Dados temporários
        userAvatarUrl="https://i.ibb.co/4n9dyrfQ/22.png" // Dados temporários
        navLinks={adminNavLinks} 
      />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Página de Usuários</h1>
        <p className="mt-2 text-gray-600">O conteúdo completo de gerenciamento de usuários virá aqui.</p>
      </main>
    </div>
  );
}