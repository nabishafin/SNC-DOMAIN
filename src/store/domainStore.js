import { create } from 'zustand';

export const useDomainStore = create((set) => ({
    searchTerm: '',
    tldFilter: [],
    priceRange: [0, 1000],
    statusFilter: 'all',

    setSearchTerm: (term) => set({ searchTerm: term }),
    setTldFilter: (tlds) => set({ tldFilter: tlds }),
    setPriceRange: (range) => set({ priceRange: range }),
    setStatusFilter: (status) => set({ statusFilter: status }),
    resetFilters: () => set({
        searchTerm: '',
        tldFilter: [],
        priceRange: [0, 1000],
        statusFilter: 'all'
    })
}));
