import { useNavigate } from 'react-router-dom';

// Props para customizar o Header no futuro (nome do usuário, avatar, etc.)
type HeaderProps = {
  userName: string;
  userAvatarUrl: string;
};

export function Header({ userName, userAvatarUrl }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Futuramente, aqui também limparíamos o estado global de autenticação
    navigate('/'); // Redireciona para a página de login
  };
  
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <a href="#" className="text-2xl font-bold flex items-center">
            <i className="fas fa-heartbeat mr-2"></i>
            <span>VidaPlus</span>
          </a>

          {/* User Menu */}
          <div className="relative">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src={userAvatarUrl} alt="Avatar" className="w-8 h-8 rounded-full" />
              <span>{userName}</span>
              <button onClick={handleLogout} className="ml-4 bg-white/20 hover:bg-white/30 text-white font-bold py-1 px-3 rounded-lg text-sm">
                <i className="fas fa-sign-out-alt mr-2"></i>Sair
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}