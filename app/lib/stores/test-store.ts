import { create } from 'zustand';
import { User } from '../types';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/prisma/db';


export const createUserSlice = (set: (arg0: { loggedUser: Partial <User> | null }) => void) => ({
  loggedUser: null,
  fetchCurrentUser: async () => {
    const clerkUser = await currentUser();
    console.log('clerk user',clerkUser);
    try {
      const response = await prisma.user.findUnique({where: {clerkId: clerkUser?.id}});
      set({ loggedUser: response});
    } catch (error) {
      console.log(error);
    }
  }
});

export const categorySlice = (set: (arg0: { toolCategory: string | null }) => void) =>
  ({
    toolCategory: '',
    setToolCategory: (toolCategory : any) => set(({ toolCategory })),
  });


export const useBoundStore = create((...a) => ({
  ...createUserSlice(...a),
  ...categorySlice(...a),
}));
