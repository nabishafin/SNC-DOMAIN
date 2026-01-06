import { useState } from 'react';
import { CreditCard, FileText, Check, Plus, DollarSign, Download } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

const Billing = () => {
    const { addToast } = useToast();
    const [balance, setBalance] = useState(0.00);
    const [invoices] = useState([
        { id: 'INV-2024-001', date: '2024-01-01', amount: 14.99, status: 'paid', description: 'Domain Registration - snc-domain.com' },
        { id: 'INV-2023-156', date: '2023-12-15', amount: 9.99, status: 'paid', description: 'Monthly Hosting' },
        { id: 'INV-2023-142', date: '2023-11-15', amount: 9.99, status: 'paid', description: 'Monthly Hosting' },
    ]);

    const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');

    const handleAddFunds = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setBalance(prev => prev + Number(amount));
            setIsLoading(false);
            setIsAddFundsModalOpen(false);
            addToast('success', 'Funds Added', `$${amount} has been successfully added to your account.`);
            setAmount('');
        }, 1500);
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-neutral-900">Billing & Invoices</h1>
                <p className="text-neutral-500 mt-1">Manage payment methods and view invoice history.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Methods */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-none shadow-soft-md">
                        <CardHeader className="border-b border-neutral-100 pb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-neutral-900">Payment Methods</h2>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Plus className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardBody className="space-y-4">
                            <div className="p-4 border border-primary-200 bg-primary-50/50 rounded-xl flex items-center gap-4 relative overflow-hidden">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <CreditCard className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-neutral-900">•••• 4242</p>
                                    <p className="text-xs text-neutral-500">Expires 12/28</p>
                                </div>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Badge variant="success" className="text-xs">Default</Badge>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full border-dashed">
                                Add New Card
                            </Button>
                        </CardBody>
                    </Card>

                    <Card className="border-none shadow-soft-md bg-neutral-900 text-white">
                        <CardBody>
                            <p className="text-sm text-neutral-400 mb-1">Current Balance</p>
                            <h3 className="text-3xl font-bold mb-4">${balance.toFixed(2)}</h3>
                            <Button
                                variant="primary"
                                className="w-full bg-white text-neutral-900 hover:bg-neutral-100 border-none"
                                onClick={() => setIsAddFundsModalOpen(true)}
                            >
                                Add Funds
                            </Button>
                        </CardBody>
                    </Card>
                </div>

                {/* Invoices List */}
                <div className="lg:col-span-2">
                    <Card className="border-none shadow-soft-md h-full">
                        <CardHeader className="border-b border-neutral-100 pb-4">
                            <h2 className="text-lg font-bold text-neutral-900">Invoice History</h2>
                        </CardHeader>
                        <CardBody className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold text-xs">
                                        <tr>
                                            <th className="px-6 py-4">Invoice ID</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {invoices.map((invoice) => (
                                            <tr key={invoice.id} className="group hover:bg-neutral-50/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-neutral-900">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-neutral-400" />
                                                        {invoice.id}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-neutral-600">{invoice.date}</td>
                                                <td className="px-6 py-4 font-medium text-neutral-900">${invoice.amount}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1.5 text-success-600 text-xs font-bold uppercase tracking-wide">
                                                        <Check className="w-3.5 h-3.5" />
                                                        Paid
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-primary-600">
                                                        <Download className="w-4 h-4 mr-2" />
                                                        PDF
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Add Funds Modal */}
            <Modal
                isOpen={isAddFundsModalOpen}
                onClose={() => setIsAddFundsModalOpen(false)}
                title="Add Funds"
                description="Securely add funds to your account balance."
            >
                <form onSubmit={handleAddFunds} className="space-y-4">
                    <div>
                        <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                            <input
                                type="number"
                                min="10"
                                step="any"
                                placeholder="0.00"
                                className="w-full h-12 pl-12 pr-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-bold text-xl outline-none"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <p className="text-xs text-neutral-500 mt-2 ml-1">Minimum deposit amount is $10.00</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {['25', '50', '100'].map((val) => (
                            <button
                                type="button"
                                key={val}
                                onClick={() => setAmount(val)}
                                className="py-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-sm font-medium transition-colors"
                            >
                                ${val}
                            </button>
                        ))}
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsAddFundsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" isLoading={isLoading} disabled={!amount}>
                            Confirm Payment
                        </Button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default Billing;
