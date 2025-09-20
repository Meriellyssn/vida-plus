/**
 * Arquivo de Configuração do ESLint (eslint.config.js) - Sistema Vida Plus
 *
 * Este arquivo utiliza o novo formato "flat config" do ESLint para definir
 * as regras de linting do projeto. O objetivo é manter a qualidade do código,
 * padronizar o estilo e encontrar erros potenciais em arquivos TypeScript e React.
 *
 * Funcionalidades principais:
 * - Configura regras para TypeScript (`.ts`, `.tsx`).
 * - Aplica as regras recomendadas para React Hooks.
 * - Integra-se com o plugin React Refresh, otimizado para Vite.
 * - Define o ambiente de execução como o navegador (browser).
 * - Ignora o diretório de build (`dist`) para evitar linting em arquivos gerados.
 *
 * @author Meirielli S. Sousa do N. 
 * @version 1.0.0
 * @since 2025
 */

// --- Importações ---
// Importa as configurações e plugins necessários para o ESLint.
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

// --- Configuração Principal ---
/**
 * `tseslint.config` é a função que cria a configuração.
 * O formato "flat config" é um array, onde cada objeto representa
 * um conjunto de regras para um grupo específico de arquivos.
 */
export default tseslint.config([
  // Ignora globalmente o diretório 'dist', que contém os arquivos de build.
  globalIgnores(['dist']),

  // Objeto de configuração para arquivos TypeScript e React.
  {
    // Aplica estas regras apenas para os arquivos com extensão .ts e .tsx.
    files: ['**/*.{ts,tsx}'],

    // `extends` combina conjuntos de regras pré-configuradas de diferentes plugins.
    extends: [
      // Regras recomendadas do ESLint para JavaScript.
      js.configs.recommended,

      // Regras recomendadas do typescript-eslint para código TypeScript.
      tseslint.configs.recommended,
      
      // Regras recomendadas para o uso correto de React Hooks (ex: useEffect, useState).
      reactHooks.configs['recommended-latest'],

      // Configuração do plugin React Refresh, essencial para o Hot Module Replacement (HMR) do Vite.
      reactRefresh.configs.vite,
    ],

    // `languageOptions` define as configurações específicas da linguagem.
    languageOptions: {
      // Define a versão do ECMAScript para dar suporte a sintaxes modernas.
      ecmaVersion: 2020,

      // Informa ao ESLint que as variáveis globais do navegador (ex: `window`, `document`) existem.
      globals: globals.browser,
    },
  },
]);