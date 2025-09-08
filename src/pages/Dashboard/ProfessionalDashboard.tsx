// src/pages/Dashboard/ProfessionalDashboard.tsx
import { useEffect, useState } from "react";
import { Header } from "../../components/Layout/Header";
import { StatCard } from "../../components/Dashboard/StatCard";
import { QuickActionButton } from "../../components/Dashboard/QuickActionButton";

// Tipos para dados simulados
interface Consulta {
  id: number;
  hora: string;
  paciente: string;
  tipo: string;
  status: "Concluído" | "Em Andamento" | "Confirmado" | "Pendente";
  idade: number;
  queixa: string;
}

interface Paciente {
  id: number;
  nome: string;
  idade: number;
  prioridade: "Alto" | "Médio" | "Baixo";
  condicao: string;
  proximaConsulta: string;
  avatar: string;
}

interface Atividade {
  id: number;
  tempo: string;
  tipo: "Consulta" | "Receita" | "Exame";
  descricao: string;
  detalhes: string;
}

// MOCK DATA
const mockData = {
  medico: {
    nome: "Dra. Maria Silva",
    especialidade: "Cardiologia",
    crm: "12345-SP",
    avatar:
      "https://i.postimg.cc/rsj9f97v/16.png",
  },
  agendaHoje: [
    { id: 1, hora: "08:00", paciente: "Carlos Santos", tipo: "Consulta", status: "Concluído", idade: 39, queixa: "Dor no peito" },
    { id: 2, hora: "08:30", paciente: "Maria Oliveira", tipo: "Retorno", status: "Concluído", idade: 52, queixa: "Acompanhamento hipertensão" },
    { id: 3, hora: "09:00", paciente: "João Silva", tipo: "Consulta", status: "Concluído", idade: 28, queixa: "Check-up anual" },
    { id: 4, hora: "10:00", paciente: "Ana Costa", tipo: "Emergência", status: "Em Andamento", idade: 65, queixa: "Arritmia cardíaca" },
    { id: 5, hora: "10:30", paciente: "Pedro Lima", tipo: "Consulta", status: "Confirmado", idade: 45, queixa: "Dor no peito durante exercício" },
    { id: 6, hora: "14:30", paciente: "Carlos Santos", tipo: "Retorno", status: "Confirmado", idade: 39, queixa: "Resultado de exames" },
    { id: 7, hora: "15:00", paciente: "Lucia Fernandes", tipo: "Consulta", status: "Pendente", idade: 34, queixa: "Palpitações" },
    { id: 8, hora: "16:00", paciente: "Roberto Santos", tipo: "Consulta", status: "Pendente", idade: 58, queixa: "Pressão alta" },
  ] as Consulta[],
  pacientesPrioritarios: [
    { id: 4, nome: "Ana Costa", idade: 65, prioridade: "Alta", condicao: "Arritmia cardíaca severa", proximaConsulta: "Hoje - 10:00", avatar: "https://i.postimg.cc/SRkrLP16/17.png" },
    { id: 5, nome: "Pedro Lima", idade: 45, prioridade: "Médio", condicao: "Dor torácica investigação", proximaConsulta: "Hoje - 10:30", avatar: "https://i.postimg.cc/HW93WpjB/18.png" },
    { id: 2, nome: "Maria Oliveira", idade: 52, prioridade: "Médio", condicao: "Hipertensão descompensada", proximaConsulta: "Amanhã - 09:00", avatar: "https://i.postimg.cc/5N9g6ZC1/19.png" },
  ] as Paciente[],
  atividadeRecente: [
    { id: 1, tempo: "10 min atrás", tipo: "Consulta", descricao: "Consulta finalizada - Ana Costa", detalhes: "Arritmia cardíaca - Prescrição de Propafenona" },
    { id: 2, tempo: "25 min atrás", tipo: "Receita", descricao: "Prescrição emitida - João Silva", detalhes: "Aspirina 100mg + Atorvastatina 20mg" },
    { id: 3, tempo: "45 min atrás", tipo: "Consulta", descricao: "Consulta realizada - Maria Oliveira", detalhes: "Retorno hipertensão - Ajuste medicação" },
    { id: 4, tempo: "1h atrás", tipo: "Exame", descricao: "Exame solicitado - Carlos Santos", detalhes: "Ecocardiograma de controle" },
  ] as Atividade[],
};

