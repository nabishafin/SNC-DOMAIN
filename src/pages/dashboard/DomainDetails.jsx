import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, Calendar, Shield, Server, RefreshCw, Save, Plus, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useGetDomainDetailsQuery, useToggleAutoRenewMutation, useUpdateNameserversMutation, useToggleWhoisPrivacyMutation } from '../../redux/features/domain/domainApi';
import { useGetDnsRecordsQuery, useAddDnsRecordMutation, useDeleteDnsRecordMutation } from '../../redux/features/dns/dnsApi';
import { cn } from '../../lib/utils';

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
            setNameservers(domainData.db.nameservers || []);
            setAutoRenew(domainData.db.autoRenew);
            setWhoisPrivacy(domainData.db.whoisPrivacy || false);
        }
    }, [domainData]);

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
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Registrar</span>
                                    <p className="text-lg font-medium text-neutral-900 mt-1">SNC-Domain (via INWX)</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Registration Date</span>
                                    <p className="text-neutral-900 mt-1">{new Date(db.registrationDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Expiration Date</span>
                                    <p className="text-neutral-900 mt-1">{new Date(db.expiryDate).toLocaleDateString()}</p>
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

                    <div className="space-y-6">
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
                                    {inwx?.transferLock ? (
                                        <span className="px-2 py-1 bg-success-100 text-success-700 text-xs font-bold rounded">LOCKED</span>
                                    ) : (
                                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">UNLOCKED</span>
                                    )}
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
                                <p className="font-semibold">{db.nameservers?.every(ns => ns.includes('inwx')) ? 'Using Default Nameservers' : 'Using Custom Nameservers'}</p>
                                <p className="opacity-80 mt-0.5">We are {db.nameservers?.every(ns => ns.includes('inwx')) ? 'currently' : 'not'} managing your DNS automatically.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {nameservers.map((ns, index) => (
                                <div key={index} className="flex items-end gap-3 group">
                                    <div className="flex-1">
                                        <Input
                                            label={index === 0 ? "Nameservers" : ""}
                                            value={ns}
                                            placeholder={`ns${index + 1}.snc-domain.com`}
                                            onChange={(e) => {
                                                const newNs = [...nameservers];
                                                newNs[index] = e.target.value;
                                                setNameservers(newNs);
                                            }}
                                        />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="md"
                                        className="mb-1 text-neutral-400 hover:text-red-500 hover:bg-red-50"
                                        onClick={() => handleRemoveNameserver(index)}
                                        disabled={nameservers.length <= 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-dashed border-2 text-neutral-500 hover:text-primary-600 hover:border-primary-200 mt-2"
                                onClick={() => setNameservers([...nameservers, ''])}
                                disabled={nameservers.length >= 4}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Another Nameserver
                            </Button>
                        </div>
                        <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-end">
                            <Button
                                variant="primary"
                                size="lg"
                                className="shadow-lg shadow-primary-500/20"
                                onClick={handleUpdateNameservers}
                                isLoading={isUpdatingNameservers}
                            >
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
