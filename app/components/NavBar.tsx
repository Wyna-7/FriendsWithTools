'use client';
import React from 'react';
import {
  MagnifyingGlassIcon,
  HeartIcon,
  WrenchScrewdriverIcon,
  EnvelopeIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';



const NavBar = () => {
  const currentPath = usePathname();

  const navItems = [
    { path: '/explore', icon: MagnifyingGlassIcon, label: 'Explore' },
    { path: '/wishlist', icon: HeartIcon, label: 'Wishlist' },
    { path: '/form', icon: PlusCircleIcon, label: 'Form' },
    { path: '/rented', icon: WrenchScrewdriverIcon, label: 'Rented' },
    { path: '/inbox', icon: EnvelopeIcon, label: 'Inbox' },
  ];

  return (
    <div className='fixed bg-white inset-x-0 bottom-0 border-t border-grey h-20  md:top-0 md:bottom-unset md:pt-2 md:z-50 mb:border-hidden w-full '>
      <div className='xl:w-[60%] xl:text-center xl:m-auto'>
        <div className='flex justify-around items-center h-full p-4'>
          {navItems.map(({ path, icon: Icon, label }) => (
            <div key={path}>
              <Link href={path}>
                <div className='flex  flex-col items-center content-center cursor-pointer'>
                  <div>
                    <Icon
                      className={
                        currentPath === path
                          ? 'h-8 w-8 stroke-darkGreen stroke-2'
                          : 'h-8 w-8 stroke-grey stroke-2'
                      }
                    />
                  </div>
                  <div>
                    <span className={`hidden sm:block ${currentPath === path ? 'text-darkGreen' : 'text-grey'}`}>
                      {label}
                    </span>
                  </div>

                </div>
              </Link>
            </div>
          ))}
          <div className='flex flex-col items-center'>
            <UserButton />
            <span className='hidden sm:block text-grey mt-0.5'>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
