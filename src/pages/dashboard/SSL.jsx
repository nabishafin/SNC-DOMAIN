import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
    Shield,
    Lock,
    AlertTriangle,
    CheckCircle,
    Download,
    Plus,
    ShoppingCart,
    Loader2,
    AlertCircle,
    RefreshCw,
    Mail,
    Trash2,
    MoreVertical,
    History,
    FileSearch,
    Zap,
    Globe,
    Server,
    Verified,
    Check
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import {
    useGetSslProductsQuery,
    useLazyCheckSslEligibilityQuery,
    useListCertificatesQuery,
    useCancelSslOrderMutation,
    useReissueCertificateMutation,
    useRenewCertificateMutation,
    useResendApprovalEmailMutation,
    useSetAutorenewMutation,
    useGetSslNeededDataQuery,
    useViewSslLogQuery,
    useUpdateOrderMutation
} from '../../redux/features/ssl/sslApi';
import { addToCart } from '../../redux/slices/cartSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

const SSL = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addToast } = useToast();

    // UI state
    const [viewState, setViewState] = useState('LIST'); // LIST, STORE, CONFIGURE
    const [storeFilter, setStoreFilter] = useState('ALL');
    const [storeDomain, setStoreDomain] = useState('');

    // Configuration state
    const [configCertId, setConfigCertId] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [eligibility, setEligibility] = useState(null);
    const [csr, setCsr] = useState('');
    const [approverEmail, setApproverEmail] = useState('');
    const { data: sslProducts, isLoading: isLoadingProducts } = useGetSslProductsQuery();
    const { data: certificates, isLoading: isLoadingCerts } = useListCertificatesQuery();
    const [checkEligibility, { isFetching: isCheckingEligibility }] = useLazyCheckSslEligibilityQuery();

    // Lifecycle Mutations
    const [cancelOrder] = useCancelSslOrderMutation();
    const [reissueCertificate] = useReissueCertificateMutation();
    const [renewCertificate] = useRenewCertificateMutation();
    const [resendApproval] = useResendApprovalEmailMutation();
    const [updateAutorenew] = useSetAutorenewMutation();
    const [updateOrder] = useUpdateOrderMutation();

    // Configuration state handled above for cohesion

    // Lifecycle Modals
    const [selectedCert, setSelectedCert] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isReissueModalOpen, setIsReissueModalOpen] = useState(false);
    const [reissueCsr, setReissueCsr] = useState('');

    // Reset eligibility when domain changes
    useEffect(() => {
        setEligibility(null);
    }, [selectedDomain]);

    const handleCheckEligibility = async () => {
        if (!selectedDomain) {
            addToast('warning', 'Domain Required', 'Please enter a domain name.');
            return;
        }

        try {
            const result = await checkEligibility(selectedDomain).unwrap();
            setEligibility(result?.data || result);
            if (result?.success || result?.data?.eligible) {
                addToast('success', 'Domain Eligible', 'Your domain is ready for SSL registration.');
            } else {
                addToast('error', 'Ineligible Domain', result?.data?.reason || result?.reason || 'Eligibility check failed.');
            }
        } catch (err) {
            setEligibility(err?.data?.data || err?.data || { eligible: false, reason: 'Check failed' });
            addToast('error', 'Check Failed', err?.data?.message || 'Failed to verify domain eligibility.');
        }
    };

    const handleConfigureSSL = async () => {
        if (!configCertId || !selectedDomain || !csr || !approverEmail) {
            addToast('warning', 'Missing Details', 'Please complete all configuration fields.');
            return;
        }

        try {
            await updateOrder({
                id: configCertId,
                commonName: selectedDomain,
                csr: csr,
                validationMethod: 'EMAIL', // Default to EMAIL as per spec 3.2 example
                validationEmail: approverEmail
            }).unwrap();

            setViewState('LIST');
            addToast('success', 'Configuration Submitted', 'Your certificate configuration has been sent for validation.');
            setConfigCertId(null);
            setCsr('');
            setApproverEmail('');
            setSelectedDomain('');
        } catch (err) {
            addToast('error', 'Configuration Failed', err?.data?.message || 'Failed to submit configuration.');
        }
    };

    const handleCancelOrder = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this SSL order?')) return;
        try {
            await cancelOrder({ id }).unwrap();
            addToast('success', 'Order Cancelled', 'The SSL order has been successfully cancelled.');
        } catch (err) {
            addToast('error', 'Cancellation Failed', err?.data?.message || 'Failed to cancel order.');
        }
    };

    const handleResendApproval = async (id) => {
        try {
            await resendApproval({ id }).unwrap();
            addToast('success', 'Email Sent', 'The validation email has been resent to the approver.');
        } catch (err) {
            addToast('error', 'Request Failed', err?.data?.message || 'Failed to resend approval email.');
        }
    };

    const toggleAutorenew = async (id, currentStatus) => {
        try {
            await updateAutorenew({ id, autorenew: !currentStatus }).unwrap();
            addToast('success', 'Settings Updated', `Autorenewal has been ${!currentStatus ? 'enabled' : 'disabled'}.`);
        } catch (err) {
            addToast('error', 'Update Failed', err?.data?.message || 'Failed to update autorenewal settings.');
        }
    };

    const handleReissue = async () => {
        if (!reissueCsr) {
            addToast('warning', 'CSR Required', 'Please provide a new CSR for reissuance.');
            return;
        }

        try {
            await reissueCertificate({ id: selectedCert.id, csr: reissueCsr }).unwrap();
            addToast('success', 'Reissue Requested', 'Your certificate is being reissued with the new CSR.');
            setIsReissueModalOpen(false);
            setReissueCsr('');
        } catch (err) {
            addToast('error', 'Reissue Failed', err?.data?.message || 'Failed to reissue certificate.');
        }
    };

    const handleRenewal = async (id) => {
        if (!window.confirm('Renew this certificate for another year?')) return;
        try {
            await renewCertificate({ id, period: 1 }).unwrap();
            addToast('success', 'Renewal Initiated', 'Your certificate renewal has been processed.');
        } catch (err) {
            addToast('error', 'Renewal Failed', err?.data?.message || 'Failed to renew certificate.');
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart({
            id: `ssl-${product.id}-${Date.now()}`, // Unique ID for multiple purchases of same product
            name: `${product.name} (1 Year)`,
            price: product.price1Year,
            year: 1,
            type: 'ssl',
            productCode: product.code || product.id,
            brand: product.brand,
            productName: product.name,
            domain: storeDomain // Optional domain if provided
        }));
        addToast('success', 'Added to Cart', `${product.name} added to your checkout.`);
    };

    const handleStoreDomainCheck = async () => {
        if (!storeDomain) {
            addToast('warning', 'Domain Required', 'Please enter a domain name to check.');
            return;
        }

        try {
            const result = await checkEligibility(storeDomain).unwrap();
            if (result?.success || result?.data?.eligible) {
                addToast('success', 'Domain Eligible', 'Your domain is ready for SSL configuration.');
            } else {
                addToast('error', 'Ineligible Domain', result?.data?.reason || result?.reason || 'Check failed.');
            }
        } catch (err) {
            addToast('error', 'Check Failed', err?.data?.message || 'Failed to verify domain eligibility.');
        }
    };

    const getStatusBadge = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACTIVE':
                return <Badge variant="success">Active</Badge>;
            case 'WAIT_FOR_INPUT':
                return <Badge variant="warning">Action Required</Badge>;
            case 'PENDING':
                return <Badge variant="warning">Pending INWX</Badge>;
            case 'VALIDATING':
                return <Badge variant="primary">Validating</Badge>;
            case 'EXPIRED':
                return <Badge variant="error">Expired</Badge>;
            case 'CANCELLED':
                return <Badge variant="neutral">Cancelled</Badge>;
            default:
                return <Badge variant="neutral">{status || 'Unknown'}</Badge>;
        }
    };

    const filteredStoreProducts = sslProducts?.filter(p => {
        if (storeFilter === 'ALL') return true;
        return p.type === storeFilter;
    }) || [];

    const productTypes = ['ALL', ...new Set(sslProducts?.map(p => p.type) || [])];

    return (
        <DashboardLayout>
            {/* Header and Tab Navigation */}
            {viewState === 'LIST' || viewState === 'STORE' ? (
                <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-black text-neutral-900 tracking-tight">SSL Certificates</h1>
                            <p className="text-neutral-500 mt-1">Manage security certificates for your domains.</p>
                        </div>
                        {viewState === 'LIST' && (
                            <Button
                                variant="primary"
                                className="shadow-lg shadow-primary-500/20"
                                onClick={() => setViewState('STORE')}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                New Certificate
                            </Button>
                        )}
                    </div>

                    <div className="flex border-b border-neutral-200 mb-8 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => setViewState('LIST')}
                            className={cn(
                                "px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap",
                                viewState === 'LIST'
                                    ? "border-primary-500 text-primary-600 bg-primary-50/10"
                                    : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                            )}
                        >
                            My Certificates
                            {certificates?.length > 0 && (
                                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-neutral-100 text-[10px] text-neutral-500">
                                    {certificates.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setViewState('STORE')}
                            className={cn(
                                "px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap",
                                viewState === 'STORE'
                                    ? "border-primary-500 text-primary-600 bg-primary-50/10"
                                    : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                            )}
                        >
                            Get New Certificate
                        </button>
                    </div>
                </>
            ) : null}

            {viewState === 'LIST' && (
                <>
                    <Card className="border-none shadow-soft-md">
                        <CardBody className="p-0 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold text-xs border-b border-neutral-100">
                                        <tr>
                                            <th className="px-6 py-4">Brand</th>
                                            <th className="px-6 py-4">Product Name</th>
                                            <th className="px-6 py-4">Domain</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Created</th>
                                            <th className="px-6 py-4">Expires</th>
                                            <th className="px-6 py-4 text-center">Auto Renew</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {isLoadingCerts ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-neutral-400">
                                                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                                    Loading certificates...
                                                </td>
                                            </tr>
                                        ) : Array.isArray(certificates) && certificates.length > 0 ? (
                                            certificates.map((cert) => (
                                                <tr key={cert.id} className="group hover:bg-neutral-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-neutral-900">{cert.brand}</td>
                                                    <td className="px-6 py-4 text-neutral-600 font-medium">{cert.type || cert.productName || 'SSL Certificate'}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={cn(
                                                            "font-mono text-xs",
                                                            cert.commonName ? "text-neutral-900 font-bold" : "text-neutral-400 italic"
                                                        )}>
                                                            {cert.commonName || 'not configured'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {getStatusBadge(cert.status)}
                                                    </td>
                                                    <td className="px-6 py-4 text-neutral-500 font-medium whitespace-nowrap text-xs">
                                                        {new Date(cert.createdAt || cert.crDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-neutral-500 font-medium whitespace-nowrap text-xs">
                                                        {cert.expirationDate ? new Date(cert.expirationDate).toLocaleDateString() : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            onClick={() => toggleAutorenew(cert.id, cert.autorenew)}
                                                            className={cn(
                                                                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                                                                cert.autorenew ? "bg-primary-600" : "bg-neutral-200"
                                                            )}
                                                            title={cert.autorenew ? "Auto-renewal is ON" : "Auto-renewal is OFF"}
                                                        >
                                                            <span className={cn(
                                                                "pointer-events-none block h-3.5 w-3.5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                                                                cert.autorenew ? "translate-x-4.5" : "translate-x-0.5"
                                                            )} />
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end items-center gap-2">
                                                            {(cert.status === 'WAIT_FOR_INPUT' || !cert.commonName) ? (
                                                                <Button
                                                                    variant="primary"
                                                                    size="sm"
                                                                    className="h-8 text-[10px] px-3 font-bold uppercase tracking-wide"
                                                                    onClick={() => {
                                                                        setConfigCertId(cert.id);
                                                                        setViewState('CONFIGURE');
                                                                        window.scrollTo(0, 0);
                                                                    }}
                                                                >
                                                                    Activate
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8 text-[10px] px-3 font-bold uppercase tracking-wide text-neutral-500 hover:text-primary-600"
                                                                    onClick={() => {
                                                                        setSelectedCert(cert);
                                                                        setIsDetailsOpen(true);
                                                                    }}
                                                                >
                                                                    Details
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-16 text-center">
                                                    <div className="max-w-xs mx-auto">
                                                        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 font-black">
                                                            <Shield className="w-6 h-6 text-neutral-400" />
                                                        </div>
                                                        <h3 className="font-black text-neutral-900 mb-1">No Certificates Found</h3>
                                                        <p className="text-sm text-neutral-500 mb-6 font-medium">You haven't ordered any SSL certificates yet.</p>
                                                        <Button variant="primary" onClick={() => setActiveTab('STORE')} className="shadow-lg shadow-primary-500/20">
                                                            Browse Certificate Store
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <Card className="border-none shadow-soft bg-gradient-to-br from-success-50 to-white border-l-4 border-l-success-500">
                            <CardBody className="p-6">
                                <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center mb-4">
                                    <Shield className="w-5 h-5 text-success-600" />
                                </div>
                                <h3 className="font-bold text-neutral-900 uppercase tracking-wider text-sm">Secure Defaults</h3>
                                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">All domains registered with us come with basic SSL encryption enabled by default.</p>
                            </CardBody>
                        </Card>
                        <Card className="border-none shadow-soft bg-gradient-to-br from-primary-50 to-white border-l-4 border-l-primary-500">
                            <CardBody className="p-6">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle className="w-5 h-5 text-primary-600" />
                                </div>
                                <h3 className="font-bold text-neutral-900 uppercase tracking-wider text-sm">Auto-Renewal</h3>
                                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">Certificates managed by SNC-Domain are automatically renewed 30 days before expiration.</p>
                            </CardBody>
                        </Card>
                    </div>
                </>
            )}

            {viewState === 'STORE' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Security Store</h2>
                            <p className="text-neutral-500 mt-2 font-medium">Protect your visitors and boost your SEO with industry-leading SSL certificates.</p>
                        </div>
                        <div className="flex bg-neutral-100 p-1.5 rounded-2xl">
                            {productTypes.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setStoreFilter(type)}
                                    className={cn(
                                        "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        storeFilter === type
                                            ? "bg-white text-primary-600 shadow-sm"
                                            : "text-neutral-500 hover:text-neutral-700"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 1: Optional Domain Setup (Simplified) */}
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-neutral-100 shadow-soft relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <div className="relative z-10 max-w-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Direct Purchase Model</h3>
                            </div>
                            <p className="text-sm text-neutral-500 mb-8 font-medium leading-relaxed">
                                Buy your certificate credits now and configure them later. Entering a domain name below is optional at this stage and can be provided anytime from your dashboard.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400">
                                        <Server className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Target Domain (Optional)"
                                        className="w-full h-14 pl-12 pr-6 rounded-2xl border border-neutral-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none font-bold text-lg"
                                        value={storeDomain}
                                        onChange={(e) => setStoreDomain(e.target.value)}
                                    />
                                </div>
                                <Button
                                    variant="secondary"
                                    className="h-14 px-8 font-black uppercase tracking-widest text-xs rounded-2xl"
                                    onClick={handleStoreDomainCheck}
                                    isLoading={isCheckingEligibility}
                                    disabled={!storeDomain}
                                >
                                    Check Eligibility
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-[2.5rem] text-white shadow-xl shadow-primary-500/20">
                            <Zap className="w-10 h-10 mb-6 opacity-40" />
                            <h3 className="font-black text-xl">Instant Issuance</h3>
                            <p className="text-primary-100 text-sm mt-3 font-medium leading-relaxed">DV certificates are typically issued within minutes after validation.</p>
                        </div>
                        <div className="p-8 bg-white rounded-[2.5rem] border border-neutral-100 shadow-soft">
                            <Globe className="w-10 h-10 text-primary-600/20 mb-6" />
                            <h3 className="font-black text-xl text-neutral-900">Global Trust</h3>
                            <p className="text-neutral-500 text-sm mt-3 font-medium leading-relaxed">Accepted by 99.9% of browsers and devices worldwide.</p>
                        </div>
                        <div className="p-8 bg-white rounded-[2.5rem] border border-neutral-100 shadow-soft">
                            <ShoppingCart className="w-10 h-10 text-primary-600/20 mb-6" />
                            <h3 className="font-black text-xl text-neutral-900">Easy Setup</h3>
                            <p className="text-neutral-500 text-sm mt-3 font-medium leading-relaxed">Purchase your certificate today and configure it on your own schedule.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {isLoadingProducts ? (
                            <div className="col-span-2 flex flex-col items-center justify-center py-20">
                                <Loader2 className="w-12 h-12 animate-spin text-primary-500 mb-4" />
                                <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Loading safety inventory...</p>
                            </div>
                        ) : filteredStoreProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-soft hover:shadow-soft-xl transition-all group overflow-hidden flex flex-col"
                            >
                                <div className="p-10 flex-1">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="space-y-2">
                                            <Badge variant="ghost" size="sm" className="bg-primary-50 text-primary-600 uppercase tracking-widest font-black text-[10px] px-3">
                                                {product.brand}
                                            </Badge>
                                            <h3 className="text-3xl font-black text-neutral-900 group-hover:text-primary-600 transition-colors tracking-tight">
                                                {product.name}
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-4xl font-black text-neutral-900 tracking-tighter">${product.price1Year}</p>
                                            <p className="text-[10px] text-neutral-400 uppercase font-black tracking-widest mt-1">Annually</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 mb-10">
                                        <div className="flex items-center gap-3 text-sm text-neutral-600 font-bold">
                                            <div className="w-7 h-7 rounded-lg bg-success-50 flex items-center justify-center shrink-0">
                                                <Check className="w-4 h-4 text-success-500" />
                                            </div>
                                            <span>{product.type} Check</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-neutral-600 font-bold">
                                            <div className="w-7 h-7 rounded-lg bg-success-50 flex items-center justify-center shrink-0">
                                                <Check className="w-4 h-4 text-success-500" />
                                            </div>
                                            <span>{product.issuanceTime} {product.issuanceTimeUnit}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-neutral-800 font-black">
                                            <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                                                <Shield className="w-4 h-4 text-primary-400" />
                                            </div>
                                            <span>${product.warranty.toLocaleString()} Warranty</span>
                                        </div>
                                        {product.wildcard && (
                                            <div className="flex items-center gap-3 text-sm text-primary-600 font-black">
                                                <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                                                    <Verified className="w-4 h-4" />
                                                </div>
                                                <span>Wildcard Support</span>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        variant="primary"
                                        className="w-full h-16 rounded-[1.25rem] text-lg font-black tracking-tight shadow-xl shadow-primary-500/20"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        <ShoppingCart className="w-6 h-6 mr-3" />
                                        Buy Certificate
                                    </Button>
                                </div>
                                <div className="px-10 py-5 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-between">
                                    <span className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">
                                        Ref: {product.code || product.id}
                                    </span>
                                    <Lock className="w-4 h-4 text-neutral-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Inline Configuration View */}
            {viewState === 'CONFIGURE' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="mb-6">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setViewState('LIST');
                                setConfigCertId(null);
                            }}
                            className="text-neutral-500 hover:text-neutral-900 mb-4 pl-0"
                        >
                            ← Back to Certificates
                        </Button>
                        <h1 className="text-2xl font-black text-neutral-900 tracking-tight">Activate Certificate</h1>
                        <p className="text-neutral-500 mt-1">Configure your SSL certificate (ID: {configCertId}) by providing the required technical details.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-soft-md">
                                <CardBody className="p-6 md:p-8 space-y-8">
                                    {/* Section 1: Domain Verification */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
                                            <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center font-black text-xs">1</div>
                                            <h3 className="text-lg font-bold text-neutral-900">Target Domain</h3>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">Common Name (CN)</label>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="e.g. example.com"
                                                    className={cn(
                                                        "flex-1 h-12 px-5 rounded-xl border transition-all outline-none font-bold",
                                                        eligibility?.eligible === true ? "border-success-500 focus:ring-success-500/10" :
                                                            eligibility?.eligible === false ? "border-error-500 focus:ring-error-500/10" :
                                                                "border-neutral-200 bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500"
                                                    )}
                                                    value={selectedDomain}
                                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                                />
                                                <Button
                                                    variant="secondary"
                                                    className="h-12 px-6 whitespace-nowrap font-black uppercase text-[10px] tracking-widest rounded-xl"
                                                    onClick={handleCheckEligibility}
                                                    isLoading={isCheckingEligibility}
                                                >
                                                    Verify
                                                </Button>
                                            </div>
                                            {eligibility && (
                                                <div className={cn(
                                                    "mt-2 p-4 rounded-xl text-xs flex gap-3 animate-in slide-in-from-top-1",
                                                    eligibility.eligible ? "bg-success-50 text-success-800 border border-success-100" : "bg-error-50 text-error-800 border border-error-100"
                                                )}>
                                                    {eligibility.eligible ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                                                    <span className="font-bold">
                                                        {eligibility.eligible ? "Domain is eligible for SSL issuance." : (eligibility.reason || "Eligibility check failed.")}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Section 2: CSR */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
                                            <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center font-black text-xs">2</div>
                                            <h3 className="text-lg font-bold text-neutral-900">Certificate Signing Request</h3>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest ml-1 flex items-center justify-between">
                                                CSR Content
                                                <Badge variant="ghost" size="sm" className="bg-neutral-100 text-[9px] uppercase font-black tracking-widest px-2">Required</Badge>
                                            </label>
                                            <textarea
                                                className="w-full h-48 p-5 rounded-xl border border-neutral-200 bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none font-mono text-xs leading-relaxed resize-y"
                                                placeholder="-----BEGIN CERTIFICATE REQUEST-----..."
                                                value={csr}
                                                onChange={(e) => setCsr(e.target.value)}
                                            />
                                            <p className="text-[10px] text-neutral-400 pl-1">Generate this on your server using OpenSSL or your hosting panel.</p>
                                        </div>
                                    </div>

                                    {/* Section 3: Approver Email */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
                                            <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center font-black text-xs">3</div>
                                            <h3 className="text-lg font-bold text-neutral-900">Validation Email</h3>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">Select Approver Address</label>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <select
                                                    className="flex-1 h-12 px-5 rounded-xl border border-neutral-200 bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none font-bold text-sm"
                                                    value={approverEmail}
                                                    onChange={(e) => setApproverEmail(e.target.value)}
                                                >
                                                    <option value="">Choose standard email...</option>
                                                    <option value={`admin@${selectedDomain}`}>admin@{selectedDomain}</option>
                                                    <option value={`administrator@${selectedDomain}`}>administrator@{selectedDomain}</option>
                                                    <option value={`hostmaster@${selectedDomain}`}>hostmaster@{selectedDomain}</option>
                                                    <option value={`webmaster@${selectedDomain}`}>webmaster@{selectedDomain}</option>
                                                    <option value={`postmaster@${selectedDomain}`}>postmaster@{selectedDomain}</option>
                                                </select>
                                                <div className="relative flex-1">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-neutral-400 text-xs font-bold">OR</span>
                                                    </div>
                                                    <input
                                                        type="email"
                                                        placeholder="Custom email address..."
                                                        className="w-full h-12 pl-10 pr-5 rounded-xl border border-neutral-200 bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none font-bold text-sm"
                                                        value={approverEmail}
                                                        onChange={(e) => setApproverEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-neutral-400 pl-1">The CA will send a verification link to this address. You must have access to it.</p>
                                        </div>
                                    </div>

                                    {/* Section 4: Auto-Renew Preference */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
                                            <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center font-black text-xs">4</div>
                                            <h3 className="text-lg font-bold text-neutral-900">Renewal Settings</h3>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                            <div>
                                                <span className="font-bold text-sm text-neutral-900 block">Auto-Renew Certificate</span>
                                                <span className="text-xs text-neutral-500">Automatically renew this certificate before it expires using your account balance.</span>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    // Toggle logic for configuration view - we might need to handle this state locally or update the certificate directly if API allows, 
                                                    // or just use the toggleAutorenew function if we have the cert ID.
                                                    // Since we are configuring, we can call toggleAutorenew immediately.
                                                    const currentCert = certificates?.find(c => c.id === configCertId);
                                                    if (currentCert) {
                                                        toggleAutorenew(configCertId, currentCert.autorenew);
                                                    }
                                                }}
                                                className={cn(
                                                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                                                    certificates?.find(c => c.id === configCertId)?.autorenew ? "bg-primary-600" : "bg-neutral-200"
                                                )}
                                            >
                                                <span className={cn(
                                                    "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                                                    certificates?.find(c => c.id === configCertId)?.autorenew ? "translate-x-5" : "translate-x-0.5"
                                                )} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-neutral-100 flex justify-end gap-3">
                                        <Button
                                            variant="ghost"
                                            className="h-12 px-6 rounded-xl font-bold text-neutral-500 hover:text-neutral-900"
                                            onClick={() => setViewState('LIST')}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="primary"
                                            className="h-12 px-8 shadow-lg shadow-primary-500/20 rounded-xl font-black uppercase tracking-widest text-xs"
                                            onClick={handleConfigureSSL}
                                            disabled={!eligibility?.eligible || !csr || !approverEmail}
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Submit Configuration
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        {/* Help Sidebar */}
                        <div className="space-y-6">
                            <div className="p-6 bg-primary-600 rounded-[2rem] text-white shadow-xl shadow-primary-500/20">
                                <Zap className="w-8 h-8 mb-4 opacity-50" />
                                <h4 className="font-black text-lg mb-2">Instant Activation</h4>
                                <p className="text-sm text-primary-100 leading-relaxed font-medium">
                                    Once you submit this form, our system will immediately send your order to the Certificate Authority. Make sure your domain's WHOIS protection is disabled if using email validation.
                                </p>
                            </div>

                            <div className="p-6 bg-white rounded-[2rem] border border-neutral-100 shadow-soft">
                                <h4 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-warning-500" />
                                    Common Pitfalls
                                </h4>
                                <ul className="space-y-3 text-xs text-neutral-500 font-medium">
                                    <li className="flex gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                                        CSR must match the domain exactly.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                                        Private key size should be 2048-bit.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                                        Avoid using internal names or IP addresses.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Certificate Details Modal */}
            <Modal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                title="Management Console"
                description={`Managing ${selectedCert?.commonName || 'Unconfigured Certificate'}`}
                size="xl"
            >
                {selectedCert && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-5">
                                <h4 className="font-black text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-3 uppercase tracking-wider text-xs">
                                    <div className="p-1.5 bg-primary-50 rounded-lg">
                                        <Shield className="w-4 h-4 text-primary-500" />
                                    </div>
                                    General Information
                                </h4>
                                <div className="grid grid-cols-2 gap-y-4 text-sm">
                                    <span className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Common Name</span>
                                    <span className="text-neutral-900 font-black break-all">{selectedCert.commonName || 'Not Set'}</span>
                                    <span className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Brand</span>
                                    <span className="text-primary-600 font-black uppercase tracking-widest text-[10px]">{selectedCert.brand}</span>
                                    <span className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Status</span>
                                    <span>{getStatusBadge(selectedCert.status)}</span>
                                    <span className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Expiration</span>
                                    <span className="text-neutral-900 font-black">{selectedCert.expirationDate || 'N/A'}</span>
                                    <span className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Certificate ID</span>
                                    <span className="text-neutral-900 font-mono text-[10px] font-black">{selectedCert.id}</span>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <h4 className="font-black text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-3 uppercase tracking-wider text-xs">
                                    <div className="p-1.5 bg-primary-50 rounded-lg">
                                        <RefreshCw className="w-4 h-4 text-primary-500" />
                                    </div>
                                    Quick Actions
                                </h4>
                                {selectedCert.status === 'WAIT_FOR_INPUT' ? (
                                    <div className="p-6 bg-warning-50 rounded-[2rem] border border-warning-100 space-y-5">
                                        <p className="text-xs text-warning-800 leading-relaxed font-bold">
                                            This certificate requires technical configuration before it can be issued.
                                        </p>
                                        <Button
                                            variant="primary"
                                            className="w-full h-14 shadow-xl shadow-warning-500/20 font-black uppercase tracking-widest text-[10px] rounded-2xl"
                                            onClick={() => {
                                                setIsDetailsOpen(false);
                                                setConfigCertId(selectedCert.id);
                                                setIsConfigModalOpen(true);
                                            }}
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Configure Now
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-12 text-[10px] font-black uppercase tracking-widest rounded-xl"
                                            onClick={() => setIsReissueModalOpen(true)}
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Reissue
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-12 text-[10px] font-black uppercase tracking-widest rounded-xl"
                                            onClick={() => handleResendApproval(selectedCert.id)}
                                        >
                                            <Mail className="w-4 h-4 mr-2" />
                                            Resend
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-12 text-[10px] font-black uppercase tracking-widest rounded-xl"
                                            onClick={() => handleRenew(selectedCert.id)}
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Renew
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="h-12 text-[10px] font-black uppercase tracking-widest rounded-xl"
                                            onClick={() => handleCancelOrder(selectedCert.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Diagnostics Sections */}
                        <div className="space-y-5 pt-4">
                            <h4 className="font-black text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-3 uppercase tracking-wider text-xs">
                                <div className="p-1.5 bg-primary-50 rounded-lg">
                                    <FileSearch className="w-4 h-4 text-primary-500" />
                                </div>
                                System Logs & Status
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-neutral-50 rounded-[2rem] border border-neutral-100 min-h-[180px]">
                                    <p className="text-[10px] font-black text-neutral-400 uppercase mb-4 flex items-center gap-2 tracking-widest">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        Pending Data
                                    </p>
                                    <NeededDataView id={selectedCert.id} />
                                </div>
                                <div className="p-6 bg-neutral-50 rounded-[2rem] border border-neutral-100 min-h-[180px]">
                                    <p className="text-[10px] font-black text-neutral-400 uppercase mb-4 flex items-center gap-2 tracking-widest">
                                        <History className="w-3.5 h-3.5" />
                                        Audit Log
                                    </p>
                                    <CertificateLogView id={selectedCert.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Reissue Modal */}
            <Modal
                isOpen={isReissueModalOpen}
                onClose={() => setIsReissueModalOpen(false)}
                title="Reissue Certificate"
                description={`Requesting reissue for ${selectedCert?.commonName}`}
                size="md"
            >
                <div className="space-y-6">
                    <div className="p-5 bg-primary-50 rounded-[1.5rem] border border-primary-100 flex gap-4">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center shrink-0 text-white shadow-lg transition-transform hover:rotate-12">
                            <RefreshCw className="w-5 h-5" />
                        </div>
                        <p className="text-xs text-primary-800 leading-relaxed font-bold">
                            Reissuance is required if your private key is compromised or you've moved to a new server. You'll need to provide a fresh CSR.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-xs font-black text-neutral-400 uppercase tracking-widest ml-1">New CSR (Certificate Signing Request)</label>
                        <textarea
                            className="w-full h-52 p-5 rounded-[1.5rem] border border-neutral-200 bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none font-mono text-xs leading-relaxed"
                            placeholder="-----BEGIN CERTIFICATE REQUEST-----..."
                            value={reissueCsr}
                            onChange={(e) => setReissueCsr(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Button variant="ghost" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setIsReissueModalOpen(false)}>Cancel</Button>
                        <Button
                            variant="primary"
                            className="flex-1 shadow-lg shadow-primary-500/20 h-12 rounded-xl font-black uppercase tracking-widest text-xs"
                            onClick={handleReissue}
                        >
                            Confirm Reissue
                        </Button>
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
};

// Internal Diagnostic Components
const NeededDataView = ({ id }) => {
    const { data, isLoading } = useGetSslNeededDataQuery(id);

    if (isLoading) return <Loader2 className="w-4 h-4 animate-spin text-neutral-300" />;

    if (!data || (Array.isArray(data) && data.length === 0)) {
        return <p className="text-xs text-neutral-500 italic font-medium">No pending data requirements found.</p>;
    }

    return (
        <ul className="space-y-3">
            {(Array.isArray(data) ? data : [data]).map((item, idx) => (
                <li key={idx} className="text-xs text-neutral-700 font-bold flex items-start gap-3 bg-white p-3 rounded-xl border border-neutral-100/50">
                    <span className="w-2 h-2 rounded-full bg-primary-500 mt-1 shrink-0 shadow-sm shadow-primary-500/50" />
                    {typeof item === 'string' ? item : JSON.stringify(item)}
                </li>
            ))}
        </ul>
    );
};

const CertificateLogView = ({ id }) => {
    const { data, isLoading } = useViewSslLogQuery(id);

    if (isLoading) return <Loader2 className="w-4 h-4 animate-spin text-neutral-300" />;

    if (!data || (Array.isArray(data) && data.length === 0)) {
        return <p className="text-xs text-neutral-500 italic font-medium">No log history available.</p>;
    }

    return (
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-3 scrollbar-custom">
            {(Array.isArray(data) ? data : [data]).map((log, idx) => (
                <div key={idx} className="border-l-4 border-primary-500 pl-4 py-3 bg-white rounded-2xl shadow-sm mb-3">
                    <p className="text-[9px] text-neutral-400 font-black uppercase tracking-tighter mb-1">{log.date || log.timestamp || 'N/A'}</p>
                    <p className="text-[11px] text-neutral-800 font-bold leading-relaxed">{log.message || log.action || JSON.stringify(log)}</p>
                </div>
            ))}
        </div>
    );
};

export default SSL;
