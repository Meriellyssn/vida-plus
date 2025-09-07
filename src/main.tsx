import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-calendar/dist/Calendar.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LoginPage } from './pages/Auth/LoginPage.tsx';
import { AdminDashboard } from './pages/Dashboard/AdminDashboard.tsx';
import { PatientDashboard } from './pages/Dashboard/PatientDashboard.tsx';
import { ProfessionalDashboard } from './pages/Dashboard/ProfessionalDashboard.tsx';
import { ErrorPage } from './pages/ErrorPage.tsx'; // <-- 1. Importe a página de erro

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard-admin',
    element: <AdminDashboard />,
  },
  {
    path: '/dashboard-paciente',
    element: <PatientDashboard />,
  },
  {
    path: '/dashboard-profissional',
    element: <ProfessionalDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);