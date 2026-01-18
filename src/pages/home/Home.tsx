import { Link } from 'react-router-dom';
import { Shield, CheckCircle, BarChart3, Clock, Layout, Users, Globe2, Activity, Star, Quote, Plus, Minus, Server, Database, Code2, Cpu, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import PublicLayout from '../../components/layout/PublicLayout';
import DomainSearchBar from '../../components/domain/DomainSearchBar';
import Button from '../../components/ui/Button';
import { cn } from '../../lib/utils';

const Home = () => {
    const [faqOpen, setFaqOpen] = useState<number | null>(0);

    const exclusiveFeatures = [
        {
            icon: Layout,
            title: 'Easy To Use',
            description: 'Intuitive SNC-Domain toolbox designed for effortless management.',
            color: 'bg-green-50',
            iconColor: 'text-green-500',
        },
        {
            icon: BarChart3,
            title: 'Daily Report',
            description: 'Gain business intelligence with daily analytics and traffic trends.',
            color: 'bg-orange-50',
            iconColor: 'text-orange-500',
        },
        {
            icon: Clock,
            title: 'Real Time',
            description: 'Lightning-fast DNS propagation and instant configuration changes.',
            color: 'bg-blue-50',
            iconColor: 'text-blue-500',
        },
        {
            icon: Shield,
            title: 'Extreme Security',
            description: 'Enterprise-grade DDoS mitigation and automated SSL management.',
            color: 'bg-pink-50',
            iconColor: 'text-pink-500',
        },
    ];



    return (
        <PublicLayout>
            {/* Hero Section - Ultra Modern - Soft Blue Theme */}
            <section className="relative min-h-[85vh] flex items-center bg-[#f0f7ff] text-neutral-900 overflow-hidden pt-12 pb-8">
                {/* Dynamic Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#f0f7ff_0%,#e0f2fe_100%)]"></div>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.4, 0.2],
                            rotate: [0, 90, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-primary-200/40 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.3, 0.1],
                            rotate: [0, -90, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-200/30 rounded-full blur-[100px]"
                    />
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                </div>

                <div className="container-padding max-w-7xl mx-auto relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Left Content */}
                        <div className="lg:w-[60%] text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-bold mb-6 backdrop-blur-xl shadow-sm"
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                                    </span>
                                    SNC-Domain Revolution: .com domains for $9.99
                                </motion.span>

                                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-tight text-neutral-900">
                                    Next-Gen <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-blue-600">
                                        Domain Identity.
                                    </span>
                                </h1>

                                <p className="text-md md:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium">
                                    Step into the future of digital presence. Secure high-performance domains with instant global propagation and AI-driven insights.
                                </p>

                                <div className="max-w-xl lg:max-w-none mb-8">
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        className="bg-white p-1 rounded-xl border border-primary-100 shadow-lg shadow-primary-500/5 flex flex-col sm:flex-row gap-2"
                                    >
                                        <div className="flex-1">
                                            <DomainSearchBar />
                                        </div>
                                    </motion.div>
                                    <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[10px] md:text-xs text-neutral-400 font-bold uppercase tracking-widest">
                                        <span className="text-neutral-500">Global reach:</span>
                                        <span className="text-neutral-900 hover:text-primary-600 cursor-pointer transition-colors">.com $9.99</span>
                                        <span className="text-neutral-900 hover:text-primary-600 cursor-pointer transition-colors">.net $11.99</span>
                                        <span className="text-neutral-900 hover:text-primary-600 cursor-pointer transition-colors">.ai $69.99</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                                    {[
                                        { label: 'Cloud Shield', color: 'text-success-600' },
                                        { label: 'Edge DNS', color: 'text-primary-600' },
                                        { label: 'Zero Latency', color: 'text-blue-600' }
                                    ].map((badge, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.8 + i * 0.1 }}
                                            className="flex items-center gap-2 group cursor-default"
                                        >
                                            <CheckCircle className={`w-3.5 h-3.5 ${badge.color}`} />
                                            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">{badge.label}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Content: Mega Illustration */}
                        <div className="lg:w-[40%] relative hidden lg:block">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="relative py-8"
                            >
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="absolute -inset-10 bg-primary-200/30 rounded-full blur-[80px] -z-10 animate-pulse"></div>
                                    <img
                                        src="/hero_banner_new.png"
                                        alt="Next-Gen Domain Infrastructure"
                                        className="w-full max-w-[500px] h-auto drop-shadow-[0_20px_20px_rgba(59,130,246,0.1)] transform hover:scale-105 transition-transform duration-700"
                                    />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section - Polished - High Density */}
            <section className="bg-white border-b border-neutral-100 py-4 overflow-hidden">
                <div className="container-padding max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
                    <p className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] whitespace-nowrap">
                        Trusted globally by
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 flex-1 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {['TechCorp', 'GlobalSystems', 'InnovateLab', 'FutureNet', 'AlphaWave'].map((name) => (
                            <span
                                key={name}
                                className="text-xl font-black text-neutral-900 tracking-tighter select-none"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </section>


            {/* Stats Section - New */}
            <section className="bg-white py-6 border-b border-neutral-100 relative overflow-hidden">
                <div className="container-padding max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Globe2, label: 'Domains Managed', value: '4.2M+', color: 'text-primary-600' },
                            { icon: Users, label: 'Happy Customers', value: '890K+', color: 'text-blue-600' },
                            { icon: Activity, label: 'Uptime Reliability', value: '99.99%', color: 'text-success-600' },
                            { icon: Shield, label: 'Cyber Attacks Blocked', value: '1.2B+', color: 'text-blue-600' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-3 group"
                            >
                                <div className={cn("w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform", stat.color)}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-3xl font-black text-neutral-900 mb-1">{stat.value}</h4>
                                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Exclusive Features Section - Spaceless Flow */}
            <section className="bg-neutral-50 py-6 overflow-hidden border-b border-neutral-100">
                <div className="container-padding max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
                    {/* Left content */}
                    <div className="lg:w-[40%] text-center lg:text-left">
                        <h2 className="text-4xl font-black text-neutral-900 mb-3 tracking-tight">
                            Infrastructure <span className="text-primary-600">for Scale</span>
                        </h2>
                        <p className="text-neutral-500 text-base mb-4 max-w-md mx-auto lg:mx-0">
                            Proprietary platform engineered for speed, security, and intuitive management.
                        </p>
                        <motion.img
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            src="/exclusive_features_illustration.png"
                            className="w-full max-w-[320px] mx-auto lg:mx-0 drop-shadow-xl"
                        />
                    </div>

                    {/* Cards */}
                    <div className="lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-4">
                        {exclusiveFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }} // only lift effect
                                className="bg-black p-6 rounded-2xl border border-neutral-800 flex items-start gap-4 transition-all"
                            >
                                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>

                                <div>
                                    <h3 className="text-lg font-black text-white mb-1">{feature.title}</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Ecosystem/Integrations Section - New */}
            <section className="py-6 bg-white border-b border-neutral-100 overflow-hidden">
                <div className="container-padding max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-black text-neutral-900 tracking-tight flex items-center gap-2 justify-center md:justify-start">
                                <Zap className="w-6 h-6 text-amber-500" />
                                Seamless Integrations
                            </h3>
                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">Connect your workflow in seconds</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { icon: Server, color: 'bg-blue-50 text-blue-600' },
                                { icon: Database, color: 'bg-indigo-50 text-blue-600' },
                                { icon: Code2, color: 'bg-primary-50 text-primary-600' },
                                { icon: Cpu, color: 'bg-success-50 text-success-600' }
                            ].map((item, i) => (
                                <div key={i} className={cn("w-10 h-10 rounded-lg flex items-center justify-center shadow-sm", item.color)}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-8 border border-neutral-100 flex flex-wrap justify-center gap-x-12 gap-y-8 shadow-sm">
                        {['AWS', 'Cloudflare', 'Google', 'Vercel', 'Netlify', 'GitHub', 'Shopify', 'WordPress', 'Heroku', 'DigitalOcean', 'Next.js', 'React'].map((p) => (
                            <div key={p} className="grid grid-cols-2 gap-2">
                                <div className="text-primary-600 font-bold text-xs uppercase tracking-wide">{p}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Pricing - High Density */}
            <section className="py-6 bg-white relative overflow-hidden border-b border-neutral-100">
                <div className="container-padding max-w-7xl mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-black text-neutral-900 tracking-tight">Enterprise Extensions</h2>
                        <p className="text-xs font-bold text-neutral-400 tracking-[0.2em] uppercase mt-2">Maximum Value. Zero Hidden Fees.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: '.com', price: '$9.99', old: '$14.99', badge: 'Best Seller', popular: true },
                            { name: '.net', price: '$11.99', popular: false },
                            { name: '.ai', price: '$69.99', badge: 'AI Era', popular: false },
                            { name: '.io', price: '$34.99', popular: false },
                        ].map((ext, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02, y: -4 }}
                                className={cn(
                                    "p-6 rounded-2xl relative border overflow-hidden transition-all bg-[#0a0a0a] text-white border-neutral-800 shadow-xl shadow-primary-500/10"
                                )}
                            >
                                {ext.badge && <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary-600 text-[9px] font-black uppercase text-white tracking-widest">{ext.badge}</span>}
                                <h3 className="text-3xl font-black tracking-tight mb-4">{ext.name}</h3>
                                <div className="mb-6">
                                    <div className="text-4xl font-black">{ext.price}</div>
                                    <div className="text-[10px] uppercase font-black opacity-40">Per Year</div>
                                </div>
                                <Button variant="primary" size="sm" className="w-full h-10 rounded-xl text-xs font-black">Register</Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials - New */}
            <section className="py-6 bg-[#0a0a0a] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="container-padding max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-6">
                        <div className="flex justify-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
                        </div>
                        <h2 className="text-4xl font-black tracking-tight">Rated 4.9/5 by 50,000+ Founders</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'Sarah Jenkins', role: 'CEO at PixelFlow', content: 'SNC-Domain is a game changer. The interface is light years ahead of any other registrar I have used.', avatar: 'SJ', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
                            { name: 'Marcus Chen', role: 'Dev@FutureTech', content: 'DNS propagation in seconds. Not minutes. Seconds. The API is clean and easy to integrate.', avatar: 'MC', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
                            { name: 'Elena Rodriguez', role: 'Founder, EcoScale', content: 'Security is my top priority. Their enterprise shield gives me peace of mind for our 500+ domains.', avatar: 'ER', image: 'https://randomuser.me/api/portraits/women/68.jpg' }
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 relative group"
                            >
                                <Quote className="absolute top-4 right-4 w-7 h-7 text-white/10 group-hover:text-primary-400 transition-colors" />
                                <p className="text-base text-neutral-300 mb-6 italic">&quot;{t.content}&quot;</p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-primary-600/50"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-12 h-12 rounded-full bg-primary-600 hidden items-center justify-center font-black text-sm">{t.avatar}</div>
                                    <div>
                                        <div className="text-base font-bold">{t.name}</div>
                                        <div className="text-xs text-neutral-500 uppercase tracking-widest">{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section - Two Column Layout */}
            <section className="py-6 bg-white border-b border-neutral-100">
                <div className="container-padding max-w-7xl mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-black text-neutral-900 tracking-tight">Common Questions</h2>
                        <p className="text-xs font-bold text-neutral-400 tracking-[0.2em] uppercase mt-2">Everything you need to know</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Side - Questions */}
                        <div className="space-y-3">
                            {[
                                { q: 'How fast is DNS propagation?', a: 'Our global edge network ensures propagation happens in real-time, typically within seconds depending on local ISP caching.' },
                                { q: 'Is WHOIS privacy included for free?', a: 'Yes! We believe privacy is a right, not a luxury. WHOIS privacy comes standard with every compatible domain at no extra cost.' },
                                { q: 'Can I transfer existing domains to SNC?', a: 'Absolutely. Our automated transfer tool handles the migration seamlessly, often extending your registration by a year.' },
                                { q: 'Do you offer bulk registration discounts?', a: 'Yes, our Enterprise tier offers significant discounts for portfolios exceeding 100 domains. Contact our sales team for custom pricing.' }
                            ].map((faq, i) => (
                                <div key={i} className="border border-neutral-100 rounded-xl overflow-hidden bg-neutral-50">
                                    <button
                                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                                        className="w-full p-4 flex items-center justify-between text-left hover:bg-neutral-100 transition-colors"
                                    >
                                        <span className="text-base font-bold text-neutral-900">{faq.q}</span>
                                        {faqOpen === i ? <Minus className="w-5 h-5 text-primary-600" /> : <Plus className="w-5 h-5 text-neutral-400" />}
                                    </button>
                                    <AnimatePresence>
                                        {faqOpen === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-4 pb-4 overflow-hidden"
                                            >
                                                <p className="text-sm text-neutral-500 leading-relaxed border-t border-neutral-100 pt-3">{faq.a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Right Side - Additional Information */}
                        <div className="space-y-4">
                            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-white">24/7 Expert Support</h3>
                                        <p className="text-xs text-neutral-400">Always here to help</p>
                                    </div>
                                </div>
                                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                                    Our dedicated support team is available around the clock to assist you with any questions or technical issues.
                                </p>
                                <Button variant="outline" size="sm" className="w-full border-neutral-700 text-white hover:bg-neutral-800 hover:text-white">Contact Support</Button>
                            </div>

                            <div className="bg-neutral-900 p-6 rounded-2xl text-white border border-neutral-800">
                                <h3 className="text-lg font-black mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-success-400" />
                                    What's Included
                                </h3>
                                <ul className="space-y-2.5 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                                        <span>Free WHOIS privacy protection</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                                        <span>Advanced DNS management</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                                        <span>Domain forwarding & email aliases</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                                        <span>SSL certificate ready</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                                        <span>Two-factor authentication</span>
                                    </li>
                                </ul>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Tightened */}
            <section className="py-10 relative overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary-600/20 rounded-full blur-[100px]"></div>
                </div>

                <div className="container-padding max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-3xl relative overflow-hidden"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                            Your <span className="text-primary-400">Digital Legacy</span> Begins Now.
                        </h2>
                        <p className="text-neutral-400 text-base mb-8 max-w-xl mx-auto leading-relaxed">
                            Join over 50,000+ ambitious creators and global enterprises building on SNC-Domain.
                        </p>
                        <Link to="/register">
                            <Button size="lg" className="px-10 h-16 text-xl font-black shadow-2xl shadow-primary-500/20 hover:scale-105 transition-all">
                                Start Your Journey
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
};

export default Home;
