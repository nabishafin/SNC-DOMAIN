import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircle, Lock } from 'lucide-react';
import { clearCart, selectCartTotal } from '../../redux/slices/cartSlice';
import { useToast } from '../../context/ToastContext';
import { useRegisterDomainMutation } from '../../redux/features/domain/domainApi';
import { useInitiatePaymentMutation } from '../../redux/features/payment/paymentApi';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import PublicLayout from '../../components/layout/PublicLayout';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);
    const total = useSelector(selectCartTotal);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { addToast } = useToast();

    // Mutations
    const [registerDomain, { isLoading: isRegistering }] = useRegisterDomainMutation();
    const [initiatePayment, { isLoading: isInitiatingPayment }] = useInitiatePaymentMutation();

    const [step, setStep] = useState('review'); // review -> payment
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            addToast('info', 'Login Required', 'Please login to complete your purchase');
            navigate('/login');
        } else if (items.length === 0) {
            navigate('/search');
        }
    }, [isAuthenticated, items, navigate, addToast]);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (items.length === 0) return;

        try {
            // For now, we handle registration domain-by-domain as per the API signature
            // Taking the first item to register
            const firstItem = items[0];
            const response = await registerDomain({
                domainName: firstItem.name,
                years: firstItem.year || 1
            }).unwrap();

            if (response.success) {
                setOrderData(response);
                setStep('payment');
                addToast('success', 'Order Created', response.message);
            }
        } catch (err) {
            console.error('Registration failed:', err);
            addToast('error', 'Registration Failed', err?.data?.message || 'Could not create registration order');
        }
    };

    const handleInitiatePayment = async () => {
        if (!orderData?.orderId) return;

        try {
            const response = await initiatePayment({
                orderId: orderData.orderId
            }).unwrap();

            if (response.success && response.checkoutUrl) {
                // Redirect to Stripe
                window.location.href = response.checkoutUrl;
            }
        } catch (err) {
            console.error('Payment initiation failed:', err);
            addToast('error', 'Payment Failed', err?.data?.message || 'Could not initiate payment');
        }
    };

    if (!isAuthenticated || items.length === 0) return null;

    return (
        <PublicLayout>
            <div className="bg-neutral-50 min-h-screen py-12">
                <div className="container-padding max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-neutral-900">Secure Checkout</h1>
                        <p className="text-neutral-500 mt-1">Complete your purchase to secure your domains.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Forms */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Account Info */}
                            <Card className="border-none shadow-soft-md">
                                <CardHeader className="border-b border-neutral-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-success-100 text-success-600 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <h2 className="text-lg font-bold text-neutral-900">Account Information</h2>
                                            <p className="text-sm text-neutral-500 truncate">Logged in as {user?.email}</p>
                                        </div>
                                    </div>
                                    {step === 'review' && (
                                        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/settings')} className="w-full sm:w-auto">Edit</Button>
                                    )}
                                </CardHeader>
                            </Card>

                            {step === 'review' ? (
                                <Card className="border-none shadow-soft-md">
                                    <CardHeader className="border-b border-neutral-100 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                                                <span className="font-bold">2</span>
                                            </div>
                                            <h2 className="text-lg font-bold text-neutral-900">Review Items</h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="space-y-4">
                                            {items.map((item) => (
                                                <div key={item.id} className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-bold text-neutral-900">{item.name}</h3>
                                                            <p className="text-sm text-neutral-500 capitalize">{item.type} • {item.year} Year</p>
                                                        </div>
                                                        <span className="font-bold text-neutral-900">${item.price.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="bg-primary-50 p-4 rounded-xl flex items-center gap-3 text-sm text-primary-900">
                                                <Lock className="w-4 h-4 text-primary-600" />
                                                <span>Your registration details will be based on your account profile.</span>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ) : (
                                <Card className="border-none shadow-soft-md border-primary-500 border-2">
                                    <CardHeader className="border-b border-neutral-100 pb-4 bg-primary-50/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                            <h2 className="text-lg font-bold text-neutral-900">Order Confirmed</h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="space-y-6">
                                        <div className="text-center py-4">
                                            <p className="text-neutral-500 mb-2">Order ID: <span className="font-mono text-neutral-900 font-bold">{orderData?.orderId}</span></p>
                                            <div className="text-4xl font-black text-neutral-900">${orderData?.amount?.toFixed(2)}</div>
                                            <p className="text-sm text-neutral-500">Total amount to be paid</p>
                                        </div>

                                        <div className="p-4 bg-neutral-50 rounded-xl space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-500">Domain</span>
                                                <span className="font-bold text-neutral-900">{items[0]?.name}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-500">Registration Period</span>
                                                <span className="font-bold text-neutral-900">{items[0]?.year} Year</span>
                                            </div>
                                        </div>

                                        <Button
                                            variant="primary"
                                            className="w-full h-14 text-xl shadow-xl shadow-primary-500/30"
                                            onClick={handleInitiatePayment}
                                            isLoading={isInitiatingPayment}
                                        >
                                            Pay Now with Stripe
                                        </Button>
                                    </CardBody>
                                </Card>
                            )}
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <Card className="border-none shadow-soft-lg ring-1 ring-neutral-100">
                                    <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 pb-4">
                                        <h2 className="text-lg font-bold text-neutral-900">Order Summary</h2>
                                    </CardHeader>
                                    <CardBody className="space-y-4">
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm text-neutral-600">
                                                <span>Subtotal</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-neutral-600">
                                                <span>Taxes (Estimated)</span>
                                                <span>$0.00</span>
                                            </div>
                                        </div>

                                        <div className="h-px bg-neutral-100 my-4" />

                                        <div className="flex justify-between items-end mb-6">
                                            <span className="font-bold text-neutral-900">Total Due</span>
                                            <span className="text-2xl font-bold text-primary-600">${total.toFixed(2)}</span>
                                        </div>

                                        {step === 'review' && (
                                            <Button
                                                onClick={handleRegister}
                                                variant="primary"
                                                className="w-full h-12 text-lg shadow-lg shadow-primary-500/20"
                                                isLoading={isRegistering}
                                            >
                                                Complete Registration
                                            </Button>
                                        )}
                                    </CardBody>
                                </Card>

                                <div className="text-center text-xs text-neutral-400">
                                    <p>By completing this purchase, you agree to our Terms of Service.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default Checkout;
