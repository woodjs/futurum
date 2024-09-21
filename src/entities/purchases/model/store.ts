import { create } from 'zustand';
import { IPurchaseParams } from '../api';

interface IPurchaseState {
    filters?: IPurchaseParams;
    setFilters: (filters: IPurchaseParams) => void;
    setFilter: <T extends keyof IPurchaseParams>(key: T, value: IPurchaseParams[T]) => void;
    removeFilter: (key: keyof IPurchaseParams) => void
}

export const usePurchaseStore = create<IPurchaseState>((set) => ({
    filters: {},
    setFilters: (filters) => set({ filters }),
    setFilter: <T extends keyof IPurchaseParams>(key: T, value: IPurchaseParams[T]) => set((state) => ({
        filters: {
            ...state.filters,
            [key]: value
        }
    })),
    removeFilter: (key: keyof IPurchaseParams) => set((state) => {
        const { filters } = state;
        if (filters) delete filters[key];

        return {
            filters: filters ? { ...filters } : undefined
        }

    }),
}))