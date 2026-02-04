import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Clock, Globe2, TrendingUp, Users, Filter, ChevronDown, Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setTldFilter, setPriceRange } from '../../redux/slices/domainSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { useToast } from '../../context/ToastContext';
import { useLazySearchDomainQuery } from '../../redux/features/domain/domainApi';
import PublicLayout from '../../components/layout/PublicLayout';
import DomainSearchBar from '../../components/domain/DomainSearchBar';
import DomainResultItem from '../../components/domain/DomainResultItem';
import TldFilter from '../../components/domain/TldFilter';
import Button from '../../components/ui/Button';
import { tldData } from '../../mock/tlds';
import { cn } from '../../lib/utils';

const DomainSearch = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { tldFilter, priceRange } = useSelector((state) => state.domain);
    const { addToast } = useToast();
    const [results, setResults] = useState([]);

    const [triggerSearch, { data: apiResults, isFetching, isError }] = useLazySearchDomainQuery();

    const performSearch = async (query) => {
        if (!query) return;
        try {
            await triggerSearch(query).unwrap();
        } catch (err) {
            console.error('Search failed:', err);
            addToast('error', 'Search Failed', 'Could not fetch domain results. Please try again.');
        }
    };

    // Update results when API data changes
    useEffect(() => {
        if (apiResults) {
            setResults(Array.isArray(apiResults) ? apiResults : [apiResults]);
        }
    }, [apiResults]);

    const handleFilterChange = (newFilters) => {
        if (newFilters.categories) dispatch(setTldFilter(newFilters.categories));
        if (newFilters.priceRange) dispatch(setPriceRange(newFilters.priceRange));
    };

    const handleAddToCart = (result) => {
        dispatch(addToCart({
            id: `${result.domain}${result.tld}`,
            name: `${result.domain}${result.tld}`,
            price: result.price,
            year: 1,
            type: 'registration'
        }));
        addToast('success', 'Added to Cart', `${result.domain}${result.tld} added.`);
    };

    const handleQuickSearch = (tldExtension) => {
        const currentQuery = searchParams.get('q') || 'mydomain';
        const baseDomain = currentQuery.split('.')[0];
        performSearch(`${baseDomain}${tldExtension}`);
    };

    // React to URL changes
    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            performSearch(query);
        } else {
            const domain = searchParams.get('domain');
            const tld = searchParams.get('tld');
            if (domain) {
                performSearch(tld ? `${domain}${tld}` : domain);
            }
        }
    }, [searchParams]);

    // Apply filtering
    const filteredResults = results.filter(result => {
        if (priceRange) {
            if (result.price < priceRange[0] || result.price > priceRange[1]) return false;
        }

        if (tldFilter.length > 0) {
            const matches = tldFilter.some(filter => result.tld.includes(filter) || filter === 'all');
            if (!matches && tldFilter.length > 0 && !tldFilter.includes('all')) return false;
        }

        return true;
    });

    const popularTlds = tldData.filter(t => t.popular).slice(0, 6);

    const features = [
        { icon: Zap, title: 'Instant Setup', description: 'Get your domain live in seconds', color: 'text-amber-600 bg-amber-50' },
        { icon: Shield, title: 'Free Privacy', description: 'WHOIS protection included', color: 'text-success-600 bg-success-50' },
        { icon: Clock, title: '24/7 Support', description: 'Expert help anytime', color: 'text-primary-600 bg-primary-50' },
    ];

    const stats = [
        { icon: Globe2, value: '4.2M+', label: 'Domains Managed' },
        { icon: Users, value: '890K+', label: 'Happy Customers' },
        { icon: TrendingUp, value: '99.99%', label: 'Uptime' },
    ];

    const hasSearched = results.length > 0 || isFetching;

    return (
        <PublicLayout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#f0f7ff] via-white to-[#e0f2fe] py-16 overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                <div className="container-padding max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-6 leading-tight">
                                    Find Your Perfect
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                                        Domain Name
                                    </span>
                                </h1>
                                <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto lg:mx-0">
                                    Search millions of available domains. Secure your digital identity with instant setup and free privacy protection.
                                </p>

                                {/* Stats */}
                                <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <stat.icon className="w-5 h-5 text-primary-600" />
                                            <div>
                                                <div className="font-bold text-neutral-900">{stat.value}</div>
                                                <div className="text-xs text-neutral-500">{stat.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Search Bar */}
                                <div className="max-w-2xl mx-auto lg:mx-0">
                                    <DomainSearchBar initialValue={searchParams.get('q') || ''} />
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Image */}
                        <div className="lg:w-1/2 hidden lg:block">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <img
                                    src="/domain_search_hero.png"
                                    alt="Domain Search"
                                    className="w-full max-w-lg mx-auto drop-shadow-2xl"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular TLDs Section - Show when no search */}
            {!hasSearched && (
                <section className="py-12 bg-white border-b border-neutral-100">
                    <div className="container-padding max-w-7xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-neutral-900 mb-2">Popular Domain Extensions</h2>
                            <p className="text-neutral-500">Quick search with our most popular TLDs</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {popularTlds.map((tld) => (
                                <motion.button
                                    key={tld.extension}
                                    whileHover={{ y: -4 }}
                                    onClick={() => handleQuickSearch(tld.extension)}
                                    className="p-6 bg-white border-2 border-neutral-100 rounded-xl hover:border-primary-500 hover:shadow-soft-md transition-all group"
                                >
                                    <div className="text-3xl font-black text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                                        {tld.extension}
                                    </div>
                                    <div className="text-sm text-neutral-500 mb-3">{tld.name}</div>
                                    <div className="text-xl font-bold text-primary-600">${tld.pricing.registration}</div>
                                    <div className="text-xs text-neutral-400">per year</div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Features Section - Show when no search */}
            {!hasSearched && (
                <section className="py-12 bg-neutral-50">
                    <div className="container-padding max-w-7xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-neutral-900 mb-2">Why Choose SNC DOMAINS</h2>
                            <p className="text-neutral-500">Everything you need to succeed online</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-soft hover:shadow-soft-md transition-all"
                                >
                                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4", feature.color)}>
                                        <feature.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                                    <p className="text-neutral-600">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Results Section */}
            {hasSearched && (
                <section className="py-12 bg-neutral-50 min-h-screen">
                    <div className="container-padding max-w-7xl mx-auto">
                        {isFetching ? (
                            <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
                                <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                                <p className="text-lg font-medium text-neutral-600">Searching for your domain...</p>
                            </div>
                        ) : filteredResults.length > 0 ? (
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Sidebar Filter */}
                                <div className="lg:w-72 flex-shrink-0">
                                    <div className="lg:sticky lg:top-24">
                                        <div className="lg:hidden mb-4">
                                            <Button
                                                variant="outline"
                                                className="w-full flex items-center justify-between"
                                                onClick={() => document.getElementById('mobile-filters')?.classList.toggle('hidden')}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <Filter className="w-4 h-4" />
                                                    Filters
                                                </span>
                                                <ChevronDown className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div id="mobile-filters" className="hidden lg:block">
                                            <TldFilter onFilterChange={handleFilterChange} />
                                        </div>
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
                            <div className="text-center py-20 max-w-lg mx-auto">
                                <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-soft-lg">
                                    <Globe2 className="w-12 h-12 text-primary-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-neutral-900 mb-3">
                                    {isError ? 'Something went wrong' : 'No Results Found'}
                                </h2>
                                <p className="text-neutral-600 mb-8">
                                    {isError
                                        ? 'We encountered an error while searching. Please try again later.'
                                        : 'Try adjusting your filters or search for a different domain name.'}
                                </p>
                                <Button variant="primary" onClick={() => window.location.href = '/search'}>
                                    {isError ? 'Retry' : 'Start New Search'}
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </PublicLayout>
    );
};

export default DomainSearch;
