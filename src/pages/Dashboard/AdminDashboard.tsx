// src/pages/Dashboard/AdminDashboard.tsx
import { Header } from '../../components/Layout/Header';
import { KpiCard } from '../../components/Dashboard/KpiCard';
import { QuickActionButton } from '../../components/Dashboard/QuickActionButton';

// 1. Importe a configuração do Chart.js e o componente de Gráfico de Linha
import '../../config/chartjs-config';
import { Line, Doughnut } from 'react-chartjs-2';

// Dados simulados para o admin
const mockAdminData = {
  admin: {
    nome: 'Dr. João Admin',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face',
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
      borderColor: '#e8464b', // Cor primária
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
  labels: ['CPU', 'Memória', 'Disco'],
  datasets: [
    {
      label: 'Uso de Recursos',
      data: [65, 25, 10], // Valores em porcentagem
      backgroundColor: [
        '#e8464b', // primary-color
        '#6dc6d6', // secondary-color
        '#f59e0b', // accent-color
      ],
      borderColor: '#ffffff',
      borderWidth: 2,
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

export function AdminDashboard() {
  const showNotImplemented = () => {
    alert("Funcionalidade ainda não implementada.");
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header userName={mockAdminData.admin.nome} userAvatarUrl={mockAdminData.admin.avatarUrl} />

      <main className="container mx-auto p-4 md:p-8">
        {/* SEÇÃO DE BOAS-VINDAS E KPIS (continua igual) */}
        {/* Welcome Section */}
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
            <KpiCard icon="fa-user-injured" value="2.847" label="Total de Pacientes" trend="+12% este mês" trendDirection="up" iconBgClass="bg-blue-500" />
            <KpiCard icon="fa-user-md" value="87" label="Profissionais Ativos" trend="+3 novos" trendDirection="up" iconBgClass="bg-green-500" />
            <KpiCard icon="fa-calendar-check" value="1.653" label="Consultas este Mês" trend="+8% vs mês anterior" trendDirection="up" iconBgClass="bg-yellow-500" />
            <KpiCard icon="fa-dollar-sign" value="R$ 284k" label="Receita Mensal" trend="+15% crescimento" trendDirection="up" iconBgClass="bg-red-500" />
        </div>

        {/* PRIMEIRA LINHA DE CONTEÚDO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna do Gráfico */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Consultas por Mês</h2>
            <div className="h-80">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

          {/* Coluna de Ações Rápidas */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              <i className="fas fa-bolt mr-2 text-primary"></i>
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <QuickActionButton icon="fa-user-plus" label="Novo Usuário" onClick={showNotImplemented} />
              <QuickActionButton icon="fa-chart-line" label="Relatórios" onClick={showNotImplemented} />
              <QuickActionButton icon="fa-cogs" label="Sistema" onClick={showNotImplemented} />
              <QuickActionButton icon="fa-database" label="Backup" onClick={showNotImplemented} />
            </div>
          </div>
        </div>

        {/* SEGUNDA LINHA DE CONTEÚDO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Tabela de Usuários Recentes */}
          <div className="bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 p-6 border-b">
              <i className="fas fa-users mr-2 text-primary"></i>
              Usuários Recentes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 font-semibold">Nome</th>
                    <th className="p-4 font-semibold">Tipo</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAdminData.usuarios.map(user => (
                    <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-800">{user.nome}</td>
                      <td className="p-4 text-gray-600">{user.tipo}</td>
                      <td className="p-4">
                        <span className={`py-1 px-3 rounded-full font-semibold text-xs ${statusStyles[user.status as keyof typeof statusStyles]}`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lista de Atividades do Sistema */}
          <div className="bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 p-6 border-b">
              <i className="fas fa-history mr-2 text-primary"></i>
              Atividades do Sistema
            </h2>
            <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
              {mockAdminData.atividades.map(item => (
                <div key={item.id} className="flex gap-4">
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

        {/* TERCEIRA LINHA DE CONTEÚDO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Gráfico de Performance */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              <i className="fas fa-tachometer-alt mr-2 text-primary"></i>
              Performance do Sistema
            </h2>
            <div className="h-64"> {/* Altura para o gráfico de pizza */}
              <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
            </div>
          </div>

          {/* Lista de Alertas do Sistema */}
          <div className="bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 p-6 border-b">
              <i className="fas fa-exclamation-triangle mr-2 text-primary"></i>
              Alertas do Sistema
            </h2>
            <div className="p-6 space-y-4 max-h-64 overflow-y-auto">
              {mockAdminData.alertas.map(item => (
                <div key={item.id} className={`p-3 rounded-lg border-l-4 ${
                    item.tipo === 'warning' ? 'bg-yellow-50 border-yellow-400' :
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
    </div>
  );
}