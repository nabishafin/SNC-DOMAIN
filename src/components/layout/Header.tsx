import { Link } from 'react-router-dom';
import { Menu, X, Globe, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

const Header = () => {
    const { isAuthenticated, user } = useAuthStore();
    const { items, toggleCart } = useCartStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Domain Search', href: '/search' },
        { name: 'Pricing', href: '/pricing' },
    ];

    return (
        <header
            className={cn(
                'sticky top-0 z-50 transition-all duration-300 bg-white',
                scrolled ? 'shadow-soft-md py-2' : 'border-b border-neutral-100 py-4'
            )}
        >
            <nav className="container-padding max-w-7xl mx-auto" aria-label="Global">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-primary-700 transition-colors">
                                <Globe className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-neutral-900 tracking-tight group-hover:text-primary-600 transition-colors">
                                SNC-Domain
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="text-[15px] font-medium text-neutral-600 hover:text-primary-600 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            className="relative p-2 text-neutral-600 hover:text-primary-600 transition-colors mr-2"
                            onClick={toggleCart}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {items.length > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                    {items.length}
                                </span>
                            )}
                        </button>

                        {isAuthenticated && user ? (
                            <div className="flex items-center gap-3 pl-3 border-l border-neutral-100">
                                <span className="text-sm font-medium text-neutral-900">{user.name}</span>
                                <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold border-2 border-white shadow-sm">
                                    {user.name.charAt(0)}
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm" className="font-semibold text-primary-600 hover:bg-primary-50 hover:text-primary-700">
                                        Log in
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" size="sm" className="shadow-lg shadow-primary-500/20">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden p-2 text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 shadow-soft-lg animate-in slide-in-from-top-2 duration-200">
                        <div className="container-padding py-6 flex flex-col gap-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="px-4 py-3 text-[15px] font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="h-px bg-neutral-100 my-2" />
                            <div className="flex flex-col gap-3">
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" size="md" className="w-full justify-center">
                                        Log in
                                    </Button>
                                </Link>
                                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="primary" size="md" className="w-full justify-center shadow-lg shadow-primary-500/20">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
