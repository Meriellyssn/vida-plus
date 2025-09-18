// src/pages/Admin/ReportsPage.tsx
import { Header } from '../../components/Layout/Header';

// Verifique se a função se chama "ReportsPage" e tem o "export"
export function ReportsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header/>
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Página de Relatórios</h1>
        <p className="mt-2 text-gray-600">Os relatórios e gráficos do sistema virão aqui.</p>
      </main>
    </div>
  );
}