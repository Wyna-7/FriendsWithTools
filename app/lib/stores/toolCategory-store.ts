import { create } from 'zustand';

export type State = {
  toolCategory: string;
};

export type Action = {
  setToolCategory: (toolCategory: State['toolCategory']) => void;
};


export const useToolCategoryStore = create<State & Action>((set) => ({
  toolCategory: '',
  setToolCategory: (toolCategory) => set(() => ({ toolCategory })),
}));