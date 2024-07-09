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
  title: 'EquipMate - Share your tools',
  description: 'Rent tools from your neighbors',
};

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-screen'>
      <div className='fixed mb-10 z-40 w-full bg-white px-4 sm:px-6 md:mt-20 lg:px-8'>
        <div className='w-full flex flex-col items-center justify-center'>
          <div className='w-full flex justify-center'>
            <SearchBar />
          </div>
          <div className='w-9/10 sm: w-3/4 flex justify-center '>
            <CategoriesCarousel />
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
