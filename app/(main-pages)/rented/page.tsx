'use client';
import React from 'react';
import NavBar from '../../components/NavBar';
import RentRented from '@/app/components/RentRented';
import {  PlusCircleIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';

const RentedPage = () => {

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
