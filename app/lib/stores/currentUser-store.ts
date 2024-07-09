// import { create } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { User } from '../types';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/prisma/db';


export type UserState = {
  loggedUser: Partial<User> | null;
  error: string | null;
};

export type UserAction = {
  fetchCurrentUser: () => void;
}


export type CurrentUserStore = UserState & UserAction;

export const defaultInitState: UserState = {
  loggedUser: null,
  error: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<CurrentUserStore>()((set) => ({
    ...initState,
    fetchCurrentUser: async () => {
      const clerkUser = await currentUser();
      try {
        const response = await prisma.user.findUnique({ where: { clerkId: clerkUser?.id } });

        set({ loggedUser: response });
      } catch (error) {

      }

    }
  }));
};
