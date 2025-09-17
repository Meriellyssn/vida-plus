import { useState, useEffect } from 'react';
import { Header } from '../../components/Layout/Header';
import { StatCard } from '../../components/Dashboard/StatCard';
import { ActionCard } from '../../components/Dashboard/ActionCard';
import { Modal } from '../../components/common/Modal';

// Dados simulados, exatamente como no seu protótipo
const mockData = {
  paciente: {
    id: 3,
    nome: 'Carlos Santos',
    avatarUrl: 'https://i.ibb.co/ns2tPQzS/21.png',
    email: '12345678900',
    dataNascimento: '1990-03-15',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123, São Paulo - SP'
  },
  consultas: [
    {
      id: 1,
      data: '2025-12-08',
      hora: '14:30',
      medico: 'Dra. Maria Silva',
      especialidade: 'Cardiologia',
      status: 'confirmed',
      local: 'Hospital VidaPlus - Unidade Central',
      tipo: 'Consulta de rotina'
    },
    {
      id: 2,
      data: '2025-09-05',
      hora: '10:00',
      medico: 'Dr. João Pedro',
      especialidade: 'Dermatologia',
      status: 'pending',
      local: 'Clínica VidaPlus - Jardins',
      tipo: 'Avaliação dermatológica'
    },
    {
      id: 3,
      data: '2025-08-20',
      hora: '16:00',
      medico: 'Dr. Roberto Lima',
      especialidade: 'Clínica Geral',
      status: 'completed',
      local: 'Hospital VidaPlus - Unidade Central',
      tipo: 'Check-up geral'
    },
    {
      id: 4,
      data: '2025-08-15',
      hora: '09:30',
      medico: 'Dra. Ana Costa',
      especialidade: 'Oftalmologia',
      status: 'completed',
      local: 'Clínica VidaPlus - Centro',
      tipo: 'Exame oftalmológico'
    }
  ],
  historico: [
    {
      data: '2025-08-20',
      tipo: 'Consulta',
      descricao: 'Check-up geral - Clínica Geral',
      medico: 'Dr. Roberto Lima',
      resultado: 'Paciente em boas condições de saúde'
    },
    {
      data: '2025-08-15',
      tipo: 'Exame',
      descricao: 'Hemograma Completo',
      medico: null,
      resultado: 'Todos os parâmetros dentro dos valores normais'
    },
    {
      data: '2025-08-10',
      tipo: 'Consulta',
      descricao: 'Cardiologia - Avaliação preventiva',
      medico: 'Dra. Maria Silva',
      resultado: 'Recomendada atividade física regular e dieta balanceada'
    },
    {
      data: '2025-07-25',
      tipo: 'Exame',
      descricao: 'Exame oftalmológico',
      medico: null,
      resultado: 'Visão 20/20, sem necessidade de correção'
    }
  ],
  receitas: [
    {
      id: 1,
      medicamento: 'Losartana 50mg',
      dosagem: '1 comprimido ao dia pela manhã',
      validade: '2025-12-20',
      medico: 'Dra. Maria Silva',
      observacoes: 'Tomar com o estômago vazio'
    },
    {
      id: 2,
      medicamento: 'Vitamina D3 2000UI',
      dosagem: '1 cápsula por semana',
      validade: '2025-10-15',
      medico: 'Dr. Roberto Lima',
      observacoes: 'Tomar preferencialmente após o almoço'
    },
    {
      id: 3,
      medicamento: 'Ômega 3 1000mg',
      dosagem: '1 cápsula 2x ao dia',
      validade: '2025-11-30',
      medico: 'Dra. Maria Silva',
      observacoes: 'Tomar junto com as refeições'
    }
  ]
};

// Função para formatar a data como "02/Set"
const formatAppointmentDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = date.toLocaleDateString('pt-BR', { month: 'short', timeZone: 'UTC' }).replace('.', '');
  return { day, month };
};

