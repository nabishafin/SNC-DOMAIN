import { useState } from 'react';
import { cn } from '../../lib/utils';
import {
    Layers,
    Search,
    Plus,
    Trash2,
    Loader2,
    CheckCircle,
    AlertCircle,
    Globe,
    Activity,
    Info
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { useCheckHostMutation, useCreateHostMutation, useListHostsQuery, useDeleteHostMutation } from '../../redux/features/host/hostApi';

const GlueRecords = () => {
    const { addToast } = useToast();
    const [checkHost, { isLoading: isChecking }] = useCheckHostMutation();
    const [createHost, { isLoading: isCreating }] = useCreateHostMutation();
    const [deleteHost, { isLoading: isDeleting }] = useDeleteHostMutation();
    const { data: hosts, isLoading: isLoadingHosts } = useListHostsQuery();

    // Availability Check State
    const [checkHostname, setCheckHostname] = useState('');
    const [checkResult, setCheckResult] = useState(null);

    // Creation State
    const [newHostname, setNewHostname] = useState('');
    const [ipAddresses, setIpAddresses] = useState(['']);

    // Deletion State
    const [hostToDelete, setHostToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleCheck = async (e) => {
        e.preventDefault();
        if (!checkHostname) return;

        try {
            const res = await checkHost({ hostname: checkHostname }).unwrap();
            setCheckResult(res);
            if (res.available) {
                addToast('success', 'Hostname Available', `${checkHostname} can be registered as a glue record.`);
            } else {
                addToast('warning', 'Hostname Unavailable', `${checkHostname} is already taken or invalid.`);
            }
        } catch (err) {
            addToast('error', 'Check Failed', err?.data?.message || 'Failed to verify hostname.');
        }
    };

    const handleAddIp = () => {
        setIpAddresses([...ipAddresses, '']);
    };

    const handleRemoveIp = (index) => {
        if (ipAddresses.length === 1) return;
        const newIps = ipAddresses.filter((_, i) => i !== index);
        setIpAddresses(newIps);
    };

    const handleIpChange = (index, value) => {
        const newIps = [...ipAddresses];
        newIps[index] = value;
        setIpAddresses(newIps);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const filteredIps = ipAddresses.filter(ip => ip.trim() !== '');

        if (!newHostname || filteredIps.length === 0) {
            addToast('error', 'Validation Error', 'Hostname and at least one IP address are required.');
            return;
        }

        try {
            const res = await createHost({
                hostname: newHostname,
                ipAddress: filteredIps
            }).unwrap();

            addToast('success', 'Glue Record Created', `Successfully registered ${res.data?.hostname || newHostname}.`);
            setNewHostname('');
            setIpAddresses(['']);
        } catch (err) {
            addToast('error', 'Registration Failed', err?.data?.message || 'Failed to create glue record.');
        }
    };

    const handleDelete = async () => {
        if (!hostToDelete) return;

        try {
            await deleteHost(hostToDelete.id || hostToDelete.hostname).unwrap();
            addToast('success', 'Host Deleted', `Successfully removed ${hostToDelete.hostname}.`);
            setIsDeleteModalOpen(false);
            setHostToDelete(null);
        } catch (err) {
            addToast('error', 'Deletion Failed', err?.data?.message || 'Failed to delete glue record.');
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-neutral-900">Glue Records (Host)</h1>
                <p className="text-neutral-500 mt-1">Register custom nameservers for your domains with dedicated IP addresses.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Check Availability */}
                <div className="space-y-6">
                    <Card className="border-none shadow-soft overflow-visible">
                        <CardBody className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-primary-50 rounded-xl text-primary-600">
                                    <Search className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-neutral-900">Check Availability</h2>
                            </div>

                            <form onSubmit={handleCheck} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-neutral-700 mb-2">Hostname</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                            <input
                                                type="text"
                                                placeholder="ns1.example.com"
                                                className="w-full h-12 pl-11 pr-4 rounded-xl border border-neutral-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium"
                                                value={checkHostname}
                                                onChange={(e) => setCheckHostname(e.target.value)}
                                            />
                                        </div>
                                        <Button
                                            variant="primary"
                                            className="h-12 px-6 shadow-lg shadow-primary-500/20"
                                            isLoading={isChecking}
                                        >
                                            Check
                                        </Button>
                                    </div>
                                </div>

                                {checkResult && (
                                    <div className={cn(
                                        "p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300",
                                        checkResult.available ? "bg-success-50 text-success-800 border border-success-100" : "bg-warning-50 text-warning-800 border border-warning-100"
                                    )}>
                                        {checkResult.available ? (
                                            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                        )}
                                        <div>
                                            <p className="font-bold text-sm">
                                                {checkResult.available ? 'Hostname is available!' : 'Hostname is unavailable'}
                                            </p>
                                            <p className="text-xs mt-1 opacity-90">
                                                {checkResult.available
                                                    ? `You can use ${checkHostname} as a custom nameserver.`
                                                    : `The hostname ${checkHostname} cannot be used at this time.`
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </CardBody>
                    </Card>

                    <Card className="border-none shadow-soft bg-neutral-900 text-white">
                        <CardBody className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Info className="w-5 h-5 text-primary-400" />
                                <h3 className="font-bold">What is a Glue Record?</h3>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed italic">
                                "Glue records are essential when your domain's nameservers are subdomains of the domain itself. They provide the IP addresses of the nameservers to break the circular dependency."
                            </p>
                        </CardBody>
                    </Card>
                </div>

                {/* Create Record */}
                <div className="space-y-6">
                    <Card className="border-none shadow-soft h-full">
                        <CardBody className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-success-50 rounded-xl text-success-600">
                                    <Plus className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-neutral-900">Register New Glue Record</h2>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-neutral-700 mb-2">New Hostname</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="ns1.myproject.com"
                                        className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium"
                                        value={newHostname}
                                        onChange={(e) => setNewHostname(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-bold text-neutral-700">IP Addresses</label>
                                        <button
                                            type="button"
                                            onClick={handleAddIp}
                                            className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                            Add IP
                                        </button>
                                    </div>

                                    <div className="space-y-3 max-h-[240px] overflow-y-auto pr-2 scrollbar-custom">
                                        {ipAddresses.map((ip, index) => (
                                            <div key={index} className="flex gap-2 animate-in fade-in slide-in-from-right-2">
                                                <div className="relative flex-1">
                                                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="e.g. 37.166.139.118"
                                                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-neutral-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-mono text-sm"
                                                        value={ip}
                                                        onChange={(e) => handleIpChange(index, e.target.value)}
                                                    />
                                                </div>
                                                {ipAddresses.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveIp(index)}
                                                        className="h-12 w-12 flex items-center justify-center rounded-xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    variant="success"
                                    className="w-full h-12 shadow-lg shadow-success-500/20"
                                    size="lg"
                                    isLoading={isCreating}
                                >
                                    Register Glue Record
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Managed Glue Records */}
            <div className="mt-8">
                <Card className="border-none shadow-soft overflow-hidden">
                    <CardBody className="p-0">
                        <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-primary-50 rounded-xl text-primary-600">
                                    <Layers className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-neutral-900">Managed Glue Records</h2>
                                    <p className="text-xs text-neutral-500 mt-0.5">Existing custom nameservers for your domains.</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold text-xs border-b border-neutral-100">
                                    <tr>
                                        <th className="px-6 py-4">Hostname</th>
                                        <th className="px-6 py-4">Domain</th>
                                        <th className="px-6 py-4">IP Addresses</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {isLoadingHosts ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-neutral-400">
                                                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                                Loading records...
                                            </td>
                                        </tr>
                                    ) : Array.isArray(hosts) && hosts.length > 0 ? (
                                        hosts.map((host, idx) => (
                                            <tr key={idx} className="group hover:bg-neutral-50/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-neutral-900">
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="w-3.5 h-3.5 text-primary-500" />
                                                        {host.hostname}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-neutral-600">{host.domain}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {host.ipAddress?.map((ip, i) => (
                                                            <span key={i} className="px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-md text-[11px] font-mono border border-neutral-200">
                                                                {ip}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-neutral-900">
                                                            <Info className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-neutral-400 hover:text-red-500 hover:bg-red-50"
                                                            onClick={() => {
                                                                setHostToDelete(host);
                                                                setIsDeleteModalOpen(true);
                                                            }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-16 text-center">
                                                <div className="max-w-xs mx-auto">
                                                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <Layers className="w-6 h-6 text-neutral-400" />
                                                    </div>
                                                    <h3 className="font-bold text-neutral-900 mb-1">No Glue Records Found</h3>
                                                    <p className="text-xs text-neutral-500">You haven't registered any custom hostnames yet.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Deletion Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Glue Record"
                description={`Are you sure you want to remove the glue record for ${hostToDelete?.hostname}?`}
                size="sm"
            >
                <div className="space-y-6 pt-2">
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-red-800 leading-relaxed">
                            This action will remove the glue record from INWX and our database. This cannot be undone.
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="ghost"
                            className="flex-1 h-11"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            className="flex-1 h-11 shadow-lg shadow-red-500/20 font-bold"
                            onClick={handleDelete}
                            isLoading={isDeleting}
                        >
                            Delete Host
                        </Button>
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
};

export default GlueRecords;
