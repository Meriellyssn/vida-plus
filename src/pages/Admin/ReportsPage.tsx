/**
 * Página de Relatórios - Sistema Vida Plus
 *
 * Esta página representa a seção de relatórios do sistema,
 * onde serão exibidos gráficos, métricas e análises
 * relacionadas à gestão hospitalar.
 *
 * Estrutura:
 * - Cabeçalho fixo (Header).
 * - Conteúdo principal com título e descrição inicial.
 * - Espaço reservado para futuros gráficos e relatórios.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

import { Header } from '../../components/Layout/Header';

// Página de relatórios (apenas estrutura inicial)
export function ReportsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cabeçalho fixo com menu de navegação */}
      <Header />

      {/* Conteúdo principal */}
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Página de Relatórios
        </h1>
        <p className="mt-2 text-gray-600">
          Os relatórios e gráficos do sistema virão aqui.
        </p>
      </main>
    </div>
  );
}
