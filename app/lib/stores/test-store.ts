import { create } from 'zustand';

export type State = {
  currentUserId: string;
};

export type Action = {
  setCurrentUserId: (currentUserId: State['currentUserId']) => void;
};

export const useCurrentUserStore = create<State & Action>((set) => ({
  currentUserId: '',
  setCurrentUserId: (currentUserId) => set(() => ({ currentUserId })),
}));