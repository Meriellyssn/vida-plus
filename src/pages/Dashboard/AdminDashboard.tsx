/**
 * Painel Administrativo - Sistema Vida Plus
 *
 * Este componente representa a tela principal do administrador, oferecendo
 * uma visão geral do sistema com métricas chave, gráficos, gerenciamento de
 * usuários e logs de atividade.
 *
 * Funcionalidades principais:
 * - Exibição de KPIs (Key Performance Indicators) como total de pacientes e receita.
 * - Gráficos interativos para visualização de dados (consultas por mês, performance).
 * - Ações rápidas como cadastro de novos usuários através de um modal.
 * - Listagem de usuários recentes e atividades do sistema.
 * - Monitoramento de alertas de performance e status do sistema.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

// --- Importações ---
import React, { useState } from 'react';
import { Header } from '../../components/Layout/Header';
import { KpiCard } from '../../components/Dashboard/KpiCard';
import { Modal } from '../../components/common/Modal';
import { Line, Doughnut } from 'react-chartjs-2';
import '../../config/chartjs-config'; // Importa configuração global do Chart.js

// --- Dados Simulados (Mock Data) ---
/**
 * Objeto com dados simulados para preencher o dashboard do administrador.
 * Inclui informações do admin, lista de usuários, atividades recentes e alertas.
 */
const mockAdminData = {
  admin: {
    nome: 'Dr. João Admin',
    avatarUrl: 'https://i.ibb.co/4n9dyrfQ/22.png',
  },
  usuarios: [
    { id: 1, nome: 'Dra. Maria Silva', tipo: 'Médico', status: 'Ativo', dataRegistro: '2025-08-25' },
    { id: 2, nome: 'Carlos Santos', tipo: 'Paciente', status: 'Ativo', dataRegistro: '2025-08-30' },
    { id: 3, nome: 'Ana Paula Costa', tipo: 'Enfermeiro', status: 'Ativo', dataRegistro: '2025-09-01' },
    { id: 4, nome: 'Roberto Lima', tipo: 'Médico', status: 'Pendente', dataRegistro: '2025-09-02' }
  ],
  atividades: [
    { id: 1, tipo: 'Login', descricao: 'Login realizado com sucesso por Dra. Maria Silva', timestamp: '10 min atrás' },
    { id: 2, tipo: 'Cadastro', descricao: 'Novo paciente cadastrado: João Oliveira', timestamp: '15 min atrás' },
    { id: 3, tipo: 'Sistema', descricao: 'Backup automático do sistema concluído com sucesso.', timestamp: '3h atrás' },
    { id: 4, tipo: 'Erro', descricao: 'Falha ao gerar relatório de faturamento mensal.', timestamp: '1 dia atrás' }
  ],
  alertas: [
    { id: 1, tipo: 'warning', titulo: 'Uso de CPU Alto', descricao: 'O servidor está com 87% de uso de CPU.', timestamp: '20 min atrás' },
    { id: 2, tipo: 'info', titulo: 'Manutenção Programada', descricao: 'Manutenção do banco de dados agendada para domingo às 02:00.', timestamp: '2h atrás' },
    { id: 3, tipo: 'success', titulo: 'Backup Concluído', descricao: 'Backup diário realizado com sucesso.', timestamp: '8h atrás' }
  ]
};

// --- Configurações e Constantes de Estilo ---

/**
 * Mapeamento de status de usuário para classes de estilo do Tailwind CSS.
 * Facilita a aplicação de cores consistentes na interface.
 */
const statusStyles = {
  'Ativo': 'bg-green-100 text-green-700',
  'Pendente': 'bg-yellow-100 text-yellow-700',
  'Inativo': 'bg-red-100 text-red-700',
};

/**
 * Mapeamento de tipos de usuário para ícones do Font Awesome.
 * Melhora a identificação visual dos tipos de usuário na tabela.
 */
const userTypeIcons = {
  'Médico': 'fa-user-md',
  'Paciente': 'fa-user-injured',
  'Enfermeiro': 'fa-user-nurse',
  'Admin': 'fa-user-shield'
};


// --- Configurações dos Gráficos ---

/**
 * Dados para o gráfico de linha que exibe o número de consultas por mês.
 * Inclui uma função para criar um gradiente de cor na linha.
 */
