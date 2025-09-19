/**
 * Componente Modal - Sistema Vida Plus
 *
 * Este componente representa uma janela modal reutilizável, com
 * suporte a diferentes tamanhos e animações de abertura/fechamento
 * usando Headless UI e Tailwind CSS.
 *
 * O modal recebe um título, conteúdo (children), controle de abertura
 * e fechamento, e um tamanho opcional.
 *
 * @author Meirielli S. Sousa do N.
 * @version 1.0.0
 * @since 2025
 */

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import type { ReactNode } from 'react';

// ----------------------------
// Tipos e interfaces
// ----------------------------

// 1. Tamanhos suportados pelo Modal
type ModalSize = 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

// 2. Props do componente Modal
type ModalProps = {
  isOpen: boolean;          // Controla se o modal está aberto
  onClose: () => void;      // Função chamada ao fechar o modal
  title: string;            // Título exibido no cabeçalho
  children: ReactNode;      // Conteúdo interno do modal
  size?: ModalSize;         // Tamanho opcional do modal (padrão: 2xl)
};

// 3. Mapeamento de classes CSS para cada tamanho
const sizeClasses: Record<ModalSize, string> = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl', // recomendado para formulários complexos
  '5xl': 'max-w-5xl',
};

// ----------------------------
// Componente Modal
// ----------------------------
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = '2xl', // valor padrão
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>

        {/* Backdrop semi-transparente */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        {/* Container central do modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">

            {/* Painel do modal com animação */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all`}>

                {/* Cabeçalho do modal */}
                <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white flex justify-between items-center">
                  <h3 className="text-xl font-bold leading-6">{title}</h3>
                  <button onClick={onClose} className="text-white/70 hover:text-white">
                    <i className="fas fa-times fa-lg"></i>
                  </button>
                </div>

                {/* Conteúdo do modal */}
                <div className="p-6">{children}</div>
              </Dialog.Panel>
            </Transition.Child>

          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
