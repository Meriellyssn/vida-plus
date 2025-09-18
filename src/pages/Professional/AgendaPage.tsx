// src/pages/Professional/AgendaPage.tsx
import { Header } from '../../components/Layout/Header';

// Verifique se a função se chama "AgendaPage" e tem o "export"
export function AgendaPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header/>
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Agenda Profissional</h1>
        <p className="mt-2 text-gray-600">O conteúdo completo da agenda virá aqui.</p>
      </main>
    </div>
  );
}