// DICA DE ORGANIZAÇÃO: Mapa de estilos para a prioridade do paciente
const priorityStyles: Record<Paciente['prioridade'], string> = {
  "Alto": "bg-red-100 text-red-700",
  "Médio": "bg-yellow-100 text-yellow-700",
  "Baixo": "bg-green-100 text-green-700",
};

export function ProfessionalDashboard() {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      };
      setCurrentDateTime(
        now
          .toLocaleDateString("pt-BR", options)
          .replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase())
      );
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  const proximaConsulta = mockData.agendaHoje.find(
    (c) => c.status === "Confirmado" || c.status === "Em Andamento"
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      <Header
        userName={mockData.medico.nome}
        userAvatarUrl={mockData.medico.avatar}
      />

      <main className="container mx-auto p-6">
        {/* WELCOME */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Texto de boas-vindas */}
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold">
                Olá, {mockData.medico.nome}! 👩‍⚕️
              </h1>
              <p className="opacity-90">
                Bem-vinda ao seu painel médico. Gerencie seus pacientes e consultas.
              </p>
              {proximaConsulta && (
                <p className="mt-3 font-semibold">
                  <i className="fas fa-clock mr-2" />
                  Próxima consulta: {proximaConsulta.hora} - {proximaConsulta.paciente}
                </p>
              )}
            </div>

            {/* Card do Médico */}
            <div className="doctor-info bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
              <div className="text-lg font-semibold">{mockData.medico.especialidade}</div>
              <div className="text-sm opacity-80">CRM: {mockData.medico.crm}</div>
              <div className="text-sm opacity-80 mt-2">{currentDateTime}</div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon="fa-calendar-day" value={mockData.agendaHoje.length} label="Consultas Hoje" />
          <StatCard icon="fa-users" value="127" label="Pacientes Ativos" />
          <StatCard icon="fa-exclamation-triangle" value="3" label="Urgências Pendentes" />
          <StatCard icon="fa-prescription" value="24" label="Receitas Emitidas" />
        </div>

        {/* CONTENT ROWS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agenda */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              <i className="fas fa-calendar-alt mr-2 text-primary"></i>
              Agenda de Hoje
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mockData.agendaHoje.map((c) => (
                <div
                  key={c.id}
                  className="bg-gray-50 rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{c.hora} - {c.paciente}</p>
                    <p className="text-sm text-gray-500">{c.queixa}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-200 font-medium">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pacientes Prioritários */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              <i className="fas fa-user-injured mr-2 text-primary"></i>
              Pacientes Prioritários
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mockData.pacientesPrioritarios.map((p) => (
                <div key={p.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img src={p.avatar} alt={p.nome} className="w-12 h-12 rounded-full border" />
                    <div>
                      <p className="font-semibold">{p.nome} <span className="text-gray-500 text-sm">({p.idade} anos)</span></p>
                      <p className="text-sm text-gray-500">{p.condicao}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${priorityStyles[p.prioridade]}`}>
                    {p.prioridade.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Ações rápidas */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              <i className="fas fa-bolt mr-2 text-primary"></i>Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <QuickActionButton icon="fa-file-medical-alt" label="Novo Prontuário" onClick={() => alert("Novo prontuário")} />
              <QuickActionButton icon="fa-prescription" label="Prescrever" onClick={() => alert("Prescrição")} />
              <QuickActionButton icon="fa-microscope" label="Solicitar Exame" onClick={() => alert("Exame")} />
              <QuickActionButton icon="fa-video" label="Telemedicina" onClick={() => alert("Telemedicina")} />
            </div>
          </div>

          {/* Atividade Recente */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              <i className="fas fa-history mr-2 text-primary"></i>Atividade Recente
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mockData.atividadeRecente.map((a) => (
                <div key={a.id} className="border-b pb-3 last:border-none flex justify-between">
                  <div>
                    <p className="font-semibold">{a.descricao}</p>
                    <p className="text-sm text-gray-500">{a.detalhes}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{a.tempo}</p>
                    <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded-full">
                      {a.tipo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
