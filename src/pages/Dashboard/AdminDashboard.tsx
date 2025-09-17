// src/pages/Dashboard/AdminDashboard.tsx
import React, { useState } from 'react';
import { Header } from '../../components/Layout/Header';
import { KpiCard } from '../../components/Dashboard/KpiCard';
import { QuickActionButton } from '../../components/Dashboard/QuickActionButton';
import { Modal } from '../../components/common/Modal';

// 1. Importe a configuração do Chart.js e o componente de Gráfico de Linha
import '../../config/chartjs-config';
import { Line, Doughnut } from 'react-chartjs-2';

// Dados simulados para o admin
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


// NOVO MAPA DE ESTILOS PARA STATUS
const statusStyles = {
  'Ativo': 'bg-green-100 text-green-700',
  'Pendente': 'bg-yellow-100 text-yellow-700',
  'Inativo': 'bg-red-100 text-red-700',
};
// 2. Defina os dados e as opções para o nosso gráfico
const lineChartData = {
  labels: ['Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
  datasets: [
    {
      label: 'Consultas',
      data: [1250, 1420, 1580, 1653, 1810],
      borderColor: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          // Gradiente ainda não pode ser criado
          return null;
        }

        // Cria um gradiente linear que vai da esquerda para a direita do gráfico
        const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);

        // Adiciona as paradas de cor, usando as cores do nosso design
        gradient.addColorStop(0, '#e8464b'); // Nossa cor --primary-color
        gradient.addColorStop(1, '#6dc6d6'); // Nossa cor --secondary-color

        return gradient;
      },
      backgroundColor: 'rgba(232, 70, 75, 0.1)',
      fill: true,
      tension: 0.4, // Deixa a linha mais suave
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Esconde a legenda "Consultas"
    },
  },
  scales: {
    y: {
      beginAtZero: false,
    },
  },
};

// --- BLOCO PARA O GRÁFICO ---
const doughnutChartData = {
  labels: ['CPU', 'Memória', 'Disco', 'Rede'],
  datasets: [
    {
      label: 'Uso de Recursos',
      data: [45, 32, 28, 15], // Valores em porcentagem
      backgroundColor: [
        '#e8464b',
        '#6dc6d6',
        '#f59e0b',
        '#10b981'
      ],
      borderColor: '#ffffff',
      borderWidth: 3,
    },
  ],
};

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const, // 'as const' ajuda o TypeScript
    },
  },
};
// MAPA DE ÍCONES PARA TIPOS DE USUÁRIO
const userTypeIcons = {
  'Médico': 'fa-user-md',
  'Paciente': 'fa-user-injured',
  'Enfermeiro': 'fa-user-nurse',
  'Admin': 'fa-user-shield'
};

