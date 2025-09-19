/**
 * Página de Usuários - Sistema Vida Plus
 *
 * Esta página representa a seção de gerenciamento de usuários,
 * destinada a administradores do sistema. 
 *
 * Estrutura:
 * - Cabeçalho fixo (Header).
 * - Conteúdo principal com título e descrição inicial.
 * - Espaço reservado para a implementação futura do CRUD de usuários.
 *
 * Observação: futuramente, podemos criar um componente de Layout
 * para evitar repetição do Header em todas as páginas.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

import { Header } from '../../components/Layout/Header';

// Página de gerenciamento de usuários (estrutura inicial)
export function UsersPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cabeçalho fixo com navegação */}
      <Header />

      {/* Conteúdo principal */}
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Página de Usuários</h1>
        <p className="mt-2 text-gray-600">
          O conteúdo completo de gerenciamento de usuários virá aqui.
        </p>
      </main>
    </div>
  );
}
