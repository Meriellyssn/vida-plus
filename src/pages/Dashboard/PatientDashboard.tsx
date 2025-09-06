import { Header } from '../../components/Layout/Header';
import { StatCard } from '../../components/Dashboard/StatCard';

// Dados simulados para o paciente
const mockPatientData = {
  nome: 'José Santos',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  proximaConsulta: '02/09 às 14:30',
};

export function PatientDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header userName={mockPatientData.nome} userAvatarUrl={mockPatientData.avatarUrl} />

      <main className="container mx-auto p-4 md:p-8">
        {/* Seção de Boas-Vindas */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl shadow-lg mb-8">
          <h1 className="text-3xl font-bold">Olá, {mockPatientData.nome}! 👋</h1>
          <p className="mt-2 opacity-90">Bem-vindo ao seu painel de saúde. Aqui você pode gerenciar sua saúde em um só lugar.</p>
          <p className="mt-4 font-bold">
            <i className="fas fa-calendar-check mr-2"></i>
            Próxima consulta: {mockPatientData.proximaConsulta}
          </p>
        </div>

        {/* Grid de Cards de Estatística */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon="fa-calendar-check" value="2" label="Próximas Consultas" />
          <StatCard icon="fa-file-medical-alt" value="18" label="Total de Consultas" />
          <StatCard icon="fa-flask" value="1" label="Exames Pendentes" />
          <StatCard icon="fa-prescription-bottle-alt" value="3" label="Receitas Ativas" />
        </div>
        
        {/* Aqui virão as outras seções (Ações Rápidas, Lista de Consultas, etc.) */}
        {/* Por enquanto, vamos focar em deixar esta primeira parte funcionando */}

      </main>
    </div>
  );
}