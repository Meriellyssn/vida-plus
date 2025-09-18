// src/components/Layout/Header.tsx
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// --- NOVO: Definimos TODOS os menus possíveis em um só lugar ---
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
    { path: '/relatorios', label: 'Relatórios', icon: 'fa-chart-bar' },
    { path: '/sistema', label: 'Sistema', icon: 'fa-cog' },
  ],
};

// Interface para os dados do usuário que vamos ler da "sessão"
interface CurrentUser {
  tipo: 'paciente' | 'profissional' | 'admin';
  nome: string;
  avatarUrl: string;
}

// --- O HEADER AGORA NÃO RECEBE MAIS PROPRIEDADES ---
export function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // NOVO: Estado para guardar as informações do usuário logado
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  // NOVO: Este efeito roda APENAS UMA VEZ quando o Header aparece na tela
  useEffect(() => {
    // 1. Buscamos os dados do usuário no localStorage (que salvamos no login)
    const userJson = localStorage.getItem('currentUser');

    if (userJson) {
      // 2. Se encontrarmos, atualizamos nosso estado com os dados do usuário
      setCurrentUser(JSON.parse(userJson));
    } else {
      // 3. Se NÃO encontrarmos, redirecionamos para o login por segurança
      navigate('/');
    }
  }, []); // O array vazio [] garante que isso rode só uma vez

  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // Limpa a sessão
    navigate('/');
  };

  // Se ainda não tivermos os dados do usuário, não mostramos nada para evitar erros
  if (!currentUser) {
    return null;
  }

  // AQUI ESTÁ A MÁGICA: Escolhemos a lista de links correta com base no tipo do usuário
  const navLinks = navLinksConfig[currentUser.tipo];

  const homePath = 
    currentUser.tipo === 'paciente' ? '/dashboard-paciente' :
    currentUser.tipo === 'profissional' ? '/dashboard-profissional' :
    '/dashboard-admin';

  // O JSX do Header agora usa as variáveis 'currentUser' e 'navLinks'
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-3">
          <NavLink to={homePath} className="text-2xl font-bold flex items-center">
            <img src="/src/assets/logo-branca.png" alt="Logo VidaPlus Branca"
              className="w-8 h-8 mr-2" />
            <span>VidaPlus</span>
          </NavLink>

          <ul className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-white/20' : 'hover:bg-white/10'
                    }`
                  }
                >
                  <i className={`fas ${link.icon} mr-2`}></i>{link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center space-x-2">
            <img src={currentUser.avatarUrl} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-white/50" />
            <span>{currentUser.nome}</span>
            <button onClick={handleLogout} className="ml-4 bg-white/20 hover:bg-white/30 text-white font-bold py-1 px-3 rounded-lg text-sm">
              <i className="fas fa-sign-out-alt mr-1"></i>Sair
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="lg:hidden mt-2 pb-4">
            {/* ... (o menu mobile que já fizemos, ele vai funcionar automaticamente) ... */}
          </div>
        )}
      </div>
    </header>
  );
}