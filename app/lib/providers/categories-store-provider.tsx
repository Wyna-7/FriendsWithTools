'use client';

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react';
import { useStore } from 'zustand';

import { type CategoriesStore, createCategoriesStore } from '../stores/categories-store';

export type CategoriesStoreApi = ReturnType<typeof createCategoriesStore>

export const CategoriesStoreContext = createContext<CategoriesStoreApi | undefined>(
  undefined,
);

export interface CategoriesStoreProviderProps {
  children: ReactNode
}


export const CategoriesStoreProvider = ({ children }: CategoriesStoreProviderProps) => {
  const storeRef = useRef<CategoriesStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCategoriesStore();
  }

  useEffect(() => {
    storeRef.current?.getState().fetchCategories();
  }, []);

  return (
    <CategoriesStoreContext.Provider value={storeRef.current}>
      {children}
    </CategoriesStoreContext.Provider>
  );
};

export const useCategoriesStore = <T,>(
  selector: (store: CategoriesStore) => T,
): T => {
  const categoriesStoreContext = useContext(CategoriesStoreContext);

  if (!categoriesStoreContext ) {
    throw new Error('useCategoriesStore must be used within CategoriesStoreProvider');
  }

  return useStore(categoriesStoreContext, selector);
};