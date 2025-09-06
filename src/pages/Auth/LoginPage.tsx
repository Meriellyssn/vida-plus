import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoVidaPlus from '/src/assets/logo.png';

// Componente funcional da página de login
export function LoginPage() {
  // --- Estados do formulário ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  // --- Função de validação do formulário ---
  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;
    // Validação do email/CPF
    if (!email) {
      newErrors.email = 'Por favor, insira um email ou CPF.';
      isValid = false;
    }
        // Validação da senha (mínimo de 6 caracteres)
    if (password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
      isValid = false;
    }

    setErrors(newErrors); // Atualiza o estado de erros
    return isValid; // Retorna true se válido, false caso contrário
  };
   // --- Função que trata o evento de login ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Para a execução se o formulário for inválido
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard-paciente'); 
}, 2000);
  };
  // --- Renderização do componente ---
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary to-secondary">
      {/* Container principal da página, com gradiente de fundo */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full grid lg:grid-cols-2 relative">
        {/* --- Lado esquerdo (informações do sistema) --- */}
        <div className="p-8 text-white bg-gradient-to-br from-primary to-secondary hidden lg:flex flex-col items-center justify-center text-center">
          <img
            src={logoVidaPlus}
            alt="Logo VidaPlus"
            className="w-40 mb-6"
          />
          <h1 className="text-4xl font-bold mb-2">VidaPlus</h1>
          <p className="text-lg opacity-90 mb-6">Sistema de Gestão Hospitalar e de Serviços de Saúde</p>
          <ul className="space-y-3 text-left max-w-xs">
            <li className="flex items-center"><i className="fas fa-check mr-3"></i>Gestão completa de pacientes</li>
            <li className="flex items-center"><i className="fas fa-check mr-3"></i>Agendamento inteligente</li>
            <li className="flex items-center"><i className="fas fa-check mr-3"></i>Prontuários digitais</li>
            <li className="flex items-center"><i className="fas fa-check mr-3"></i>Telemedicina integrada</li>
          </ul>
        </div>
        {/* --- Lado direito (formulário de login) --- */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Fazer Login</h2>
          <form onSubmit={handleLogin} noValidate> {/* noValidate previne a validação padrão do navegador */}
            {/* Campo de email/CPF */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email ou CPF</label>
              <input
                type="text"
                id="email"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'}`}
                placeholder="Digite seu email ou CPF"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* --- Exibição condicional da mensagem de erro --- */}
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>
            {/* Campo de senha */}
            <div className="mb-4">
              <label htmlFor="password"className="block text-gray-700 font-medium mb-2">Senha</label>
              <input
                type="password"
                id="password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'}`}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Exibe mensagem de erro se houver */}
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>
              {/* Link para recuperação de senha */}
            <div className="flex justify-between items-center mb-6">
                <a href="#" className="text-sm text-primary hover:underline">Esqueceu a senha?</a>
            </div>
            {/* Botão de login */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300 flex items-center justify-center disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading && (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              )}
              {!isLoading && <i className="fas fa-sign-in-alt mr-2"></i>}
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
            {/* Informações de usuários para teste */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
              <h6 className="font-semibold flex items-center mb-3 text-gray-700">
                <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                Usuários para teste:
              </h6>
              <div className="space-y-2 text-sm text-gray-600">
                <div><strong>Admin:</strong> admin@vidaplus.com | 123456</div>
                <div><strong>Médico:</strong> medico@vidaplus.com | 123456</div>
                <div><strong>Paciente:</strong> 12345678900 | 123456</div>
              </div>
            </div>
          </form>
        </div>
      
        <div className="absolute bottom-2 left-2 text-xs text-gray-700 bg-white/50 p-1 rounded">
          Meirielli Silva Sousa do Nascimento - RU: 1728758
        </div>
      </div>
    </div>
  );
}