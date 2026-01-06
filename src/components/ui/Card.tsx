import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
    'rounded-xl bg-white transition-all duration-300',
    {
        variants: {
            variant: {
                default: 'border border-neutral-100 shadow-soft hover:shadow-soft-md',
                bordered: 'border border-neutral-200',
                elevated: 'shadow-soft-lg hover:shadow-float border-t-4 border-t-primary-500',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface CardProps
    extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

const Card = ({ className, variant, children, ...props }: CardProps) => {
    return (
        <div className={cn(cardVariants({ variant, className }))} {...props}>
            {children}
        </div>
    );
};

export const CardHeader = ({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6 pb-3', className)} {...props}>
        {children}
    </div>
);

export const CardBody = ({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6 pt-0', className)} {...props}>
        {children}
    </div>
);

export const CardFooter = ({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('p-6 pt-0', className)} {...props}>
        {children}
    </div>
);

export default Card;
