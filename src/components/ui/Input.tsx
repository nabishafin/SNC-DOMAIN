import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        className={cn(
                            'flex h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm',
                            error && 'border-red-500 focus-visible:ring-red-500',
                            className
                        )}
                        ref={ref}
                        aria-invalid={!!error}
                        {...props}
                    />
                </div>
                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-neutral-500">
                        {helperText}
                    </p>
                )}
                {error && (
                    <p className="mt-1.5 text-sm text-red-600 font-medium">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export default Input;
