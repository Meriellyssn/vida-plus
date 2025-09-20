/**
 * Dashboard do Profissional - Sistema Vida Plus
 *
 * Este componente serve como o painel de controle principal para profissionais
 * de saúde, como médicos e enfermeiros. Ele centraliza a agenda do dia,
 * informações de pacientes, e ações rápidas para otimizar o fluxo de trabalho.
 *
 * Funcionalidades principais:
 * - Exibição da agenda de consultas do dia com status em tempo real.
 * - Lista de pacientes prioritários para atenção imediata.
 * - Ações rápidas para criar prontuários, emitir prescrições e solicitar exames.
 * - Feed de atividades recentes com um layout de linha do tempo (timeline).
 * - Modais interativos para preenchimento de prontuário e prescrição de medicamentos.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

// --- Importações ---
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Layout/Header";
import { StatCard } from "../../components/Dashboard/StatCard";
import { Modal } from "../../components/common/Modal";

// --- Definições de Tipos (TypeScript) ---
interface Consulta {
  id: number;
  hora: string;
  paciente: string;
  tipo: string;
  status: "Finalizado" | "Em Andamento" | "Confirmado" | "Pendente";
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

// --- Dados Simulados (Mock Data) ---
/**
 * Objeto com dados simulados para preencher o dashboard do profissional.
 */
