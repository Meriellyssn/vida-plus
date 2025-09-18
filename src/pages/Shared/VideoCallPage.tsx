// src/pages/Shared/VideoCallPage.tsx
import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Layout/Header';

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export function VideoCallPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Usamos um Header simples para esta tela de foco total */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg p-3 text-center">
                <h1 className="text-xl font-bold">Consulta de Telemedicina</h1>
            </div>

            {/* Componente que simula a chamada de vídeo */}
            <VideoCallSimulation />
        </div>
    );
}


// --- COMPONENTE QUE SIMULA A CHAMADA DE VÍDEO ---
function VideoCallSimulation() {
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [chatOpen, setChatOpen] = useState(true); // Deixar aberto por padrão
    const [callDuration, setCallDuration] = useState(0);

    // Simula o timer da chamada
    useEffect(() => {
        const timer = setInterval(() => setCallDuration(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full h-[calc(100vh-52px)] bg-gray-800 text-white flex">
            {/* Área Principal do Vídeo */}
            <div className="flex-1 flex flex-col">
                {/* Header da Chamada */}
                <div className="p-3 bg-gray-900/50 flex justify-between items-center">
                    <div>
                        <p className="font-bold">Dra. Ana Costa</p>
                        <p className="text-sm text-gray-300">Cardiologia</p>
                    </div>
                    <div className="bg-green-600 px-3 py-1 rounded-full text-sm font-bold">
                        Em chamada - {formatDuration(callDuration)}
                    </div>
                </div>

                {/* Vídeo Principal (Simulado) */}
                <div className="flex-grow bg-black flex items-center justify-center relative">
                    <img src="https://i.postimg.cc/SRkrLP16/17.png" alt="Dra. Ana Costa" className="max-h-full max-w-full" />
                    <p className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded">Dra. Ana Costa</p>

                    {/* Sua Câmera (Simulada) */}
                    <div className="absolute bottom-4 right-4 w-48 h-32 bg-black rounded-lg border-2 border-secondary overflow-hidden">
                        <img src="https://i.ibb.co/ns2tPQzS/21.png" alt="Você" className="w-full h-full object-cover" />
                        <p className="absolute bottom-1 left-2 bg-black/50 px-2 py-1 text-sm rounded">Você</p>
                        {!videoEnabled && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                <i className="fas fa-video-slash text-2xl"></i>
                            </div>
                        )}
                    </div>
                </div>

                {/* Controles da Chamada */}
                <div className="p-4 bg-gray-900/50 flex justify-center items-center space-x-4">
                    <ControlButton icon="fa-microphone" active={audioEnabled} onClick={() => setAudioEnabled(!audioEnabled)} />
                    <ControlButton icon="fa-video" active={videoEnabled} onClick={() => setVideoEnabled(!videoEnabled)} />
                    <ControlButton icon="fa-desktop" active={false} onClick={() => alert("Compartilhamento de tela indisponível.")} />
                    <button onClick={() => alert("Chamada finalizada!")} className="w-16 h-12 bg-red-600 rounded-lg flex items-center justify-center text-xl hover:bg-red-700">
                        <i className="fas fa-phone-slash"></i>
                    </button>
                </div>
            </div>

            {/* Painel de Chat */}
            {chatOpen && (
                <div className="w-80 bg-white text-gray-800 flex flex-col h-full border-l border-gray-600">
                    <div className="p-3 border-b border-gray-200">
                        <h3 className="font-bold">Chat da Consulta</h3>
                    </div>
                    <div className="flex-1 p-3 space-y-4 overflow-y-auto">
                        {/* Mensagens aqui */}
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

// Componente para os botões de controle
const ControlButton: React.FC<{ icon: string, active: boolean, onClick: () => void }> = ({ icon, active, onClick }) => {
    return (
        <button onClick={onClick} className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${active ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-700'}`}>
            <i className={`fas ${icon} ${!active ? 'fa-slash' : ''}`}></i>
        </button>
    );
};