import { createStore } from 'zustand/vanilla';

export type Category = {
  id: string;
  categoryName: string | null;
};

export type CategoriesState = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
};

export type CategoriesActions = {
  fetchCategories: () => void;
};

export type CategoriesStore = CategoriesState & CategoriesActions;

export const defaultInitState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const createCategoriesStore = (initState: CategoriesState = defaultInitState) => {
  return createStore<CategoriesStore>()((set) => ({
    ...initState,
    fetchCategories: async () => {
      set({ isLoading: true });
      try {
        const response = await fetch('../../api/categories');
        console.log('fetching the data');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: Category[] = await response.json();
        set({ categories: data, isLoading: false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },
  }));
};

