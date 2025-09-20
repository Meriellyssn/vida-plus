import { Header } from '../../components/Layout/Header';

export function SistemPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestão do Sistema</h1>
        <p className="mt-2 text-gray-600">O conteúdo completo para gerenciar o sistema virá aqui.</p>
      </main>
    </div>
  );
}