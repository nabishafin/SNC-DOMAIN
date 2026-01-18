import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'Domain Search', href: '/search' },
            { name: 'Wordpress Hosting', href: '#' },
            { name: 'Web Hosting', href: '#' },
            { name: 'Professional Email', href: '#' },
        ],
        company: [
            { name: 'About Us', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Affiliates', href: '#' },
            { name: 'Blog', href: '#' },
        ],
        support: [
            { name: 'Help Center', href: '#' },
            { name: 'Knowledge Base', href: '#' },
            { name: 'Contact Us', href: '#' },
            { name: 'System Status', href: '#' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Policy', href: '#' },
        ],
    };

    return (
        <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-8 md:pt-20 md:pb-10">
            <div className="container-padding max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
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

                    {/* Links Columns */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm hover:text-primary-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

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

                    <div>
                        <h3 className="font-bold text-white mb-6">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
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
                <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-sm text-white">
                    <p className="text-center md:text-left">&copy; {currentYear} SNC-Domain. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        <Link to="#" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
                        <Link to="#" className="hover:text-primary-400 transition-colors">Cookie Preferences</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
