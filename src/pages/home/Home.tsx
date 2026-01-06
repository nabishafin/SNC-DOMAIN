import { Link } from 'react-router-dom';
import { Shield, Zap, HeadphonesIcon, CheckCircle, ArrowRight } from 'lucide-react';
import PublicLayout from '../../components/layout/PublicLayout';
import DomainSearchBar from '../../components/domain/DomainSearchBar';
import PricingCard from '../../components/domain/PricingCard';
import Button from '../../components/ui/Button';
import { tldData } from '../../mock/tlds';

const Home = () => {
    const popularTlds = tldData.filter((tld) => tld.popular).slice(0, 3);

    const features = [
        {
            icon: Shield,
            title: 'Enterprise Security',
            description: 'Advanced DDoS protection and SSL encryption included with every domain.',
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Global DNS infrastructure ensuring fastest resolution times worldwide.',
        },
        {
            icon: HeadphonesIcon,
            title: '24/7 Expert Support',
            description: 'Our dedicated team is ready to help you anytime, day or night.',
        },
    ];

    return (
        <PublicLayout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-20"></div>

                <div className="container-padding max-w-7xl mx-auto pt-24 pb-32 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary-800/50 border border-primary-700 text-primary-200 text-sm font-medium mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                        🚀 Special Offer: .com domains for just $9.99
                    </span>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        It all starts with<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-white">the right domain.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        Secure your digital identity with the most trusted domain registrar.
                        Instant setup, powerful management tools, and 24/7 support.
                    </p>

                    <div className="max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <div className="bg-white p-2 rounded-2xl shadow-float">
                            <DomainSearchBar />
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-200">
                            <span>Popular:</span>
                            <span className="font-medium text-white hover:text-primary-200 cursor-pointer transition-colors">.com $9.99</span>
                            <span className="font-medium text-white hover:text-primary-200 cursor-pointer transition-colors">.net $11.99</span>
                            <span className="font-medium text-white hover:text-primary-200 cursor-pointer transition-colors">.io $34.99</span>
                            <span className="font-medium text-white hover:text-primary-200 cursor-pointer transition-colors">.ai $69.99</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm font-medium text-primary-200 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-success-600 bg-white rounded-full" />
                            <span>Free Privacy Protection</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-success-600 bg-white rounded-full" />
                            <span>24/7 Expert Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-success-600 bg-white rounded-full" />
                            <span>Simple Management</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="bg-neutral-50 border-b border-neutral-200 py-10">
                <div className="container-padding max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-8 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                    <p className="text-sm font-semibold text-neutral-500 uppercase tracking-widest w-full text-center lg:w-auto lg:text-left">Trusted by industry leaders</p>
                    {/* Placeholder logos - using text for now */}
                    <span className="text-xl font-bold text-neutral-400">TechCorp</span>
                    <span className="text-xl font-bold text-neutral-400">GlobalSystems</span>
                    <span className="text-xl font-bold text-neutral-400">InnovateLab</span>
                    <span className="text-xl font-bold text-neutral-400">FutureNet</span>
                    <span className="text-xl font-bold text-neutral-400">AlphaWave</span>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container-padding max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Why choose SNC-Domain?</h2>
                        <p className="text-lg text-neutral-600">
                            We provide everything you need to succeed online. From powerful management tools to rock-solid security.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="group p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-primary-100 hover:bg-white hover:shadow-soft-lg transition-all duration-300">
                                    <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-7 h-7 text-primary-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
                                    <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Popular Pricing */}
            <section className="py-24 bg-neutral-50 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>

                <div className="container-padding max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Popular Extensions</h2>
                            <p className="text-lg text-neutral-600">
                                Choose from hundreds of endings. Find the one that fits your brand.
                            </p>
                        </div>
                        <Link to="/pricing">
                            <Button variant="outline" size="lg" className="group">
                                View Full Pricing
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {popularTlds.map((tld, index) => (
                            <PricingCard key={index} tld={tld} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="container-padding max-w-5xl mx-auto">
                    <div className="bg-primary-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                        {/* Abstract Shapes */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-700/30 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary-600/30 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start your journey?</h2>
                            <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-10">
                                Join thousands of entrepreneurs who trust SNC-Domain for their digital presence.
                            </p>
                            <Link to="/register">
                                <Button size="lg" className="bg-white text-primary-900 hover:bg-primary-50 px-10 h-14 text-lg font-bold shadow-lg shadow-white/10">
                                    Get Started Now
                                </Button>
                            </Link>
                            <p className="mt-6 text-sm text-primary-300">
                                No credit card required for account creation
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
};

export default Home;
