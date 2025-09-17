// src/pages/Patient/AgendamentosPage.tsx
import { Header } from '../../components/Layout/Header';

// Lista de links para o header desta página
const patientNavLinks = [
  { path: '/dashboard-paciente', label: 'Início', icon: 'fa-home' },
  { path: '/agendamentos', label: 'Agendamentos', icon: 'fa-calendar-alt' },
  { path: '/historico', label: 'Histórico', icon: 'fa-file-medical' },
  { path: '/telemedicina', label: 'Telemedicina', icon: 'fa-video' },
];

export function AgendamentosPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        userName="Carlos Santos" // Dados temporários
        userAvatarUrl="https://i.ibb.co/ns2tPQzS/21.png" // Dados temporários
        navLinks={patientNavLinks} 
      />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Meus Agendamentos</h1>
        <p className="mt-2 text-gray-600">A lista completa de agendamentos (futuros e passados) virá aqui.</p>
      </main>
    </div>
  );
}