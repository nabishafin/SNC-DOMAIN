import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string; // domain name
    price: number;
    year: number; // default 1
    type: 'registration' | 'transfer' | 'hosting';
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setOpen: (open: boolean) => void;
    total: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addToCart: (item) => {
                const items = get().items;
                // Prevent duplicates
                if (items.some(i => i.id === item.id)) return;

                set({ items: [...items, item], isOpen: true });
            },

            removeFromCart: (id) => {
                set({ items: get().items.filter(item => item.id !== id) });
            },

            clearCart: () => {
                set({ items: [] });
            },

            toggleCart: () => {
                set({ isOpen: !get().isOpen });
            },

            setOpen: (open) => {
                set({ isOpen: open });
            },

            total: () => {
                return get().items.reduce((acc, item) => acc + (item.price * item.year), 0);
            }
        }),
        {
            name: 'cart-storage',
        }
    )
);
