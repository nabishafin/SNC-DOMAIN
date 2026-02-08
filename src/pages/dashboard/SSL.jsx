import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Shield, Lock, AlertTriangle, CheckCircle, Download, Plus, ShoppingCart, Loader2, AlertCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useGetSslProductsQuery, useLazyCheckSslEligibilityQuery } from '../../redux/features/ssl/sslApi';
import { addToCart } from '../../redux/slices/cartSlice';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

const SSL = () => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { data: sslProducts, isLoading: isLoadingProducts } = useGetSslProductsQuery();
    const [checkEligibility, { isFetching: isCheckingEligibility }] = useLazyCheckSslEligibilityQuery();

    // Form and UI state
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [eligibility, setEligibility] = useState(null); // { eligible: boolean, reason?: string, error?: string }
    const [csr, setCsr] = useState('');
    const [approverEmail, setApproverEmail] = useState('');
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [certificates, setCertificates] = useState([
        {
            id: '1',
            domain: 'snc-domain.com',
            type: 'Wildcard SSL',
            issuer: 'DigiCert',
            expires: '2027-01-15',
            status: 'active',
            autoRenew: true,
        },
        {
            id: '2',
            domain: 'api.snc-domain.com',
            type: 'Standard SSL',
            issuer: 'Let\'s Encrypt',
            expires: '2026-03-20',
            status: 'expiring_soon',
            autoRenew: false,
        },
    ]);

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

    const handleOrderSSL = () => {
        if (!selectedProductId || !eligibility?.eligible) return;

        const product = sslProducts.find(p => p.id === selectedProductId);
        if (!product) return;

        dispatch(addToCart({
            id: `ssl-${product.id}-${selectedDomain}`,
            name: `${product.name} (${selectedDomain})`,
            price: product.price1Year,
            year: 1,
            type: 'ssl',
            productCode: product.code || product.id,
            domain: selectedDomain,
            csr: csr,
            approverEmail: approverEmail
        }));

        setIsOrderModalOpen(false);
        addToast('success', 'Added to Cart', `${product.name} for ${selectedDomain} has been added to your cart.`);
        setSelectedProductId(null);
        setCsr('');
        setApproverEmail('');
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">SSL Certificates</h1>
                    <p className="text-neutral-500 mt-1">Manage security certificates for your domains.</p>
                </div>
                <Button
                    variant="primary"
                    className="shadow-lg shadow-primary-500/20"
                    onClick={() => setIsOrderModalOpen(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Certificate
                </Button>
            </div>

            <Card className="border-none shadow-soft-md">
                <CardBody className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold text-xs border-b border-neutral-100">
                                <tr>
                                    <th className="px-6 py-4">Domain / Type</th>
                                    <th className="px-6 py-4">Issuer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Expiration</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {certificates.map((cert) => (
                                    <tr key={cert.id} className="group hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                                                    <Lock className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-neutral-900">{cert.domain}</p>
                                                    <p className="text-xs text-neutral-500">{cert.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-600">{cert.issuer}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={cert.status === 'active' ? 'success' : cert.status === 'expiring_soon' ? 'warning' : 'neutral'}>
                                                {cert.status.replace('_', ' ')}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-500">{cert.expires}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" title="Download Certificate">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
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
                        <h3 className="font-bold text-neutral-900">Secure Defaults</h3>
                        <p className="text-sm text-neutral-600 mt-1">All domains registered with us come with basic SSL encryption enabled by default.</p>
                    </CardBody>
                </Card>
                <Card className="border-none shadow-soft bg-gradient-to-br from-primary-50 to-white border-l-4 border-l-primary-500">
                    <CardBody className="p-6">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-5 h-5 text-primary-600" />
                        </div>
                        <h3 className="font-bold text-neutral-900">Auto-Renewal</h3>
                        <p className="text-sm text-neutral-600 mt-1">Certificates managed by SNC-Domain are automatically renewed 30 days before expiration.</p>
                    </CardBody>
                </Card>
            </div>

            {/* Order Modal */}
            <Modal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                title="Order New SSL Certificate"
                description="Secure your domain with industry-standard encryption."
                size="xl"
            >
                <div className="space-y-6">
                    <div className="p-4 border border-primary-200 bg-primary-50 rounded-xl flex gap-3">
                        <Shield className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-primary-900 text-sm">Professional Verification</h4>
                            <p className="text-xs text-primary-700 mt-1">We will verify your domain ownership before issuance. This process typically takes 5-10 minutes for DV certificates.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Target Domain</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="e.g. example.com"
                                    className={cn(
                                        "flex-1 h-11 px-4 rounded-xl border transition-all outline-none",
                                        eligibility?.eligible === true ? "border-success-500 focus:ring-success-500/10" :
                                            eligibility?.eligible === false ? "border-error-500 focus:ring-error-500/10" :
                                                "border-neutral-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                    )}
                                    value={selectedDomain}
                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                />
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-11 px-6 whitespace-nowrap"
                                    onClick={handleCheckEligibility}
                                    isLoading={isCheckingEligibility}
                                >
                                    Verify
                                </Button>
                            </div>

                            {eligibility && (
                                <div className={cn(
                                    "mt-2 p-3 rounded-lg text-xs flex gap-2 animate-in slide-in-from-top-1",
                                    eligibility.eligible ? "bg-success-50 text-success-800 border border-success-100" : "bg-error-50 text-error-800 border border-error-100"
                                )}>
                                    {eligibility.eligible ? (
                                        <CheckCircle className="w-4 h-4 shrink-0" />
                                    ) : (
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                    )}
                                    <span>
                                        {eligibility.eligible ? "Domain is eligible for SSL issuance." : (eligibility.reason || eligibility.error || "Eligibility check failed.")}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Verification Type</label>
                            <select className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none">
                                <option>DNS Verification (Recommended)</option>
                                <option>Email Verification</option>
                                <option>HTTP File Verification</option>
                            </select>
                        </div>
                    </div>

                    {eligibility?.eligible && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-neutral-700 mb-2 font-bold flex items-center gap-2">
                                    CSR (Certificate Signing Request)
                                    <Badge variant="ghost" size="sm" className="bg-neutral-100 text-[10px] uppercase">Required</Badge>
                                </label>
                                <textarea
                                    className="w-full h-32 p-4 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none font-mono text-xs"
                                    placeholder="-----BEGIN CERTIFICATE REQUEST-----..."
                                    value={csr}
                                    onChange={(e) => setCsr(e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-neutral-700 mb-2 font-bold">Approver Email</label>
                                <div className="flex gap-2">
                                    <select
                                        className="flex-1 h-11 px-4 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                                        value={approverEmail}
                                        onChange={(e) => setApproverEmail(e.target.value)}
                                    >
                                        <option value="">Select an email (or enter below)</option>
                                        <option value={`admin@${selectedDomain}`}>admin@{selectedDomain}</option>
                                        <option value={`administrator@${selectedDomain}`}>administrator@{selectedDomain}</option>
                                        <option value={`hostmaster@${selectedDomain}`}>hostmaster@{selectedDomain}</option>
                                        <option value={`webmaster@${selectedDomain}`}>webmaster@{selectedDomain}</option>
                                        <option value={`postmaster@${selectedDomain}`}>postmaster@{selectedDomain}</option>
                                    </select>
                                    <input
                                        type="email"
                                        placeholder="Or type manually..."
                                        className="flex-1 h-11 px-4 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                                        value={approverEmail}
                                        onChange={(e) => setApproverEmail(e.target.value)}
                                    />
                                </div>
                                <p className="text-[10px] text-neutral-400 mt-1 italic">Must be a standard administrative email address for the domain.</p>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">Choose SSL Product</label>
                        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 scrollbar-custom relative">
                            {!eligibility?.eligible && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-3">
                                        <Lock className="w-6 h-6 text-neutral-400" />
                                    </div>
                                    <h5 className="font-bold text-neutral-900 mb-1">Eligibility Required</h5>
                                    <p className="text-sm text-neutral-500 max-w-xs">Please verify your domain eligibility above before selecting a certificate.</p>
                                </div>
                            )}

                            {isLoadingProducts ? (
                                <div className="flex flex-col items-center justify-center py-12 text-neutral-400">
                                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                                    <p className="text-sm">Fetching available certificates...</p>
                                </div>
                            ) : sslProducts?.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => eligibility?.eligible && setSelectedProductId(product.id)}
                                    className={cn(
                                        "p-4 rounded-xl border-2 transition-all cursor-pointer group hover:shadow-soft-md",
                                        selectedProductId === product.id
                                            ? "border-primary-500 bg-primary-50/10 shadow-soft"
                                            : "border-neutral-100 hover:border-neutral-200",
                                        !eligibility?.eligible && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <h5 className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                                                    {product.name}
                                                </h5>
                                                <Badge variant="ghost" size="sm" className="bg-neutral-100">
                                                    {product.type}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-neutral-500 line-clamp-1">{product.brand} • {product.issuanceTime} {product.issuanceTimeUnit} delivery</p>
                                        </div>
                                        <div className="text-left sm:text-right shrink-0">
                                            <div className="font-bold text-neutral-900">
                                                ${product.price1Year.toFixed(2)}
                                            </div>
                                            <p className="text-[10px] text-neutral-400 uppercase font-semibold">per year</p>
                                        </div>
                                    </div>
                                    {selectedProductId === product.id && (
                                        <div className="mt-3 pt-3 border-t border-primary-100 flex items-center justify-between">
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-neutral-500 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3 text-success-500" />
                                                    Warranty: {product.warrantyCurrency} {product.warranty.toLocaleString()}
                                                </span>
                                                {product.wildcard && (
                                                    <span className="flex items-center gap-1 text-primary-600">
                                                        <Shield className="w-3 h-3" />
                                                        Wildcard included
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <Button variant="ghost" className="flex-1 order-2 sm:order-1" onClick={() => setIsOrderModalOpen(false)}>Cancel</Button>
                        <Button
                            variant="primary"
                            className="flex-1 shadow-lg shadow-primary-500/20 order-1 sm:order-2"
                            onClick={handleOrderSSL}
                            disabled={!selectedProductId || !eligibility?.eligible}
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
};

export default SSL;
