// src/pages/Patient/AgendamentosPage.tsx
import { Header } from '../../components/Layout/Header';


export function AgendamentosPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header/>
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Meus Agendamentos</h1>
        <p className="mt-2 text-gray-600">A lista completa de agendamentos (futuros e passados) virá aqui.</p>
      </main>
    </div>
  );
}