const lineChartData = {
  labels: ['Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
  datasets: [
    {
      label: 'Consultas',
      data: [1250, 1420, 1580, 1653, 1810],
      borderColor: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null; // Retorna nulo se a área do gráfico não estiver pronta
        // Cria um gradiente linear usando as cores primária e secundária do sistema
        const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
        gradient.addColorStop(0, '#e8464b');
        gradient.addColorStop(1, '#6dc6d6');
        return gradient;
      },
      backgroundColor: 'rgba(232, 70, 75, 0.1)',
      fill: true,
      tension: 0.4, // Suaviza a curva da linha
    },
  ],
};

/**
 * Opções de customização para o gráfico de linha.
 */
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: false } },
};

/**
 * Dados para o gráfico de rosca (Doughnut) que mostra o uso de recursos do sistema.
 */
const doughnutChartData = {
  labels: ['CPU', 'Memória', 'Disco', 'Rede'],
  datasets: [
    {
      label: 'Uso de Recursos',
      data: [45, 32, 28, 15],
      backgroundColor: ['#e8464b', '#6dc6d6', '#f59e0b', '#10b981'],
      borderColor: '#ffffff',
      borderWidth: 3,
    },
  ],
};

/**
 * Opções de customização para o gráfico de rosca.
 */
const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' as const } },
};


