import React from 'react';
import { ToolCard as ToolType } from '../lib/types';
import Liked from './Liked';

export interface ToolCardProps {
  tool: ToolType;
  query: string
}

const ToolCardComponent = ({ tool, query }: ToolCardProps) => {
  const defaultImage = 'https://shorturl.at/PyeKu'; //place holder image
  //I have switched the place of defaultImage to show first, for now.
  return (
    <div className=' border-slate-50 border-4 p-4 rounded-xl shadow-md flex flex-col items-center m-4'>
      <div
        className='relative h-64 rounded-m overflow-hidden bg-cover w-80 bg-center '
        style={{ backgroundImage: `url(${ tool.picture|| defaultImage})` }}
      >
        <div className='relative'>
          <Liked />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4 w-full mt-4'>
        <div className='flex flex-col items-start'>
          <p className='text-lg font-semibold'>{tool.name}</p>
          <p className='text-gray-600'>{tool.location}</p>
          <h2 className='text-gray-600'>{tool.ownerId}</h2>
        </div>
        <div className='flex items-center justify-end'>
          <h1 className='text-2xl font-semibold text-gray-900 -mt-2'>
            ${tool.dailyRate}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ToolCardComponent;
