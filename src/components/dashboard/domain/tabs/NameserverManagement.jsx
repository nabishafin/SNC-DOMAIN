import { useState } from 'react';
import { toast } from 'react-toastify';
import {
    Server, Plus, Trash2, Loader2, Save, Download, AlertTriangle, Copy,
    ChevronDown, ChevronUp, Edit2, X, Check, RefreshCw, FileText, Layers
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../../../../components/ui/Card';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import { cn } from '../../../../lib/utils';

import {
    useGetZoneInfoQuery,
    useUpdateZoneMutation,
    useDeleteZoneMutation,
    useLazyExportZoneQuery,
} from '../../../../redux/features/nameserver/nameserverApi';

import {
    useListNsSetsQuery,
    useCreateNsSetMutation,
    useUpdateNsSetMutation,
    useDeleteNsSetMutation,
} from '../../../../redux/features/nameserver/nameserverSetApi';


const NameserverManagement = ({ domainName }) => {
    // Zone info
    const { data: zoneData, isLoading: isLoadingZone, refetch: refetchZone } = useGetZoneInfoQuery(domainName);
    const [updateZone, { isLoading: isUpdatingZone }] = useUpdateZoneMutation();
    const [deleteZoneMut, { isLoading: isDeletingZone }] = useDeleteZoneMutation();
    const [triggerExport] = useLazyExportZoneQuery();


    // NS Sets
    const { data: nsSets, isLoading: isLoadingNsSets } = useListNsSetsQuery();
    const [createNsSet, { isLoading: isCreatingNsSet }] = useCreateNsSetMutation();
    const [updateNsSet] = useUpdateNsSetMutation();
    const [deleteNsSet] = useDeleteNsSetMutation();

    // --- Local State ---
    const [activeSection, setActiveSection] = useState('nameservers'); // nameservers | nssets | export | danger

    // Nameserver editing
    const [editingNs, setEditingNs] = useState(false);
    const [nsValues, setNsValues] = useState([]);



    // NS Set form
    const [showAddNsSet, setShowAddNsSet] = useState(false);
    const [newNsSet, setNewNsSet] = useState({ name: '', type: 'primary', ns: ['', ''], hostmaster: '' });
    const [editingNsSetId, setEditingNsSetId] = useState(null);
    const [editNsSetData, setEditNsSetData] = useState({});
    const [deletingNsSetId, setDeletingNsSetId] = useState(null);

    // Zone delete confirmation
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');

    // Exporting
    const [exportData, setExportData] = useState(null);
    const [isExporting, setIsExporting] = useState(false);

    // --- Derived ---
    const records = zoneData?.record || [];
    const nsRecords = records.filter(r => r.type === 'NS').map(r => r.content);
    const isInwxNs = nsRecords.every(ns => ns.toLowerCase().includes('inwx') || ns.toLowerCase().includes('domrobot'));

    // ==================== HANDLERS ====================

    // --- Nameserver Update ---
    const handleStartEditNs = () => {
        setNsValues(nsRecords.length > 0 ? [...nsRecords] : ['', '']);
        setEditingNs(true);
    };

    const handleSaveNs = async () => {
        const filtered = nsValues.filter(ns => ns.trim());
        if (filtered.length < 1) {
            toast.error('At least one nameserver is required');
            return;
        }
        try {
            await updateZone({ domain: domainName, ns: filtered }).unwrap();
            toast.success('Nameservers updated successfully');
            setEditingNs(false);
            refetchZone();
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update nameservers');
        }
    };

    const handleApplyNsSet = (nsSet) => {
        setNsValues([...(nsSet.ns || [])]);
        setEditingNs(true);
        toast.info(`Applied "${nsSet.name}" — click Save to confirm`);
    };



    // --- NS Set CRUD ---
    const handleCreateNsSet = async (e) => {
        e.preventDefault();
        const nsFiltered = newNsSet.ns.filter(n => n.trim());
        if (!newNsSet.name.trim() || nsFiltered.length < 1) {
            toast.error('Name and at least one nameserver are required');
            return;
        }
        try {
            await createNsSet({ name: newNsSet.name, type: newNsSet.type, ns: nsFiltered, hostmaster: newNsSet.hostmaster }).unwrap();
            toast.success(`NS Set "${newNsSet.name}" created`);
            setNewNsSet({ name: '', type: 'primary', ns: ['', ''], hostmaster: '' });
            setShowAddNsSet(false);
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to create NS set');
        }
    };

    const handleStartEditNsSet = (nsSet) => {
        setEditingNsSetId(nsSet.id);
        setEditNsSetData({ name: nsSet.name, type: nsSet.type || 'primary', ns: [...(nsSet.ns || [])], hostmaster: nsSet.hostmaster || '' });
    };

    const handleSaveNsSet = async (id) => {
        try {
            const nsFiltered = editNsSetData.ns.filter(n => n.trim());
            await updateNsSet({ id, name: editNsSetData.name, type: editNsSetData.type, ns: nsFiltered, hostmaster: editNsSetData.hostmaster }).unwrap();
            toast.success('NS Set updated');
            setEditingNsSetId(null);
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update NS set');
        }
    };

    const handleDeleteNsSet = async (id) => {
        setDeletingNsSetId(id);
        try {
            await deleteNsSet(id).unwrap();
            toast.success('NS Set deleted');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to delete NS set');
        } finally {
            setDeletingNsSetId(null);
        }
    };

    // --- Export ---
    const handleExport = async () => {
        setIsExporting(true);
        try {
            const result = await triggerExport(domainName).unwrap();
            // API returns { export: "zone data..." }
            const zoneText = typeof result === 'string' ? result : (result?.export || JSON.stringify(result, null, 2));
            // Check for AXFR transfer failure
            if (zoneText.includes('Transfer failed')) {
                toast.error('Zone transfer failed — make sure the domain is using INWX nameservers and a DNS zone exists.');
                setExportData(null);
            } else {
                setExportData(zoneText);
                toast.success('Zone exported');
            }
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to export zone');
        } finally {
            setIsExporting(false);
        }
    };

    const handleDownloadExport = () => {
        if (!exportData) return;
        const blob = new Blob([exportData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${domainName}.zone`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // --- Zone Delete ---
    const handleDeleteZone = async () => {
        if (deleteConfirmText !== domainName) {
            toast.error('Please type the domain name to confirm');
            return;
        }
        try {
            await deleteZoneMut(domainName).unwrap();
            toast.success('DNS zone deleted permanently');
            setConfirmDelete(false);
            setDeleteConfirmText('');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to delete zone');
        }
    };

    // ==================== LOADING STATE ====================
    if (isLoadingZone) {
        return (
            <div className="flex flex-col items-center justify-center py-16 animate-in fade-in">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600 mb-3" />
                <p className="text-neutral-500">Loading zone information...</p>
            </div>
        );
    }

    // ==================== SUB-NAVIGATION ====================
    const sections = [
        { id: 'nameservers', label: 'Nameservers', icon: Server },
        { id: 'nssets', label: 'NS Sets', icon: Layers },
        { id: 'export', label: 'Export', icon: FileText },
        { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Zone Info Header */}
            <Card className="border-none shadow-soft-md bg-gradient-to-r from-primary-50 to-white">
                <CardBody className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-100 rounded-xl">
                            <Server className="w-6 h-6 text-primary-700" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-neutral-900">DNS Zone: {domainName}</h2>
                            <div className="flex items-center gap-3 text-sm text-neutral-500 mt-0.5">
                                {zoneData?.roId && <span>Zone ID: <span className="font-mono">{zoneData.roId}</span></span>}
                                {zoneData?.type && (
                                    <>
                                        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                                        <Badge variant="neutral" className="text-xs">{zoneData.type}</Badge>
                                    </>
                                )}
                                <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                                <span>{records.length} record{records.length !== 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => refetchZone()}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                </CardBody>
            </Card>

            {/* Sub-Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {sections.map(s => {
                    const Icon = s.icon;
                    const isActive = activeSection === s.id;
                    return (
                        <button
                            key={s.id}
                            onClick={() => setActiveSection(s.id)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                                isActive
                                    ? s.id === 'danger'
                                        ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                                        : "bg-primary-50 text-primary-700 ring-1 ring-primary-200"
                                    : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
                            )}
                        >
                            <Icon className={cn("w-4 h-4", isActive && s.id === 'danger' ? "text-red-500" : "")} />
                            {s.label}
                        </button>
                    );
                })}
            </div>

            {/* ==================== NAMESERVERS SECTION ==================== */}
            {activeSection === 'nameservers' && (
                <Card className="border-none shadow-soft-md">
                    <CardHeader className="border-b border-neutral-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Nameservers</h3>
                            <p className="text-sm text-neutral-500">Configure which nameservers handle DNS for this domain.</p>
                        </div>
                        {!editingNs && (
                            <Button variant="outline" size="sm" onClick={handleStartEditNs}>
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        )}
                    </CardHeader>
                    <CardBody>
                        {/* NS type indicator */}
                        <div className={cn(
                            "p-4 rounded-xl border mb-6 flex gap-3",
                            isInwxNs ? "bg-primary-50 border-primary-100" : "bg-amber-50 border-amber-100"
                        )}>
                            <div className={cn("p-1.5 rounded-lg shadow-sm h-fit", isInwxNs ? "bg-white text-primary-600" : "bg-white text-amber-600")}>
                                <Server className="w-5 h-5" />
                            </div>
                            <div className="text-sm">
                                <p className="font-semibold" style={{ color: isInwxNs ? 'var(--color-primary-900, #1a1a2e)' : '#92400e' }}>
                                    {isInwxNs ? 'Using Default Nameservers' : 'Using Custom Nameservers'}
                                </p>
                                <p className="opacity-80 mt-0.5" style={{ color: isInwxNs ? 'var(--color-primary-900, #1a1a2e)' : '#92400e' }}>
                                    {isInwxNs
                                        ? 'DNS is being managed automatically via INWX.'
                                        : 'DNS is pointed to custom nameservers.'}
                                </p>
                            </div>
                        </div>

                        {editingNs ? (
                            <div className="space-y-4">
                                {nsValues.map((ns, i) => (
                                    <div key={i} className="flex items-end gap-3">
                                        <div className="flex-1">
                                            <Input
                                                label={i === 0 ? "Nameservers" : ""}
                                                value={ns}
                                                placeholder={`ns${i + 1}.example.com`}
                                                onChange={(e) => {
                                                    const updated = [...nsValues];
                                                    updated[i] = e.target.value;
                                                    setNsValues(updated);
                                                }}
                                            />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="md"
                                            className="mb-1 text-neutral-400 hover:text-red-500 hover:bg-red-50"
                                            onClick={() => setNsValues(nsValues.filter((_, idx) => idx !== i))}
                                            disabled={nsValues.length <= 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-dashed border-2 text-neutral-500 hover:text-primary-600 hover:border-primary-200"
                                    onClick={() => setNsValues([...nsValues, ''])}
                                    disabled={nsValues.length >= 6}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Nameserver
                                </Button>
                                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                                    <Button variant="ghost" onClick={() => setEditingNs(false)}>Cancel</Button>
                                    <Button variant="primary" onClick={handleSaveNs} isLoading={isUpdatingZone}>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Nameservers
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {nsRecords.length > 0 ? nsRecords.map((ns, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-xs font-bold text-primary-700">
                                            NS{i + 1}
                                        </div>
                                        <span className="text-sm font-mono text-neutral-700">{ns}</span>
                                    </div>
                                )) : (
                                    <p className="text-neutral-500 text-sm text-center py-4">No nameservers found in zone records.</p>
                                )}
                            </div>
                        )}
                    </CardBody>
                </Card>
            )}



            {/* ==================== NS SETS SECTION ==================== */}
            {activeSection === 'nssets' && (
                <Card className="border-none shadow-soft-md">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Nameserver Sets</h3>
                            <p className="text-sm text-neutral-500">Reusable nameserver configurations you can apply to any domain.</p>
                        </div>
                        <Button
                            variant={showAddNsSet ? "outline" : "primary"}
                            size="sm"
                            onClick={() => setShowAddNsSet(!showAddNsSet)}
                        >
                            {showAddNsSet ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" />Create NS Set</>}
                        </Button>
                    </CardHeader>
                    <CardBody>
                        {/* Create NS Set Form */}
                        {showAddNsSet && (
                            <form onSubmit={handleCreateNsSet} className="mb-6 p-6 bg-neutral-50 border border-neutral-100 rounded-2xl animate-in zoom-in-95 duration-200">
                                <h4 className="text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">New NS Set</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-500 ml-1">Set Name</label>
                                        <Input
                                            placeholder="e.g. My Custom NS"
                                            value={newNsSet.name}
                                            onChange={(e) => setNewNsSet({ ...newNsSet, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-500 ml-1">Type</label>
                                        <select
                                            value={newNsSet.type}
                                            onChange={(e) => setNewNsSet({ ...newNsSet, type: e.target.value })}
                                            className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                                        >
                                            <option value="primary">Primary</option>
                                            <option value="secondary">Secondary</option>
                                            <option value="slave">Slave</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-4">
                                    <label className="text-xs font-semibold text-neutral-500 ml-1">Nameservers</label>
                                    {newNsSet.ns.map((ns, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Input
                                                placeholder={`ns${i + 1}.example.com`}
                                                value={ns}
                                                onChange={(e) => {
                                                    const updated = [...newNsSet.ns];
                                                    updated[i] = e.target.value;
                                                    setNewNsSet({ ...newNsSet, ns: updated });
                                                }}
                                            />
                                            {newNsSet.ns.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setNewNsSet({ ...newNsSet, ns: newNsSet.ns.filter((_, idx) => idx !== i) })}
                                                    className="text-neutral-400 hover:text-red-500 p-1"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="border-dashed border-2"
                                        onClick={() => setNewNsSet({ ...newNsSet, ns: [...newNsSet.ns, ''] })}
                                        disabled={newNsSet.ns.length >= 6}
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Add NS
                                    </Button>
                                </div>
                                <div className="mb-4 space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-500 ml-1">Hostmaster Email</label>
                                    <Input
                                        placeholder="admin@example.com"
                                        value={newNsSet.hostmaster}
                                        onChange={(e) => setNewNsSet({ ...newNsSet, hostmaster: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <Button type="button" variant="ghost" onClick={() => setShowAddNsSet(false)}>Cancel</Button>
                                    <Button type="submit" variant="primary" isLoading={isCreatingNsSet}>Create NS Set</Button>
                                </div>
                            </form>
                        )}

                        {/* NS Sets List */}
                        {isLoadingNsSets ? (
                            <div className="flex flex-col items-center gap-2 py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                                <p className="text-neutral-500 text-sm">Loading NS sets...</p>
                            </div>
                        ) : nsSets && nsSets.length > 0 ? (
                            <div className="space-y-4">
                                {nsSets.map((nsSet) => {
                                    // System-managed sets: no name property, or roId matches the set id (default INWX sets)
                                    const isSystemSet = !nsSet.name;
                                    return (
                                        <div key={nsSet.id} className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-colors">
                                            {editingNsSetId === nsSet.id ? (
                                                /* Edit Mode */
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-semibold text-neutral-500 ml-1">Set Name</label>
                                                            <Input value={editNsSetData.name} onChange={(e) => setEditNsSetData({ ...editNsSetData, name: e.target.value })} />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-semibold text-neutral-500 ml-1">Type</label>
                                                            <select
                                                                value={editNsSetData.type || 'primary'}
                                                                onChange={(e) => setEditNsSetData({ ...editNsSetData, type: e.target.value })}
                                                                className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                                                            >
                                                                <option value="primary">Primary</option>
                                                                <option value="secondary">Secondary</option>
                                                                <option value="slave">Slave</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-semibold text-neutral-500 ml-1">Nameservers</label>
                                                        {editNsSetData.ns.map((ns, i) => (
                                                            <div key={i} className="flex items-center gap-2">
                                                                <Input value={ns} onChange={(e) => {
                                                                    const updated = [...editNsSetData.ns];
                                                                    updated[i] = e.target.value;
                                                                    setEditNsSetData({ ...editNsSetData, ns: updated });
                                                                }} />
                                                                {editNsSetData.ns.length > 1 && (
                                                                    <button type="button" onClick={() => setEditNsSetData({ ...editNsSetData, ns: editNsSetData.ns.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 p-1">
                                                                        <X className="w-4 h-4" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                        <Button type="button" variant="outline" size="sm" className="border-dashed" onClick={() => setEditNsSetData({ ...editNsSetData, ns: [...editNsSetData.ns, ''] })}>
                                                            <Plus className="w-3 h-3 mr-1" /> Add
                                                        </Button>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-semibold text-neutral-500 ml-1">Hostmaster</label>
                                                        <Input value={editNsSetData.hostmaster} onChange={(e) => setEditNsSetData({ ...editNsSetData, hostmaster: e.target.value })} />
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => setEditingNsSetId(null)}>Cancel</Button>
                                                        <Button variant="primary" size="sm" onClick={() => handleSaveNsSet(nsSet.id)}>Save</Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Display Mode */
                                                <div>
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-bold text-neutral-900">{nsSet.name || `NS Set #${nsSet.id}`}</h4>
                                                                {isSystemSet && (
                                                                    <Badge variant="neutral" className="text-[10px] bg-amber-100 text-amber-700 border-none">System</Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-neutral-500 mt-0.5">
                                                                {nsSet.type && <>Type: <span className="font-mono capitalize">{nsSet.type}</span></>}
                                                                {!nsSet.type && <>ID: <span className="font-mono">{nsSet.roId || nsSet.id}</span></>}
                                                                {nsSet.hostmaster && <> · Hostmaster: <span className="font-mono">{nsSet.hostmaster}</span></>}
                                                            </p>
                                                            {isSystemSet && (
                                                                <p className="text-[11px] text-amber-600 mt-1">Read-only — this is a default INWX nameserver set.</p>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Button variant="primary" size="sm" onClick={() => handleApplyNsSet(nsSet)} title="Apply to this domain">
                                                                Apply
                                                            </Button>
                                                            {!isSystemSet && (
                                                                <>
                                                                    <button onClick={() => handleStartEditNsSet(nsSet)} className="text-neutral-400 hover:text-primary-600 p-1.5" title="Edit">
                                                                        <Edit2 className="w-4 h-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteNsSet(nsSet.id)}
                                                                        disabled={deletingNsSetId === nsSet.id}
                                                                        className="text-neutral-400 hover:text-red-600 p-1.5 disabled:opacity-50"
                                                                        title="Delete"
                                                                    >
                                                                        {deletingNsSetId === nsSet.id
                                                                            ? <Loader2 className="w-4 h-4 animate-spin" />
                                                                            : <Trash2 className="w-4 h-4" />}
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {nsSet.ns?.map((ns, i) => (
                                                            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-neutral-200 text-xs font-mono text-neutral-600">
                                                                <Server className="w-3 h-3 text-primary-500" />
                                                                {ns}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Layers className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                                <p className="text-neutral-500 text-sm mb-1">No NS Sets created yet.</p>
                                <p className="text-neutral-400 text-xs">Create reusable nameserver configurations to apply across domains.</p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            )}

            {/* ==================== EXPORT SECTION ==================== */}
            {activeSection === 'export' && (
                <Card className="border-none shadow-soft-md">
                    <CardHeader className="border-b border-neutral-100 pb-4">
                        <h3 className="text-lg font-bold text-neutral-900">Zone Export</h3>
                        <p className="text-sm text-neutral-500">Export your DNS zone in BIND format for backup or migration.</p>
                    </CardHeader>
                    <CardBody>
                        <div className="flex items-center gap-3 mb-6">
                            <Button variant="primary" onClick={handleExport} isLoading={isExporting}>
                                <Download className="w-4 h-4 mr-2" />
                                Export Zone
                            </Button>
                            {exportData && (
                                <Button variant="outline" onClick={handleDownloadExport}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Download .zone File
                                </Button>
                            )}
                            {exportData && (
                                <Button variant="outline" onClick={() => { navigator.clipboard.writeText(exportData); toast.success('Copied to clipboard'); }}>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy
                                </Button>
                            )}
                        </div>
                        {exportData && (
                            <div className="relative">
                                <pre className="p-4 bg-neutral-900 text-green-400 rounded-xl text-xs font-mono overflow-x-auto max-h-[500px] overflow-y-auto leading-relaxed whitespace-pre-wrap">
                                    {exportData}
                                </pre>
                            </div>
                        )}
                    </CardBody>
                </Card>
            )}

            {/* ==================== DANGER ZONE ==================== */}
            {activeSection === 'danger' && (
                <Card className="border-none shadow-soft-md border-t-4 border-t-red-500">
                    <CardHeader className="border-b border-neutral-100 pb-4">
                        <h3 className="text-lg font-bold text-red-700 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Danger Zone
                        </h3>
                        <p className="text-sm text-neutral-500">Irreversible actions that permanently affect your DNS zone.</p>
                    </CardHeader>
                    <CardBody>
                        <div className="p-5 bg-red-50 rounded-xl border border-red-100">
                            <h4 className="font-bold text-red-800 mb-1">Delete DNS Zone</h4>
                            <p className="text-sm text-red-700 mb-4">
                                This will permanently delete <span className="font-mono font-bold">{domainName}</span>'s DNS zone and <strong>ALL</strong> associated records. This action cannot be undone.
                            </p>
                            {!confirmDelete ? (
                                <Button variant="danger" size="sm" onClick={() => setConfirmDelete(true)}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Zone
                                </Button>
                            ) : (
                                <div className="space-y-3 p-4 bg-white rounded-xl border border-red-200">
                                    <p className="text-sm text-red-700 font-medium">
                                        Type <span className="font-mono font-bold">{domainName}</span> to confirm:
                                    </p>
                                    <Input
                                        value={deleteConfirmText}
                                        onChange={(e) => setDeleteConfirmText(e.target.value)}
                                        placeholder={domainName}
                                        className="font-mono"
                                    />
                                    <div className="flex gap-3">
                                        <Button variant="ghost" size="sm" onClick={() => { setConfirmDelete(false); setDeleteConfirmText(''); }}>
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={handleDeleteZone}
                                            isLoading={isDeletingZone}
                                            disabled={deleteConfirmText !== domainName}
                                        >
                                            Permanently Delete Zone
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardBody>
                </Card>
            )}
        </div>
    );
};

export default NameserverManagement;
