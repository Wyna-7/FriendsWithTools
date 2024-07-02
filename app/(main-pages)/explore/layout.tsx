import CategoriesCarousel from '@/app/components/CategoriesCarousel';
import SearchBar from '@/app/components/SearchBar';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FriendsWithTools - Share your tools',
  description: 'Rent tools from your neighbors',
};

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className='fixed  z-40 w-full bg-white px-4 sm:px-6 lg:px-8'>
        <div className='w-full'>
          <div className='w-full flex justify-center'>
            <SearchBar />
          </div>
          <div className='w-full flex justify-center '>
            <CategoriesCarousel />
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
