/**
 * Componente Header - Sistema Vida Plus
 *
 * Este componente representa o cabeçalho principal do sistema,
 * exibido em todas as páginas após o login do usuário.
 *
 * Ele contém:
 * - O logotipo e o nome da aplicação.
 * - Um menu de navegação dinâmico que muda conforme o tipo de usuário
 *   (paciente, profissional ou administrador).
 * - Avatar, nome do usuário logado e botão de logout na versão desktop.
 * - Um menu responsivo para dispositivos móveis (hambúrguer).
 *
 * O componente valida os dados do usuário a partir do localStorage
 * e redireciona para a página de login caso não exista sessão ativa.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logoVidaPlus from '/src/assets/logo-branca.png';

// --- Configuração centralizada dos menus ---
const navLinksConfig = {
  paciente: [
    { path: '/dashboard-paciente', label: 'Início', icon: 'fa-home' },
    { path: '/agendamentos', label: 'Agendamentos', icon: 'fa-calendar-alt' },
    { path: '/historico', label: 'Histórico', icon: 'fa-file-medical' },
    { path: '/telemedicina', label: 'Telemedicina', icon: 'fa-video' },
  ],
  profissional: [
    { path: "/dashboard-profissional", label: "Início", icon: "fa-home" },
    { path: "/agenda", label: "Agenda", icon: "fa-calendar-alt" },
    { path: "/pacientes", label: "Pacientes", icon: "fa-users" },
    { path: "/telemedicina", label: "Telemedicina", icon: "fa-video" },
  ],
  admin: [
    { path: '/dashboard-admin', label: 'Início', icon: 'fa-home' },
    { path: '/usuarios', label: 'Usuários', icon: 'fa-users' },
    { path: '/leitos', label: 'Leitos', icon: 'fa-bed' },
    { path: '/relatorios', label: 'Relatórios', icon: 'fa-chart-bar' },
    { path: '/sistema', label: 'Sistema', icon: 'fa-cog' },
  ],
};

// Tipagem do usuário logado
interface CurrentUser {
  tipo: 'paciente' | 'profissional' | 'admin';
  nome: string;
  avatarUrl: string;
}

export function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // Carrega dados do usuário do localStorage
  useEffect(() => {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const parsedUser: CurrentUser = JSON.parse(userJson);
        if (parsedUser?.tipo && parsedUser?.nome && parsedUser?.avatarUrl) {
          setCurrentUser(parsedUser);
        } else {
          navigate('/');
        }
      } catch {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!currentUser) {
    return null;
  }

  const navLinks = navLinksConfig[currentUser.tipo];
  const homePath = navLinks[0].path; // Primeiro link sempre é "Início"

  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <NavLink to={homePath} className="text-2xl font-bold flex items-center">
            <img
              src={logoVidaPlus}
              alt="Logo VidaPlus Branca"
              className="w-8 h-8 mr-2"
            />
            <span>VidaPlus</span>
          </NavLink>

          {/* Menu Desktop */}
          <ul className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-white/20' : 'hover:bg-white/10'
                    }`
                  }
                >
                  <i className={`fas ${link.icon} mr-2`}></i>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Usuário + Logout Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <img
              src={currentUser.avatarUrl}
              alt="Avatar do usuário"
              className="w-9 h-9 rounded-full border-2 border-white/50"
            />
            <span>{currentUser.nome}</span>
            <button
              onClick={handleLogout}
              className="ml-4 bg-white/20 hover:bg-white/30 text-white font-bold py-1 px-3 rounded-lg text-sm"
              aria-label="Sair do sistema"
            >
              <i className="fas fa-sign-out-alt mr-1"></i>Sair
            </button>
          </div>

          {/* Botão menu mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl"
              aria-label="Abrir menu"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="flex items-center px-4 py-2 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)} // Fecha menu ao clicar
              >
                <i className={`fas ${link.icon} mr-2`}></i>
                {link.label}
              </NavLink>
            ))}

            <div className="flex items-center px-4 mt-3">
              <img
                src={currentUser.avatarUrl}
                alt="Avatar do usuário"
                className="w-8 h-8 rounded-full border-2 border-white/50 mr-2"
              />
              <span>{currentUser.nome}</span>
              <button
                onClick={handleLogout}
                className="ml-auto bg-white/20 hover:bg-white/30 text-white font-bold py-1 px-3 rounded-lg text-sm"
                aria-label="Sair do sistema"
              >
                <i className="fas fa-sign-out-alt mr-1"></i>Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
