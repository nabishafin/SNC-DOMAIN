import { useState } from 'react';
import { cn } from '../../lib/utils';
import {
    Server,
    CheckCircle,
    Plus,
    Loader2,
    Globe,
    Mail,
    HardDrive,
    Cpu,
    ArrowRight
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { useListWebHostingPricesQuery, useListEmailHostingPricesQuery, useCreateHostingMutation } from '../../redux/features/hosting/hostingApi';

const Hosting = () => {
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState('web');

    // Fetch data for both (simple approach) or conditionally (more efficient)
    const { data: webPlans, isLoading: isLoadingWeb } = useListWebHostingPricesQuery(undefined, { skip: activeTab !== 'web' });
    const { data: emailPlans, isLoading: isLoadingEmail } = useListEmailHostingPricesQuery(undefined, { skip: activeTab !== 'email' });

    const [createHosting, { isLoading: isCreating }] = useCreateHostingMutation();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [formData, setFormData] = useState({
        domain: '',
        period: '1Y'
    });

    const handleOpenCreateModal = (plan) => {
        setSelectedPlan(plan);
        setIsCreateModalOpen(true);
    };

    const isLoadingPlans = activeTab === 'web' ? isLoadingWeb : isLoadingEmail;
    const filteredPlans = activeTab === 'web' ? webPlans : emailPlans;

    const handleCreateHosting = async (e) => {
        e.preventDefault();
        if (!formData.domain) {
            addToast('error', 'Validation Error', 'Please enter a domain name.');
            return;
        }

        try {
            const res = await createHosting({
                domain: formData.domain,
                template: selectedPlan.product,
                period: formData.period
            }).unwrap();

            addToast('success', 'Hosting Created', `Hosting package for ${formData.domain} is now ${res.data?.status || 'ACTIVE'}.`);
            setIsCreateModalOpen(false);
            setFormData({ domain: '', period: '1Y' });
        } catch (err) {
            addToast('error', 'Provisioning Failed', err?.data?.message || 'Failed to create hosting package.');
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Hosting Management</h1>
                    <p className="text-neutral-500 mt-1">Professional Web and Email hosting for your domains.</p>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-neutral-100 shadow-soft w-fit mb-8">
                <button
                    onClick={() => setActiveTab('web')}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                        activeTab === 'web'
                            ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20"
                            : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    )}
                >
                    <Globe className="w-4 h-4" />
                    Web Hosting
                </button>
                <button
                    onClick={() => setActiveTab('email')}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                        activeTab === 'email'
                            ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20"
                            : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    )}
                >
                    <Mail className="w-4 h-4" />
                    Email Hosting
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoadingPlans ? (
                    <div className="col-span-full py-24 text-center text-neutral-400 bg-white rounded-3xl border border-neutral-100 shadow-soft">
                        <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-primary-500" />
                        <p className="text-lg font-medium">Fetching hosting plans...</p>
                    </div>
                ) : Array.isArray(filteredPlans) && filteredPlans.length > 0 ? (
                    filteredPlans.map((plan) => (
                        <Card key={plan.id} className="border-none shadow-soft hover:shadow-soft-md transition-all flex flex-col group overflow-hidden">
                            <CardBody className="p-8 flex flex-col h-full">
                                <div className="mb-6">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                                        plan.producttype === 'webspace' ? "bg-primary-50 text-primary-600" : "bg-success-50 text-success-600"
                                    )}>
                                        {plan.producttype === 'webspace' ? <Globe className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2 truncate group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                                        {plan.product}
                                    </h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-neutral-900">${parseFloat(plan.netto).toFixed(2)}</span>
                                        <span className="text-sm text-neutral-400 font-medium">/{plan.producttype === 'webspace' ? 'year' : 'year'}</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    <li className="flex items-center gap-3 text-sm text-neutral-600 font-medium">
                                        <HardDrive className="w-4 h-4 text-primary-500 shrink-0" />
                                        <span>{parseInt(plan.limit_diskspace) / 1000}GB SSD Storage</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-neutral-600 font-medium">
                                        <Mail className="w-4 h-4 text-primary-500 shrink-0" />
                                        <span>{plan.limit_email_accounts} Email Accounts</span>
                                    </li>
                                    {plan.limit_subdomains && (
                                        <li className="flex items-center gap-3 text-sm text-neutral-600 font-medium">
                                            <Globe className="w-4 h-4 text-primary-500 shrink-0" />
                                            <span>{plan.limit_subdomains} Subdomains</span>
                                        </li>
                                    )}
                                    {plan.limit_mysqls && (
                                        <li className="flex items-center gap-3 text-sm text-neutral-600 font-medium">
                                            <Cpu className="w-4 h-4 text-primary-500 shrink-0" />
                                            <span>{plan.limit_mysqls} MySQL DBs</span>
                                        </li>
                                    )}
                                    <li className="flex items-center gap-3 text-sm text-neutral-600 font-medium opacity-60">
                                        <CheckCircle className="w-4 h-4 text-success-500 shrink-0" />
                                        <span>Free SSL Included</span>
                                    </li>
                                </ul>

                                <Button
                                    variant="primary"
                                    className="w-full h-12 shadow-lg shadow-primary-500/20 group-hover:translate-y-[-2px] transition-transform"
                                    onClick={() => handleOpenCreateModal(plan)}
                                >
                                    Select Plan
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-neutral-500 bg-white rounded-2xl border border-dashed border-neutral-200">
                        No hosting plans found.
                    </div>
                )}
            </div>

            {/* Create Hosting Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Provision Hosting"
                description={`You are ordering the ${selectedPlan?.product} plan.`}
                size="md"
            >
                <form onSubmit={handleCreateHosting} className="space-y-6 pt-2">
                    <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100 flex gap-4">
                        <div className="p-3 bg-white rounded-xl text-primary-600 shadow-sm shrink-0">
                            <Server className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-primary-900">{selectedPlan?.product}</h4>
                            <p className="text-xs text-primary-700 mt-0.5">${parseFloat(selectedPlan?.netto).toFixed(2)}/year</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-neutral-700 mb-2">Target Domain</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. my-awesome-project.com"
                            className="w-full h-12 px-4 rounded-xl border border-neutral-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium"
                            value={formData.domain}
                            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        />
                        <p className="text-[11px] text-neutral-400 mt-2 italic px-1">Make sure you own this domain before provisioning.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-neutral-700 mb-2">Billing Period</label>
                        <select
                            className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium"
                            value={formData.period}
                            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                        >
                            <option value="1Y">1 Year (Standard)</option>
                            <option value="2Y">2 Years</option>
                        </select>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <Button variant="ghost" className="flex-1 h-12" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                        <Button
                            variant="primary"
                            className="flex-1 h-12 shadow-lg shadow-primary-500/20"
                            size="lg"
                            isLoading={isCreating}
                        >
                            Confirm Order
                        </Button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default Hosting;
