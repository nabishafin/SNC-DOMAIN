import { useState } from 'react';
import { CreditCard, FileText, Check, Plus, DollarSign, Download, Activity, AlertCircle, Loader2, Calendar } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useGetBillingOverviewQuery, useGetBillingHistoryQuery } from '../../redux/features/billing/billingApi';
import { cn } from '../../lib/utils';
import { toast } from 'react-toastify';

const Billing = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: overviewData, isLoading: isOverviewLoading, isError: isOverviewError } = useGetBillingOverviewQuery();
    const { data: historyData, isLoading: isHistoryLoading, isError: isHistoryError } = useGetBillingHistoryQuery({ page, limit });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'success':
            case 'paid':
                return <Badge variant="success">Paid</Badge>;
            case 'pending':
                return <Badge variant="warning">Pending</Badge>;
            case 'failed':
                return <Badge variant="error">Failed</Badge>;
            default:
                return <Badge variant="neutral">{status}</Badge>;
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-neutral-900">Billing & Invoices</h1>
                <p className="text-neutral-500 mt-1">Manage payment methods, view transaction history, and download invoices.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-none shadow-soft-md">
                    <CardBody className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-500">Total Spend</p>
                                {isOverviewLoading ? (
                                    <div className="h-8 w-24 bg-neutral-100 animate-pulse rounded mt-1" />
                                ) : (
                                    <h3 className="text-2xl font-bold text-neutral-900">
                                        {formatCurrency(overviewData?.totalSpend || 0)}
                                    </h3>
                                )}
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card className="border-none shadow-soft-md">
                    <CardBody className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-success-50 rounded-xl text-success-600">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-500">Active Services</p>
                                {isOverviewLoading ? (
                                    <div className="h-8 w-16 bg-neutral-100 animate-pulse rounded mt-1" />
                                ) : (
                                    <h3 className="text-2xl font-bold text-neutral-900">
                                        {overviewData?.activeOrdersCount || 0}
                                    </h3>
                                )}
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card className="border-none shadow-soft-md">
                    <CardBody className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-neutral-500">Payment Method</p>
                                {isOverviewLoading ? (
                                    <div className="h-8 w-32 bg-neutral-100 animate-pulse rounded mt-1" />
                                ) : overviewData?.lastPayment ? (
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="font-bold text-neutral-900 capitalize">{overviewData.lastPayment.cardBrand}</span>
                                        <span className="text-neutral-500">•••• {overviewData.lastPayment.last4}</span>
                                    </div>
                                ) : (
                                    <p className="text-neutral-900 font-medium mt-1">No active method</p>
                                )}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Methods Section */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-none shadow-soft-md h-fit">
                        <CardHeader className="border-b border-neutral-100 pb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-neutral-900">Payment Methods</h2>
                        </CardHeader>
                        <CardBody className="space-y-4">
                            {isOverviewLoading ? (
                                <div className="h-24 bg-neutral-100 animate-pulse rounded-xl" />
                            ) : overviewData?.lastPayment ? (
                                <div className="p-4 border border-primary-200 bg-primary-50/50 rounded-xl flex items-center gap-4 relative overflow-hidden">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <CreditCard className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-neutral-900 capitalize">
                                            {overviewData.lastPayment.cardBrand} •••• {overviewData.lastPayment.last4}
                                        </p>
                                        <p className="text-xs text-neutral-500">Last used on {formatDate(overviewData.lastPayment.date)}</p>
                                    </div>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <Badge variant="success" className="text-xs">Default</Badge>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6 text-neutral-500">
                                    <p className="text-sm">No saved payment methods.</p>
                                </div>
                            )}

                            <Button variant="outline" className="w-full border-dashed">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Card
                            </Button>
                        </CardBody>
                    </Card>
                </div>

                {/* Transaction History Section */}
                <div className="lg:col-span-2">
                    <Card className="border-none shadow-soft-md h-full">
                        <CardHeader className="border-b border-neutral-100 pb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-neutral-900">Transaction History</h2>
                            {/* Optional: Add export button here */}
                        </CardHeader>
                        <CardBody className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold text-xs">
                                        <tr>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Description</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {isHistoryLoading ? (
                                            [...Array(5)].map((_, i) => (
                                                <tr key={i}>
                                                    <td colSpan="5" className="px-6 py-4">
                                                        <div className="h-6 bg-neutral-100 animate-pulse rounded" />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : isHistoryError ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-red-500">
                                                    Failed to load transaction history.
                                                </td>
                                            </tr>
                                        ) : historyData?.data?.length > 0 ? (
                                            historyData.data.map((transaction) => (
                                                <tr key={transaction.id} className="group hover:bg-neutral-50/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-neutral-600">
                                                        {formatDate(transaction.date)}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-neutral-900">
                                                        {transaction.description}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-neutral-900">
                                                        {formatCurrency(transaction.amount)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {getStatusBadge(transaction.status)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {transaction.invoiceUrl ? (
                                                            <a
                                                                href={transaction.invoiceUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center text-neutral-500 hover:text-primary-600 transition-colors"
                                                            >
                                                                <Download className="w-4 h-4 mr-2" />
                                                                <span className="hidden sm:inline">PDF</span>
                                                            </a>
                                                        ) : (
                                                            <span className="text-neutral-400 text-xs">-</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-neutral-500">
                                                    No transactions found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {historyData?.pagination && (
                                <div className="p-4 border-t border-neutral-100 flex items-center justify-between">
                                    <p className="text-sm text-neutral-500">
                                        Showing page {historyData.pagination.currentPage} of {historyData.pagination.totalPages}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={!historyData.pagination.hasPrevPage}
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={!historyData.pagination.hasNextPage}
                                            onClick={() => setPage(p => p + 1)}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Billing;
