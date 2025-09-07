// src/pages/Dashboard/ProfessionalDashboard.tsx
import { Header } from '../../components/Layout/Header';
import { StatCard } from '../../components/Dashboard/StatCard';

// DADOS SIMULADOS PARA O PROFISSIONAL
const mockProfessionalData = {
  medico: {
    nome: 'Dra. Maria Silva',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
    especialidade: 'Cardiologia',
  },
  agendaHoje: [
    { id: 1, hora: '10:00', paciente: 'Ana Costa', queixa: 'Arritmia cardíaca', status: 'in-progress' },
    { id: 2, hora: '10:30', paciente: 'Pedro Lima', queixa: 'Dor no peito durante exercício', status: 'confirmed' },
    { id: 3, hora: '14:30', paciente: 'Carlos Santos', queixa: 'Resultado de exames', status: 'confirmed' },
    { id: 4, hora: '15:00', paciente: 'Lucia Fernandes', queixa: 'Palpitações', status: 'pending' },
  ],
  pacientesPrioritarios: [
    { id: 1, nome: 'Ana Costa', idade: 65, prioridade: 'Alta', condicao: 'Arritmia cardíaca severa', prioridadeClass: 'bg-red-100 text-red-700' },
    { id: 2, nome: 'Pedro Lima', idade: 45, prioridade: 'Média', condicao: 'Dor torácica investigação', prioridadeClass: 'bg-yellow-100 text-yellow-700' },
    { id: 3, nome: 'Maria Oliveira', idade: 52, prioridade: 'Média', condicao: 'Hipertensão descompensada', prioridadeClass: 'bg-yellow-100 text-yellow-700' },
  ]
};

export function ProfessionalDashboard() {
  const proximaConsulta = mockProfessionalData.agendaHoje.find(c => c.status === 'confirmed');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Reutilizando o Header com os dados do profissional */}
      <Header userName={mockProfessionalData.medico.nome} userAvatarUrl={mockProfessionalData.medico.avatarUrl} />

      <main className="container mx-auto p-4 md:p-8">
        {/* Seção de Boas-Vindas */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl shadow-lg mb-8">
          <h1 className="text-3xl font-bold">Olá, {mockProfessionalData.medico.nome}! 👩‍⚕️</h1>
          <p className="mt-2 opacity-90">Bem-vinda de volta ao seu painel. Gerencie seus pacientes e consultas do dia.</p>
          {proximaConsulta && (
            <p className="mt-4 font-bold">
              <i className="fas fa-clock mr-2"></i>
              Próxima consulta: {proximaConsulta.hora} - {proximaConsulta.paciente}
            </p>
          )}
        </div>

        {/* 2. Reutilizando os StatCards com novos dados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon="fa-calendar-day" value={mockProfessionalData.agendaHoje.length} label="Consultas Hoje" />
          <StatCard icon="fa-users" value="127" label="Pacientes Ativos" />
          <StatCard icon="fa-exclamation-triangle" value="3" label="Urgências Pendentes" />
          <StatCard icon="fa-prescription" value="24" label="Receitas Emitidas" />
        </div>

        {/* 3. Novas listas de Agenda e Pacientes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card da Agenda de Hoje */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-calendar-alt mr-2 text-primary"></i>Agenda de Hoje
            </h2>
            <div className="space-y-4">
              {mockProfessionalData.agendaHoje.map(consulta => (
                <div key={consulta.id} className="bg-gray-50 p-3 rounded-lg flex items-center space-x-4">
                  <div className="font-bold text-primary">{consulta.hora}</div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800">{consulta.paciente}</p>
                    <p className="text-sm text-gray-500">{consulta.queixa}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card de Pacientes Prioritários */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-user-injured mr-2 text-primary"></i>Pacientes Prioritários
            </h2>
            <div className="space-y-4">
              {mockProfessionalData.pacientesPrioritarios.map(paciente => (
                <div key={paciente.id} className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{paciente.nome} <span className="text-sm font-normal text-gray-500">({paciente.idade} anos)</span></p>
                    <p className="text-sm text-gray-500">{paciente.condicao}</p>
                  </div>
                  <span className={`text-sm font-bold py-1 px-3 rounded-full ${paciente.prioridadeClass}`}>
                    {paciente.prioridade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}