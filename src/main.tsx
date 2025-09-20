/**
 * Ponto de Entrada da Aplicação (main.tsx) - Sistema Vida Plus
 *
 * Este arquivo é o ponto de partida de toda a aplicação React. Suas principais
 * responsabilidades são:
 * 1. Configurar o sistema de rotas usando o React Router DOM.
 * 2. Renderizar o componente raiz da aplicação na página HTML (index.html).
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

// --- Importações Essenciais ---
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globais da aplicação
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// --- Importação das Páginas ---

// Páginas de Autenticação e Erro
import { LoginPage } from './pages/Auth/LoginPage.tsx';
import { ErrorPage } from './pages/ErrorPage.tsx';

// Páginas de Dashboard
import { AdminDashboard } from './pages/Dashboard/AdminDashboard.tsx';
import { PatientDashboard } from './pages/Dashboard/PatientDashboard.tsx';
import { ProfessionalDashboard } from './pages/Dashboard/ProfessionalDashboard.tsx';

// Páginas Internas por Perfil
import { UsersPage } from './pages/Admin/UsersPage.tsx';
import { ReportsPage } from './pages/Admin/ReportsPage.tsx';
import { AgendaPage } from './pages/Professional/AgendaPage.tsx';
import { AgendamentosPage } from './pages/Patient/AgendamentosPage.tsx';

// Páginas Compartilhadas (Telemedicina)
import { TelemedicinaPage } from './pages/Shared/TelemedicinaPage.tsx';
import { VideoCallPage } from './pages/Shared/VideoCallPage.tsx';


// --- Configuração do Roteador ---
/**
 * `createBrowserRouter` é a função recomendada para criar o roteador em
 * aplicações web modernas. Ele define um array de objetos, onde cada objeto
 * representa uma rota da aplicação.
 */
const router = createBrowserRouter([
  {
    // Rota raiz: a primeira página que o usuário vê.
    path: '/',
    element: <LoginPage />,
    // Elemento a ser exibido se ocorrer um erro nesta rota (ex: página não encontrada).
    errorElement: <ErrorPage />,
  },
  // Rotas de Dashboard para cada tipo de usuário
  { path: '/dashboard-admin', element: <AdminDashboard /> },
  { path: '/dashboard-paciente', element: <PatientDashboard /> },
  { path: '/dashboard-profissional', element: <ProfessionalDashboard /> },
  
  // Rotas internas específicas de cada perfil
  { path: '/usuarios', element: <UsersPage /> },
  { path: '/relatorios', element: <ReportsPage /> },
  { path: '/agenda', element: <AgendaPage /> },
  { path: '/agendamentos', element: <AgendamentosPage /> },

  // Rotas de Telemedicina
  { path: '/telemedicina', element: <TelemedicinaPage /> },
  { path: '/chamada-video', element: <VideoCallPage /> },
]);

// --- Renderização da Aplicação ---
/**
 * `ReactDOM.createRoot` cria a raiz da aplicação React no elemento HTML
 * com o id 'root'. Em seguida, o método `render` é chamado para iniciar o
 * processo de renderização.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  // `React.StrictMode` é um wrapper que ajuda a identificar potenciais problemas na aplicação durante o desenvolvimento.
  <React.StrictMode>
    {/* `RouterProvider` é o componente que fornece as informações de rota para toda a aplicação. */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);