import { create } from 'zustand';

export interface MockDomain {
    id: string;
    name: string;
    tld: string;
    price: number;
    status: 'available' | 'taken' | 'premium';
}

interface FilterState {
    searchTerm: string;
    tldFilter: string[];
    priceRange: [number, number];
    statusFilter: 'all' | 'available' | 'premium';
    setSearchTerm: (term: string) => void;
    setTldFilter: (tlds: string[]) => void;
    setPriceRange: (range: [number, number]) => void;
    setStatusFilter: (status: 'all' | 'available' | 'premium') => void;
    resetFilters: () => void;
}

export const useDomainStore = create<FilterState>((set) => ({
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
