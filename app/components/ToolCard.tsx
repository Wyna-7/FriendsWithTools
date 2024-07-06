'use client';
import React, { useState } from 'react';
import { ToolCard } from '../lib/types';
import {
  HeartIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useCurrentUserStore } from '../lib/stores/test-store';

export interface ToolCardProps {
  onHeartClick?: (tool: ToolCard) => void;
  tool: ToolCard;
  query?: string
}

const ToolCardComponent = ({ tool, onHeartClick}: ToolCardProps) => {
  const defaultImage = 'https://shorturl.at/PyeKu'; //place holder image

  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUserId } = useCurrentUserStore((state) => state);
  const handleLike = async () => {
    //to instantly change heart color
    tool.liked = tool.liked ? false : true;
    onHeartClick && onHeartClick(tool);
    setIsFavorite(isFavorite ? false : true);
    //to post card to wishlist -> this method handles both add & remove from user wishlist
    try {
      const response = await fetch(`/api/wishlist/${currentUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tool)
      });

      const responseData = await response.json();
      console.log('WishList created', responseData); // leave this one for debugging later :)

    } catch (error) {
      console.error('Error adding to wishlist', error);
    }
  };

  return (
    <div className=" border-slate-50 min-w-80 border-4 p-6 rounded-xl  shadow-slate-400 shadow-xl flex flex-col items-center m-4">
      <Link href={`/tools/${tool.id}`}>
        <div className="relative h-64 rounded-xl overflow-hidden bg-cover w-80 bg-center "
          style={{ backgroundImage: `url(${tool.picture || defaultImage})` }}>
        </div>
      </Link>
      <div className="grid grid-cols-2 gap-4 w-full mt-4 mb-4">
        <div className="flex flex-col flex-nowrap items-start">
          <p className="text-lg font-semibold">{tool.name}</p>
          <p className="text-gray-600">{tool.location}</p>
          <h2 className="text-gray-600">{tool.owner.name} {tool.owner.lastName}</h2>
        </div>
        <div className="flex flex-col items-end justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">€{tool.dailyRate}</h1>
          <div className="relative text-[2rem] hover:cursor-pointer" onClick={handleLike}>{
            tool.liked ?
              <HeartIcon className='size-8 stroke-red-600 fill-red-600' />
              :
              <HeartIcon className='size-8 stroke-black' />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCardComponent;