export function AdminDashboard() {
  // --- Gerenciamento de Estado do Componente ---
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [chartPeriod, setChartPeriod] = useState('3M'); // Estado para o filtro de período do gráfico

  // Estados para os campos do formulário de novo usuário
  const [formNome, setFormNome] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCpf, setFormCpf] = useState('');
  const [formTelefone, setFormTelefone] = useState('');
  const [formTipoUsuario, setFormTipoUsuario] = useState('');
  const [formEspecialidade, setFormEspecialidade] = useState('');
  const [formSenha, setFormSenha] = useState('');
  const [formStatus, setFormStatus] = useState('ativo');

  // --- Funções e Manipuladores de Eventos ---

  /**
   * Abre o modal de cadastro de usuário.
   */
  const openUserModal = () => setIsUserModalOpen(true);

  /**
   * Fecha o modal de cadastro e limpa os campos do formulário.
   */
  const closeUserModal = () => {
    setIsUserModalOpen(false);
    // Limpa todos os campos do formulário ao fechar
    setFormNome('');
    setFormEmail('');
    setFormCpf('');
    setFormTelefone('');
    setFormTipoUsuario('');
    setFormEspecialidade('');
    setFormSenha('');
    setFormStatus('ativo');
  };

  /**
   * Manipula o envio do formulário de cadastro de usuário.
   * @param {React.FormEvent} e - O evento do formulário.
   */
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previne o recarregamento da página

    // Coleta os dados do formulário em um objeto
    const novoUsuario = {
      nome: formNome,
      email: formEmail,
      cpf: formCpf,
      telefone: formTelefone,
      tipo: formTipoUsuario,
      especialidade: formEspecialidade,
      status: formStatus,
    };

    console.log("Novo Usuário Cadastrado:", novoUsuario); // Exibe os dados no console para depuração
    alert(`Usuário ${formNome} cadastrado com sucesso!`);

    closeUserModal(); // Fecha o modal e limpa o formulário
  };

  /**
   * Exibe um alerta para funcionalidades ainda não implementadas.
   */
  const showNotImplemented = () => {
    alert("Funcionalidade ainda não implementada.");
  };

  // --- Renderização do Componente ---
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="container mx-auto p-4 md:p-8">
        {/* SEÇÃO DE BOAS-VINDAS E STATUS DO SISTEMA */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl mb-6 shadow-lg relative overflow-hidden">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="opacity-80">
              Centro de controle do sistema VidaPlus. Monitore operações, gerencie usuários e acompanhe métricas importantes.
            </p>
            {/* Indicadores de status do sistema */}
            <div className="mt-4 flex gap-6">
              <div className="flex items-center">
                <i className="fas fa-server mr-2"></i>
                <span>Sistema: <strong>Online</strong></span>
                <span className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-database mr-2"></i>
                <span>Database: <strong>Conectado</strong></span>
                <span className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span>
              </div>
            </div>
          </div>
          <div className="absolute right-4 top-4 bg-white/10 backdrop-blur-md p-3 rounded-lg text-center">
            <div className="text-green-300 font-semibold">
              <i className="fas fa-check-circle mr-1"></i> Operacional
            </div>
            <small className="text-white/70">Última verificação: agora</small>
          </div>
        </div>

        {/* Alerta informativo de backup */}
        <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded mb-6 flex items-center shadow">
          <i className="fas fa-info-circle mr-3 text-blue-500"></i>
          <div>
            <strong>Backup automático concluído</strong> - realizado às 03:00. Próximo agendado para amanhã.
          </div>
        </div>

        {/* SEÇÃO DE KPIS (INDICADORES CHAVE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard icon="fa-user-injured" value="2.847" label="Total de Pacientes" trend="+12% este mês" trendDirection="up" iconBgClass="bg-gradient-to-br from-primary to-secondary" />
          <KpiCard icon="fa-user-md" value="87" label="Profissionais Ativos" trend="+3 novos" trendDirection="up" iconBgClass="bg-gradient-to-br from-primary to-secondary" />
          <KpiCard icon="fa-calendar-check" value="1.653" label="Consultas este Mês" trend="+8% vs mês anterior" trendDirection="up" iconBgClass="bg-gradient-to-br from-primary to-secondary" />
          <KpiCard icon="fa-dollar-sign" value="R$ 284k" label="Receita Mensal" trend="+15% crescimento" trendDirection="up" iconBgClass="bg-gradient-to-br from-primary to-secondary" />
        </div>

        {/* PRIMEIRA LINHA DE CONTEÚDO (GRÁFICO E AÇÕES RÁPIDAS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card: Gráfico de Consultas por Mês */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex justify-between items-center">
              <span className="flex items-center"><i className="fas fa-chart-area mr-2"></i>Consultas por Mês</span>
              {/* Filtros de período para o gráfico */}
              <div className="flex space-x-1">
                <button onClick={() => setChartPeriod('3M')} className={`text-xs font-semibold py-1 px-3 rounded-full transition-colors ${chartPeriod === '3M' ? 'bg-white text-primary' : 'bg-white/20 hover:bg-white/30'}`}>3M</button>
                <button onClick={() => setChartPeriod('6M')} className={`text-xs font-semibold py-1 px-3 rounded-full transition-colors ${chartPeriod === '6M' ? 'bg-white text-primary' : 'bg-white/20 hover:bg-white/30'}`}>6M</button>
                <button onClick={() => setChartPeriod('1A')} className={`text-xs font-semibold py-1 px-3 rounded-full transition-colors ${chartPeriod === '1A' ? 'bg-white text-primary' : 'bg-white/20 hover:bg-white/30'}`}>1A</button>
              </div>
            </div>
            <div className="p-6 flex-grow">
              <div className="h-80">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </div>
          </div>

          {/* Card: Ações Administrativas */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center">
              <i className="fas fa-bolt mr-2"></i>Ações Administrativas
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <div className="grid grid-cols-2 gap-3">
                {/* Botões de atalho para ações comuns */}
                <a href="#" onClick={(e) => { e.preventDefault(); openUserModal(); }} className="block p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl"><i className="fas fa-user-plus"></i></div>
                  <div className="font-semibold text-xs mt-2">Novo Usuário</div>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); showNotImplemented(); }} className="block p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl"><i className="fas fa-chart-line"></i></div>
                  <div className="font-semibold text-xs mt-2">Relatórios</div>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); showNotImplemented(); }} className="block p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl"><i className="fas fa-cogs"></i></div>
                  <div className="font-semibold text-xs mt-2">Configurações</div>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); showNotImplemented(); }} className="block p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl"><i className="fas fa-database"></i></div>
                  <div className="font-semibold text-xs mt-2">Backup</div>
                </a>
              </div>
              {/* Botão principal de ação */}
              <button onClick={openUserModal} className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition mt-auto">
                <i className="fas fa-user-plus mr-2"></i> Cadastrar Usuário
              </button>
            </div>
          </div>
        </div>

        {/* SEGUNDA LINHA DE CONTEÚDO (TABELAS E LOGS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Card: Tabela de Usuários Recentes */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex justify-between items-center">
              <span className="flex items-center"><i className="fas fa-users mr-2"></i>Usuários Recentes</span>
              <button onClick={showNotImplemented} className="text-xs font-semibold bg-white/20 hover:bg-white/30 py-1 px-3 rounded-full transition">Ver Todos</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 font-semibold">Nome</th>
                    <th className="p-4 font-semibold">Tipo</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAdminData.usuarios.map(user => (
                    <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-800 flex items-center">
                        <i className={`fas ${userTypeIcons[user.tipo as keyof typeof userTypeIcons] || 'fa-user'} mr-3 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text`}></i>
                        {user.nome}
                      </td>
                      <td className="p-4 text-gray-600">{user.tipo}</td>
                      <td className="p-4">
                        <span className={`py-1 px-3 rounded-full font-semibold text-xs ${statusStyles[user.status as keyof typeof statusStyles]}`}>{user.status}</span>
                      </td>
                      <td className="p-4 text-gray-600">{new Date(user.dataRegistro).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card: Lista de Atividades do Sistema */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex justify-between items-center">
              <span className="flex items-center"><i className="fas fa-history mr-2"></i>Atividades do Sistema</span>
              <button onClick={showNotImplemented} className="text-xs font-semibold bg-white/20 hover:bg-white/30 py-1 px-3 rounded-full transition">Ver Relatórios</button>
            </div>
            <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
              {mockAdminData.atividades.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-3 last:border-0">
                  <div className="text-gray-400 mt-1">
                    <i className={`fas ${item.tipo === 'Login' ? 'fa-sign-in-alt' : item.tipo === 'Cadastro' ? 'fa-user-plus' : item.tipo === 'Sistema' ? 'fa-cogs' : 'fa-exclamation-triangle'}`}></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.descricao}</p>
                    <p className="text-xs text-gray-500">{item.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TERCEIRA LINHA DE CONTEÚDO (PERFORMANCE E ALERTAS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Card: Gráfico de Performance do Sistema */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center">
              <i className="fas fa-tachometer-alt mr-2"></i>Performance do Sistema
            </div>
            <div className="p-6 flex-grow flex items-center justify-center">
              <div className="h-64 w-64">
                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
              </div>
            </div>
          </div>

          {/* Card: Lista de Alertas do Sistema */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center">
              <i className="fas fa-exclamation-triangle mr-2"></i>Alertas do Sistema
            </div>
            <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
              {mockAdminData.alertas.map(item => (
                <div key={item.id} className={`p-3 rounded-lg border-l-4 ${item.tipo === 'warning' ? 'bg-yellow-50 border-yellow-400' : item.tipo === 'info' ? 'bg-blue-50 border-blue-400' : 'bg-green-50 border-green-400'}`}>
                  <p className="font-semibold text-gray-800">{item.titulo}</p>
                  <p className="text-sm text-gray-600">{item.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* MODAL PARA CADASTRO DE NOVO USUÁRIO */}
      <Modal isOpen={isUserModalOpen} onClose={closeUserModal} title="Cadastrar Novo Usuário" size="4xl">
        <form onSubmit={handleUserSubmit}>
          <div className="space-y-4">
            {/* Linha 1: Nome e Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input type="text" id="nomeCompleto" className="w-full p-2 border border-gray-300 rounded-md" value={formNome} onChange={(e) => setFormNome(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} required />
              </div>
            </div>

            {/* Linha 2: CPF e Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input type="text" id="cpf" placeholder="000.000.000-00" className="w-full p-2 border border-gray-300 rounded-md" value={formCpf} onChange={(e) => setFormCpf(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input type="text" id="telefone" placeholder="(00) 00000-0000" className="w-full p-2 border border-gray-300 rounded-md" value={formTelefone} onChange={(e) => setFormTelefone(e.target.value)} required />
              </div>
            </div>

            {/* Linha 3: Tipo de Usuário e Especialidade (condicional) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tipoUsuario" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuário</label>
                <select id="tipoUsuario" className="w-full p-2 border border-gray-300 rounded-md" value={formTipoUsuario} onChange={(e) => setFormTipoUsuario(e.target.value)} required>
                  <option value="">Selecione o tipo</option>
                  <option value="paciente">Paciente</option>
                  <option value="medico">Médico</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              {/* Campo de especialidade aparece apenas se o tipo for "médico" */}
              {formTipoUsuario === 'medico' && (
                <div>
                  <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                  <select id="especialidade" className="w-full p-2 border border-gray-300 rounded-md" value={formEspecialidade} onChange={(e) => setFormEspecialidade(e.target.value)} required>
                    <option value="cardiologia">Cardiologia</option>
                    <option value="dermatologia">Dermatologia</option>
                    <option value="ginecologia">Ginecologia</option>
                    <option value="neurologia">Neurologia</option>
                    <option value="ortopedia">Ortopedia</option>
                    <option value="pediatria">Pediatria</option>
                    <option value="clinica-geral">Clínica Geral</option>
                  </select>
                </div>
              )}
            </div>

            {/* Linha 4: Senha e Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">Senha Temporária</label>
                <input type="password" id="senha" className="w-full p-2 border border-gray-300 rounded-md" value={formSenha} onChange={(e) => setFormSenha(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select id="status" className="w-full p-2 border border-gray-300 rounded-md" value={formStatus} onChange={(e) => setFormStatus(e.target.value)}>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botões de Ação do Modal */}
          <div className="mt-8 pt-4 border-t flex justify-end space-x-3">
            <button type="button" onClick={closeUserModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">Cadastrar Usuário</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}