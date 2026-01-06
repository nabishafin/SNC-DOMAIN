import { Globe, Calendar, AlertTriangle, TrendingUp, ArrowUpRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { mockDomains } from '../../mock/domains';

const Overview = () => {
    const activeDomains = mockDomains.filter((d) => d.status === 'active').length;
    const expiringSoon = mockDomains.filter((d) => d.status === 'expiring-soon').length;
    const totalDomains = mockDomains.length;

    const stats = [
        {
            label: 'Total Domains',
            value: totalDomains,
            icon: Globe,
            change: '+2 this month',
            trend: 'up',
            color: 'text-primary-600',
            bg: 'bg-primary-50',
        },
        {
            label: 'Active Services',
            value: activeDomains,
            icon: Activity,
            change: '100% uptime',
            trend: 'stable',
            color: 'text-success-600',
            bg: 'bg-success-50',
        },
        {
            label: 'Expiring Soon',
            value: expiringSoon,
            icon: AlertTriangle,
            change: 'Action required',
            trend: 'warning',
            color: 'text-orange-600',
            bg: 'bg-orange-50',
        },
    ];

    const recentActivity = [
        { action: 'Domain Registered', details: 'mybusiness.com', date: '2 days ago', icon: Globe, color: 'text-primary-600 bg-primary-100' },
        { action: 'DNS Updated', details: 'myportfolio.io', date: '5 days ago', icon: Activity, color: 'text-purple-600 bg-purple-100' },
        { action: 'Auto-Renewal On', details: 'myshop.store', date: '1 week ago', icon: TrendingUp, color: 'text-green-600 bg-green-100' },
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Dashboard Overview</h1>
                    <p className="text-neutral-500 mt-1">Welcome back, here's what's happening with your domains.</p>
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

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
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
                            {mockDomains.slice(0, 4).map((domain) => (
                                <div key={domain.id} className="p-4 sm:px-6 hover:bg-neutral-50/50 transition-colors group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold text-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                                                {domain.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                                                    {domain.name}{domain.tld}
                                                </h3>
                                                <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
                                                    <Calendar className="w-3 h-3" />
                                                    Expires {new Date(domain.expirationDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                domain.status === 'active'
                                                    ? 'success'
                                                    : domain.status === 'expiring-soon'
                                                        ? 'warning'
                                                        : 'neutral'
                                            }
                                            className="capitalize"
                                        >
                                            {domain.status.replace('-', ' ')}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
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
                            {/* Timeline line */}
                            <div className="absolute top-6 bottom-6 left-8 w-px bg-neutral-100"></div>

                            <div className="py-2">
                                {recentActivity.map((activity, index) => {
                                    const Icon = activity.icon;
                                    return (
                                        <div key={index} className="relative px-6 py-4 flex gap-4 hover:bg-neutral-50/50 transition-colors rounded-lg mx-2 my-1">
                                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-sm ${activity.color.split(' ')[1]}`}>
                                                <Icon className={`w-4 h-4 ${activity.color.split(' ')[0]}`} />
                                            </div>
                                            <div className="flex-1 py-1">
                                                <p className="text-sm font-semibold text-neutral-900">{activity.action}</p>
                                                <p className="text-xs text-neutral-500 mt-0.5">{activity.details}</p>
                                            </div>
                                            <span className="text-xs font-medium text-neutral-400 py-1 whitespace-nowrap">{activity.date}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="p-4 border-t border-neutral-100 mt-2">
                            <Button variant="ghost" size="sm" className="w-full text-neutral-500 hover:text-neutral-900">View Full History</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Overview;
