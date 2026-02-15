import { useState } from 'react';
import { cn } from '../../lib/utils';
import {
    Zap,
    Activity,
    Trash2,
    Key,
    Info,
    History,
    Plus,
    ShoppingCart,
    Loader2,
    X,
    CheckCircle,
    AlertCircle,
    Globe,
    ExternalLink,
    RefreshCw,
    Copy,
    BookOpen
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import {
    useListDynDnsQuery,
    useCreateDynDnsMutation,
    useUpdateDynDnsMutation,
    useDeleteDynDnsMutation,
    useGetDynDnsInfoMutation,
    useChangeDynDnsPasswordMutation,
    useViewDynDnsLogsMutation,
    useListDynDnsSubscriptionsQuery,
    useCreateDynDnsSubscriptionMutation,
    useCancelDynDnsSubscriptionMutation,
    useListDynDnsProductsQuery,
} from '../../redux/features/dyndns/dyndnsApi';
import { addToCart } from '../../redux/slices/cartSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

const DynDNS = () => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState('records'); // 'records', 'subscriptions', 'products'

    // Queries
    const { data: records, isLoading: isLoadingRecords, refetch: refetchRecords } = useListDynDnsQuery();
    const { data: subscriptions, isLoading: isLoadingSubscriptions, refetch: refetchSubscriptions } = useListDynDnsSubscriptionsQuery();
    const { data: products, isLoading: isLoadingProducts } = useListDynDnsProductsQuery();

    // Mutations
    const [createDynDns, { isLoading: isCreating }] = useCreateDynDnsMutation();
    const [updateDynDns, { isLoading: isUpdating }] = useUpdateDynDnsMutation();
    const [deleteDynDns] = useDeleteDynDnsMutation();
    const [getInfo] = useGetDynDnsInfoMutation();
    const [changePassword] = useChangeDynDnsPasswordMutation();
    const [viewLogs] = useViewDynDnsLogsMutation();
    const [cancelSubscription] = useCancelDynDnsSubscriptionMutation();

    // Modals state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [purchaseDomain, setPurchaseDomain] = useState('');
    const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [recordInfo, setRecordInfo] = useState(null);
    const [recordLogs, setRecordLogs] = useState([]);

    // Form states
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        hostname: '',
        content: '',
        ttl: 300
    });

    const handleCreateRecord = async (e) => {
        e.preventDefault();
        try {
            await createDynDns({
                username: formData.username,
                password: formData.password,
                hostname: [formData.hostname] // API expects an array
            }).unwrap();
            addToast('success', 'Account Created', 'DynDNS account and record created successfully.');
            setIsCreateModalOpen(false);
            setFormData({ username: '', password: '', hostname: '', content: '', ttl: 300 });
        } catch (err) {
            addToast('error', 'Creation Failed', err?.data?.message || 'Failed to create record.');
        }
    };

    const handleUpdateRecord = async (e) => {
        e.preventDefault();
        try {
            await updateDynDns({
                id: selectedRecord.id,
                content: formData.content,
                ttl: formData.ttl
            }).unwrap();
            addToast('success', 'Record Updated', 'Record updated successfully.');
            setIsEditModalOpen(false);
        } catch (err) {
            addToast('error', 'Update Failed', err?.data?.message || 'Failed to update record.');
        }
    };

    const handleDeleteRecord = async (id) => {
        if (!window.confirm('Are you sure you want to delete this DynDNS record?')) return;
        try {
            await deleteDynDns({ id }).unwrap();
            addToast('success', 'Record Deleted', 'Record removed successfully.');
        } catch (err) {
            addToast('error', 'Deletion Failed', err?.data?.message || 'Failed to delete record.');
        }
    };

    const handleViewInfo = async (id) => {
        try {
            const res = await getInfo({ id }).unwrap();
            setRecordInfo(res.data);
            setIsInfoModalOpen(true);
        } catch (err) {
            addToast('error', 'Error', 'Failed to fetch record info.');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            await changePassword({
                id: selectedRecord.id,
                password: formData.password
            }).unwrap();
            addToast('success', 'Password Changed', 'DynDNS password updated.');
            setIsPasswordModalOpen(false);
            setFormData({ ...formData, password: '' });
        } catch (err) {
            addToast('error', 'Error', 'Failed to change password.');
        }
    };

    const handleViewLogs = async (id) => {
        try {
            const res = await viewLogs({ id }).unwrap();
            setRecordLogs(res.data?.log || []);
            setIsLogsModalOpen(true);
        } catch (err) {
            addToast('error', 'Error', 'Failed to fetch logs.');
        }
    };

    const handleCancelSubscription = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this subscription?')) return;
        try {
            await cancelSubscription({ id }).unwrap();
            addToast('success', 'Cancelled', 'Subscription cancelled successfully.');
            refetchSubscriptions();
        } catch (err) {
            addToast('error', 'Error', 'Failed to cancel subscription.');
        }
    };

    const handleAddToCart = () => {
        if (!purchaseDomain) {
            addToast('error', 'Domain Required', 'Please enter a domain name for your DynDNS subscription.');
            return;
        }

        const productId = selectedProduct.productId || selectedProduct.id;
        const productName = selectedProduct.product || String(selectedProduct.productId || '').replace(/-/g, ' ') || `Plan #${productId}`;

        dispatch(addToCart({
            id: `dyndns-${productId}-${purchaseDomain}`,
            name: `DynDNS: ${productName}`,
            domain: purchaseDomain,
            price: selectedProduct.price,
            year: 1,
            type: 'dyndns',
            productCode: productId
        }));

        addToast('success', 'Added to Cart', 'DynDNS plan added to your cart.');
        setIsPurchaseModalOpen(false);
        setPurchaseDomain('');
        setSelectedProduct(null);
    };

    const openPurchaseModal = (product) => {
        setSelectedProduct(product);
        setIsPurchaseModalOpen(true);
    };

    const formatApiDate = (dateObj) => {
        if (!dateObj) return 'N/A';
        const dateStr = dateObj.scalar || dateObj;
        try {
            return new Date(dateStr).toLocaleDateString();
        } catch (e) {
            return dateStr;
        }
    };

    const tabs = [
        { id: 'records', label: 'My Records', icon: Activity },
        { id: 'subscriptions', label: 'Subscriptions', icon: Key },
        { id: 'products', label: 'New Plans', icon: ShoppingCart },
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Dynamic DNS</h1>
                    <p className="text-neutral-500 mt-1">Manage hostnames with dynamic IP addresses.</p>
                </div>
                {activeTab === 'records' && (
                    <Button
                        variant="primary"
                        className="shadow-lg shadow-primary-500/20"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Record
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-neutral-200 mb-6 gap-8 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 py-4 border-b-2 transition-all font-medium whitespace-nowrap",
                                isActive
                                    ? "border-primary-600 text-primary-600"
                                    : "border-transparent text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
                {activeTab === 'records' && (
                    <Card className="border-none shadow-soft-md">
                        <CardBody className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold text-xs border-b border-neutral-100">
                                        <tr>
                                            <th className="px-6 py-4">ID</th>
                                            <th className="px-6 py-4">Hostname</th>
                                            <th className="px-6 py-4">Current Entry</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {isLoadingRecords ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-12 text-center text-neutral-400">
                                                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary-500" />
                                                    Fetching records...
                                                </td>
                                            </tr>
                                        ) : Array.isArray(records) && records.length > 0 ? (
                                            records.map((record) => (
                                                <tr key={record.id} className="group hover:bg-neutral-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-mono text-xs text-neutral-400">#{record.id}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Globe className="w-4 h-4 text-primary-500" />
                                                            <span className="font-bold text-neutral-900">{record.hostname}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-neutral-500 font-mono text-xs">A: Dynamic</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Button variant="ghost" size="sm" onClick={() => {
                                                                setSelectedRecord(record);
                                                                setIsSetupModalOpen(true);
                                                            }} title="Setup Guide">
                                                                <BookOpen className="w-4 h-4 text-primary-500" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm" onClick={() => handleViewInfo(record.id)} title="Info">
                                                                <Info className="w-4 h-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm" onClick={() => handleViewLogs(record.id)} title="Logs">
                                                                <History className="w-4 h-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm" onClick={() => {
                                                                setSelectedRecord(record);
                                                                setIsPasswordModalOpen(true);
                                                            }} title="Change Password">
                                                                <Key className="w-4 h-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm" onClick={() => {
                                                                setSelectedRecord(record);
                                                                setFormData({ content: '', ttl: 300 });
                                                                setIsEditModalOpen(true);
                                                            }} title="Edit">
                                                                <RefreshCw className="w-4 h-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm" onClick={() => handleDeleteRecord(record.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-12 text-center text-neutral-500">
                                                    No DynDNS records found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                )}

                {activeTab === 'subscriptions' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoadingSubscriptions ? (
                            <div className="col-span-full py-12 text-center text-neutral-400">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                                Loading subscriptions...
                            </div>
                        ) : Array.isArray(subscriptions) && subscriptions.length > 0 ? (
                            subscriptions.map((sub) => (
                                <Card key={sub.id} className="border-none shadow-soft hover:shadow-soft-md transition-all">
                                    <CardBody className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                                                <Zap className="w-6 h-6" />
                                            </div>
                                            <Badge variant={sub.paidUntil?.timestamp > Date.now() / 1000 ? 'success' : 'neutral'}>
                                                {sub.paidUntil?.timestamp > Date.now() / 1000 ? 'Active' : 'Expired'}
                                            </Badge>
                                        </div>

                                        <h3 className="font-bold text-lg text-neutral-900 truncate">{sub.product || 'DynDNS Account'}</h3>
                                        <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider font-semibold">Subscription #{sub.id}</p>

                                        <div className="mt-6 space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-500">Price</span>
                                                <span className="font-bold text-neutral-900">${sub.price?.toFixed(2)} {sub.currency}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-500">Accounts</span>
                                                <span className="font-bold text-neutral-900">{sub.accountsAmount}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-500">Created</span>
                                                <span className="font-bold text-neutral-900">{formatApiDate(sub.createdAt)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm pt-2 border-t border-neutral-50">
                                                <span className="text-neutral-500">Paid Until</span>
                                                <span className="font-bold text-primary-600">{formatApiDate(sub.paidUntil)}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full text-red-500 border-red-100 hover:bg-red-50 hover:border-red-200"
                                                onClick={() => handleCancelSubscription(sub.id)}
                                            >
                                                Cancel Subscription
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-neutral-200 text-neutral-500">
                                You don't have any active DynDNS subscriptions.
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoadingProducts ? (
                            <div className="col-span-full py-12 text-center text-neutral-400">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                                Loading products...
                            </div>
                        ) : Array.isArray(products) && products.length > 0 ? (
                            products.map((product) => (
                                <Card key={product.id} className="border-none shadow-soft-md flex flex-col hover:scale-[1.02] transition-transform">
                                    <CardBody className="p-8 flex flex-col h-full">
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-neutral-900 mb-2 capitalize">
                                                {product.product || String(product.productId || '').replace(/-/g, ' ') || `Plan #${product.id}`}
                                            </h3>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-black text-primary-600">${product.price}</span>
                                                <span className="text-sm text-neutral-400">/year</span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-1">
                                            <li className="flex items-center gap-2 text-sm text-neutral-600 font-bold">
                                                <CheckCircle className="w-4 h-4 text-success-500" />
                                                {product.accountsAmount} {product.accountsAmount > 1 ? 'Accounts' : 'Account'} Included
                                            </li>
                                            <li className="flex items-center gap-2 text-sm text-neutral-600">
                                                <CheckCircle className="w-4 h-4 text-success-500" />
                                                Update via API or Client
                                            </li>
                                            <li className="flex items-center gap-2 text-sm text-neutral-600">
                                                <CheckCircle className="w-4 h-4 text-success-500" />
                                                300s TTL (Configurable)
                                            </li>
                                        </ul>

                                        <Button
                                            variant="primary"
                                            className="w-full shadow-lg shadow-primary-500/20"
                                            onClick={() => openPurchaseModal(product)}
                                        >
                                            Upgrade Now
                                        </Button>
                                    </CardBody>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-neutral-200 text-neutral-500">
                                No DynDNS plans available at the moment.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modals */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create DynDNS Account"
                description="Configure a new DynDNS account and primary hostname."
            >
                <form onSubmit={handleCreateRecord} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Username</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. jdoe_home"
                            className="w-full h-11 px-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            placeholder="Minimum 8 characters"
                            className="w-full h-11 px-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Primary Hostname</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. home.example.com"
                            className="w-full h-11 px-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all"
                            value={formData.hostname}
                            onChange={(e) => setFormData({ ...formData, hostname: e.target.value })}
                        />
                    </div>
                    <Button variant="primary" className="w-full h-11 mt-4" size="lg" isLoading={isCreating}>Create Account</Button>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Update Record"
                description={`Update configuration for ${selectedRecord?.hostname}`}
            >
                <form onSubmit={handleUpdateRecord} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">IP Address (Content)</label>
                        <input
                            type="text"
                            required
                            className="w-full h-11 px-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">TTL (Seconds)</label>
                        <input
                            type="number"
                            className="w-full h-11 px-4 rounded-xl border border-neutral-200 outline-none"
                            value={formData.ttl}
                            onChange={(e) => setFormData({ ...formData, ttl: parseInt(e.target.value) })}
                        />
                    </div>
                    <Button variant="primary" className="w-full h-11 mt-4" size="lg" isLoading={isUpdating}>Save Changes</Button>
                </form>
            </Modal>

            {/* Password Modal */}
            <Modal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                title="Change DynDNS Password"
                description={`Set a new client password for ${selectedRecord?.hostname}`}
            >
                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">New Password</label>
                        <input
                            type="password"
                            required
                            className="w-full h-11 px-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <Button variant="primary" className="w-full h-11 mt-4" size="lg">Update Password</Button>
                </form>
            </Modal>

            {/* Info Modal */}
            <Modal
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                title="Record Information"
                size="md"
            >
                {recordInfo && (
                    <div className="space-y-4 py-2">
                        {[
                            { label: 'Hostname', value: recordInfo.hostname },
                            { label: 'Type', value: recordInfo.type },
                            { label: 'Content', value: recordInfo.content },
                            { label: 'TTL', value: recordInfo.ttl },
                            { label: 'Last Update', value: recordInfo.lastUpdate },
                        ].map((item, idx) => (
                            <div key={idx} className="flex justify-between py-2 border-b border-neutral-50 last:border-0">
                                <span className="text-neutral-500 text-sm font-medium">{item.label}</span>
                                <span className="text-neutral-900 font-mono text-xs">{item.value}</span>
                            </div>
                        ))}
                        <div className="pt-4">
                            <Button variant="outline" className="w-full" onClick={() => setIsInfoModalOpen(false)}>Close</Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Logs Modal */}
            <Modal
                isOpen={isLogsModalOpen}
                onClose={() => setIsLogsModalOpen(false)}
                title="Update History"
                size="lg"
            >
                <div className="max-h-[400px] overflow-y-auto pr-1">
                    {recordLogs.length > 0 ? (
                        <div className="space-y-3">
                            {recordLogs.map((log, idx) => (
                                <div key={idx} className="p-4 bg-neutral-50 rounded-xl flex items-center justify-between border border-neutral-100">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            log.status === 'success' ? "bg-success-500" : "bg-red-500"
                                        )} />
                                        <div>
                                            <p className="text-sm font-bold text-neutral-900">{log.ip}</p>
                                            <p className="text-[10px] text-neutral-500">{log.timestamp}</p>
                                        </div>
                                    </div>
                                    <Badge variant={log.status === 'success' ? 'success' : 'error'} size="sm">
                                        {log.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-neutral-500">
                            No update logs found for this record.
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <Button variant="outline" className="w-full" onClick={() => setIsLogsModalOpen(false)}>Done</Button>
                </div>
            </Modal>

            <Modal
                isOpen={isPurchaseModalOpen}
                onClose={() => {
                    setIsPurchaseModalOpen(false);
                    setPurchaseDomain('');
                }}
                title="Configure DynDNS Subscription"
                description={`Enter the domain you want to use with ${selectedProduct?.product || String(selectedProduct?.productId || '').replace(/-/g, ' ') || 'this plan'}.`}
            >
                <div className="space-y-4 pt-2">
                    <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 mb-6">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-primary-700 font-medium">Selected Plan</span>
                            <span className="text-sm font-bold text-primary-900">${selectedProduct?.price}/year</span>
                        </div>
                        <p className="text-primary-900 font-bold">{selectedProduct?.product || String(selectedProduct?.productId || '').replace(/-/g, ' ') || 'DynDNS Plan'}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Domain Name</label>
                        <input
                            type="text"
                            value={purchaseDomain}
                            onChange={(e) => setPurchaseDomain(e.target.value)}
                            placeholder="e.g. yourprofile.com"
                            className="w-full h-11 px-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium"
                            autoFocus
                        />
                        <p className="mt-2 text-xs text-neutral-500">
                            This domain will be associated with your DynDNS account on INWX.
                        </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            variant="ghost"
                            className="flex-1"
                            onClick={() => setIsPurchaseModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="flex-1"
                            onClick={handleAddToCart}
                            disabled={!purchaseDomain}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={isSetupModalOpen}
                onClose={() => setIsSetupModalOpen(false)}
                title="DynDNS Setup Guide"
                description={`How to configure ${selectedRecord?.hostname} on your devices.`}
                size="lg"
            >
                <div className="space-y-6 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Update URL (NIC Protocol)</span>
                            <div className="flex items-center justify-between mt-1">
                                <code className="text-sm font-mono text-primary-600 truncate mr-2">https://api.scandic-domain.com/dyndns/nic/update</code>
                                <Button variant="ghost" size="sm" onClick={() => {
                                    navigator.clipboard.writeText("https://api.scandic-domain.com/dyndns/nic/update");
                                    addToast('success', 'Copied', 'URL copied to clipboard');
                                }}>
                                    <Copy className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                        <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Username / Hostname</span>
                            <div className="flex items-center justify-between mt-1">
                                <code className="text-sm font-mono text-neutral-900 truncate mr-2">{selectedRecord?.hostname}</code>
                                <Button variant="ghost" size="sm" onClick={() => {
                                    navigator.clipboard.writeText(selectedRecord?.hostname);
                                    addToast('success', 'Copied', 'Hostname copied to clipboard');
                                }}>
                                    <Copy className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-neutral-900 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-warning-500" />
                            Configuration Examples
                        </h4>

                        <div className="bg-neutral-900 rounded-2xl p-5 overflow-hidden">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-neutral-500 uppercase">DDClient Config (Linux)</span>
                                <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white" onClick={() => {
                                    const config = `protocol=dyndns2\nuse=web, web=checkip.dyndns.com\nserver=api.scandic-domain.com\nscript=/dyndns/nic/update\nlogin=${selectedRecord?.hostname}\npassword=YOUR_PASSWORD\n${selectedRecord?.hostname}`;
                                    navigator.clipboard.writeText(config);
                                    addToast('success', 'Copied', 'Config snippet copied');
                                }}>
                                    <Copy className="w-3 h-3" />
                                </Button>
                            </div>
                            <pre className="text-xs font-mono text-neutral-300 overflow-x-auto">
                                {`protocol=dyndns2
use=web, web=checkip.dyndns.com
server=api.scandic-domain.com
script=/dyndns/nic/update
login=${selectedRecord?.hostname}
password=YOUR_PASSWORD
${selectedRecord?.hostname}`}
                            </pre>
                        </div>

                        <div className="p-5 bg-primary-50 rounded-2xl border border-primary-100">
                            <h5 className="font-bold text-primary-900 text-sm mb-2">Router Setup (TP-Link, ASUS, etc.)</h5>
                            <ol className="text-sm text-primary-800 space-y-2 list-decimal list-inside">
                                <li>Log in to your router's admin panel.</li>
                                <li>Navigate to <b>Dynamic DNS</b> or <b>DDNS</b> settings.</li>
                                <li>Select <b>Custom</b> or <b>DynDNS</b> as the service provider.</li>
                                <li>Enter the Update URL, Hostname, and your DynDNS Password.</li>
                                <li>Save/Apply settings to start automatic updates.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button variant="primary" className="w-full h-11" onClick={() => setIsSetupModalOpen(false)}>Got it, thanks!</Button>
                    </div>
                </div>
            </Modal>
        </DashboardLayout >
    );
};

export default DynDNS;