const mockData = {
  medico: {
    nome: "Dra. Maria Silva",
    especialidade: "Cardiologia",
    crm: "12345-SP",
    avatar: "https://i.postimg.cc/rsj9f97v/16.png",
  },
  agendaHoje: [
    { id: 1, hora: "08:00", paciente: "Carlos Santos", tipo: "Consulta", status: "Finalizado", idade: 39, queixa: "Dor no peito" },
    { id: 2, hora: "08:30", paciente: "Maria Oliveira", tipo: "Retorno", status: "Finalizado", idade: 52, queixa: "Acompanhamento hipertensão" },
    { id: 3, hora: "09:00", paciente: "João Silva", tipo: "Consulta", status: "Finalizado", idade: 28, queixa: "Check-up anual" },
    { id: 4, hora: "10:00", paciente: "Ana Costa", tipo: "Emergência", status: "Em Andamento", idade: 65, queixa: "Arritmia cardíaca" },
    { id: 5, hora: "10:30", paciente: "Pedro Lima", tipo: "Consulta", status: "Confirmado", idade: 45, queixa: "Dor no peito durante exercício" },
    { id: 6, hora: "14:30", paciente: "Carlos Santos", tipo: "Retorno", status: "Confirmado", idade: 39, queixa: "Resultado de exames" },
    { id: 7, hora: "15:00", paciente: "Lucia Fernandes", tipo: "Consulta", status: "Pendente", idade: 34, queixa: "Palpitações" },
    { id: 8, hora: "16:00", paciente: "Roberto Santos", tipo: "Consulta", status: "Pendente", idade: 58, queixa: "Pressão alta" },
  ] as Consulta[],
  pacientesPrioritarios: [
    { id: 4, nome: "Ana Costa", idade: 65, prioridade: "Alto", condicao: "Arritmia cardíaca severa", proximaConsulta: "Hoje - 10:00", avatar: "https://i.postimg.cc/SRkrLP16/17.png" },
    { id: 5, nome: "Pedro Lima", idade: 45, prioridade: "Médio", condicao: "Dor torácica investigação", proximaConsulta: "Hoje - 10:30", avatar: "https://i.postimg.cc/HW93WpjB/18.png" },
    { id: 2, nome: "Maria Oliveira", idade: 52, prioridade: "Médio", condicao: "Hipertensão descompensada", proximaConsulta: "Amanhã - 09:00", avatar: "https://i.postimg.cc/5N9g6ZC1/19.png" },
    { id: 3, nome: "Carlos Santos", idade: 39, prioridade: "Baixo", condicao: "Acompanhamento pós-cateterismo", proximaConsulta: "Hoje - 14:30", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" },
  ] as Paciente[],
  atividadeRecente: [
    { id: 1, tempo: "10 min atrás", tipo: "Consulta", descricao: "Consulta finalizada - Ana Costa", detalhes: "Arritmia cardíaca - Prescrição de Propafenona" },
    { id: 2, tempo: "25 min atrás", tipo: "Receita", descricao: "Prescrição emitida - João Silva", detalhes: "Aspirina 100mg + Atorvastatina 20mg" },
    { id: 3, tempo: "45 min atrás", tipo: "Consulta", descricao: "Consulta realizada - Maria Oliveira", detalhes: "Retorno hipertensão - Ajuste medicação" },
    { id: 4, tempo: "1h atrás", tipo: "Exame", descricao: "Exame solicitado - Carlos Santos", detalhes: "Ecocardiograma de controle" },
  ] as Atividade[],
};

// --- Constantes de Estilo ---
/**
 * Mapeamento de níveis de prioridade para classes de estilo do Tailwind CSS.
 */
const priorityStyles: Record<Paciente['prioridade'], string> = {
  "Alto": "bg-red-100 text-red-700",
  "Médio": "bg-yellow-100 text-yellow-700",
  "Baixo": "bg-green-100 text-green-700",
};

/**
 * Mapeamento de tipos de atividade para classes de estilo do Tailwind CSS.
 */
const activityTypeStyles: Record<Atividade['tipo'], string> = {
  "Consulta": "bg-green-100 text-green-700",
  "Receita": "bg-blue-100 text-blue-700",
  "Exame": "bg-yellow-100 text-yellow-700",
};

export function ProfessionalDashboard() {
  const navigate = useNavigate();

  // --- Gerenciamento de Estado do Componente ---
  // Estado para data e hora
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  // Estados para o Modal de Prontuário
  const [isProntuarioModalOpen, setIsProntuarioModalOpen] = useState(false);
  const [formPacienteId, setFormPacienteId] = useState('');
  const [formTipoConsulta, setFormTipoConsulta] = useState('consulta');
  const [formQueixa, setFormQueixa] = useState('');
  const [formSinaisVitais, setFormSinaisVitais] = useState({ pa: '', fc: '', peso: '', temp: '' });
  const [formExameFisico, setFormExameFisico] = useState('');
  const [formHipotese, setFormHipotese] = useState('');

  // Estados para o Modal de Prescrição
  const [isPrescricaoModalOpen, setIsPrescricaoModalOpen] = useState(false);
  const [prescricaoPacienteId, setPrescricaoPacienteId] = useState('');
  const [medicamentos, setMedicamentos] = useState([{ nome: '', dosagem: '', obs: '' }]);

  // --- Efeitos (Lifecycle) ---
  /**
   * Efeito para atualizar a data e hora exibidas no painel a cada minuto.
   */
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" };
      const formattedDate = now.toLocaleDateString("pt-BR", options).replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
      setCurrentDateTime(formattedDate);
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  // --- Processamento de Dados ---
  /**
   * Encontra a próxima consulta na agenda que está confirmada ou em andamento.
   */
  const proximaConsulta = mockData.agendaHoje.find(c => c.status === "Confirmado" || c.status === "Em Andamento");

  // --- Funções e Manipuladores de Eventos ---

  // Funções para o Modal de Prontuário
  const openProntuarioModal = () => setIsProntuarioModalOpen(true);
  const closeProntuarioModal = () => {
    setIsProntuarioModalOpen(false);
    // Limpa o formulário ao fechar
    setFormPacienteId('');
    setFormTipoConsulta('consulta');
    setFormQueixa('');
    setFormSinaisVitais({ pa: '', fc: '', peso: '', temp: '' });
    setFormExameFisico('');
    setFormHipotese('');
  };

  /**
   * Manipula o envio do formulário de prontuário (simulação).
   */
  const handleProntuarioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoProntuario = { pacienteId: formPacienteId, tipo: formTipoConsulta, queixa: formQueixa, sinaisVitais: formSinaisVitais, exameFisico: formExameFisico, hipotese: formHipotese };
    console.log("Novo Prontuário Salvo:", novoProntuario);
    alert(`Prontuário para o paciente ID ${formPacienteId} salvo com sucesso!`);
    closeProntuarioModal();
  };

  // Funções para o Modal de Prescrição
  const openPrescricaoModal = () => setIsPrescricaoModalOpen(true);
  const closePrescricaoModal = () => {
    setIsPrescricaoModalOpen(false);
    setPrescricaoPacienteId('');
    setMedicamentos([{ nome: '', dosagem: '', obs: '' }]);
  };

  /**
   * Atualiza o estado de um medicamento específico na lista de prescrição.
   * @param index A posição do medicamento no array.
   * @param field O campo a ser alterado ('nome', 'dosagem', 'obs').
   * @param value O novo valor do campo.
   */
  const handleMedicamentoChange = (index: number, field: string, value: string) => {
    const novosMedicamentos = [...medicamentos];
    novosMedicamentos[index] = { ...novosMedicamentos[index], [field]: value };
    setMedicamentos(novosMedicamentos);
  };

  /**
   * Adiciona um novo campo de medicamento em branco ao formulário de prescrição.
   */
  const addMedicamento = () => {
    setMedicamentos([...medicamentos, { nome: '', dosagem: '', obs: '' }]);
  };

  /**
   * Remove um campo de medicamento do formulário de prescrição.
   * @param index A posição do medicamento a ser removido.
   */
  const removeMedicamento = (index: number) => {
    const novosMedicamentos = medicamentos.filter((_, i) => i !== index);
    setMedicamentos(novosMedicamentos);
  };

  // --- Renderização do Componente ---
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="container mx-auto p-6">
        {/* SEÇÃO DE BOAS-VINDAS */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Texto de boas-vindas e próxima consulta */}
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold">Olá, {mockData.medico.nome}! 👩‍⚕️</h1>
              <p className="opacity-90">Bem-vinda ao seu painel médico. Gerencie seus pacientes e consultas.</p>
              {proximaConsulta && (
                <p className="mt-3 font-semibold"><i className="fas fa-clock mr-2" />Próxima consulta: {proximaConsulta.hora} - {proximaConsulta.paciente}</p>
              )}
            </div>

            {/* Card com informações do profissional e data/hora */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
              <div className="text-lg font-semibold">{mockData.medico.especialidade}</div>
              <div className="text-sm opacity-80">CRM: {mockData.medico.crm}</div>
              <div className="text-sm opacity-80 mt-2">{currentDateTime}</div>
            </div>
          </div>
        </div>

        {/* SEÇÃO DE MÉTRICAS (STAT CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon="fa-calendar-day" value={mockData.agendaHoje.length} label="Consultas Hoje" />
          <StatCard icon="fa-users" value="127" label="Pacientes Ativos" />
          <StatCard icon="fa-exclamation-triangle" value="3" label="Urgências Pendentes" />
          <StatCard icon="fa-prescription" value="24" label="Receitas Emitidas" />
        </div>

        {/* GRID PRINCIPAL DE CONTEÚDO (PRIMEIRA LINHA) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card: Agenda do Dia */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center"><i className="fas fa-calendar-alt mr-2"></i>Agenda de Hoje</div>
            <div className="p-3 space-y-3 max-h-96 overflow-y-auto">
              {mockData.agendaHoje.map((c) => (
                <div key={c.id} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-semibold">{c.hora} - {c.paciente}</p>
                    <p className="text-sm text-gray-500">{c.queixa}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-200 font-medium">{c.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Pacientes Prioritários */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center"><i className="fas fa-user-injured mr-2"></i>Pacientes Prioritários</div>
            <div className="p-3 space-y-3 max-h-96 overflow-y-auto">
              {mockData.pacientesPrioritarios.map((p) => (
                <div key={p.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={p.avatar} alt={p.nome} className="w-12 h-12 rounded-full border" />
                    <div>
                      <p className="font-semibold">{p.nome} <span className="text-gray-500 text-sm">({p.idade} anos)</span></p>
                      <p className="text-sm text-gray-500">{p.condicao}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${priorityStyles[p.prioridade]}`}>{p.prioridade.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GRID SECUNDÁRIO DE CONTEÚDO (SEGUNDA LINHA) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Card: Ações Rápidas */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center"><i className="fas fa-bolt mr-2"></i> Ações Rápidas</div>
            <div className="p-4 flex-grow flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <a href="#" onClick={openProntuarioModal} className="flex flex-col items-center p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl mb-2"><i className="fas fa-file-medical-alt"></i></div>
                  <div className="font-semibold text-xs">Novo Prontuário</div>
                </a>
                <a href="#" onClick={openPrescricaoModal} className="flex flex-col items-center p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl mb-2"><i className="fas fa-prescription"></i></div>
                  <div className="font-semibold text-xs">Prescrever</div>
                </a>
                <a href="#" onClick={() => alert("Exames em breve...")} className="flex flex-col items-center p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl mb-2"><i className="fas fa-microscope"></i></div>
                  <div className="font-semibold text-xs">Solicitar Exame</div>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/telemedicina'); }} className="flex flex-col items-center p-3 border rounded-lg hover:shadow-lg hover:border-primary transition text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl mb-2"><i className="fas fa-video"></i></div>
                  <div className="font-semibold text-xs">Telemedicina</div>
                </a>
              </div>
              <button onClick={openProntuarioModal} className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition mt-auto"><i className="fas fa-plus mr-2"></i> Atender Paciente</button>
            </div>
          </div>

          {/* Card: Atividade Recente (Timeline) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex justify-between items-center">
              <span><i className="fas fa-history mr-2"></i> Atividade Recente</span>
              <button onClick={() => alert("Relatórios em breve...")} className="text-xs font-semibold bg-white/20 hover:bg-white/30 py-1 px-3 rounded-full transition">Ver Relatórios</button>
            </div>
            <div className="p-6 flex-grow overflow-y-auto max-h-96">
              {mockData.atividadeRecente.map((a, index) => (
                <div key={a.id} className={`relative pl-8 pb-4 ${index === mockData.atividadeRecente.length - 1 ? "" : "border-l-2 border-gray-200"}`}>
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-primary rounded-full border-4 border-white"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-800">{a.descricao}</p>
                      <p className="text-sm text-gray-600">{a.detalhes}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-xs text-gray-500">{a.tempo}</p>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full mt-1 inline-block ${activityTypeStyles[a.tipo]}`}>{a.tipo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* --- MODAIS --- */}

      {/* Modal: Novo Prontuário */}
      <Modal
        isOpen={isProntuarioModalOpen}
        onClose={closeProntuarioModal}
        title="Atendimento - Novo Prontuário"
        size="5xl"
      >
        <form onSubmit={handleProntuarioSubmit}>
          {/* Linha 1 */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
            <div className="md:col-span-3">
              <label htmlFor="pacienteProntuario" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <i className="fas fa-user mr-2 text-gray-400"></i>Paciente
              </label>
              <select id="pacienteProntuario" className="w-full p-2 border border-gray-300 rounded-md"
                value={formPacienteId} onChange={(e) => setFormPacienteId(e.target.value)} required>
                <option value="">Selecione um paciente</option>
                <option value="1">Carlos Santos - 39 anos</option>
                <option value="2">Maria Oliveira - 52 anos</option>
                <option value="4">Ana Costa - 65 anos</option>
                <option value="5">Pedro Lima - 45 anos</option>
              </select>
            </div>
            <div className="md:col-span-1">
              <label htmlFor="tipoConsulta" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <i className="fas fa-stethoscope mr-2 text-gray-400"></i>Tipo
              </label>
              <select id="tipoConsulta" className="w-full p-2 border border-gray-300 rounded-md"
                value={formTipoConsulta} onChange={(e) => setFormTipoConsulta(e.target.value)}>
                <option value="consulta">Consulta</option>
                <option value="retorno">Retorno</option>
                <option value="emergencia">Emergência</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="dataAtendimento" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <i className="fas fa-calendar mr-2 text-gray-400"></i>Data/Hora
              </label>
              <input type="datetime-local" id="dataAtendimento" className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
          </div>

          {/* Linha 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="queixaPrincipal" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <i className="fas fa-comment-medical mr-2 text-gray-400"></i>Queixa Principal
              </label>
              <textarea id="queixaPrincipal" rows={5} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Descreva a queixa..."
                value={formQueixa} onChange={(e) => setFormQueixa(e.target.value)}></textarea>
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <i className="fas fa-heartbeat mr-2 text-gray-400"></i>Sinais Vitais
              </label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input type="text" placeholder="PA (mmHg)" className="w-full p-2 border border-gray-300 rounded-md"
                  value={formSinaisVitais.pa} onChange={(e) => setFormSinaisVitais({ ...formSinaisVitais, pa: e.target.value })} />
                <input type="text" placeholder="FC (bpm)" className="w-full p-2 border border-gray-300 rounded-md"
                  value={formSinaisVitais.fc} onChange={(e) => setFormSinaisVitais({ ...formSinaisVitais, fc: e.target.value })} />
                <input type="text" placeholder="Peso (kg)" className="w-full p-2 border border-gray-300 rounded-md"
                  value={formSinaisVitais.peso} onChange={(e) => setFormSinaisVitais({ ...formSinaisVitais, peso: e.target.value })} />
                <input type="text" placeholder="Temp (°C)" className="w-full p-2 border border-gray-300 rounded-md"
                  value={formSinaisVitais.temp} onChange={(e) => setFormSinaisVitais({ ...formSinaisVitais, temp: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Textareas Grandes */}
          <div className="space-y-4">
            <div>
              <label htmlFor="exameFisico" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <i className="fas fa-search mr-2 text-gray-400"></i>Exame Físico
              </label>
              <textarea id="exameFisico" rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Descreva os achados..."
                value={formExameFisico} onChange={(e) => setFormExameFisico(e.target.value)}></textarea>
            </div>
            <div>
              <label htmlFor="hipoteseDiagnostica" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <i className="fas fa-diagnoses mr-2 text-gray-400"></i>Hipótese Diagnóstica
              </label>
              <textarea id="hipoteseDiagnostica" rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="CID-10 e descrição..."
                value={formHipotese} onChange={(e) => setFormHipotese(e.target.value)}></textarea>
            </div>
          </div>

          {/* Botões */}
          <div className="mt-8 pt-4 border-t flex justify-end space-x-3">
            <button type="button" onClick={closeProntuarioModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">Finalizar Prontuário</button>
          </div>
        </form>
      </Modal>

      {/* Modal: Nova Prescrição Médica */}
      <Modal isOpen={isPrescricaoModalOpen} onClose={closePrescricaoModal} title="Nova Prescrição Médica" size="4xl">
        <form onSubmit={(e) => { e.preventDefault(); console.log({ paciente: prescricaoPacienteId, medicamentos }); alert('Prescrição Salva!'); closePrescricaoModal(); }}>
          {/* Paciente e Validade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="prescricaoPaciente" className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
              <select id="prescricaoPaciente" className="w-full p-2 border border-gray-300 rounded-md" value={prescricaoPacienteId} onChange={(e) => setPrescricaoPacienteId(e.target.value)} required>
                <option value="">Selecione um paciente</option>
                <option value="1">Carlos Santos - 39 anos</option>
                <option value="2">Maria Oliveira - 52 anos</option>
                <option value="4">Ana Costa - 65 anos</option>
                <option value="5">Pedro Lima - 45 anos</option>
              </select>
            </div>
            <div>
              <label htmlFor="validade" className="block text-sm font-medium text-gray-700 mb-1">Validade da Receita</label>
              <input type="date" id="validade" className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
          </div>

          {/* Lista Dinâmica de Medicamentos */}
          <div className="space-y-4">
            {medicamentos.map((med, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" placeholder="Nome do medicamento" className="md:col-span-2 p-2 border border-gray-300 rounded-md" value={med.nome} onChange={(e) => handleMedicamentoChange(index, 'nome', e.target.value)} />
                  <input type="text" placeholder="Dosagem (ex: 50mg)" className="p-2 border border-gray-300 rounded-md" value={med.dosagem} onChange={(e) => handleMedicamentoChange(index, 'dosagem', e.target.value)} />
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <textarea placeholder="Observações (ex: 1x ao dia por 7 dias)" rows={1} className="flex-grow p-2 border border-gray-300 rounded-md" value={med.obs} onChange={(e) => handleMedicamentoChange(index, 'obs', e.target.value)}></textarea>
                  {medicamentos.length > 1 && (
                    <button type="button" onClick={() => removeMedicamento(index)} className="px-3 h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><i className="fas fa-trash"></i></button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Botão para adicionar mais medicamentos */}
          <button type="button" onClick={addMedicamento} className="mt-4 text-sm font-semibold text-primary hover:text-red-700"><i className="fas fa-plus mr-2"></i>Adicionar outro medicamento</button>

          {/* Botões do Footer */}
          <div className="mt-8 pt-4 border-t flex justify-end space-x-3">
            <button type="button" onClick={closePrescricaoModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">Emitir Prescrição</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}