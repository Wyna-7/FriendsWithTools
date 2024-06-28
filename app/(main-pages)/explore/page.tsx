'use client';
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ToolCard, ToolsReviews } from '../../lib/types';
import ToolCardComponent from '../../components/ToolCard';

const ToolsPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };

}) => {
  const [tools, setTools] = useState<ToolCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const query = searchParams?.query || '';

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch(`/api/tools?query=${query}`);
        const data: ToolCard[] = await response.json();
        setTools(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tools:', error);
        setLoading(false);
      }
    };

    fetchTools();
  }, [query]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch(`/api/search?query=${query}`);
        const data: ToolCard[] = await response.json();
        setTools(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tools:', error);
        setLoading(false);
      }
    };

    fetchTools();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Discover Your Ideal Tool Here!</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {tools.map((tool) => (
            <div key={tool.id} className='tool-item group relative'>
              <Link href={`/tools/${tool.id}`}>
                <ToolCardComponent tool={tool}
                  query={query}/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ToolsPage;
