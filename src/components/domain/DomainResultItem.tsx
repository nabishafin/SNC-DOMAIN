import { ShoppingCart, Check } from 'lucide-react';
import { type DomainResult } from '../../types/domain';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface DomainResultItemProps {
    result: DomainResult;
    onAddToCart?: (result: DomainResult) => void;
}

const DomainResultItem = ({ result, onAddToCart }: DomainResultItemProps) => {
    return (
        <article className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-soft-md transition-shadow gap-4 sm:gap-0">
            <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-neutral-900 break-all">
                        {result.domain}
                        <span className="text-primary-600">{result.tld}</span>
                    </h3>
                    <div className="flex items-center gap-2">
                        <Badge variant={result.available ? 'success' : 'error'} size="sm">
                            {result.available ? (
                                <>
                                    <Check className="w-3 h-3 mr-1" />
                                    Available
                                </>
                            ) : (
                                'Taken'
                            )}
                        </Badge>
                        {result.premium && (
                            <Badge variant="warning" size="sm">
                                Premium
                            </Badge>
                        )}
                    </div>
                </div>
                {result.available && (
                    <p className="text-sm text-neutral-600">
                        Register this domain and make it yours today
                    </p>
                )}
            </div>

            {/* Actions Section */}
            {result.available && (
                <div className="flex flex-row items-center justify-between sm:justify-end gap-4 w-full sm:w-auto sm:ml-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    <div className="text-left sm:text-right">
                        <p className="text-2xl font-bold text-neutral-900">
                            ${result.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-neutral-500">per year</p>
                    </div>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={() => onAddToCart?.(result)}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="ml-2">Add</span>
                    </Button>
                </div>
            )}

            {!result.available && (
                <div className="w-full sm:w-auto sm:ml-4">
                    <Button variant="outline" size="md" disabled className="w-full sm:w-auto">
                        Unavailable
                    </Button>
                </div>
            )}
        </article>
    );
};

export default DomainResultItem;
