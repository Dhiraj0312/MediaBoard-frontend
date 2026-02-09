'use client';

import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';

/**
 * Modern Modal Component - Mobile-First, Accessible
 * 
 * Features:
 * - Focus trap with Headless UI Dialog
 * - Backdrop blur effect for modern look
 * - Smooth fade + scale animations (200ms)
 * - Escape key to close
 * - Optional backdrop click to close
 * - Rounded corners (16px) for large containers
 * - Responsive sizing
 * - Proper ARIA attributes
 * - Body scroll lock when open
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-modal" 
        onClose={closeOnOverlayClick ? onClose : () => {}}
        {...props}
      >
        {/* Backdrop with blur */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`
                w-full ${sizeClasses[size]} transform overflow-hidden rounded-xl 
                bg-white text-left align-middle shadow-2xl transition-all ${className}
              `}>
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 border-b border-neutral-200">
                    {title && (
                      <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-neutral-900">
                        {title}
                      </Dialog.Title>
                    )}
                    
                    {showCloseButton && (
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors duration-150"
                        aria-label="Close modal"
                      >
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className={title || showCloseButton ? '' : 'p-4 sm:p-6'}>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

/**
 * Modal Body - Main content area with responsive padding
 */
const ModalBody = ({ children, className = '', ...props }) => (
  <div className={`px-4 py-4 sm:px-6 sm:py-5 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Modal Footer - Action buttons area with responsive padding
 */
const ModalFooter = ({ 
  children, 
  className = '',
  primaryAction,
  secondaryAction,
  ...props 
}) => (
  <div className={`px-4 py-4 sm:px-6 sm:py-5 bg-neutral-50 border-t border-neutral-200 flex flex-col-reverse sm:flex-row justify-end gap-3 ${className}`} {...props}>
    {children || (
      <>
        {secondaryAction && (
          <Button
            variant="secondary"
            onClick={secondaryAction.onClick}
            disabled={secondaryAction.disabled}
            fullWidth={true}
            className="sm:w-auto"
          >
            {secondaryAction.label || 'Cancel'}
          </Button>
        )}
        
        {primaryAction && (
          <Button
            variant={primaryAction.variant || 'primary'}
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled}
            loading={primaryAction.loading}
            fullWidth={true}
            className="sm:w-auto"
          >
            {primaryAction.label || 'Confirm'}
          </Button>
        )}
      </>
    )}
  </div>
);

/**
 * Confirmation Modal - Pre-configured modal for confirmations
 */
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  loading = false,
  ...props
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size="sm"
    {...props}
  >
    <ModalBody>
      <p className="text-sm text-neutral-600 leading-relaxed">{message}</p>
    </ModalBody>
    
    <ModalFooter
      primaryAction={{
        label: confirmLabel,
        onClick: onConfirm,
        variant,
        loading
      }}
      secondaryAction={{
        label: cancelLabel,
        onClick: onClose
      }}
    />
  </Modal>
);

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Confirm = ConfirmModal;

export { ConfirmModal };
export default Modal;