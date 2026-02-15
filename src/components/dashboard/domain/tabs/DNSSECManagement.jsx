import { useState } from 'react';
import { Shield, AlertTriangle, Trash2, Key, Save, Loader2, Info, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import Card, { CardBody, CardHeader } from '../../../ui/Card';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import Badge from '../../../ui/Badge';
import {
    useGetDnssecInfoQuery,
    useEnableDnssecMutation,
    useDisableDnssecMutation,
    useGetDnssecKeysQuery,
    useAddDnssecKeyMutation,
    useDeleteDnssecKeyMutation,
    useDeleteAllDnssecKeysMutation
} from '../../../../redux/features/dns/dnssecApi';
import { useGetDomainDetailsQuery } from '../../../../redux/features/domain/domainApi';
import { useGetDnsRecordsQuery } from '../../../../redux/features/dns/dnsApi';

const ALGORITHM_NAMES = {
    5: 'RSA/SHA-1',
    7: 'RSASHA1-NSEC3-SHA1',
    8: 'RSA/SHA-256',
    10: 'RSA/SHA-512',
    13: 'ECDSA P-256/SHA-256',
    14: 'ECDSA P-384/SHA-384',
    15: 'Ed25519',
    16: 'Ed448',
};

const DNSSECManagement = ({ domainName }) => {
    // Queries
    const { data: dnssecInfo, isLoading: isLoadingInfo, error: infoError } = useGetDnssecInfoQuery(domainName);
    const { data: keysData, isLoading: isLoadingKeys } = useGetDnssecKeysQuery(domainName);
    const { data: domainData } = useGetDomainDetailsQuery(domainName);
    const { data: dnsData } = useGetDnsRecordsQuery(domainName);

    // Mutations
    const [enableDnssec, { isLoading: isEnabling }] = useEnableDnssecMutation();
    const [disableDnssec, { isLoading: isDisabling }] = useDisableDnssecMutation();
    const [addKey, { isLoading: isAdding }] = useAddDnssecKeyMutation();
    const [deleteKey] = useDeleteDnssecKeyMutation();
    const [deleteAllKeys, { isLoading: isDeletingAll }] = useDeleteAllDnssecKeysMutation();

    // Local state
    const [isAddingKey, setIsAddingKey] = useState(false);
    const [deletingKeyId, setDeletingKeyId] = useState(null);
    const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
    const [newKey, setNewKey] = useState({
        flags: 257,
        algorithm: 13,
        protocol: 3,
        publicKey: ''
    });

    // Derive actual nameservers from DNS records
    const actualNameservers = dnsData?.record
        ?.filter(r => r.type === 'NS')
        ?.map(r => r.content) || domainData?.db?.nameservers || [];

    const isUsingINWXNameservers = actualNameservers.length > 0 && actualNameservers.every(
        ns => ns.toLowerCase().includes('inwx') || ns.toLowerCase().includes('domrobot')
    );

    // DNSSEC status derived from API response
    const isDnssecEnabled = dnssecInfo?.dnssecStatus === 'OK' || dnssecInfo?.dnssecStatus === 'PENDING';
    const keyCount = dnssecInfo?.keyCount || 0;

    // --- Handlers ---

    const handleEnableDnssec = async () => {
        if (!isUsingINWXNameservers) {
            toast.warning(
                'Auto-DNSSEC requires INWX nameservers. Your domain is using custom nameservers. You can still add DNSSEC keys manually.',
                { autoClose: 8000 }
            );
            return;
        }

        try {
            const result = await enableDnssec(domainName).unwrap();
            const resData = result?.data || result;

            if (resData?.method === 'manual_required') {
                toast.info(resData.message || 'Manual DNSSEC management required. You can add keys manually.', { autoClose: 8000 });
            } else if (resData?.code === 1000) {
                toast.success('DNSSEC enabled successfully!');
            } else {
                toast.info(resData?.message || 'DNSSEC enable request sent.');
            }
        } catch (err) {
            const code = err?.data?.code;
            if (code === 2004) {
                toast.error('Cannot enable auto-DNSSEC: Domain must use INWX nameservers. Update nameservers first or add keys manually.', { autoClose: 8000 });
            } else if (code === 2303) {
                toast.error('Domain not found.');
            } else {
                toast.error(err?.data?.message || 'Failed to enable DNSSEC');
            }
        }
    };

    const handleDisableDnssec = async () => {
        if (!window.confirm('Are you sure you want to disable DNSSEC? This will remove all DS records and keys.')) return;

        try {
            const result = await disableDnssec(domainName).unwrap();
            const resData = result?.data || result;

            if (resData?.method === 'manual_required') {
                toast.info(resData.message || 'Manual action required.');
            } else if (resData?.code === 1000) {
                toast.success('DNSSEC disabled successfully.');
            } else {
                toast.info(resData?.message || 'DNSSEC disable request sent.');
            }
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to disable DNSSEC');
        }
    };

    const handleAddKey = async (e) => {
        e.preventDefault();

        if (!newKey.publicKey.trim()) {
            toast.error('Public key is required');
            return;
        }

        // Build DNSKEY in presentation format:
        // <domain>. IN DNSKEY <flags> <protocol> <algorithm> <publicKey>
        const dnskeyPresentation = `${domainName}. IN DNSKEY ${newKey.flags} ${newKey.protocol} ${newKey.algorithm} ${newKey.publicKey.trim()}`;

        try {
            const result = await addKey({
                domainName,
                dnskey: dnskeyPresentation,
                calculateDigest: true,
                digestType: 2 // SHA-256
            }).unwrap();

            toast.success('DNSSEC key added successfully!');
            setIsAddingKey(false);
            setNewKey({ flags: 257, algorithm: 13, protocol: 3, publicKey: '' });
        } catch (err) {
            const code = err?.data?.code;
            if (code === 2005) {
                toast.error('Invalid key format. Please check your public key and parameters.');
            } else {
                toast.error(err?.data?.message || 'Failed to add DNSSEC key');
            }
        }
    };

    const handleDeleteKey = async (keyId) => {
        if (!window.confirm('Are you sure you want to delete this DNSSEC key?')) return;

        try {
            setDeletingKeyId(keyId);
            await deleteKey({ domainName, keyId }).unwrap();
            toast.success('DNSSEC key deleted successfully.');
        } catch (err) {
            const code = err?.data?.code;
            if (code === 2303) {
                toast.error('Key not found. It may have already been deleted.');
            } else {
                toast.error(err?.data?.message || 'Failed to delete key');
            }
        } finally {
            setDeletingKeyId(null);
        }
    };

    const handleDeleteAllKeys = async () => {
        try {
            await deleteAllKeys(domainName).unwrap();
            toast.success('All DNSSEC keys deleted.');
            setShowDeleteAllConfirm(false);
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to delete all keys');
        }
    };

    // --- Loading State ---
    if (isLoadingInfo) {
        return (
            <div className="flex flex-col items-center justify-center py-16 animate-in fade-in">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600 mb-3" />
                <p className="text-neutral-500 text-sm">Loading DNSSEC information...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Nameserver Warning Banner */}
            {!isUsingINWXNameservers && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex gap-3">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm text-amber-600 h-fit">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="text-sm text-amber-900">
                        <p className="font-semibold">Custom Nameservers Detected</p>
                        <p className="opacity-80 mt-0.5">
                            Auto-DNSSEC requires INWX nameservers. Your domain is using custom nameservers
                            ({actualNameservers.slice(0, 2).join(', ')}{actualNameservers.length > 2 ? '...' : ''}).
                            You can still manage DNSSEC keys manually.
                        </p>
                    </div>
                </div>
            )}

            {/* Status Card */}
            <Card className="border-none shadow-soft-md">
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-4">
                    <div>
                        <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary-600" />
                            DNSSEC Status
                        </h3>
                        <p className="text-sm text-neutral-500">Secure your domain against DNS spoofing and cache poisoning.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge
                            variant={isDnssecEnabled ? "success" : "neutral"}
                            className="px-3 py-1"
                        >
                            {dnssecInfo?.dnssecStatus === 'OK' && 'Enabled'}
                            {dnssecInfo?.dnssecStatus === 'PENDING' && 'Pending'}
                            {!dnssecInfo?.dnssecStatus && 'Disabled'}
                        </Badge>
                        {isDnssecEnabled ? (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDisableDnssec}
                                isLoading={isDisabling}
                                className="text-red-600 hover:bg-red-50 hover:border-red-200"
                            >
                                Disable DNSSEC
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleEnableDnssec}
                                isLoading={isEnabling}
                            >
                                Enable DNSSEC
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Status</p>
                            <div className="flex items-center gap-2 mt-1">
                                {isDnssecEnabled
                                    ? <CheckCircle className="w-4 h-4 text-green-500" />
                                    : <XCircle className="w-4 h-4 text-neutral-400" />
                                }
                                <p className="text-lg font-medium text-neutral-900">
                                    {dnssecInfo?.dnssecStatus || 'Not configured'}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Key Count</p>
                            <p className="text-lg font-medium text-neutral-900 mt-1">{keyCount}</p>
                        </div>
                        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Nameservers</p>
                            <p className="text-lg font-medium text-neutral-900 mt-1">
                                {isUsingINWXNameservers ? 'INWX (Auto)' : 'Custom'}
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Keys Management - Always show so users can add keys manually */}
            <Card className="border-none shadow-soft-md">
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-4">
                    <div>
                        <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                            <Key className="w-5 h-5 text-primary-600" />
                            DNS Keys
                        </h3>
                        <p className="text-sm text-neutral-500">Manage DNSSEC Key Signing Keys (KSK). Only flag 257 keys are accepted.</p>
                    </div>
                    <Button
                        variant={isAddingKey ? "outline" : "primary"}
                        size="sm"
                        onClick={() => setIsAddingKey(!isAddingKey)}
                    >
                        {isAddingKey ? 'Cancel' : 'Add DNS Key'}
                    </Button>
                </CardHeader>
                <CardBody>
                    {/* Add Key Form */}
                    {isAddingKey && (
                        <form onSubmit={handleAddKey} className="mb-8 p-6 bg-neutral-50 border border-neutral-100 rounded-2xl animate-in zoom-in-95 duration-200">
                            <h3 className="text-sm font-bold text-neutral-900 mb-1 uppercase tracking-wider">Add New DNSSEC Key</h3>
                            <p className="text-xs text-neutral-500 mb-4">
                                Format: <code className="bg-neutral-200 px-1 rounded">{domainName}. IN DNSKEY &lt;flags&gt; &lt;protocol&gt; &lt;algorithm&gt; &lt;publicKey&gt;</code>
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-500 ml-1">Flags</label>
                                    <Input
                                        type="number"
                                        placeholder="257"
                                        value={newKey.flags}
                                        onChange={(e) => setNewKey({ ...newKey, flags: parseInt(e.target.value) || 0 })}
                                        required
                                    />
                                    <p className="text-xs text-neutral-500 ml-1">257 = KSK (required)</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-500 ml-1">Algorithm</label>
                                    <select
                                        className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm bg-white"
                                        value={newKey.algorithm}
                                        onChange={(e) => setNewKey({ ...newKey, algorithm: parseInt(e.target.value) })}
                                    >
                                        {Object.entries(ALGORITHM_NAMES).map(([id, name]) => (
                                            <option key={id} value={id}>{id} - {name}</option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-neutral-500 ml-1">13 (ECDSA P-256) recommended</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-500 ml-1">Protocol</label>
                                    <Input
                                        type="number"
                                        placeholder="3"
                                        value={newKey.protocol}
                                        onChange={(e) => setNewKey({ ...newKey, protocol: parseInt(e.target.value) || 3 })}
                                        required
                                    />
                                    <p className="text-xs text-neutral-500 ml-1">Always 3 for DNSSEC</p>
                                </div>
                            </div>
                            <div className="mb-6 space-y-1.5">
                                <label className="text-xs font-semibold text-neutral-500 ml-1">Public Key (Base64)</label>
                                <textarea
                                    className="w-full min-h-[100px] p-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-mono"
                                    placeholder="mdsswUyr3DPW132mOi8V9xESWE8jTo0dxCjjnopKl+GqJxpVXckHAeF+KkxLbxILfDLUT0rAK9iUzy1L53eKGQ=="
                                    value={newKey.publicKey}
                                    onChange={(e) => setNewKey({ ...newKey, publicKey: e.target.value })}
                                    required
                                />
                                <p className="text-xs text-neutral-500 ml-1">DS record digest (SHA-256) will be calculated automatically by the server.</p>
                            </div>

                            {/* Preview */}
                            {newKey.publicKey.trim() && (
                                <div className="mb-6 p-3 bg-neutral-100 rounded-xl border border-neutral-200">
                                    <p className="text-xs font-semibold text-neutral-500 mb-1">DNSKEY Record Preview:</p>
                                    <p className="text-xs font-mono text-neutral-700 break-all">
                                        {domainName}. IN DNSKEY {newKey.flags} {newKey.protocol} {newKey.algorithm} {newKey.publicKey.trim()}
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-end gap-3">
                                <Button type="button" variant="ghost" onClick={() => setIsAddingKey(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" isLoading={isAdding}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Add Key
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Keys List */}
                    {isLoadingKeys ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                        </div>
                    ) : keysData && keysData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold text-xs">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">ID</th>
                                        <th className="px-4 py-3">Flags</th>
                                        <th className="px-4 py-3">Algorithm</th>
                                        <th className="px-4 py-3">Key Tag</th>
                                        <th className="px-4 py-3">Digest Type</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Created</th>
                                        <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {keysData.map((key) => (
                                        <tr key={key.id} className="group hover:bg-neutral-50/50 transition-colors">
                                            <td className="px-4 py-3 font-mono text-neutral-600 font-medium">{key.id}</td>
                                            <td className="px-4 py-3">
                                                <Badge variant="neutral" className="bg-neutral-100 text-neutral-700">
                                                    {key.flagId} {key.flagId === 257 ? '(KSK)' : key.flagId === 256 ? '(ZSK)' : ''}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-neutral-600">
                                                <span title={ALGORITHM_NAMES[key.algorithmId] || 'Unknown'}>
                                                    {key.algorithmId} {ALGORITHM_NAMES[key.algorithmId] ? `(${ALGORITHM_NAMES[key.algorithmId]})` : ''}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-neutral-600 font-mono">{key.keyTag || '-'}</td>
                                            <td className="px-4 py-3 text-neutral-600">
                                                {key.digestTypeId === 1 && 'SHA-1'}
                                                {key.digestTypeId === 2 && 'SHA-256'}
                                                {key.digestTypeId === 4 && 'SHA-384'}
                                                {![1, 2, 4].includes(key.digestTypeId) && (key.digestTypeId || '-')}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={key.status === 'OK' ? 'success' : key.status === 'DELETED' ? 'danger' : 'neutral'}
                                                    className="text-xs"
                                                >
                                                    {key.status || 'Unknown'}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-neutral-500 text-xs">
                                                {key.created || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    onClick={() => handleDeleteKey(key.id)}
                                                    disabled={deletingKeyId === key.id}
                                                    className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                                                    title="Delete this key"
                                                >
                                                    {deletingKeyId === key.id
                                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                                        : <Trash2 className="w-4 h-4" />
                                                    }
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Key details expandable — show digest for each key */}
                            <div className="mt-4 space-y-2">
                                {keysData.filter(k => k.digest).map(key => (
                                    <details key={key.id} className="bg-neutral-50 rounded-lg border border-neutral-100">
                                        <summary className="cursor-pointer px-4 py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-700">
                                            Key {key.id} — DS Record / Digest
                                        </summary>
                                        <div className="px-4 pb-3 space-y-2">
                                            <div>
                                                <p className="text-xs text-neutral-400 uppercase font-semibold">Public Key</p>
                                                <p className="text-xs font-mono text-neutral-600 break-all bg-white p-2 rounded border border-neutral-200 mt-1">
                                                    {key.publicKey || '-'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-neutral-400 uppercase font-semibold">Digest (DS Record)</p>
                                                <p className="text-xs font-mono text-neutral-600 break-all bg-white p-2 rounded border border-neutral-200 mt-1">
                                                    {key.digest || '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <Key className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                            <p className="text-neutral-500 text-sm font-medium">No DNSSEC keys found</p>
                            <p className="text-neutral-400 text-xs mt-1">
                                {isDnssecEnabled
                                    ? 'Keys are managed automatically when using INWX nameservers.'
                                    : 'Enable DNSSEC or add keys manually to secure your domain.'
                                }
                            </p>
                        </div>
                    )}

                    {/* Delete All Danger Zone */}
                    {keysData && keysData.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-neutral-100">
                            {!showDeleteAllConfirm ? (
                                <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg text-red-600 shadow-sm">
                                            <AlertTriangle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-red-900 text-sm">Danger Zone</h4>
                                            <p className="text-red-700 text-xs mt-0.5">Deleting all keys will break DNSSEC validation if DS records exist at the registry.</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        className="text-red-600 hover:bg-red-100 hover:text-red-700 bg-white shadow-sm border border-red-100"
                                        onClick={() => setShowDeleteAllConfirm(true)}
                                    >
                                        Delete All Keys
                                    </Button>
                                </div>
                            ) : (
                                <div className="bg-red-100 border border-red-300 rounded-xl p-5 animate-in zoom-in-95 duration-200">
                                    <p className="text-red-900 font-bold text-sm mb-2">⚠️ Confirm: Delete ALL {keysData.length} DNSSEC key(s)?</p>
                                    <p className="text-red-800 text-xs mb-4">This action cannot be undone. All DS records at the registry will become invalid.</p>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowDeleteAllConfirm(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="bg-red-600 hover:bg-red-700 shadow-sm"
                                            onClick={handleDeleteAllKeys}
                                            isLoading={isDeletingAll}
                                        >
                                            Yes, Delete All Keys
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default DNSSECManagement;
