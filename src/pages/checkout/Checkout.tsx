import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Lock } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import PublicLayout from '../../components/layout/PublicLayout';

const Checkout = () => {
    const navigate = useNavigate();
    const { items, total, clearCart } = useCartStore();
    const { isAuthenticated, user } = useAuthStore();
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            addToast('info', 'Login Required', 'Please login to complete your purchase');
            navigate('/login');
        } else if (items.length === 0) {
            navigate('/search');
        }
    }, [isAuthenticated, items, navigate, addToast]);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            clearCart();
            addToast('success', 'Order Confirmed', 'Your domains have been successfully registered!');
            navigate('/dashboard');
        }, 2000);
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
                                <CardHeader className="border-b border-neutral-100 pb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-success-100 text-success-600 flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-neutral-900">Account Information</h2>
                                            <p className="text-sm text-neutral-500">Logged in as {user?.email}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/settings')}>Edit</Button>
                                </CardHeader>
                            </Card>

                            {/* Payment Method */}
                            <Card className="border-none shadow-soft-md">
                                <CardHeader className="border-b border-neutral-100 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                                            <span className="font-bold">2</span>
                                        </div>
                                        <h2 className="text-lg font-bold text-neutral-900">Payment Method</h2>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <form id="payment-form" onSubmit={handlePayment} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input label="Expiry" placeholder="MM/YY" />
                                                <Input label="CVC" placeholder="123" />
                                            </div>
                                        </div>
                                        <Input label="Cardholder Name" placeholder="John Doe" />

                                        <div className="bg-neutral-50 p-4 rounded-xl flex items-center gap-3 text-sm text-neutral-600">
                                            <Lock className="w-4 h-4 text-success-600" />
                                            <span>Payments are processed securely via Stripe encryption.</span>
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>
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
                                            {items.map((item) => (
                                                <div key={item.id} className="flexjustify-between items-start text-sm">
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-neutral-900">{item.name}</p>
                                                        <p className="text-neutral-500 capitalize">{item.type} • {item.year} Year</p>
                                                    </div>
                                                    <p className="font-medium text-neutral-900">${item.price.toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="h-px bg-neutral-100 my-4" />

                                        <div className="flex justify-between text-sm text-neutral-600">
                                            <span>Subtotal</span>
                                            <span>${total().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-neutral-600">
                                            <span>Taxes (Estimated)</span>
                                            <span>$0.00</span>
                                        </div>

                                        <div className="h-px bg-neutral-100 my-4" />

                                        <div className="flex justify-between items-end mb-6">
                                            <span className="font-bold text-neutral-900">Total Due</span>
                                            <span className="text-2xl font-bold text-primary-600">${total().toFixed(2)}</span>
                                        </div>

                                        <Button
                                            type="submit"
                                            form="payment-form"
                                            variant="primary"
                                            className="w-full text-lg shadow-lg shadow-primary-500/20"
                                            isLoading={isLoading}
                                        >
                                            Complete Purchase
                                        </Button>
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
