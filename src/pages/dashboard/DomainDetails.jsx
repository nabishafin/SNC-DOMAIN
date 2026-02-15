import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, Calendar, Shield, Server, RefreshCw, Save, Plus, Trash2, Loader2, AlertTriangle, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useGetDomainDetailsQuery, useToggleAutoRenewMutation, useUpdateNameserversMutation, useToggleWhoisPrivacyMutation } from '../../redux/features/domain/domainApi';
import { useGetDnsRecordsQuery, useAddDnsRecordMutation, useDeleteDnsRecordMutation } from '../../redux/features/dns/dnsApi';
import { cn } from '../../lib/utils';
import DNSSECManagement from '../../components/dashboard/domain/tabs/DNSSECManagement';
import NameserverManagement from '../../components/dashboard/domain/tabs/NameserverManagement';

const DomainDetails = () => {
    const { id: domainName } = useParams();
    const { data: domainData, isLoading, isError, refetch } = useGetDomainDetailsQuery(domainName);
    const { data: dnsData, isLoading: isLoadingDns } = useGetDnsRecordsQuery(domainName);
    const [toggleAutoRenew, { isLoading: isToggling }] = useToggleAutoRenewMutation();
    const [toggleWhoisPrivacy, { isLoading: isTogglingPrivacy }] = useToggleWhoisPrivacyMutation();
    const [addDnsRecord, { isLoading: isAdding }] = useAddDnsRecordMutation();
    const [deleteDnsRecord, { isLoading: isDeleting }] = useDeleteDnsRecordMutation();
    const [updateNameservers, { isLoading: isUpdatingNameservers }] = useUpdateNameserversMutation();

    const [activeTab, setActiveTab] = useState('general');
    const [nameservers, setNameservers] = useState([]);
    const [autoRenew, setAutoRenew] = useState(false);
    const [whoisPrivacy, setWhoisPrivacy] = useState(false);

    // DNS Form State
    const [isAddingRecord, setIsAddingRecord] = useState(false);
    const [deletingRecordId, setDeletingRecordId] = useState(null);
    const [newRecord, setNewRecord] = useState({
        type: 'A',
        name: '',
        content: '',
        ttl: 3600,
        prio: 0
    });

    useEffect(() => {
        if (domainData?.db) {
            setAutoRenew(domainData.db.autoRenew);
            setWhoisPrivacy(domainData.db.whoisPrivacy || false);
        }
    }, [domainData]);

    // Extract actual nameservers: prioritize inwx.ns (registrar source), then DNS NS records, then db fallback
    useEffect(() => {
        // 1. Best source: inwx.ns from the registrar API
        if (domainData?.inwx?.ns?.length > 0) {
            setNameservers(domainData.inwx.ns);
        }
        // 2. Fallback: NS records from DNS zone
        else if (dnsData?.record) {
            const nsRecords = dnsData.record
                .filter(r => r.type === 'NS')
                .map(r => r.content);
            if (nsRecords.length > 0) {
                setNameservers(nsRecords);
            }
        }
        // 3. Last resort: db stored nameservers
        else if (domainData?.db?.nameservers?.length > 0) {
            setNameservers(domainData.db.nameservers);
        }
    }, [dnsData, domainData]);

    const handleToggleAutoRenew = async () => {
        try {
            const newStatus = !autoRenew;
            setAutoRenew(newStatus); // Optimistic UI

            await toggleAutoRenew({
                domainName: domainData.db.domainName,
                autoRenew: newStatus
            }).unwrap();

            toast.success(`Auto-renew ${newStatus ? 'enabled' : 'disabled'} successfully`);
        } catch (err) {
            setAutoRenew(!autoRenew); // Revert on failure
            toast.error(err?.data?.message || 'Failed to toggle auto-renew');
            console.error('Toggle failed:', err);
        }
    };

    const handleToggleWhoisPrivacy = async () => {
        try {
            const newStatus = !whoisPrivacy;
            setWhoisPrivacy(newStatus); // Optimistic UI

            await toggleWhoisPrivacy({
                domainName: domainData.db.domainName,
                whoisPrivacy: newStatus
            }).unwrap();

            toast.success(`WHOIS Privacy ${newStatus ? 'enabled' : 'disabled'} successfully`);
        } catch (err) {
            setWhoisPrivacy(!whoisPrivacy); // Revert on failure
            toast.error(err?.data?.message || 'Failed to toggle WHOIS privacy');
            console.error('Toggle privacy failed:', err);
        }
    };

    const handleAddRecord = async (e) => {
        e.preventDefault();
        try {
            // Only include priority for MX and SRV records to avoid validation errors
            const recordToSubmit = { ...newRecord };
            if (newRecord.type !== 'MX' && newRecord.type !== 'SRV') {
                delete recordToSubmit.prio;
            }

            await addDnsRecord({
                domainName,
                record: recordToSubmit
            }).unwrap();

            toast.success('DNS Record added successfully');
            setIsAddingRecord(false);
            setNewRecord({
                type: 'A',
                name: '',
                content: '',
                ttl: 3600,
                prio: 0
            });
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to add DNS record');
            console.error('Add record failed:', err);
        }
    };

    const handleDeleteRecord = async (recordId) => {
        if (!window.confirm('Are you sure you want to delete this DNS record?')) return;

        try {
            setDeletingRecordId(recordId);
            await deleteDnsRecord({
                domainName,
                recordId
            }).unwrap();

            toast.success('DNS Record deleted successfully');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to delete DNS record');
            console.error('Delete record failed:', err);
        } finally {
            setDeletingRecordId(null);
        }
    };

    const handleUpdateNameservers = async () => {
        // Filter out empty nameservers
        const filteredNs = nameservers.filter(ns => ns.trim() !== '');

        if (filteredNs.length < 2) {
            toast.error('At least 2 nameservers are required');
            return;
        }

        try {
            await updateNameservers({
                domainName,
                nameservers: filteredNs
            }).unwrap();

            toast.success('Nameservers updated successfully');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update nameservers');
            console.error('Update NS failed:', err);
        }
    };

    const handleRemoveNameserver = (index) => {
        if (nameservers.length <= 2) {
            toast.warning('A minimum of 2 nameservers is usually required');
        }
        const newNs = nameservers.filter((_, i) => i !== index);
        setNameservers(newNs);
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                    <p className="text-neutral-500 font-medium">Loading domain details...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (isError || !domainData?.db) {
        return (
            <DashboardLayout>
                <div className="text-center py-20 bg-white rounded-2xl shadow-soft-md">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">Domain not found</h1>
                    <p className="text-neutral-500 mb-8">The domain you are looking for does not exist or you don't have access.</p>
                    <div className="flex justify-center gap-4">
                        <Link to="/dashboard/domains">
                            <Button variant="outline">Back to My Domains</Button>
                        </Link>
                        <Button variant="primary" onClick={() => refetch()}>
                            Try Again
                        </Button>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const { db, inwx } = domainData;

    const tabs = [
        { id: 'general', label: 'Overview', icon: Globe },
        { id: 'dns', label: 'DNS Records', icon: Shield },
        { id: 'nameservers', label: 'Nameservers', icon: Server },
        { id: 'dnssec', label: 'DNSSEC', icon: Lock },
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
                            {db.domainName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2">
                                {db.domainName}
                            </h1>
                            <div className="flex items-center gap-3 mt-1.5 text-sm text-neutral-500">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Expires {new Date(db.expiryDate).toLocaleDateString()}
                                </span>
                                <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                                <span>Registered {new Date(db.registrationDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge
                            variant={
                                db.status?.toLowerCase() === 'active'
                                    ? 'success'
                                    : db.status?.toLowerCase() === 'expiring-soon'
                                        ? 'warning'
                                        : 'neutral'
                            }
                            className="capitalize px-3 py-1 text-sm"
                        >
                            {db.status?.toLowerCase().replace('_', ' ') || 'unknown'}
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
                        {/* Domain Information Card */}
                        <Card className="border-none shadow-soft-md">
                            <CardHeader className="border-b border-neutral-100 pb-4">
                                <h2 className="text-lg font-bold text-neutral-900">Domain Information</h2>
                            </CardHeader>
                            <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Domain Name</span>
                                    <p className="text-lg font-medium text-neutral-900 mt-1">{db.domainName}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">TLD</span>
                                    <p className="text-lg font-medium text-neutral-900 mt-1">.{db.tld || db.domainName?.split('.').pop()}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Registration Date</span>
                                    <p className="text-neutral-900 mt-1">
                                        {inwx?.crDate?.scalar
                                            ? new Date(inwx.crDate.scalar).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                                            : new Date(db.registrationDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Expiration Date</span>
                                    <p className="text-neutral-900 mt-1">
                                        {inwx?.exDate?.scalar
                                            ? new Date(inwx.exDate.scalar).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                                            : new Date(db.expiryDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Last Updated</span>
                                    <p className="text-neutral-900 mt-1">
                                        {inwx?.upDate?.scalar
                                            ? new Date(inwx.upDate.scalar).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                                            : new Date(db.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Registration Period</span>
                                    <p className="text-neutral-900 mt-1">{inwx?.period || '1Y'}</p>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Registrar & Status Card */}
                        <Card className="border-none shadow-soft-md">
                            <CardHeader className="border-b border-neutral-100 pb-4">
                                <h2 className="text-lg font-bold text-neutral-900">Registrar Details</h2>
                            </CardHeader>
                            <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Registrar</span>
                                    <p className="text-neutral-900 mt-1 font-medium">SNC-Domain (via INWX)</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">INWX Domain ID</span>
                                    <p className="text-neutral-900 mt-1 font-mono">{inwx?.roId || db.inwxId || '-'}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">INWX Status</span>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Badge variant={inwx?.status === 'OK' ? 'success' : 'warning'} className="text-xs">
                                            {inwx?.status || db.status || 'Unknown'}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Renewal Mode</span>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Badge variant={inwx?.renewalMode === 'AUTORENEW' ? 'success' : 'neutral'} className="text-xs">
                                            {inwx?.renewalMode || (autoRenew ? 'AUTORENEW' : 'MANUAL')}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Transfer Mode</span>
                                    <p className="text-neutral-900 mt-1">{inwx?.transferMode || 'DEFAULT'}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Environment</span>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Badge variant={db.environment === 'production' ? 'success' : 'warning'} className="text-xs uppercase">
                                            {db.environment || 'production'}
                                        </Badge>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Nameservers Summary Card */}
                        <Card className="border-none shadow-soft-md">
                            <CardHeader className="border-b border-neutral-100 pb-4">
                                <h2 className="text-lg font-bold text-neutral-900">Nameservers</h2>
                            </CardHeader>
                            <CardBody>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {(inwx?.ns || db.nameservers || []).map((ns, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                            <Server className="w-4 h-4 text-primary-500 shrink-0" />
                                            <span className="text-sm font-mono text-neutral-700">{ns}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Auth Code & Verification Card */}
                        <Card className="border-none shadow-soft-md">
                            <CardHeader className="border-b border-neutral-100 pb-4">
                                <h2 className="text-lg font-bold text-neutral-900">Transfer & Verification</h2>
                            </CardHeader>
                            <CardBody className="space-y-6">
                                {inwx?.authCode && (
                                    <div>
                                        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Auth Code (EPP)</span>
                                        <div className="mt-2 flex items-center gap-3">
                                            <code className="flex-1 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-sm font-mono text-neutral-700 select-all">
                                                {inwx.authCode}
                                            </code>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(inwx.authCode);
                                                    toast.success('Auth code copied to clipboard');
                                                }}
                                            >
                                                Copy
                                            </Button>
                                        </div>
                                        <p className="text-xs text-neutral-500 mt-1.5">Required to transfer this domain to another registrar.</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Verification Status</span>
                                        <div className="mt-1 flex items-center gap-2">
                                            <Badge variant={inwx?.verificationStatus === 'ACTIVE' ? 'success' : 'warning'} className="text-xs">
                                                {inwx?.verificationStatus || '-'}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Registrant Verification</span>
                                        <div className="mt-1 flex items-center gap-2">
                                            <Badge variant={inwx?.registrantVerificationStatus === 'VERIFIED' ? 'success' : 'neutral'} className="text-xs">
                                                {inwx?.registrantVerificationStatus || '-'}
                                            </Badge>
                                        </div>
                                    </div>
                                    {inwx?.reDate?.scalar && (
                                        <div>
                                            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Renewal Deadline</span>
                                            <p className="text-neutral-900 mt-1">
                                                {new Date(inwx.reDate.scalar).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Contact/WHOIS Privacy Card */}
                        <Card className="border-none shadow-soft-md">
                            <CardHeader className="border-b border-neutral-100 pb-4">
                                <h2 className="text-lg font-bold text-neutral-900">WHOIS Privacy</h2>
                            </CardHeader>
                            <CardBody>
                                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("p-2 rounded-lg shadow-sm", whoisPrivacy ? "bg-success-50" : "bg-neutral-100")}>
                                            <Shield className={cn("w-5 h-5", whoisPrivacy ? "text-success-600" : "text-neutral-400")} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-neutral-900">
                                                Privacy Protection is {whoisPrivacy ? 'On' : 'Off'}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                {whoisPrivacy
                                                    ? 'Your personal information is hidden from WHOIS.'
                                                    : 'Your contact details are publicly visible in WHOIS records.'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant={whoisPrivacy ? "success" : "primary"}
                                        size="sm"
                                        onClick={handleToggleWhoisPrivacy}
                                        isLoading={isTogglingPrivacy}
                                    >
                                        {whoisPrivacy ? 'Disable Privacy' : 'Enable Privacy'}
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Auto-Renewal Card */}
                        <Card className="border-none shadow-soft-md bg-gradient-to-br from-primary-900 to-primary-800 text-white">
                            <CardBody>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold">Auto-Renewal</h3>
                                    {isToggling && <Loader2 className="w-4 h-4 animate-spin text-white/50" />}
                                </div>
                                <p className="text-primary-100 text-sm mb-6">
                                    Don't lose your domain. Enable auto-renewal to keep it safe.
                                </p>
                                <label className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                                    <span className="font-medium">Enable Auto-Renewal</span>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={autoRenew}
                                            onChange={handleToggleAutoRenew}
                                            disabled={isToggling}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-primary-900/50 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-500"></div>
                                    </div>
                                </label>
                                {inwx?.renewalMode && (
                                    <p className="text-xs text-primary-200 mt-3">
                                        INWX Mode: {inwx.renewalMode}
                                    </p>
                                )}
                            </CardBody>
                        </Card>

                        {/* Domain Lock Card */}
                        <Card className="border-none shadow-soft-md border-t-4 border-t-red-500">
                            <CardBody>
                                <h3 className="font-bold text-neutral-900 mb-2">Domain Lock</h3>
                                <p className="text-sm text-neutral-500 mb-4">
                                    Prevent unauthorized transfers of your domain.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-neutral-700">Transfer Lock</span>
                                    {inwx?.transferLock ? (
                                        <span className="px-2 py-1 bg-success-100 text-success-700 text-xs font-bold rounded">LOCKED</span>
                                    ) : (
                                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">UNLOCKED</span>
                                    )}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Quick Stats Card */}
                        <Card className="border-none shadow-soft-md">
                            <CardBody className="space-y-4">
                                <h3 className="font-bold text-neutral-900">Quick Info</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-500">Domain ACE</span>
                                        <span className="font-mono text-neutral-700">{inwx?.['domain-ace'] || db.domainName}</span>
                                    </div>
                                    <div className="border-t border-neutral-100" />
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-500">INWX ID</span>
                                        <span className="font-mono text-neutral-700">{inwx?.roId || db.inwxId || '-'}</span>
                                    </div>
                                    <div className="border-t border-neutral-100" />
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-500">Transfer Mode</span>
                                        <span className="text-neutral-700">{inwx?.transferMode || 'DEFAULT'}</span>
                                    </div>
                                    <div className="border-t border-neutral-100" />
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-500">Privacy</span>
                                        <Badge variant={inwx?.withPrivacy ? 'success' : 'neutral'} className="text-xs">
                                            {inwx?.withPrivacy ? 'Enabled' : inwx?.withPrivacy === null ? 'N/A' : 'Disabled'}
                                        </Badge>
                                    </div>
                                    <div className="border-t border-neutral-100" />
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-500">Contact IDs</span>
                                        <span className="font-mono text-neutral-700 text-xs">
                                            {inwx?.registrant || '-'}
                                        </span>
                                    </div>
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
                        <Button
                            variant={isAddingRecord ? "outline" : "primary"}
                            className={cn("shadow-lg", !isAddingRecord && "shadow-primary-500/20")}
                            onClick={() => setIsAddingRecord(!isAddingRecord)}
                        >
                            {isAddingRecord ? (
                                "Cancel"
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Record
                                </>
                            )}
                        </Button>
                    </CardHeader>
                    <CardBody>
                        {isAddingRecord && (
                            <form onSubmit={handleAddRecord} className="mb-8 p-6 bg-neutral-50 border border-neutral-100 rounded-2xl animate-in zoom-in-95 duration-200">
                                <h3 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">Add New DNS Record</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-500 ml-1">Type</label>
                                        <select
                                            value={newRecord.type}
                                            onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                                            className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                                        >
                                            {['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'SRV', 'NS'].map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-500 ml-1">Name (Host)</label>
                                        <Input
                                            placeholder="e.g. @ or www"
                                            value={newRecord.name}
                                            onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-500 ml-1">Value (Content)</label>
                                        <Input
                                            placeholder="e.g. 192.168.1.1"
                                            value={newRecord.content}
                                            onChange={(e) => setNewRecord({ ...newRecord, content: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-500 ml-1">TTL (Seconds)</label>
                                        <Input
                                            type="number"
                                            value={newRecord.ttl}
                                            onChange={(e) => setNewRecord({ ...newRecord, ttl: parseInt(e.target.value) })}
                                            required
                                        />
                                    </div>
                                    {newRecord.type === 'MX' || newRecord.type === 'SRV' ? (
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-neutral-500 ml-1">Priority</label>
                                            <Input
                                                type="number"
                                                value={newRecord.prio}
                                                onChange={(e) => setNewRecord({ ...newRecord, prio: parseInt(e.target.value) })}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex justify-end gap-3">
                                    <Button type="button" variant="ghost" onClick={() => setIsAddingRecord(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary" isLoading={isAdding}>
                                        Save Record
                                    </Button>
                                </div>
                            </form>
                        )}
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
                                    {isLoadingDns ? (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-8 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                                                    <p className="text-neutral-500">Loading records...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : dnsData?.record && dnsData.record.length > 0 ? (
                                        dnsData.record.map((record) => (
                                            <tr key={record.id} className="group hover:bg-neutral-50/50 transition-colors">
                                                <td className="px-4 py-3 font-medium text-neutral-900">
                                                    <Badge variant="neutral" className="bg-neutral-100 text-neutral-700 border-none px-2 py-0.5 text-[10px] font-bold">
                                                        {record.type}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-neutral-600 truncate max-w-[150px]" title={record.name}>
                                                    {record.name}
                                                </td>
                                                <td className="px-4 py-3 text-neutral-600 font-mono text-xs truncate max-w-[300px]" title={record.content}>
                                                    {record.content}
                                                </td>
                                                <td className="px-4 py-3 text-neutral-500">{record.ttl}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button
                                                        onClick={() => handleDeleteRecord(record.id)}
                                                        disabled={deletingRecordId === record.id}
                                                        className="text-neutral-400 hover:text-red-600 transition-colors p-1 disabled:opacity-50"
                                                    >
                                                        {deletingRecordId === record.id ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-8 text-center text-neutral-500">
                                                No DNS records found for this domain.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            )}

            {/* Nameservers Tab */}
            {activeTab === 'nameservers' && (
                <NameserverManagement domainName={domainName} />
            )}

            {/* DNSSEC Tab */}
            {activeTab === 'dnssec' && (
                <DNSSECManagement domainName={domainName} />
            )}
        </DashboardLayout>
    );
};

export default DomainDetails;
