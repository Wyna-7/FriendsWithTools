'use client';
import React, { useEffect } from 'react';
import RentRented from '@/app/components/RentRented';
import {  PlusCircleIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useCurrentUserStore } from '@/app/lib/stores/test-store';

const RentedPage = () => {

  const {setCurrentUserId } = useCurrentUserStore((state) => state);

  useEffect(() => {
    const fetchCurrentUser =  async () => {
      try {
        const response = await fetch('/api/loggedUser');
        const data = await response.json();
        setCurrentUserId(data.id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrentUser();
  },[]);

  return (
    <div>
      <div>
        <RentRented />
        <div className='flex justify-centre items-centre mb-30 fixed'>
          <Link href={'/form'} >
            <PlusCircleIcon className='z-50 w-20 h-20'/>
          </Link>
        </div>
      </div >
    </div>
  );
};

export default RentedPage;
