/**
 * Página de Agendamentos - Sistema Vida Plus
 *
 * Este componente representa a página onde o paciente poderá visualizar
 * todos os seus agendamentos, tanto futuros quanto o histórico de consultas
 * e exames já realizados.
 *
 * Funcionalidades futuras:
 * - Listagem completa de todos os agendamentos.
 * - Filtros por data, especialidade ou status (confirmado, pendente, finalizado).
 * - Opções para cancelar ou reagendar consultas futuras.
 * - Acesso a detalhes de cada agendamento.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

// --- Importações ---
import { Header } from '../../components/Layout/Header';

export function AgendamentosPage() {
  // --- Renderização do Componente ---
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cabeçalho da Página */}
      <Header />

      {/* Conteúdo Principal */}
      <main className="container mx-auto p-6">
        {/* Título da Página */}
        <h1 className="text-3xl font-bold text-gray-800">Meus Agendamentos</h1>
        
        {/* Placeholder para a lista de agendamentos */}
        <p className="mt-2 text-gray-600">
          A lista completa de agendamentos (futuros e passados) virá aqui.
        </p>
      </main>
    </div>
  );
}