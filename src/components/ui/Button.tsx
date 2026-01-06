import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
    {
        variants: {
            variant: {
                primary:
                    'bg-primary-600 hover:bg-primary-700 text-white shadow-soft hover:shadow-soft-md border border-transparent',
                secondary:
                    'bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 shadow-sm',
                outline:
                    'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
                ghost:
                    'bg-transparent hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900',
            },
            size: {
                sm: 'h-9 px-4 text-sm',
                md: 'h-11 px-6 text-[15px]',
                lg: 'h-14 px-8 text-base font-semibold',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                disabled={isLoading || props.disabled}
                ref={ref}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export default Button;
