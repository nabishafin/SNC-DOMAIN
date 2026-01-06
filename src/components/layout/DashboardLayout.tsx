import { type ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Globe,
    Settings,
    LogOut,
    Menu,
    X,
    User,
    ChevronRight,
    ChevronDown,
    Lock,
    Users,
    CreditCard
} from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'My Domains', href: '/dashboard/domains', icon: Globe },
        { name: 'SSL Certificates', href: '/dashboard/ssl', icon: Lock },
        { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
        { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    const isActive = (href: string) => {
        if (href === '/dashboard') {
            return location.pathname === href;
        }
        return location.pathname.startsWith(href);
    };

    return (
        <div className="flex h-screen bg-neutral-50">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-white border-r border-neutral-200 shadow-soft z-20">
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 h-20 border-b border-neutral-100">
                    <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shadow-md">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-neutral-900 tracking-tight">SNC-Domain</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1.5">
                    <p className="px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Menu</p>
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200",
                                    active
                                        ? "bg-primary-50 text-primary-700 shadow-sm"
                                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                                )}
                            >
                                <Icon className={cn("w-5 h-5", active ? "text-primary-600" : "text-neutral-400 group-hover:text-neutral-600")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                    <div className="flex items-center gap-3 px-3 py-2 mb-3 bg-white rounded-lg border border-neutral-200 shadow-sm">
                        <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            <User className="w-4 h-4 text-primary-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-neutral-900 truncate">John Doe</p>
                            <p className="text-xs text-neutral-500 truncate">john@snc-domain.com</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </div>
                    <div className="px-1">
                        <Button variant="ghost" size="sm" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 font-medium">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden flex flex-col transition-transform duration-300 shadow-2xl",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo Mobile */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <Globe className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-neutral-900">SNC-Domain</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 text-neutral-500 hover:bg-neutral-50 rounded-lg"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors",
                                    active
                                        ? "bg-primary-50 text-primary-700"
                                        : "text-neutral-600 hover:bg-neutral-50"
                                )}
                            >
                                <Icon className={cn("w-5 h-5", active ? "text-primary-600" : "text-neutral-400")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile User Section */}
                <div className="p-4 border-t border-neutral-200 bg-neutral-50">
                    <div className="flex items-center gap-3 px-3 py-2 mb-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-neutral-200">
                            <User className="w-5 h-5 text-neutral-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-neutral-900">John Doe</p>
                            <p className="text-xs text-neutral-500">john@example.com</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Top Bar */}
                <header className="h-20 bg-white border-b border-neutral-200 flex items-center px-4 lg:px-8 justify-between sticky top-0 z-10">
                    <div className="flex items-center flex-1">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-neutral-500 hover:bg-neutral-50 rounded-lg mr-4"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Breadcrumb */}
                        <nav className="hidden sm:flex items-center gap-2 text-sm text-neutral-500">
                            <Link to="/dashboard" className="hover:text-primary-600 transition-colors">Dashboard</Link>
                            {location.pathname !== '/dashboard' && (
                                <>
                                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                                    <span className="font-semibold text-neutral-900 pointer-events-none">
                                        {navigation.find(n => isActive(n.href))?.name || 'Page'}
                                    </span>
                                </>
                            )}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" className="hidden sm:flex">
                            Need Help?
                        </Button>
                        <div className="w-px h-8 bg-neutral-200 hidden sm:block"></div>
                        {/* Add notifications or other top-bar items here if needed */}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-neutral-50/50 p-4 lg:p-8">
                    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