export function PatientDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Sua consulta foi solicitada com sucesso! (Simulação)');
    closeModal();
  };
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = currentTime.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const proximaConsulta = mockData.consultas.find(c => new Date(c.data) >= new Date() && c.status !== 'completed');
  const consultasFuturas = mockData.consultas.filter(c => new Date(c.data) >= new Date() && c.status !== 'completed');

  const showNotImplemented = () => {
    alert("Funcionalidade ainda não implementada.");
  };

  const patientNavLinks = [
    { path: '/dashboard-paciente', label: 'Início', icon: 'fa-home' },
    { path: '/agendamentos', label: 'Agendamentos', icon: 'fa-calendar-alt' },
    { path: '/historico', label: 'Histórico', icon: 'fa-file-medical' },
    { path: '/telemedicina', label: 'Telemedicina', icon: 'fa-video' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        userName={mockData.paciente.nome}
        userAvatarUrl={mockData.paciente.avatarUrl}
        navLinks={patientNavLinks} />

      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl shadow-lg flex items-center justify-between mb-8">
          {/* Coluna da Esquerda: Texto */}
          <div>
            <h1 className="text-3xl font-bold">Olá, {mockData.paciente.nome}! 👋</h1>
            <p className="mt-2 opacity-90 max-w-lg">Bem-vindo ao seu painel de saúde. Aqui você pode acompanhar suas consultas, exames e manter sua saúde sempre em dia.</p>
            {proximaConsulta && (
              <p className="mt-4 font-bold inline-block bg-white/20 p-3 rounded-lg">
                <i className="fas fa-calendar-check mr-2"></i>
                Próxima consulta: {new Date(proximaConsulta.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} às {proximaConsulta.hora}
              </p>
            )}
          </div>
          {/* Coluna da Direita: Relógio Digital */}
          <div className="text-right hidden lg:block">
            <div className="text-3xl font-bold">{formattedTime}</div>
            <div className="text-sm opacity-90 capitalize">{formattedDate}</div>
            <div className="text-xs opacity-70 mt-1">Horário atual</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon="fa-calendar-check" value={consultasFuturas.length} label="Próximas Consultas" />
          <StatCard icon="fa-file-medical-alt" value={mockData.consultas.length} label="Total de Consultas" />
          <StatCard icon="fa-flask" value="1" label="Exames Pendentes" />
          <StatCard icon="fa-prescription-bottle-alt" value={mockData.receitas.length} label="Receitas Ativas" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            {/* Ações Rápidas */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              {/* Cabeçalho do Card */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center">
                <i className="fas fa-bolt mr-2"></i>Ações Rápidas
              </div>
              {/* Corpo do Card */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <ActionCard icon="fa-plus" title="Agendar Consulta" onClick={openModal} />
                  <ActionCard icon="fa-microscope" title="Meus Exames" onClick={showNotImplemented} />
                  <ActionCard icon="fa-pills" title="Receitas" onClick={showNotImplemented} />
                  <ActionCard icon="fa-video" title="Telemedicina" onClick={showNotImplemented} />
                </div>
              </div>
            </div>
            {/* Histórico Recente */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              {/* Cabeçalho do Card */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center">
                <i className="fas fa-history mr-2"></i>Histórico Recente
              </div>
              {/* Corpo do Card */}
              <div className="p-6 space-y-3">
                {mockData.historico.map((item, index) => (
                  <div key={index} className="border-l-4 border-primary/50 pl-3">
                    <p className="font-bold text-gray-700">{item.descricao}</p>
                    <p className="text-sm text-gray-500">{new Date(item.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} {item.medico ? `• ${item.medico}` : ''}</p>
                    {item.resultado && (
                      <p className="text-sm text-gray-600 mt-1 bg-gray-100 p-2 rounded-md">
                        <strong className="text-primary">Resultado:</strong> {item.resultado}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* Próximas Consultas */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              {/* Cabeçalho do Card */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center">
                <i className="fas fa-calendar-alt mr-2"></i>Histórico Recente
              </div>
              {/* Corpo do Card */}
              <div className="p-6 space-y-3">
                {mockData.consultas.filter(c => c.status !== 'completed').map((consulta) => {
                  const { day, month } = formatAppointmentDate(consulta.data);
                  return (
                    <div key={consulta.id} className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4">
                      <div className="text-center font-bold text-white bg-gradient-to-br from-primary to-secondary p-2 rounded-lg w-16">
                        <div className="text-2xl">{day}</div>
                        <div className="text-sm uppercase">{month}</div>
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold text-gray-800">{consulta.especialidade}</p>
                        <p className="text-sm text-gray-600">com {consulta.medico}</p>
                        <p className="text-sm text-gray-500 mt-1 capitalize"><i className="fas fa-notes-medical mr-2"></i>{consulta.tipo}</p>
                        <p className="text-sm text-gray-500 mt-1"><i className="fas fa-map-marker-alt mr-2"></i>{consulta.local}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-bold py-1 px-3 rounded-full ${consulta.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {consulta.status === 'confirmed' ? 'Confirmada' : 'Pendente'}
                        </span>
                        <p className="text-lg font-bold text-gray-700 mt-1">{consulta.hora}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Receitas Ativas */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              {/* Cabeçalho do Card */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center">
                <i className="fas fa-prescription-bottle-alt mr-2"></i>Receitas Ativas
              </div>
              {/* Corpo do Card */}
              <div className="p-6 space-y-3">
                {mockData.receitas.map(receita => (
                  <div key={receita.id} className="border-l-4 border-green-500/50 pl-3">
                    <p className="font-bold text-gray-700">{receita.medicamento}</p>
                    <p className="text-sm text-gray-600">{receita.dosagem}</p>
                    <p className="text-sm text-gray-500">Válida até: {new Date(receita.validade).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} • {receita.medico}</p>
                    {receita.observacoes && (
                      <p className="text-sm text-blue-700 mt-1 bg-blue-50 p-2 rounded-md">
                        <i className="fas fa-info-circle mr-2"></i>{receita.observacoes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Agendar Nova Consulta"
      >
        <form onSubmit={handleScheduleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
              <select id="especialidade" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
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
              </select>
            </div>
            <div>
              <label htmlFor="dataConsulta" className="block text-sm font-medium text-gray-700 mb-1">Data Preferida</label>
              <input type="date" id="dataConsulta" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="turno" className="block text-sm font-medium text-gray-700 mb-1">Turno</label>
              <select id="turno" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                <option value="">Selecione...</option>
                <option value="manha">Manhã (08:00 - 12:00)</option>
                <option value="tarde">Tarde (13:00 - 17:00)</option>
              </select>
            </div>
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Consulta</label>
              <select id="tipo" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="presencial">Presencial</option>
                <option value="telemedicina">Telemedicina</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">Observações (Opcional)</label>
            <textarea id="observacoes" rows={3} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Descreva brevemente o motivo da consulta..."></textarea>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
              <i className="fas fa-times mr-2"></i>Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
              <i className="fas fa-calendar-check mr-2"></i>Agendar Consulta
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}