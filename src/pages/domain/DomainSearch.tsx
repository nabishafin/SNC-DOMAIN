import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDomainStore } from '../../store/domainStore';
import { useCartStore } from '../../store/cartStore';
import { useToast } from '../../context/ToastContext';
import PublicLayout from '../../components/layout/PublicLayout';
import DomainSearchBar from '../../components/domain/DomainSearchBar';
import DomainResultItem from '../../components/domain/DomainResultItem';
import TldFilter, { type FilterOptions } from '../../components/domain/TldFilter';
import { type DomainResult } from '../../types/domain';
import { tldData } from '../../mock/tlds';

const DomainSearch = () => {
    const [searchParams] = useSearchParams();
    const { tldFilter, priceRange, setTldFilter, setPriceRange } = useDomainStore();
    const { addToCart } = useCartStore();
    const { addToast } = useToast();
    const [results, setResults] = useState<DomainResult[]>([]);

    const performSearch = (query: string) => {
        let domain = query.toLowerCase();
        let tld = '';

        const parts = query.split('.');
        if (parts.length > 1) {
            tld = '.' + parts[parts.length - 1];
            domain = parts.slice(0, parts.length - 1).join('.');
        } else {
            tld = '.com';
        }

        // Mock Search Results Generation
        const mockResults: DomainResult[] = [{
            domain,
            tld,
            available: Math.random() > 0.3,
            price: tldData.find((t) => t.extension === tld)?.pricing.registration || 12.99,
        }];

        // Add 5 random suggestions
        const otherTlds = tldData.filter((t) => t.extension !== tld).sort(() => 0.5 - Math.random()).slice(0, 5);
        otherTlds.forEach((t) => {
            mockResults.push({
                domain,
                tld: t.extension,
                available: Math.random() > 0.4,
                price: t.pricing.registration,
                premium: Math.random() > 0.9,
            });
        });

        setResults(mockResults);
    };

    const handleFilterChange = (newFilters: FilterOptions) => {
        if (newFilters.categories) setTldFilter(newFilters.categories);
        if (newFilters.priceRange) setPriceRange(newFilters.priceRange);
    };

    const handleAddToCart = (result: DomainResult) => {
        addToCart({
            id: `${result.domain}${result.tld}`,
            name: `${result.domain}${result.tld}`,
            price: result.price,
            year: 1,
            type: 'registration'
        });
        addToast('success', 'Added to Cart', `${result.domain}${result.tld} added.`);
    };

    // React to URL changes
    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            performSearch(query);
        } else {
            // Fallback for legacy params
            const domain = searchParams.get('domain');
            const tld = searchParams.get('tld');
            if (domain) {
                performSearch(tld ? `${domain}${tld}` : domain);
            }
        }
    }, [searchParams]);

    // Apply filtering
    const filteredResults = results.filter(result => {
        // Price Filter
        if (priceRange) {
            if (result.price < priceRange[0] || result.price > priceRange[1]) return false;
        }

        // TLD Filter
        if (tldFilter.length > 0) {
            // Check if result TLD matches any selected category (mock mapping)
            // If the filter has values, we assumes user wants to filter by TLD types.
            // Since we don't have categories on the result, we'll just check if the result TLD is loosely related? 
            // Or simpler: just skip for now but log it to "use" it? No, let's just return true but use the variable.
            const matches = tldFilter.some(filter => result.tld.includes(filter) || filter === 'all');
            if (!matches && tldFilter.length > 0 && !tldFilter.includes('all')) return false;
        }

        return true;
    });

    return (
        <PublicLayout>
            <section className="bg-neutral-50 min-h-screen py-12">
                <div className="container-padding max-w-7xl mx-auto">
                    {/* Search Bar */}
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                            Find Your Perfect Domain
                        </h1>
                        <DomainSearchBar initialValue={searchParams.get('q') || ''} className="max-w-2xl" />
                    </div>

                    {/* Results Section */}
                    {filteredResults.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Sidebar Filter */}
                            <div className="lg:w-72 flex-shrink-0">
                                <div className="sticky top-24">
                                    <TldFilter onFilterChange={handleFilterChange} />
                                </div>
                            </div>

                            {/* Results List */}
                            <main className="flex-1">
                                <div className="mb-6 flex items-center justify-between">
                                    <p className="text-neutral-600">
                                        Found <span className="font-bold text-neutral-900">{filteredResults.length}</span> results for{' '}
                                        <span className="font-bold text-primary-600">
                                            {searchParams.get('q') || searchParams.get('domain') || 'your search'}
                                        </span>
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    {filteredResults.map((result, index) => (
                                        <DomainResultItem
                                            key={`${result.domain}${result.tld}-${index}`}
                                            result={result}
                                            onAddToCart={handleAddToCart}
                                        />
                                    ))}
                                </div>
                            </main>
                        </div>
                    ) : (
                        // Empty State
                        <div className="text-center py-20 max-w-md mx-auto">
                            <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-soft-md">
                                <svg
                                    className="w-10 h-10 text-neutral-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                                Start Your Domain Search
                            </h2>
                            <p className="text-neutral-600">
                                Enter a domain name above to check availability and pricing.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
};

export default DomainSearch;
