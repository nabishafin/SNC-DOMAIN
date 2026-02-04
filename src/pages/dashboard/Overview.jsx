import { Globe, Calendar, AlertTriangle, TrendingUp, ArrowUpRight, Activity, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useGetDashboardOverviewQuery } from '../../redux/features/dashboard/dashboardApi';

const Overview = () => {
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading, isError, refetch } = useGetDashboardOverviewQuery();

    const stats = [
        {
            label: 'Total Domains',
            value: data?.stats?.totalDomains || 0,
            icon: Globe,
            change: data?.stats?.newThisMonth ? `+${data.stats.newThisMonth} this month` : 'No new domains',
            trend: 'up',
            color: 'text-primary-600',
            bg: 'bg-primary-50',
        },
        {
            label: 'Active Services',
            value: data?.stats?.activeServices || 0,
            icon: Activity,
            change: data?.stats?.uptime || '100% uptime',
            trend: 'stable',
            color: 'text-success-600',
            bg: 'bg-success-50',
        },
        {
            label: 'Expiring Soon',
            value: data?.stats?.expiringSoon || 0,
            icon: AlertTriangle,
            change: data?.stats?.expiringSoon > 0 ? 'Action required' : 'All secure',
            trend: data?.stats?.expiringSoon > 0 ? 'warning' : 'stable',
            color: data?.stats?.expiringSoon > 0 ? 'text-orange-600' : 'text-success-600',
            bg: data?.stats?.expiringSoon > 0 ? 'bg-orange-50' : 'bg-success-50',
        },
    ];

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                    <p className="text-neutral-500 font-medium">Loading your dashboard...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (isError) {
        return (
            <DashboardLayout>
                <div className="text-center py-20 bg-white rounded-2xl shadow-soft-md">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">Failed to load dashboard</h2>
                    <p className="text-neutral-600 mb-8">We couldn't fetch your dashboard data at this time.</p>
                    <Button variant="primary" onClick={() => refetch()}>
                        Try Again
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Dashboard Overview</h1>
                    <p className="text-neutral-500 mt-1">Welcome back, {user?.firstName || 'User'}! Here's what's happening today.</p>
                </div>
                <Link to="/search">
                    <Button variant="primary" className="shadow-lg shadow-primary-500/20">
                        <Globe className="w-4 h-4 mr-2" />
                        Register New Domain
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="border-none shadow-soft-md hover:shadow-soft-lg transition-shadow">
                            <CardBody className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
                                        <h3 className="text-3xl font-bold text-neutral-900 mt-2">{stat.value}</h3>
                                        <p className={`text-xs font-medium mt-2 flex items-center gap-1 ${stat.trend === 'warning' ? 'text-orange-600' : 'text-success-600'}`}>
                                            {stat.trend === 'warning' ? <AlertTriangle className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                            {stat.change}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
                {/* Domains List */}
                <Card className="xl:col-span-2 border-none shadow-soft-md">
                    <CardHeader className="flex items-center justify-between border-b border-neutral-100 pb-4">
                        <h2 className="text-lg font-bold text-neutral-900">My Domains</h2>
                        <Link to="/dashboard/domains">
                            <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50">
                                View All
                                <ArrowUpRight className="ml-1 w-4 h-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardBody className="p-0">
                        <div className="divide-y divide-neutral-100">
                            {data?.myDomains && data.myDomains.length > 0 ? (
                                data.myDomains.slice(0, 5).map((domain) => (
                                    <Link key={domain._id} to={`/dashboard/domains/${domain.domainName}`} className="p-4 sm:px-6 hover:bg-neutral-50/50 transition-colors group">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold text-lg group-hover:bg-white group-hover:shadow-sm transition-all flex-shrink-0">
                                                    {(domain.domainName || domain.name || '?').charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors truncate">
                                                        {domain.domainName}
                                                    </h3>
                                                    <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5 truncate">
                                                        <Calendar className="w-3 h-3 flex-shrink-0" />
                                                        Expires {new Date(domain.expiryDate).toLocaleDateString()}
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
                                                className="capitalize flex-shrink-0"
                                            >
                                                {domain.status?.toLowerCase().replace('_', ' ') || 'Unknown'}
                                            </Badge>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="p-8 text-center text-neutral-500">
                                    No domains found.
                                </div>
                            )}
                        </div>
                    </CardBody>
                </Card>

                {/* Recent Activity */}
                <Card className="border-none shadow-soft-md h-full">
                    <CardHeader className="border-b border-neutral-100 pb-4">
                        <h2 className="text-lg font-bold text-neutral-900">Recent Activity</h2>
                    </CardHeader>
                    <CardBody className="p-0">
                        <div className="relative">
                            {data?.recentActivity && data.recentActivity.length > 0 ? (
                                <>
                                    {/* Timeline line */}
                                    <div className="absolute top-6 bottom-6 left-8 w-px bg-neutral-100"></div>

                                    <div className="py-2">
                                        {data.recentActivity.slice(0, 5).map((activity, index) => {
                                            const isOrder = activity.type === 'ORDER';
                                            return (
                                                <div key={activity.id || index} className="relative px-6 py-4 flex gap-4 hover:bg-neutral-50/50 transition-colors rounded-lg mx-2 my-1">
                                                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${isOrder ? 'bg-primary-100' : 'bg-success-100'}`}>
                                                        {isOrder ? <Globe className="w-4 h-4 text-primary-600" /> : <Activity className="w-4 h-4 text-success-600" />}
                                                    </div>
                                                    <div className="flex-1 py-1">
                                                        <p className="text-sm font-semibold text-neutral-900">{activity.action}</p>
                                                        <p className="text-xs text-neutral-500 mt-0.5">{activity.domainName}</p>
                                                    </div>
                                                    <span className="text-xs font-medium text-neutral-400 py-1 whitespace-nowrap">
                                                        {new Date(activity.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <div className="p-8 text-center text-neutral-500">
                                    No recent activity.
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-neutral-100 mt-2">
                            <Link to="/dashboard/activity">
                                <Button variant="ghost" size="sm" className="w-full text-neutral-500 hover:text-neutral-900">View Full History</Button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Overview;
