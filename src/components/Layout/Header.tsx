//import { useNavigate } from 'react-router-dom';
import logoVidaPlusColorida from '/src/assets/logo-branca.png';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// Define o formato de cada link de navegação
type NavLinkItem = {
  path: string;
  label: string;
  icon: string;
};

type HeaderProps = {
  userName: string;
  userAvatarUrl: string;
  navLinks: NavLinkItem[]; // Agora o Header recebe uma lista de links
};

export function Header({ userName, userAvatarUrl, navLinks }: HeaderProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu mobile

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold flex items-center">
            <img src={logoVidaPlusColorida} alt="Logo VidaPlus" className="w-8 h-8 mr-2" />
            <span>VidaPlus</span>
          </a>

          {/* Menu Principal (Desktop) */}
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
                  <i className={`fas ${link.icon} mr-2`}></i>{link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Menu do Usuário (Desktop) */}
          <div className="hidden lg:flex items-center space-x-2">
            <img src={userAvatarUrl} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-white/50" />
            <span>{userName}</span>
            <button onClick={handleLogout} className="ml-4 bg-white/20 hover:bg-white/30 text-white font-bold py-1 px-3 rounded-lg text-sm">
              <i className="fas fa-sign-out-alt mr-1"></i>Sair
            </button>
          </div>

          {/* Botão do Menu Mobile */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>

        {/* Menu Dropdown (Mobile) */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 pb-4">
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)} // Fecha o menu ao clicar
                    className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}`}
                  >
                    <i className={`fas ${link.icon} mr-2`}></i>{link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/20 mt-4 pt-4 flex items-center justify-between">
              <div className='flex items-center'>
                <img src={userAvatarUrl} alt="Avatar" className="w-9 h-9 rounded-full mr-2" />
                <span>{userName}</span>
              </div>
              <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white font-bold py-1 px-3 rounded-lg text-sm">
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}