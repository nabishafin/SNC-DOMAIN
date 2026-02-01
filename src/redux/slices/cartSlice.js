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
                state.items.push(item);
                state.isOpen = true;
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

export const { addToCart, removeFromCart, clearCart, toggleCart, setCartOpen } = cartSlice.actions;

// Selector for total
export const selectCartTotal = (state) =>
    state.cart.items.reduce((acc, item) => acc + (item.price * item.year), 0);

export default cartSlice.reducer;
