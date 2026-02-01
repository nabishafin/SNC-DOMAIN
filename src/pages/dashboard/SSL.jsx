import { useState } from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle, Download, Plus } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

const SSL = () => {
    const { addToast } = useToast();
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

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOrderSSL = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newCert = {
                id: Math.random().toString(),
                domain: 'new-domain.com',
                type: 'Standard SSL',
                issuer: 'DigiCert',
                expires: '2027-01-01',
                status: 'pending_validation',
                autoRenew: true
            };
            setCertificates([...certificates, newCert]);
            setIsLoading(false);
            setIsOrderModalOpen(false);
            addToast('success', 'Order Initiated', 'Your SSL certificate request has been submitted for validation.');
        }, 1500);
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
                                            <Badge
                                                variant={cert.status === 'active' ? 'success' : 'warning'}
                                                className="capitalize"
                                            >
                                                {cert.status.replace('_', ' ')}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-neutral-600">
                                                <span>{new Date(cert.expires).toLocaleDateString()}</span>
                                                {cert.status === 'expiring_soon' && (
                                                    <AlertTriangle className="w-4 h-4 text-warning-500" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Download Certificate">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">Manage</Button>
                                            </div>
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
            >
                <div className="space-y-4">
                    <div className="p-4 border border-primary-200 bg-primary-50 rounded-xl flex gap-3">
                        <Shield className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-primary-900 text-sm">Professional Verification</h4>
                            <p className="text-xs text-primary-700 mt-1">We will verify your domain ownership before issuance. This process typically takes 5-10 minutes.</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Select Domain</label>
                        <select className="w-full h-11 px-4 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none">
                            <option>snc-example.com</option>
                            <option>my-new-shop.net</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <div className="p-4 rounded-xl border-2 border-primary-500 bg-primary-50/10 cursor-pointer relative">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-neutral-900">Standard SSL</span>
                                <span className="font-bold text-primary-600">$49/yr</span>
                            </div>
                            <p className="text-xs text-neutral-500">Single domain protection, 256-bit encryption.</p>
                            <div className="absolute top-3 right-3 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 cursor-pointer opacity-70">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-neutral-900">Wildcard SSL</span>
                                <span className="font-bold text-neutral-900">$149/yr</span>
                            </div>
                            <p className="text-xs text-neutral-500">Protect unlimited subdomains (e.g. *.domain.com).</p>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setIsOrderModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleOrderSSL} isLoading={isLoading}>Proceed to Checkout</Button>
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
};

export default SSL;
