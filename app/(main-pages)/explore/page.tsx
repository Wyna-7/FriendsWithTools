// pages/tools.tsx
import React from 'react';
import Link from 'next/link';
import { ToolCard, ToolsReviews } from '../../lib/types';
import ToolCardComponent from '../../components/ToolCard';

const ToolsPage = () => {
  const tools: ToolCard[] = [
    {
      id: '1',
      name: 'Hammer',
      description: 'A tool used for driving nails',
      location: 'Garage A',
      dailyRate: 5,
      weeklyRate: 30,
      monthlyRate: 100,
      picture: '',
      liked: true,
      available: true,
      reviews: [
        {
          _id: 'review1',
          authorId: 'user1',
          content: 'This tool is very useful!',
          createdAt: new Date('2023-06-20'),
          toolCardId: '1',
        },
      ],
      ownerId: 'owner1',
      toolCategoryId: 'category1',
    },
    {
      id: '1',
      name: 'Hammer',
      description: 'A tool used for driving nails',
      location: 'Garage A',
      dailyRate: 5,
      weeklyRate: 30,
      monthlyRate: 100,
      picture: '',
      liked: true,
      available: true,
      reviews: [
        {
          _id: 'review1',
          authorId: 'user1',
          content: 'This tool is very useful!',
          createdAt: new Date('2023-06-20'),
          toolCardId: '1',
        },
      ],
      ownerId: 'owner1',
      toolCategoryId: 'category1',
    },
    {
      id: '1',
      name: 'Hammer',
      description: 'A tool used for driving nails',
      location: 'Garage A',
      dailyRate: 5,
      weeklyRate: 30,
      monthlyRate: 100,
      picture: '',
      liked: true,
      available: true,
      reviews: [
        {
          _id: 'review1',
          authorId: 'user1',
          content: 'This tool is very useful!',
          createdAt: new Date('2023-06-20'),
          toolCardId: '1',
        },
      ],
      ownerId: 'owner1',
      toolCategoryId: 'category1',
    },
    {
      id: '1',
      name: 'Hammer',
      description: 'A tool used for driving nails',
      location: 'Garage A',
      dailyRate: 5,
      weeklyRate: 30,
      monthlyRate: 100,
      picture: '',
      liked: true,
      available: true,
      reviews: [
        {
          _id: 'review1',
          authorId: 'user1',
          content: 'This tool is very useful!',
          createdAt: new Date('2023-06-20'),
          toolCardId: '1',
        },
      ],
      ownerId: 'owner1',
      toolCategoryId: 'category1',
    },
  ];
  return (
    <div className='container mx-auto px-2 py-2'>
      <h1 className='text-2xl font-bold mb-4 text-center'>
        Discover Your Ideal Tool Here!
      </h1>
      <Link href={'/tools'}>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {tools.map((tool) => (
            <div key={tool.id} className='tool-item'>
              <ToolCardComponent tool={tool} />
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};
export default ToolsPage;
