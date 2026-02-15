import { ShoppingCart, Check } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { cn } from '../../lib/utils';

const DomainResultItem = ({ result, onAddToCart, featured = false }) => {
    return (
        <article className={cn(
            "flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-lg transition-all gap-4 sm:gap-0",
            featured
                ? "border-primary-200 bg-gradient-to-r from-white to-primary-50/30 shadow-soft-md p-6 ring-1 ring-primary-100"
                : "border-neutral-200 hover:shadow-soft-md"
        )}>
            <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                    <h3 className={cn(
                        "font-semibold text-neutral-900 break-all",
                        featured ? "text-xl md:text-2xl" : "text-lg"
                    )}>
                        {/* Only append TLD if it's not already part of the domain string */}
                        {result.domain}
                        {result.tld && result.tld !== 'undefined' && !result.domain.endsWith(`.${result.tld}`) && !result.domain.endsWith(result.tld) && (
                            <span className="text-primary-600">.{result.tld.replace(/^\./, '')}</span>
                        )}
                    </h3>
                    <div className="flex items-center gap-2">
                        <Badge variant={result.available ? 'success' : 'error'} size={featured ? 'md' : 'sm'}>
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
                            <Badge variant="warning" size={featured ? 'md' : 'sm'}>
                                Premium
                            </Badge>
                        )}
                        {featured && result.available && (
                            <Badge variant="primary" size="md" className="animate-pulse">
                                Best Match
                            </Badge>
                        )}
                    </div>
                </div>
                {result.available && (
                    <p className={cn(
                        "text-neutral-600",
                        featured ? "text-base" : "text-sm"
                    )}>
                        {featured ? 'Your perfect domain is available! Secure it now before someone else does.' : 'Register this domain and make it yours today'}
                    </p>
                )}
            </div>

            {/* Actions Section */}
            {result.available && (
                <div className="flex flex-row items-center justify-between sm:justify-end gap-4 w-full sm:w-auto sm:ml-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    <div className="text-left sm:text-right">
                        {result.price ? (
                            <p className={cn(
                                "font-bold text-neutral-900",
                                featured ? "text-3xl" : "text-2xl"
                            )}>
                                ${typeof result.price === 'number' ? result.price.toFixed(2) : result.price}
                            </p>
                        ) : (
                            <p className="text-lg font-semibold text-neutral-400">
                                Price Unavailable
                            </p>
                        )}
                        {result.price && <p className="text-xs text-neutral-500 font-medium">per year</p>}
                    </div>
                    <Button
                        variant="primary"
                        size={featured ? 'lg' : 'md'}
                        onClick={() => onAddToCart?.(result)}
                        className={featured ? "px-8" : ""}
                    >
                        <ShoppingCart className={featured ? "w-5 h-5" : "w-4 h-4"} />
                        <span className="ml-2 font-bold">Add to Cart</span>
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
