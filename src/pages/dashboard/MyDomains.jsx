import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Settings as SettingsIcon, RefreshCw, MoreHorizontal, ArrowUpRight, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useGetMyDomainsQuery, useToggleAutoRenewMutation } from '../../redux/features/domain/domainApi';
import { cn } from '../../lib/utils';

const MyDomains = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const { data: domains, isLoading, isError, refetch } = useGetMyDomainsQuery();
    const [toggleAutoRenew, { isLoading: isToggling }] = useToggleAutoRenewMutation();
    const [togglingDomainId, setTogglingDomainId] = useState(null);

    const handleToggleAutoRenew = async (domain) => {
        try {
            setTogglingDomainId(domain._id);
            const newStatus = !domain.autoRenew;
            const response = await toggleAutoRenew({
                domainName: domain.domainName,
                autoRenew: newStatus
            }).unwrap();
            toast.success(response.message || `Auto-renew ${newStatus ? 'enabled' : 'disabled'} successfully`);
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to toggle auto-renew');
            console.error('Toggle failed:', err);
        } finally {
            setTogglingDomainId(null);
        }
    };

    const filteredDomains = (domains || []).filter((domain) => {
        const domainName = domain.domainName || '';
        const tld = domain.tld || '';
        const status = (domain.status || '').toLowerCase();

        const matchesSearch =
            domainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tld.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filterStatus === 'all' ||
            (filterStatus === 'active' && status === 'active') ||
            (filterStatus === 'expiring-soon' && status === 'expiring-soon');

        return matchesSearch && matchesFilter;
    });

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                    <p className="text-neutral-500 font-medium">Loading your domains...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (isError) {
        return (
            <DashboardLayout>
                <div className="text-center py-20 bg-white rounded-2xl shadow-soft-md">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">Failed to load domains</h2>
                    <p className="text-neutral-600 mb-8">We couldn't fetch your domains at this time.</p>
                    <Button variant="primary" onClick={() => refetch()}>
                        Try Again
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">My Domains</h1>
                    <p className="text-neutral-500 mt-1">Manage all your registered domains in one place.</p>
                </div>
                <Link to="/search">
                    <Button variant="primary" className="shadow-lg shadow-primary-500/20">
                        Register New Domain
                    </Button>
                </Link>
            </div>

            {/* Filters and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search domains..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                    />
                </div>

                <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-x-auto">
                    {['all', 'active', 'expiring-soon'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                                filterStatus === status
                                    ? "bg-primary-50 text-primary-700 shadow-sm"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                            )}
                        >
                            {status === 'all' ? 'All Domains' : status === 'active' ? 'Active' : 'Expiring Soon'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Domains Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredDomains.map((domain) => (
                    <Card key={domain._id} className="border-none shadow-soft-md hover:shadow-soft-lg transition-all duration-300 group">
                        <CardBody className="p-6">
                            <div className="flex items-start justify-between mb-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-lg font-bold text-neutral-500 group-hover:bg-primary-50 group-hover:text-primary-600 group-hover:border-primary-100 transition-colors">
                                        {(domain.domainName || '?').charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors flex items-center gap-1">
                                            {domain.domainName}
                                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary-400" />
                                        </h3>
                                        <p className="text-xs text-neutral-500 mt-1">
                                            Registered: {new Date(domain.registrationDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <Badge
                                    variant={
                                        domain.status?.toLowerCase() === 'active'
                                            ? 'success'
                                            : domain.status?.toLowerCase() === 'expiring-soon'
                                                ? 'warning'
                                                : 'neutral'
                                    }
                                    className="capitalize"
                                >
                                    {domain.status?.toLowerCase().replace('_', ' ') || 'unknown'}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-neutral-50 rounded-xl border border-neutral-100/50">
                                <div>
                                    <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Expires</span>
                                    <p className="font-semibold text-neutral-900 mt-0.5">
                                        {new Date(domain.expiryDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Auto-Renewal</span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className={cn("w-2 h-2 rounded-full", domain.autoRenew ? "bg-green-500" : "bg-neutral-300")} />
                                        <p className="font-semibold text-neutral-900">
                                            {domain.autoRenew ? 'On' : 'Off'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link to={`/dashboard/domains/${domain.domainName}`} className="flex-1">
                                    <Button variant="primary" size="md" className="w-full shadow-md shadow-primary-500/10">
                                        <SettingsIcon className="w-4 h-4 mr-2" />
                                        Manage
                                    </Button>
                                </Link>
                                <Button
                                    variant={domain.autoRenew ? "success" : "outline"}
                                    size="md"
                                    className="flex-1"
                                    onClick={() => handleToggleAutoRenew(domain)}
                                    isLoading={togglingDomainId === domain._id}
                                >
                                    {togglingDomainId !== domain._id && (
                                        <RefreshCw className={cn("w-4 h-4 mr-2", domain.autoRenew ? "text-white" : "text-neutral-400")} />
                                    )}
                                    {domain.autoRenew ? 'Auto-Renew On' : 'Auto-Renew Off'}
                                </Button>
                                <Button variant="ghost" size="md" className="sm:px-2 py-2 text-neutral-400 hover:text-neutral-600 flex justify-center">
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredDomains.length === 0 && (
                <Card className="border-dashed border-2 border-neutral-200 shadow-none bg-neutral-50/50">
                    <CardBody className="py-16 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <Search className="w-10 h-10 text-neutral-300" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">No domains found</h3>
                        <p className="text-neutral-500 max-w-sm mx-auto mb-8">
                            {searchQuery ? `No results for "${searchQuery}". Try a different search term or filter.` : 'You haven\'t registered any domains yet. Get started today!'}
                        </p>
                        {searchQuery && (
                            <Button variant="outline" onClick={() => setSearchQuery('')}>
                                Clear Search
                            </Button>
                        )}
                    </CardBody>
                </Card>
            )}
        </DashboardLayout>
    );
};

export default MyDomains;
