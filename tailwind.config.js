/**
 * Arquivo de Configuração do Tailwind CSS (tailwind.config.js) - Sistema Vida Plus
 *
 * Este arquivo é o centro de controle do Tailwind CSS para o projeto.
 * Aqui, personalizamos e estendemos o framework para criar um sistema de
 * design consistente que corresponda à identidade visual do VidaPlus.
 *
 * Funcionalidades principais:
 * - Define quais arquivos serão "varridos" em busca de classes do Tailwind (`content`).
 * - Estende o tema padrão com uma paleta de cores personalizada (`colors`).
 * - Configura a família de fontes principal do projeto (`fontFamily`).
 * - Adiciona novos valores para arredondamento de bordas e sombras.
 * - Cria novas animações e keyframes para uso em toda a aplicação.
 *
 * @author Meirielli S. Sousa do N. 
 * @version 1.0.0
 * @since 2025
 */

/** @type {import('tailwindcss').Config} */
export default {
  /**
   * A propriedade `content` informa ao Tailwind quais arquivos ele deve analisar.
   * O motor JIT (Just-In-Time) usará essa informação para gerar apenas o CSS
   * correspondente às classes que você realmente está usando, resultando
   * em um arquivo final extremamente otimizado.
   */
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Analisa todos os arquivos JS/TS/JSX/TSX dentro de /src
  ],

  /**
   * A propriedade `theme` é onde toda a customização do design system acontece.
   * Usamos `extend` para adicionar nossos próprios valores ao tema padrão do Tailwind,
   * em vez de substituí-lo completamente.
   */
  theme: {
    extend: {
      // Define a paleta de cores personalizada do projeto.
      colors: {
        // A chave 'DEFAULT' permite usar classes como `bg-primary`, `text-primary`, etc.
        primary: {
          DEFAULT: '#e8464b',
          50: '#fef2f2', 100: '#fde6e7', 200: '#fbcbcd', 300: '#f7a4a7', 400: '#f17076',
          500: '#e8464b', 600: '#d63339', 700: '#b3252a', 800: '#94222b', 900: '#7c232a', 950: '#431012'
        },
        secondary: {
          DEFAULT: '#6dc6d6',
          50: '#f0fdf4', 100: '#dcfce7', 200: '#b8f7d1', 300: '#86efac', 400: '#6dc6d6',
          500: '#34d399', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d'
        },
        // Cores semânticas para componentes como botões e alertas.
        accent: '#f59e0b',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#dc3545',
        surface: '#ffffff', // Cor de fundo para cards e superfícies.
        muted: '#64748b',   // Cor para textos secundários.
      },
      // Define a família de fontes padrão para o projeto.
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      // Adiciona um valor de arredondamento de borda personalizado.
      borderRadius: {
        'custom': '12px',
      },
      // Adiciona variantes de sombra personalizadas.
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'custom-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
      },
      // Define novas animações para serem usadas com classes como `animate-fade-in`.
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'count-up': 'countUp 2s ease-out',
      },
      // Define os keyframes que as animações acima utilizam.
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },

  /**
   * A propriedade `plugins` é usada para adicionar funcionalidades extras
   * ao Tailwind, como plugins oficiais (@tailwindcss/forms) ou de terceiros.
   */
  plugins: [],
}