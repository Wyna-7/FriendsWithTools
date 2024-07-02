import React from 'react';
import { ToolCard } from '../lib/types';
import Link from 'next/link';  


export interface ToolCardProps {
  tool: ToolCard;
}

const ToolCardComponent = ({ tool }: ToolCardProps) => {
  const defaultImage = 'https://shorturl.at/PyeKu'; 
  const testUserId = process.env.HARDCODED_ID;
  const handleRentClick = async () => {
    try {
      const response = await fetch('/api/myRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId: tool.id,
          userId: '391442ac-518b-4d4e-a089-e53871ad22b4', // Replace with the actual user ID
          status: 'pending',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      console.log('Request sent successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <header className='flex justify-start pt-4 pl-5 border-grey h-20 shadow-md mb-5 bg-slate-200'>
        <Link href='/explore'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">Tool Information</h1>
        <div style={{ width: '24px' }}></div>
      </header>
      <div className='flex justify-center items-center h-200'>
        <div className='w-full max-w-xs'>
          <div className="bg-white shadow-md rounded px-8 pt-1 pb-8 mt-6 text-sm">
            <div className="relative w-full h-64 rounded-m overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url(${tool.picture || defaultImage})` }}>
              <div className="absolute top-0 right-0 m-2"></div>
            </div>

            <div className="mt-4 p-4 border-b border-gray-300">
              <h1 className="text-base font-semibold">{tool.name}</h1>
              <p className="text-gray-600">{tool.description}</p>
            </div>

            <div className="p-4 border-b border-gray-300">
              <h2 className="text-base font-semibold">Owner Information</h2>
              <p className="text-gray-600">Owner: {tool.ownerId}</p>
            </div>

            <div className="p-4 border-b border-gray-300">
              <h2 className="text-base font-semibold">Rental Terms</h2>
              <p className="text-gray-600">Daily Rate: ${tool.dailyRate}</p>
              <p className="text-gray-600">Weekly Rate: ${tool.weeklyRate}</p>
              <p className="text-gray-600">Monthly Rate: ${tool.monthlyRate}</p>
            </div>

            <div className="p-4 border-b border-gray-300">
              <h2 className="text-base font-semibold">Reviews</h2>
            </div>

            <div className="p-4 border-b border-gray-300">
              <h2 className="text-base font-semibold">Maps</h2>
            </div>

            <div className="p-4">
              <button
                className="bg-lightGreen text-white py-2 px-4 rounded mt-2"
                onClick={handleRentClick}
              >
                Rent
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ToolCardComponent;
