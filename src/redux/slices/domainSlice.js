import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',
    tldFilter: [],
    priceRange: [0, 1000],
    statusFilter: 'all',
};

const domainSlice = createSlice({
    name: 'domain',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setTldFilter: (state, action) => {
            state.tldFilter = action.payload;
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },
        setStatusFilter: (state, action) => {
            state.statusFilter = action.payload;
        },
        resetFilters: (state) => {
            return initialState;
        },
    },
});

export const { setSearchTerm, setTldFilter, setPriceRange, setStatusFilter, resetFilters } = domainSlice.actions;

export default domainSlice.reducer;