export function AdminDashboard() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userType, setUserType] = useState(''); // Estado para o campo 'Tipo de Usuário'
  const [chartPeriod, setChartPeriod] = useState('3M');

  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setUserType(''); // Limpa o tipo de usuário ao fechar o modal
  };

  const showNotImplemented = () => {
    alert("Funcionalidade ainda não implementada.");
  };

  const adminNavLinks = [
  { path: '/dashboard-admin', label: 'Início', icon: 'fa-home' },
  { path: '/usuarios', label: 'Usuários', icon: 'fa-users' },
  { path: '/relatorios', label: 'Relatórios', icon: 'fa-chart-bar' },
  { path: '/sistema', label: 'Sistema', icon: 'fa-cog' },
];
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
      userName={mockAdminData.admin.nome} 
      userAvatarUrl={mockAdminData.admin.avatarUrl}
      navLinks={adminNavLinks}/>

      <main className="container mx-auto p-4 md:p-8">
        {/* SEÇÃO DE BOAS-VINDAS E KPIS */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl mb-6 shadow-lg relative overflow-hidden">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="opacity-80">
              Centro de controle do sistema VidaPlus. Monitore operações, gerencie usuários e acompanhe métricas importantes.
            </p>
            <div className="mt-4 flex gap-6">
              <div className="flex items-center">
                <i className="fas fa-server mr-2"></i>
                <span>
                  Sistema: <strong>Online</strong>
                </span>
                <span className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-database mr-2"></i>
                <span>
                  Database: <strong>Conectado</strong>
                </span>
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

        {/* Alert Info */}
        <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded mb-6 flex items-center shadow">
          <i className="fas fa-info-circle mr-3 text-blue-500"></i>
          <div>
            <strong>Backup automático concluído</strong> - realizado às 03:00.
            Próximo agendado para amanhã.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard icon="fa-user-injured" value="2.847" label="Total de Pacientes" trend="+12% este mês" trendDirection="up" iconBgClass="bg-gradient-to-br from-primary to-secondary" />
          <KpiCard icon="fa-user-md" value="87" label="Profissionais Ativos" trend="+3 novos" trendDirection="up" iconBgClass="bg-gradient-to-br from-primary to-secondary" />
          <KpiCard icon="fa-calendar-check" value="1.653" label="Consultas este Mês" trend="+8% vs mês anterior" trendDirection="up" iconBgClass="bg-gradient-to-br from-primary to-secondary" />
          <KpiCard icon="fa-dollar-sign" value="R$ 284k" label="Receita Mensal" trend="+15% crescimento" trendDirection="up" iconBgClass="bg-gradient-to-br from-primary to-secondary" />
        </div>

        {/* PRIMEIRA LINHA DE CONTEÚDO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna do Gráfico */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            {/* Cabeçalho do Card */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex justify-between items-center">
              <span className="flex items-center">
                <i className="fas fa-chart-area mr-2"></i>Consultas por Mês
              </span>
              {/* Botões de Filtro */}
              <div className="flex space-x-1">
                <button
                  onClick={() => setChartPeriod('3M')}
                  className={`text-xs font-semibold py-1 px-3 rounded-full transition-colors ${chartPeriod === '3M' ? 'bg-white text-primary' : 'bg-white/20 hover:bg-white/30'}`}
                >
                  3M
                </button>
                <button
                  onClick={() => setChartPeriod('6M')}
                  className={`text-xs font-semibold py-1 px-3 rounded-full transition-colors ${chartPeriod === '6M' ? 'bg-white text-primary' : 'bg-white/20 hover:bg-white/30'}`}
                >
                  6M
                </button>
                <button
                  onClick={() => setChartPeriod('1A')}
                  className={`text-xs font-semibold py-1 px-3 rounded-full transition-colors ${chartPeriod === '1A' ? 'bg-white text-primary' : 'bg-white/20 hover:bg-white/30'}`}
                >
                  1A
                </button>
              </div>
            </div>

            {/* Corpo do Card */}
            <div className="p-6 flex-grow">
              <div className="h-80">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </div>
          </div>

          {/* AÇÕES ADMINISTRATIVAS */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            {/* Cabeçalho do Card */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center">
              <i className="fas fa-bolt mr-2"></i>Ações Administrativas
            </div>

            {/* Corpo do Card */}
            <div className="p-4 flex-grow flex flex-col">
              <div className="grid grid-cols-2 gap-3">
                {/* Botão Novo Usuário */}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); openUserModal(); }}
                  className="block p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="font-semibold text-xs mt-2">Novo Usuário</div>
                </a>

                {/* Botão Relatórios */}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); showNotImplemented(); }}
                  className="block p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div className="font-semibold text-xs mt-2">Relatórios</div>
                </a>

                {/* Botão Configurações */}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); showNotImplemented(); }}
                  className="block p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <div className="font-semibold text-xs mt-2">Configurações</div>
                </a>

                {/* Botão Backup */}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); showNotImplemented(); }}
                  className="block p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl">
                    <i className="fas fa-database"></i>
                  </div>
                  <div className="font-semibold text-xs mt-2">Backup</div>
                </a>
              </div>

              {/* Botão Principal */}
              <button
                onClick={openUserModal}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition mt-auto"
              >
                <i className="fas fa-user-plus mr-2"></i>
                Cadastrar Usuário
              </button>
            </div>
          </div>
        </div>

        {/* SEGUNDA LINHA DE CONTEÚDO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Tabela de Usuários Recentes */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            {/* Cabeçalho do Card */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex justify-between items-center">
              <span className="flex items-center">
                <i className="fas fa-users mr-2"></i>Usuários Recentes
              </span>
              <button
                onClick={showNotImplemented}
                className="text-xs font-semibold bg-white/20 hover:bg-white/30 py-1 px-3 rounded-full transition"
              >
                Ver Todos
              </button>
            </div>

            {/* Corpo do Card (Tabela) */}
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
                        {/* Ícone com Gradiente */}
                        <i className={`fas ${userTypeIcons[user.tipo as keyof typeof userTypeIcons] || 'fa-user'} mr-3 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text`}></i>
                        {user.nome}
                      </td>
                      <td className="p-4 text-gray-600">{user.tipo}</td>
                      <td className="p-4">
                        <span className={`py-1 px-3 rounded-full font-semibold text-xs ${statusStyles[user.status as keyof typeof statusStyles]}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{new Date(user.dataRegistro).toLocaleDateString('pt-BR')}</td> {/* <-- Nova célula */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lista de Atividades do Sistema */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            {/* Cabeçalho do Card */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex justify-between items-center">
              <span className="flex items-center">
                <i className="fas fa-history mr-2"></i>Atividades do Sistema
              </span>
              <button
                onClick={showNotImplemented}
                className="text-xs font-semibold bg-white/20 hover:bg-white/30 py-1 px-3 rounded-full transition"
              >
                Ver Relatórios
              </button>
            </div>
            {/* Corpo do Card */}
            <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
              {mockAdminData.atividades.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-3 last:border-0">
                  <div className="text-gray-400 mt-1">
                    <i className={`fas ${item.tipo === 'Login' ? 'fa-sign-in-alt' :
                      item.tipo === 'Cadastro' ? 'fa-user-plus' :
                        item.tipo === 'Sistema' ? 'fa-cogs' : 'fa-exclamation-triangle'
                      }`}></i>
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

        {/* TERCEIRA LINHA DE CONTEÚDO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Gráfico de Performance */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            {/* Cabeçalho do Card */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center">
              <i className="fas fa-tachometer-alt mr-2"></i>Performance do Sistema
            </div>
            {/* Corpo do Card */}
            <div className="p-6 flex-grow flex items-center justify-center">
              <div className="h-64 w-64">
                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
              </div>
            </div>
          </div>

          {/* Lista de Alertas do Sistema */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            {/* Cabeçalho do Card */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center">
              <i className="fas fa-exclamation-triangle mr-2"></i>Alertas do Sistema
            </div>
            {/* Corpo do Card */}
            <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
              {mockAdminData.alertas.map(item => (
                <div key={item.id} className={`p-3 rounded-lg border-l-4 ${item.tipo === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  item.tipo === 'info' ? 'bg-blue-50 border-blue-400' :
                    'bg-green-50 border-green-400'
                  }`}>
                  <p className="font-semibold text-gray-800">{item.titulo}</p>
                  <p className="text-sm text-gray-600">{item.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Modal
        isOpen={isUserModalOpen}
        onClose={closeUserModal}
        title="Cadastrar Novo Usuário"
        size="4xl"
      >
        <form onSubmit={(e) => { e.preventDefault(); alert('Usuário Salvo!'); closeUserModal(); }}>
          <div className="space-y-4">
            {/* Linha 1: Nome e Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><i className="fas fa-user mr-2 text-gray-400"></i>Nome Completo</label>
                <input type="text" id="nomeCompleto" className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><i className="fas fa-envelope mr-2 text-gray-400"></i>Email</label>
                <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
            </div>

            {/* Linha 2: CPF e Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><i className="fas fa-id-card mr-2 text-gray-400"></i>CPF</label>
                <input type="text" id="cpf" placeholder="000.000.000-00" className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="telefone" className="text-sm font-medium text-gray-700 mb-1 flex items-center"><i className="fas fa-phone mr-2 text-gray-400"></i>Telefone</label>
                <input type="text" id="telefone" placeholder="(00) 00000-0000" className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
            </div>

            {/* Linha 3: Tipo e Especialidade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tipoUsuario" className="text-sm font-medium text-gray-700 mb-1 flex items-center"><i className="fas fa-user-tag mr-2 text-gray-400"></i>Tipo de Usuário</label>
                <select id="tipoUsuario" className="w-full p-2 border border-gray-300 rounded-md" value={userType} onChange={(e) => setUserType(e.target.value)} required>
                  <option value="">Selecione o tipo</option>
                  <option value="paciente">Paciente</option>
                  <option value="medico">Médico</option>
                  <option value="enfermeiro">Enfermeiro</option>
                  <option value="recepcionista">Recepcionista</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              {/* Campo condicional para Especialidade */}
              {userType === 'medico' && (
                <div>
                  <label htmlFor="especialidade" className="text-sm font-medium text-gray-700 mb-1 flex items-center"><i className="fas fa-stethoscope mr-2 text-gray-400"></i>Especialidade</label>
                  <select id="especialidade" className="w-full p-2 border border-gray-300 rounded-md" required>
                    <option value="">Selecione uma especialidade</option>
                    <option value="cardiologia">Cardiologia</option>
                    <option value="dermatologia">Dermatologia</option>
                    <option value="ginecologia">Ginecologia</option>
                    <option value="neurologia">Neurologia</option>
                    <option value="ortopedia">Ortopedia</option>
                    <option value="pediatria">Pediatria</option>
                    <option value="clinica-geral">Clínica Geral</option>
                    <option value="endocrinologia">Endocrinologia</option>
                    <option value="oftalmologia">Oftalmologia</option>
                    <option value="psiquiatria">Psiquiatria</option>
                    {/* Adicione outras aqui */}
                  </select>
                </div>
              )}
            </div>

            {/* Linha 4: Senha e Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="senha" className="text-sm font-medium text-gray-700 mb-1 flex items-center"><i className="fas fa-lock mr-2 text-gray-400"></i>Senha Temporária</label>
                <div className="flex">
                  <input type="password" id="senha" className="w-full p-2 border border-gray-300 rounded-l-md" required />
                  <button type="button" onClick={() => alert('Nova senha gerada!')} className="px-3 border-y border-r border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-r-md">
                    <i className="fas fa-random text-gray-600"></i>
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1 flex items-center"><i className="fas fa-toggle-on mr-2 text-gray-400"></i>Status</label>
                <select id="status" className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="pendente">Pendente</option>
                </select>
              </div>
            </div>

            {/* Observações */}
            <div>
              <label htmlFor="observacoes" className="text-sm font-medium text-gray-700 mb-1 flex items-center"><i className="fas fa-comment mr-2 text-gray-400"></i>Observações</label>
              <textarea id="observacoes" rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Observações sobre o usuário (opcional)"></textarea>
            </div>
          </div>

          {/* Botões do Footer */}
          <div className="mt-8 pt-4 border-t flex justify-end space-x-3">
            <button type="button" onClick={closeUserModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
              <i className="fas fa-times mr-2"></i>Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center">
              <i className="fas fa-save mr-2"></i>Cadastrar Usuário
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}