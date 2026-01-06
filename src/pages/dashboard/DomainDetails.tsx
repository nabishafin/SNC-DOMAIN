import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, Calendar, Shield, Server, RefreshCw, Save, Plus, Trash2 } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { mockDomains } from '../../mock/domains';
import { cn } from '../../lib/utils';

const DomainDetails = () => {
    const { id } = useParams<{ id: string }>();

    const domain = mockDomains.find((d) => d.id === id);

    const [activeTab, setActiveTab] = useState<'general' | 'dns' | 'nameservers'>('general');
    const [autoRenew, setAutoRenew] = useState(domain?.autoRenew || false);
    const [nameservers, setNameservers] = useState(domain?.nameservers || []);

    if (!domain) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                        <Globe className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">Domain not found</h1>
                    <p className="text-neutral-500 mb-6">The domain you are looking for does not exist or you don't have access.</p>
                    <Link to="/dashboard/domains">
                        <Button variant="primary">Back to My Domains</Button>
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    const tabs = [
        { id: 'general' as const, label: 'Overview', icon: Globe },
        { id: 'dns' as const, label: 'DNS Records', icon: Shield },
        { id: 'nameservers' as const, label: 'Nameservers', icon: Server },
    ];

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-8">
                <Link to="/dashboard/domains" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Domains
                </Link>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-white rounded-xl border border-neutral-200 shadow-sm flex items-center justify-center text-2xl font-bold text-neutral-700">
                            {domain.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2">
                                {domain.name}{domain.tld}
                            </h1>
                            <div className="flex items-center gap-3 mt-1.5 text-sm text-neutral-500">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Expires {new Date(domain.expirationDate).toLocaleDateString()}
                                </span>
                                <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                                <span>Registered {new Date(domain.registrationDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge
                            variant={
                                domain.status === 'active'
                                    ? 'success'
                                    : domain.status === 'expiring-soon'
                                        ? 'warning'
                                        : 'neutral'
                            }
                            className="capitalize px-3 py-1 text-sm"
                        >
                            {domain.status.replace('-', ' ')}
                        </Badge>
                        <Button variant="outline" size="sm" className="hidden md:flex">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Renew Now
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-neutral-200 mb-8 overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all border-b-2 whitespace-nowrap",
                                isActive
                                    ? "border-primary-600 text-primary-600"
                                    : "border-transparent text-neutral-500 hover:text-neutral-900 hover:border-neutral-300"
                            )}
                        >
                            <Icon className={cn("w-4 h-4", isActive ? "text-primary-600" : "text-neutral-400")} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* General Tab */}
            {activeTab === 'general' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-soft-md">
                            <CardHeader className="border-b border-neutral-100 pb-4">
                                <h2 className="text-lg font-bold text-neutral-900">Domain Information</h2>
                            </CardHeader>
                            <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Domain Name</span>
                                    <p className="text-lg font-medium text-neutral-900 mt-1">{domain.name}{domain.tld}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Registrar</span>
                                    <p className="text-lg font-medium text-neutral-900 mt-1">SNC-Domain, Inc.</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Registration Date</span>
                                    <p className="text-neutral-900 mt-1">{new Date(domain.registrationDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Expiration Date</span>
                                    <p className="text-neutral-900 mt-1">{new Date(domain.expirationDate).toLocaleDateString()}</p>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="border-none shadow-soft-md">
                            <CardHeader className="border-b border-neutral-100 pb-4">
                                <h2 className="text-lg font-bold text-neutral-900">Contact Information</h2>
                            </CardHeader>
                            <CardBody>
                                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg shadow-sm">
                                            <Shield className="w-5 h-5 text-success-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-neutral-900">Privacy Protection is On</p>
                                            <p className="text-xs text-neutral-500">Your personal information is hidden from WHOIS.</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Manage</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-none shadow-soft-md bg-gradient-to-br from-primary-900 to-primary-800 text-white">
                            <CardBody>
                                <h3 className="text-lg font-bold mb-2">Auto-Renewal</h3>
                                <p className="text-primary-100 text-sm mb-6">
                                    Don't lose your domain. Enable auto-renewal to keep it safe.
                                </p>
                                <label className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                                    <span className="font-medium">Enable Auto-Renewal</span>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={autoRenew}
                                            onChange={(e) => setAutoRenew(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-primary-900/50 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-500"></div>
                                    </div>
                                </label>
                            </CardBody>
                        </Card>

                        <Card className="border-none shadow-soft-md border-t-4 border-t-red-500">
                            <CardBody>
                                <h3 className="font-bold text-neutral-900 mb-2">Domain Lock</h3>
                                <p className="text-sm text-neutral-500 mb-4">
                                    Prevent unauthorized transfers of your domain.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-neutral-700">Transfer Lock</span>
                                    <span className="px-2 py-1 bg-success-100 text-success-700 text-xs font-bold rounded">LOCKED</span>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}

            {/* DNS Tab */}
            {activeTab === 'dns' && (
                <Card className="border-none shadow-soft-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                        <div>
                            <h2 className="text-lg font-bold text-neutral-900">DNS Management</h2>
                            <p className="text-sm text-neutral-500">Manage your DNS records (A, AAAA, CNAME, TXT, etc.)</p>
                        </div>
                        <Button variant="primary" className="shadow-lg shadow-primary-500/20">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Record
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold text-xs">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Type</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Value</th>
                                        <th className="px-4 py-3">TTL</th>
                                        <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    <tr className="group hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-neutral-900">A</td>
                                        <td className="px-4 py-3 text-neutral-600">@</td>
                                        <td className="px-4 py-3 text-neutral-600 font-mono text-xs">192.168.1.1</td>
                                        <td className="px-4 py-3 text-neutral-500">Auto</td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="text-neutral-400 hover:text-red-600 transition-colors p-1">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-neutral-900">CNAME</td>
                                        <td className="px-4 py-3 text-neutral-600">www</td>
                                        <td className="px-4 py-3 text-neutral-600 font-mono text-xs">@{domain.name}{domain.tld}</td>
                                        <td className="px-4 py-3 text-neutral-500">Auto</td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="text-neutral-400 hover:text-red-600 transition-colors p-1">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            )}

            {/* Nameservers Tab */}
            {activeTab === 'nameservers' && (
                <Card className="max-w-3xl border-none shadow-soft-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <CardHeader className="border-b border-neutral-100 pb-4">
                        <h2 className="text-lg font-bold text-neutral-900">Nameservers</h2>
                        <p className="text-sm text-neutral-500">Point your domain to your hosting provider.</p>
                    </CardHeader>
                    <CardBody>
                        <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 mb-6 flex gap-3">
                            <div className="p-1.5 bg-white rounded-lg shadow-sm text-primary-600 h-fit">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div className="text-sm text-primary-900">
                                <p className="font-semibold">Using Default Nameservers</p>
                                <p className="opacity-80 mt-0.5">We are currently managing your DNS automatically.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {nameservers.map((ns, index) => (
                                <Input
                                    key={index}
                                    label={`Nameserver ${index + 1}`}
                                    value={ns}
                                    placeholder="ns1.snc-domain.com"
                                    onChange={(e) => {
                                        const newNs = [...nameservers];
                                        newNs[index] = e.target.value;
                                        setNameservers(newNs);
                                    }}
                                />
                            ))}
                            <Button variant="outline" size="sm" className="w-full border-dashed border-2 text-neutral-500 hover:text-primary-600 hover:border-primary-200">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Another Nameserver
                            </Button>
                        </div>
                        <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-end">
                            <Button variant="primary" size="lg" className="shadow-lg shadow-primary-500/20">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}
        </DashboardLayout>
    );
};

export default DomainDetails;
