import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Modal = ({ isOpen, onClose, title, children, className, description, size = 'md' }) => {
    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-2xl',
        '2xl': 'max-w-4xl',
        full: 'max-w-[95vw]'
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={cn(
                "relative bg-white rounded-2xl shadow-2xl w-full transform transition-all animate-in zoom-in-95 duration-200 border border-neutral-100 flex flex-col max-h-[90vh]",
                sizes[size],
                className
            )}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 flex-shrink-0">
                    <div>
                        <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
                        {description && (
                            <p className="text-sm text-neutral-500 mt-1">{description}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
