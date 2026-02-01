import { useState } from 'react';
import PublicLayout from '../../components/layout/PublicLayout';
import PricingCard from '../../components/domain/PricingCard';
import { tldData } from '../../mock/tlds';

const Pricing = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All TLDs' },
        { id: 'generic', label: 'Generic (.com, .net, .org)' },
        { id: 'country', label: 'Country Code (.io, .co, .ai)' },
        { id: 'new', label: 'New TLDs (.app, .dev, .tech)' },
    ];

    const filteredTlds =
        selectedCategory === 'all'
            ? tldData
            : tldData.filter((tld) => tld.category === selectedCategory);

    const handleSelectTld = (tld) => {
        console.log('Selected TLD:', tld);
        // Mock TLD selection - navigate to domain search
    };

    return (
        <PublicLayout>
            <section className="section-padding bg-neutral-50 min-h-screen">
                <div className="container-padding max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
                            Domain Pricing
                        </h1>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                            Transparent pricing for all domain extensions. No hidden fees, just straightforward
                            costs.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-2.5 rounded-lg font-medium transition-all
                  ${selectedCategory === category.id
                                        ? 'bg-primary-600 text-white shadow-md'
                                        : 'bg-white text-neutral-700 border border-neutral-300 hover:border-primary-600 hover:text-primary-600'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* Pricing Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                        {filteredTlds.map((tld) => (
                            <PricingCard
                                key={tld.extension}
                                tld={tld}
                                featured={tld.extension === '.com'}
                                onSelect={handleSelectTld}
                            />
                        ))}
                    </div>

                    {/* Info Section */}
                    <div className="bg-white rounded-lg p-8 border border-neutral-200">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">What's Included?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-neutral-900 mb-2">Free with Every Domain</h3>
                                <ul className="space-y-2 text-neutral-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>WHOIS privacy protection</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>DNS management interface</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>Domain forwarding</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>Email forwarding</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral-900 mb-2">Support & Security</h3>
                                <ul className="space-y-2 text-neutral-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>24/7 customer support</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>Two-factor authentication</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>Domain lock protection</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>SSL certificate ready</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
};

export default Pricing;
