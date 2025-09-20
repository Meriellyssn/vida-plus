/**
 * Página de Chamada de Vídeo - Sistema Vida Plus
 *
 * Este componente fornece a interface de usuário (UI) para uma consulta de
 * telemedicina. É uma tela de foco total, projetada para simular uma
 * chamada de vídeo real, com controles de mídia, cronômetro e um painel de chat.
 *
 * Funcionalidades principais:
 * - Simulação de vídeo do paciente e do profissional.
 * - Controles para habilitar/desabilitar áudio e vídeo (simulados).
 * - Cronômetro que exibe a duração da chamada em tempo real.
 * - Painel de chat lateral para comunicação por texto durante a consulta.
 * - Botão para encerrar a chamada (simulada).
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

// --- Importações ---
import React, { useState, useEffect } from 'react';

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export function VideoCallPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Um cabeçalho simplificado é usado para manter o foco na chamada */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg p-3 text-center">
                <h1 className="text-xl font-bold">Consulta de Telemedicina</h1>
            </div>

            {/* O componente principal que contém toda a lógica da simulação */}
            <VideoCallSimulation />
        </div>
    );
}


// --- COMPONENTES INTERNOS DA PÁGINA ---

/**
 * Componente que encapsula toda a lógica e a interface da simulação da chamada de vídeo.
 * Gerencia o estado dos controles de mídia, o cronômetro e o painel de chat.
 */
function VideoCallSimulation() {
    // --- Gerenciamento de Estado ---
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [chatOpen, setChatOpen] = useState(true); // Chat aberto por padrão para facilitar o acesso
    const [callDuration, setCallDuration] = useState(0);

    /**
     * Efeito para iniciar e gerenciar o cronômetro da chamada.
     * Incrementa a duração a cada segundo.
     */
    useEffect(() => {
        const timer = setInterval(() => setCallDuration(prev => prev + 1), 1000);
        // Limpa o intervalo quando o componente é desmontado para evitar vazamentos de memória
        return () => clearInterval(timer);
    }, []);

    /**
     * Formata a duração da chamada de segundos para o formato "MM:SS".
     * @param {number} seconds - A duração total em segundos.
     * @returns {string} A duração formatada.
     */
    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        // Container principal que ocupa o restante da tela
        <div className="w-full h-[calc(100vh-52px)] bg-gray-800 text-white flex">
            {/* Área Principal: Vídeo e Controles */}
            <div className="flex-1 flex flex-col">
                {/* Cabeçalho da Chamada: Informações e Duração */}
                <div className="p-3 bg-gray-900/50 flex justify-between items-center">
                    <div>
                        <p className="font-bold">Dra. Maria Silva</p>
                        <p className="text-sm text-gray-300">Cardiologia</p>
                    </div>
                    <div className="bg-green-600 px-3 py-1 rounded-full text-sm font-bold">
                        Em chamada - {formatDuration(callDuration)}
                    </div>
                </div>

                {/* Área de Vídeo (Simulado) */}
                <div className="flex-grow bg-black flex items-center justify-center relative">
                    {/* Vídeo do outro participante */}
                    <img src="https://i.postimg.cc/rsj9f97v/16.png" alt="Dra. Maria Silva" className="max-h-full max-w-full" />
                    <p className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded">Dra. Maria Silva</p>

                    {/* Janela Picture-in-Picture (Sua Câmera) */}
                    <div className="absolute bottom-4 right-4 w-48 h-32 bg-black rounded-lg border-2 border-secondary overflow-hidden">
                        <img src="https://i.ibb.co/ns2tPQzS/21.png" alt="Você" className="w-full h-full object-cover" />
                        <p className="absolute bottom-1 left-2 bg-black/50 px-2 py-1 text-sm rounded">Você</p>
                        {/* Overlay para quando o vídeo está desativado */}
                        {!videoEnabled && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                <i className="fas fa-video-slash text-2xl"></i>
                            </div>
                        )}
                    </div>
                </div>

                {/* Barra de Controles da Chamada */}
                <div className="p-4 bg-gray-900/50 flex justify-center items-center space-x-4">
                    <ControlButton icon="fa-microphone" active={audioEnabled} onClick={() => setAudioEnabled(!audioEnabled)} />
                    <ControlButton icon="fa-video" active={videoEnabled} onClick={() => setVideoEnabled(!videoEnabled)} />
                    <ControlButton icon="fa-desktop" active={false} onClick={() => alert("Compartilhamento de tela indisponível.")} />
                    <button onClick={() => alert("Chamada finalizada!")} className="w-16 h-12 bg-red-600 rounded-lg flex items-center justify-center text-xl hover:bg-red-700 transition-colors">
                        <i className="fas fa-phone-slash"></i>
                    </button>
                </div>
            </div>

            {/* Painel de Chat Lateral */}
            {chatOpen && (
                <div className="w-80 bg-white text-gray-800 flex flex-col h-full border-l border-gray-600">
                    <div className="p-3 border-b border-gray-200">
                        <h3 className="font-bold">Chat da Consulta</h3>
                    </div>
                    <div className="flex-1 p-3 space-y-4 overflow-y-auto">
                        <div className="text-center text-sm text-gray-400">Nenhuma mensagem ainda.</div>
                    </div>
                    <div className="p-3 border-t border-gray-200 flex gap-2">
                        <input type="text" placeholder="Digite sua mensagem..." className="flex-1 p-2 border border-gray-300 rounded-lg text-sm" />
                        <button className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90">Enviar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * Componente reutilizável para os botões de controle de mídia (microfone, vídeo).
 * @param {{ icon: string, active: boolean, onClick: () => void }} props - Propriedades do botão.
 */
const ControlButton: React.FC<{ icon: string, active: boolean, onClick: () => void }> = ({ icon, active, onClick }) => {
    const baseIconClass = active ? '' : 'fa-slash'; // Adiciona a classe 'fa-slash' se o botão não estiver ativo
    return (
        <button onClick={onClick} className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-colors ${active ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-700'}`}>
            <i className={`fas ${icon} ${baseIconClass}`}></i>
        </button>
    );
};