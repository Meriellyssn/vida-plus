/**
 * Página de Telemedicina - Sistema Vida Plus
 *
 * Este componente funciona como uma "sala de espera" ou "lobby" virtual para uma
 * consulta de telemedicina. Ele exibe os detalhes da próxima consulta, permite
 * que o usuário teste sua conexão e fornece o acesso para entrar na chamada de vídeo.
 *
 * Funcionalidades principais:
 * - Exibe os detalhes da próxima consulta online (paciente e médico).
 * - Adapta a visualização com base no tipo de usuário logado (paciente ou profissional).
 * - Simula um teste de conexão de internet com feedback visual.
 * - Fornece um botão para iniciar a chamada de vídeo (simulada).
 * - Apresenta um guia de "Como Funciona" para orientar o usuário.
 *
 * @author Meirielli S. Sousa do N. 
 * @version 1.0.0
 * @since 2025
 */

// --- Importações ---
import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Layout/Header';
import { useNavigate } from 'react-router-dom';

// --- Dados Simulados e Tipos ---
/**
 * Dados simulados de uma consulta de telemedicina.
 */
const mockConsulta = {
    id: 'tele-1',
    data: '2025-09-29',
    hora: '11:00',
    tipo: 'Consulta de Retorno',
    medico: {
        nome: 'Dra. Maria Silva',
        especialidade: 'Cardiologia',
        crm: '12345-SP',
        avatar: 'https://i.postimg.cc/rsj9f97v/16.png'
    },
    paciente: {
        nome: 'Carlos Santos',
        idade: 35,
        avatar: 'https://i.ibb.co/ns2tPQzS/21.png',
    },
    observacoes: 'Consulta de retorno para avaliação de exames.'
};

/**
 * Interface para o objeto do usuário logado, recuperado do localStorage.
 */
interface CurrentUser {
    tipo: 'paciente' | 'profissional' | 'admin';
    nome: string;
    avatarUrl: string;
}

export function TelemedicinaPage() {
    // --- Hooks ---
    const navigate = useNavigate();

    // --- Gerenciamento de Estado do Componente ---
    const [testeConexao, setTesteConexao] = useState<'testando' | 'ok' | 'falhou' | null>(null);
    const [chamadaAtiva, setChamadaAtiva] = useState(false);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

    /**
     * Efeito que é executado uma vez quando o componente é montado.
     * Ele lê as informações do usuário logado do localStorage para
     * adaptar a interface da página.
     */
    useEffect(() => {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
            setCurrentUser(JSON.parse(userJson));
        }
    }, []);

    // --- Funções e Manipuladores de Eventos ---
    /**
     * Simula um teste de conexão de internet, atualizando o estado
     * para fornecer feedback visual ao usuário.
     */
    const testarConexao = () => {
        setTesteConexao('testando');
        setTimeout(() => {
            // Simula um resultado aleatório (80% de chance de sucesso)
            if (Math.random() < 0.8) {
                setTesteConexao('ok');
            } else {
                setTesteConexao('falhou');
            }
        }, 2000); // Simula 2 segundos de teste
    };

    // --- Lógica de Exibição Condicional ---
    /**
     * Renderiza a tela de videochamada se a chamada estiver ativa.
     * Isso efetivamente transforma a página em uma tela de chamada em vez do lobby.
     */
    if (chamadaAtiva) {
        return <VideoCallScreen onEndCall={() => setChamadaAtiva(false)} />;
    }

    /**
     * Determina quais informações exibir no card de consulta com base
     * no tipo de usuário logado. Se for um paciente, mostra os dados do médico.
     * Se for um profissional, mostra os dados do paciente.
     */
    const isPaciente = currentUser?.tipo === 'paciente';
    const nomeExibido = isPaciente ? mockConsulta.medico.nome : mockConsulta.paciente.nome;
    const detalhesExibidos = isPaciente
        ? `${mockConsulta.medico.especialidade} - CRM ${mockConsulta.medico.crm}`
        : `Paciente - ${mockConsulta.paciente.idade} anos`;
    const avatarExibido = isPaciente ? mockConsulta.medico.avatar : mockConsulta.paciente.avatar;

    // --- Renderização do Componente (Tela de Lobby) ---
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Coluna Principal (Esquerda) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Card da Próxima Consulta */}
                        <Card>
                            <CardHeader title="Próxima Consulta Online" icon="fa-clock" />
                            <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <img src={avatarExibido} alt={nomeExibido} className="w-20 h-20 rounded-full border-4 border-secondary" />
                                    <div>
                                        <p className="text-xl font-bold text-gray-800">{nomeExibido}</p>
                                        <p className="text-gray-600">{detalhesExibidos}</p>
                                        <p className="text-sm text-gray-500 mt-2">{new Date(mockConsulta.data).toLocaleDateString('pt-BR', { dateStyle: 'long' })} às {mockConsulta.hora}</p>
                                        <p className="text-sm text-gray-500 mt-1 capitalize"><i className="fas fa-notes-medical mr-2"></i>{mockConsulta.observacoes || mockConsulta.tipo}</p>
                                    </div>
                                </div>
                                <button onClick={() => navigate('/chamada-video')} className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition flex items-center justify-center">
                                    <i className="fas fa-video mr-2"></i>Entrar na Chamada
                                </button>
                            </div>
                        </Card>

                        {/* Card de Status da Conexão */}
                        <Card>
                            <CardHeader title="Status da Conexão" icon="fa-wifi" />
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {testeConexao === 'testando' && <StatusIndicator text="Testando..." color="blue" pulse={true} />}
                                    {testeConexao === 'ok' && <StatusIndicator text="Conexão Estável" color="green" pulse={false} />}
                                    {testeConexao === 'falhou' && <StatusIndicator text="Conexão Instável" color="red" pulse={false} />}
                                    {testeConexao === null && <StatusIndicator text="Não verificado" color="gray" pulse={false} />}
                                </div>
                                <button onClick={testarConexao} disabled={testeConexao === 'testando'} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition flex items-center">
                                    <i className="fas fa-sync-alt mr-2"></i>Verificar Conexão
                                </button>
                            </div>
                        </Card>
                    </div>

                    {/* Coluna Lateral (Direita) */}
                    <div className="lg:col-span-1 space-y-8">
                        <Card>
                            <CardHeader title="Como Funciona" icon="fa-question-circle" />
                            <div className="p-6 space-y-4">
                                <InfoStep icon="fa-calendar-alt" color="blue" title="1. Agende" text="Agende sua consulta online pelo portal do paciente." />
                                <InfoStep icon="fa-desktop" color="green" title="2. Prepare-se" text="Teste sua câmera, microfone e conexão." />
                                <InfoStep icon="fa-video" color="purple" title="3. Consulte" text="Entre na sala na hora marcada e realize sua consulta." />
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

