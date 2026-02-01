import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

const ToastContext = createContext(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((type, title, message) => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, type, title, message }]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed bottom-0 right-0 p-6 z-[100] flex flex-col gap-4 max-w-md w-full pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={cn(
                            "pointer-events-auto flex gap-4 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all animate-in slide-in-from-right-full duration-300",
                            toast.type === 'success' && "bg-success-50/90 border-success-200 text-success-900",
                            toast.type === 'error' && "bg-red-50/90 border-red-200 text-red-900",
                            toast.type === 'warning' && "bg-warning-50/90 border-warning-200 text-warning-900",
                            toast.type === 'info' && "bg-primary-50/90 border-primary-200 text-primary-900"
                        )}
                    >
                        <div className="flex-shrink-0 pt-0.5">
                            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-success-600" />}
                            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
                            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-warning-600" />}
                            {toast.type === 'info' && <Info className="w-5 h-5 text-primary-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm">{toast.title}</h4>
                            {toast.message && <p className="text-sm opacity-90 mt-1">{toast.message}</p>}
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
