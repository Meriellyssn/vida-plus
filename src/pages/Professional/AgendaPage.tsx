// src/pages/Professional/AgendaPage.tsx
import { Header } from '../../components/Layout/Header';

// Lista de links para o header desta página
const professionalNavLinks = [
    { path: "/dashboard-profissional", label: "Início", icon: "fa-home" },
    { path: "/agenda", label: "Agenda", icon: "fa-calendar-alt" },
    { path: "/pacientes", label: "Pacientes", icon: "fa-users" },
    { path: "/prontuarios", label: "Prontuários", icon: "fa-file-medical" },
];

// Verifique se a função se chama "AgendaPage" e tem o "export"
export function AgendaPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        userName="Dra. Maria Silva" // Dados temporários
        userAvatarUrl="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face" // Dados temporários
        navLinks={professionalNavLinks} 
      />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Agenda Profissional</h1>
        <p className="mt-2 text-gray-600">O conteúdo completo da agenda virá aqui.</p>
      </main>
    </div>
  );
}