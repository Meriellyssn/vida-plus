
import { Header } from '../../components/Layout/Header';

export function HistoricoPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Meu Histórico Médico</h1>
        <p className="mt-2 text-gray-600">O conteúdo completo para gerenciar o histórico medicos virá aqui.</p>
      </main>
    </div>
  );
}