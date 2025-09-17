// src/pages/Admin/ReportsPage.tsx
import { Header } from '../../components/Layout/Header';

// Lista de links para o header desta página
const adminNavLinks = [
  { path: '/dashboard-admin', label: 'Início', icon: 'fa-home' },
  { path: '/usuarios', label: 'Usuários', icon: 'fa-users' },
  { path: '/relatorios', label: 'Relatórios', icon: 'fa-chart-bar' },
  { path: '/sistema', label: 'Sistema', icon: 'fa-cog' },
];

// Verifique se a função se chama "ReportsPage" e tem o "export"
export function ReportsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        userName="Dr. João Admin" // Dados temporários
        userAvatarUrl="https://i.ibb.co/4n9dyrfQ/22.png" // Dados temporários
        navLinks={adminNavLinks} 
      />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Página de Relatórios</h1>
        <p className="mt-2 text-gray-600">Os relatórios e gráficos do sistema virão aqui.</p>
      </main>
    </div>
  );
}