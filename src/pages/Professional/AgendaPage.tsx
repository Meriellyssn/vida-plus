/**
 * Página da Agenda Profissional - Sistema Vida Plus
 *
 * Este componente representa a página onde o profissional de saúde poderá
 * visualizar e gerenciar sua agenda de trabalho completa.
 *
 * Funcionalidades futuras:
 * - Exibição da agenda em diferentes formatos (diário, semanal, mensal).
 * - Detalhamento de cada consulta ou procedimento agendado.
 * - Ferramentas para adicionar novos agendamentos, bloqueios de horário e remarcações.
 * - Integração com o prontuário do paciente para acesso rápido.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

// --- Importações ---
import { Header } from '../../components/Layout/Header';

export function AgendaPage() {
  // --- Renderização do Componente ---
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cabeçalho da Página */}
      <Header />

      {/* Conteúdo Principal */}
      <main className="container mx-auto p-6">
        {/* Título da Página */}
        <h1 className="text-3xl font-bold text-gray-800">Agenda Profissional</h1>
        
        {/* Placeholder para o conteúdo da agenda */}
        <p className="mt-2 text-gray-600">
          O conteúdo completo da agenda, com visualizações diária, semanal e mensal, virá aqui.
        </p>
      </main>
    </div>
  );
}