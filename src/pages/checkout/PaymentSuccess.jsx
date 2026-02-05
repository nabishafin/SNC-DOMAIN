import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CheckCircle, Globe, Calendar, CreditCard, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useGetPaymentStatusQuery } from '../../redux/features/payment/paymentApi';
import { clearCart } from '../../redux/slices/cartSlice';
import PublicLayout from '../../components/layout/PublicLayout';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const PaymentSuccess = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { data: statusData, isLoading, isError } = useGetPaymentStatusQuery(orderId);

    useEffect(() => {
        if (statusData?.success && statusData?.status === 'COMPLETED') {
            dispatch(clearCart());
        }
    }, [statusData, dispatch]);

    if (isLoading) {
        return (
            <PublicLayout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                    <p className="text-neutral-500 font-medium">Verifying your payment...</p>
                </div>
            </PublicLayout>
        );
    }

    if (isError || !statusData?.success) {
        return (
            <PublicLayout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center container-padding">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Payment Verification Failed</h1>
                    <p className="text-neutral-500 mb-8 max-w-md text-center">
                        We couldn't verify your payment status. If you believe this is an error, please contact support with your Order ID: <span className="font-mono text-neutral-900 font-bold">{orderId}</span>
                    </p>
                    <Link to="/dashboard">
                        <Button variant="primary">Go to Dashboard</Button>
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    const { order } = statusData;

    return (
        <PublicLayout>
            <div className="bg-neutral-50 min-h-screen py-16">
                <div className="container-padding max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-success-600" />
                        </div>
                        <h1 className="text-4xl font-black text-neutral-900 mb-2">Purchase Successful!</h1>
                        <p className="text-lg text-neutral-500">Your domain has been registered and is now active.</p>
                    </div>

                    <Card className="border-none shadow-soft-xl overflow-hidden">
                        <div className="bg-primary-600 h-2" />
                        <CardBody className="p-8">
                            <div className="flex flex-col md:flex-row justify-between gap-8 mb-10 pb-8 border-b border-neutral-100">
                                <div>
                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Order Details</p>
                                    <h2 className="text-xl font-bold text-neutral-900">{order?.domainName}</h2>
                                    <div className="flex items-center gap-2 text-sm text-neutral-500 mt-1">
                                        <Globe className="w-4 h-4" />
                                        <span>New Registration</span>
                                        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                                        <span>{order?.years} Year</span>
                                    </div>
                                </div>
                                <div className="md:text-right">
                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Amount Paid</p>
                                    <div className="text-3xl font-black text-primary-600">${order?.amount?.toFixed(2)}</div>
                                    <p className="text-sm text-neutral-500 mt-1 uppercase">{order?.currency || 'USD'} • Stripe</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-neutral-100 rounded-lg">
                                            <Calendar className="w-5 h-5 text-neutral-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500">Transaction Date</p>
                                            <p className="font-bold text-neutral-900">{new Date(order?.updatedAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-neutral-100 rounded-lg">
                                            <CreditCard className="w-5 h-5 text-neutral-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500">Order ID</p>
                                            <p className="font-mono text-sm font-bold text-neutral-900">{order?._id}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-success-50 p-6 rounded-2xl border border-success-100">
                                    <h3 className="font-bold text-success-900 mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Next Steps
                                    </h3>
                                    <ul className="text-sm text-success-800 space-y-2">
                                        <li>• Your domain is ready to use</li>
                                        <li>• You can now manage DNS records</li>
                                        <li>• Check your email for more details</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/dashboard/domains" className="flex-1">
                                    <Button variant="primary" className="w-full h-12 shadow-lg shadow-primary-500/20">
                                        Manage Domains
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                                <Link to="/search" className="flex-1">
                                    <Button variant="outline" className="w-full h-12">
                                        Register Another
                                    </Button>
                                </Link>
                            </div>
                        </CardBody>
                    </Card>

                    <div className="text-center mt-12">
                        <p className="text-neutral-400 text-sm">Need help? <Link to="/contact" className="text-primary-600 font-bold hover:underline">Contact Support</Link></p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default PaymentSuccess;
