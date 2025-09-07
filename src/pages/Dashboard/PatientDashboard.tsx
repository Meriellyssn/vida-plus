import { Header } from '../../components/Layout/Header';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ActionCard } from '../../components/Dashboard/ActionCard'; // 1. Importe o novo componente

// 2. Adicionei mais dados simulados para a lista de consultas
const mockPatientData = {
  nome: 'Carlos Santos',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  proximaConsulta: '02/09 às 14:30',
  consultas: [
    {
      id: 1,
      data: '2 de Setembro, 2025',
      hora: '14:30',
      medico: 'Dra. Maria Silva',
      especialidade: 'Cardiologia',
      status: 'Confirmada',
    },
    {
      id: 2,
      data: '5 de Setembro, 2025',
      hora: '10:00',
      medico: 'Dr. João Pedro',
      especialidade: 'Dermatologia',
      status: 'Pendente',
    },
  ]
};

export function PatientDashboard() {
  const showNotImplemented = () => {
    alert("Funcionalidade ainda não implementada.");
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header userName={mockPatientData.nome} userAvatarUrl={mockPatientData.avatarUrl} />

      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl shadow-lg mb-8">
          <h1 className="text-3xl font-bold">Olá, {mockPatientData.nome}! 👋</h1>
          <p className="mt-2 opacity-90">Bem-vindo ao seu painel de saúde. Aqui você pode gerenciar sua saúde em um só lugar.</p>
          <p className="mt-4 font-bold">
            <i className="fas fa-calendar-check mr-2"></i>
            Próxima consulta: {mockPatientData.proximaConsulta}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon="fa-calendar-check" value="2" label="Próximas Consultas" />
          <StatCard icon="fa-file-medical-alt" value="18" label="Total de Consultas" />
          <StatCard icon="fa-flask" value="1" label="Exames Pendentes" />
          <StatCard icon="fa-prescription-bottle-alt" value="3" label="Receitas Ativas" />
        </div>
        
        {/* --- 3. NOVA SEÇÃO: Ações Rápidas e Lista de Consultas --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna da Esquerda: Ações Rápidas */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-2 gap-4">
                <ActionCard icon="fa-plus" title="Agendar Consulta" onClick={() => alert('Abrir modal de agendamento...')} />
                <ActionCard icon="fa-microscope" title="Meus Exames" onClick={showNotImplemented} />
                <ActionCard icon="fa-pills" title="Receitas" onClick={showNotImplemented} />
                <ActionCard icon="fa-video" title="Telemedicina" onClick={showNotImplemented} />
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Próximas Consultas */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Próximas Consultas</h2>
              <div className="space-y-4">
                {/* Usamos .map() para transformar nossa lista de dados em componentes visuais */}
                {mockPatientData.consultas.map((consulta) => (
                  <div key={consulta.id} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between border-l-4 border-secondary">
                    <div>
                      <p className="font-bold text-gray-800">{consulta.especialidade}</p>
                      <p className="text-sm text-gray-600">com {consulta.medico}</p>
                      <p className="text-sm text-gray-500 mt-1"><i className="fas fa-calendar-alt mr-2"></i>{consulta.data} - {consulta.hora}</p>
                    </div>
                    <span className={`text-sm font-bold ${consulta.status === 'Confirmada' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {consulta.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}