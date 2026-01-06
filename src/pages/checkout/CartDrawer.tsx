import { X, Trash2, Shield, CreditCard } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import Button from '../../components/ui/Button';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { isOpen, items, removeFromCart, toggleCart, total } = useCartStore();
    const navigate = useNavigate();

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div className={cn(
                "fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                        <h2 className="text-lg font-bold text-neutral-900">Your Cart ({items.length})</h2>
                        <button
                            onClick={toggleCart}
                            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500">
                                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                                    <CreditCard className="w-8 h-8 text-neutral-400" />
                                </div>
                                <p className="font-medium mb-1">Your cart is empty</p>
                                <p className="text-sm">Search for domains to get started</p>
                                <Button
                                    variant="outline"
                                    className="mt-6"
                                    onClick={() => {
                                        toggleCart();
                                        navigate('/search');
                                    }}
                                >
                                    Start Searching
                                </Button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50 hover:bg-white hover:shadow-sm transition-all group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-neutral-900">{item.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded capitalize">{item.type}</span>
                                                <span className="text-xs text-neutral-500">{item.year} Year</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-neutral-200/50 pt-3 mt-3">
                                        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                                            <Shield className="w-3.5 h-3.5 text-success-500" />
                                            Privacy Protection Included
                                        </div>
                                        <span className="font-bold text-lg text-neutral-900">${item.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 border-t border-neutral-100 bg-neutral-50/30">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-neutral-600 font-medium">Total</span>
                                <span className="text-2xl font-bold text-neutral-900">${total().toFixed(2)}</span>
                            </div>
                            <Button
                                variant="primary"
                                className="w-full h-12 text-lg shadow-lg shadow-primary-500/20"
                                onClick={handleCheckout}
                            >
                                Checkout Securely
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
