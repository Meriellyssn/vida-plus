// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Páginas Principais
import { LoginPage } from './pages/Auth/LoginPage.tsx';
import { ErrorPage } from './pages/ErrorPage.tsx';

// Dashboards
import { AdminDashboard } from './pages/Dashboard/AdminDashboard.tsx';
import { PatientDashboard } from './pages/Dashboard/PatientDashboard.tsx';
import { ProfessionalDashboard } from './pages/Dashboard/ProfessionalDashboard.tsx';

// Páginas Internas
import { UsersPage } from './pages/Admin/UsersPage.tsx';
import { ReportsPage } from './pages/Admin/ReportsPage.tsx';
import { AgendaPage } from './pages/Professional/AgendaPage.tsx';
import { AgendamentosPage } from './pages/Patient/AgendamentosPage.tsx';

// Telemedicina
import { TelemedicinaPage } from './pages/Shared/TelemedicinaPage.tsx';
import { VideoCallPage } from './pages/Shared/VideoCallPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  // Rotas de Dashboard
  { path: '/dashboard-admin', element: <AdminDashboard /> },
  { path: '/dashboard-paciente', element: <PatientDashboard /> },
  { path: '/dashboard-profissional', element: <ProfessionalDashboard /> },
  
  // Rotas Internas (agora completas)
  { path: '/usuarios', element: <UsersPage /> },
  { path: '/relatorios', element: <ReportsPage /> },
  { path: '/agenda', element: <AgendaPage /> },
  { path: '/agendamentos', element: <AgendamentosPage /> },
  { path: '/telemedicina', element: <TelemedicinaPage /> }, // <-- Adicionamos a nova rota
  { path: '/chamada-video', element: <VideoCallPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);