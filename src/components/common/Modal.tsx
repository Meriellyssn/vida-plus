// src/components/common/Modal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import type { ReactNode } from 'react';

// 1. Definimos os tamanhos que nosso modal pode ter
type ModalSize = 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: ModalSize; // 2. Adicionamos a propriedade 'size' (opcional)
};

// 3. Criamos um "mapa de estilos" para os tamanhos, como fizemos com as prioridades
const sizeClasses: Record<ModalSize, string> = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl', // <-- Um bom tamanho para formulários complexos
  '5xl': 'max-w-5xl',
};

export function Modal({ isOpen, onClose, title, children, size = '2xl' }: ModalProps) { // O tamanho padrão será '2xl'
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* ... (o código do Transition e do backdrop continua o mesmo) ... */}
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* 4. Usamos a classe de tamanho dinâmica aqui */}
              <Dialog.Panel className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all`}>
                <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white flex justify-between items-center">
                    <h3 className="text-xl font-bold leading-6">
                        {title}
                    </h3>
                    <button onClick={onClose} className="text-white/70 hover:text-white">
                        <i className="fas fa-times fa-lg"></i>
                    </button>
                </div>
                
                <div className="p-6">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}