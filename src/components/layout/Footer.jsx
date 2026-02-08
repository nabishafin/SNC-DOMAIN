import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', href: '/about-us' },
            { name: 'Careers', href: '/career-policy' },
            { name: 'Imprint', href: '/imprint' },
            { name: 'Product Feedback', href: '/product-feedback' },
        ],
        legal: [
            { name: 'Terms of Use', href: '/terms-of-use' },
            { name: 'Privacy Policy', href: '/privacy-policy' },
            { name: 'Cookie Policy', href: '/cookie-policy' },
            { name: 'Accessibility', href: '/accessibility' },
            { name: 'General Risk Warning', href: '/general-risk-warning' },
        ],
        policies: [
            { name: 'Sustainability Policy', href: '/sustainability-policy' },
            { name: 'Supply Chain Policy', href: '/supply-chain-policy' },
            { name: 'Modern Slavery Act', href: '/modern-slavery-act' },
            { name: 'Digital Services Act', href: '/digital-services-act' },
            { name: 'Extended Policy', href: '/extended-policy' },
            { name: 'Prohibited Use Policy', href: '/prohibited-use-policy' },
        ],
        community: [
            { name: 'Community Rules', href: '/community-rules' },
            { name: 'Business Ethics', href: '/business-ethics' },
            { name: 'AI Ethics', href: '/ai-ethics' },
            { name: 'Human Rights Policy', href: '/human-rights-policy' },
            { name: 'Compliance Framework', href: '/compliance-framework' },
            { name: 'Vulnerable Customers', href: '/vulnerable-customers' },
        ],
    };

    return (
        <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-8 md:pt-20 md:pb-10">
            <div className="container-padding max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12 mb-12 md:mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="/snc-logo-footer.png"
                                alt="SNC DOMAINS"
                                className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-white text-sm leading-relaxed max-w-sm">
                            Empowering your digital presence with premium domain services. Secure, fast, and reliable domain management for modern businesses.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="#" className="p-2 bg-neutral-800 rounded-full hover:bg-primary-600 hover:text-white transition-all text-primary-600">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-neutral-800 rounded-full hover:bg-primary-600 hover:text-white transition-all text-primary-600">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-neutral-800 rounded-full hover:bg-primary-600 hover:text-white transition-all text-primary-600">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-neutral-800 rounded-full hover:bg-primary-600 hover:text-white transition-all text-primary-600">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm hover:text-primary-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm hover:text-primary-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policies Column */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Policies</h3>
                        <ul className="space-y-3">
                            {footerLinks.policies.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm hover:text-primary-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community Column */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Community</h3>
                        <ul className="space-y-3">
                            {footerLinks.community.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm hover:text-primary-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-neutral-800 text-center md:text-left text-sm text-white">
                    <p>&copy; {currentYear} SNC-Domain. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