// --- Componentes Auxiliares ---
// Estes são pequenos componentes usados apenas nesta página para manter o código principal mais limpo.

/**
 * Componente que simula a tela de uma chamada de vídeo ativa.
 * @param {{ onEndCall: () => void }} props Propriedades do componente.
 */
const VideoCallScreen: React.FC<{ onEndCall: () => void }> = ({ onEndCall }) => {
    return (
        <div className="w-full h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
            <i className="fas fa-video text-6xl mb-4"></i>
            <h2 className="text-2xl font-bold">Chamada de vídeo em andamento...</h2>
            <p className="text-gray-400">Esta é uma simulação da tela de telemedicina.</p>
            <button onClick={onEndCall} className="mt-8 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
                <i className="fas fa-phone-slash mr-2"></i>Encerrar Chamada
            </button>
        </div>
    );
};

/**
 * Componente de card genérico para padronizar a aparência dos blocos de conteúdo.
 * @param {{ children: React.ReactNode }} props Propriedades do componente.
 */
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="bg-white rounded-xl shadow-md overflow-hidden">{children}</div>;
};

/**
 * Componente para o cabeçalho padronizado dos cards.
 * @param {{ title: string; icon: string }} props Propriedades do componente.
 */
const CardHeader: React.FC<{ title: string; icon: string }> = ({ title, icon }) => {
    return (
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 font-bold flex items-center">
            <i className={`fas ${icon} mr-2`}></i>{title}
        </div>
    );
};

/**
 * Indicador visual de status (ex: Conexão Estável).
 * @param {{ text: string, color: 'green' | 'red' | 'blue' | 'gray', pulse: boolean }} props Propriedades do componente.
 */
const StatusIndicator: React.FC<{ text: string, color: 'green' | 'red' | 'blue' | 'gray', pulse: boolean }> = ({ text, color, pulse }) => {
    const colors = { green: 'bg-green-500 text-green-800', red: 'bg-red-500 text-red-800', blue: 'bg-blue-500 text-blue-800', gray: 'bg-gray-500 text-gray-800' };
    return (
        <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${colors[color]} ${pulse ? 'animate-pulse' : ''}`}></div>
            <span className={`font-semibold text-sm ${colors[color].split(' ')[1]}`}>{text}</span>
        </div>
    );
};

/**
 * Componente para cada passo do guia "Como Funciona".
 * @param {{ icon: string, color: string, title: string, text: string }} props Propriedades do componente.
 */
const InfoStep: React.FC<{ icon: string, color: string, title: string, text: string }> = ({ icon, color, title, text }) => {
    const colors = { blue: 'bg-blue-100 text-blue-600', green: 'bg-green-100 text-green-600', purple: 'bg-purple-100 text-purple-600' };
    return (
        <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${colors[color as keyof typeof colors]}`}>
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <h4 className="font-bold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-600">{text}</p>
            </div>
        </div>
    );
};