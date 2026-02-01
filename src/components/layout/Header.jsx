import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LayoutDashboard, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { toggleCart } from '../../redux/slices/cartSlice';
import { useLogoutMutation } from '../../redux/features/auth/authApi';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

const Header = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApi] = useLogoutMutation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            dispatch(logout());
            setUserMenuOpen(false);
            navigate('/login');
        }
    };

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Domain Search', href: '/search' },
        { name: 'Pricing', href: '/pricing' },
    ];

    return (
        <header
            className={cn(
                'sticky top-0 z-50 transition-all duration-500 backdrop-blur-md',
                scrolled
                    ? 'bg-white/80 shadow-soft-lg py-2 border-b border-primary-100/20'
                    : 'bg-transparent py-4'
            )}
        >
            <nav className="container-padding max-w-7xl mx-auto" aria-label="Global">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <img
                                src="/snc-logo.png"
                                alt="SNC DOMAINS"
                                className="h-10 md:h-[70px] w-auto object-contain transition-transform group-hover:scale-105"
                            />
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
                            onClick={() => dispatch(toggleCart())}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {items.length > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                    {items.length}
                                </span>
                            )}
                        </button>

                        {isAuthenticated && user ? (
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-3 pl-3 border-l border-neutral-100 hover:opacity-80 transition-opacity"
                                >
                                    <span className="text-sm font-medium text-neutral-900 hidden sm:block">
                                        {user.firstName || user.name || 'User'}
                                    </span>
                                    <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold border-2 border-white shadow-sm ring-2 ring-primary-50">
                                        {(user.firstName || user.name || 'U').charAt(0)}
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-float border border-neutral-100 py-2 animate-in fade-in zoom-in-95 duration-200 z-50 overflow-hidden">
                                        <div className="px-4 py-3 border-b border-neutral-50 mb-1">
                                            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Account</p>
                                            <p className="text-sm font-bold text-neutral-900 truncate mt-0.5">{user.firstName} {user.lastName}</p>
                                            <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
                                        </div>

                                        <Link
                                            to="/dashboard/settings"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <User className="w-4 h-4" />
                                            Profile Page
                                        </Link>

                                        <Link
                                            to="/dashboard"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            Dashboard
                                        </Link>

                                        <div className="h-px bg-neutral-50 my-1"></div>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
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
                    <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-neutral-100 shadow-soft-lg animate-in slide-in-from-top-2 duration-200 z-[60]">
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
