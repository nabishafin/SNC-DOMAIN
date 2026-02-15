import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const exists = state.items.find((i) => i.id === item.id);
            if (!exists) {
                // Default year to 1 if not provided
                state.items.push({ ...item, year: item.year || 1 });
                state.isOpen = true;
            }
        },
        updateItemYear: (state, action) => {
            const { id, year } = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (item) {
                item.year = year;
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        setCartOpen: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { addToCart, updateItemYear, removeFromCart, clearCart, toggleCart, setCartOpen } = cartSlice.actions;

// Selector for total
export const selectCartTotal = (state) =>
    state.cart.items.reduce((acc, item) => acc + (item.price * item.year), 0);

export default cartSlice.reducer;
