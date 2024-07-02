import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import {
  ClerkProvider,
} from '@clerk/nextjs';
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';
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
}:{
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: '#106E60', },
        signIn: {
          variables: {colorPrimary: '#106E60'}
        }
      }}
    >
      <html lang='en' className='h-full'>
        <body className={`${roboto.className}, h-full`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}