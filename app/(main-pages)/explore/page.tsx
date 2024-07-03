'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { ToolCard } from '../../lib/types';
import ToolCardComponent from '../../components/ToolCard';
import uniqBy from 'lodash/uniqBy';
import { useToolCategoryStore } from '@/app/lib/stores/toolCategory-store';
import { useCurrentUserStore } from '@/app/lib/stores/test-store';

const ToolsPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: string;
  };
}) => {

  const [tools, setTools] = useState<ToolCard[]>([]);
  const [allTools, setAllTools] = useState<ToolCard[]>([]);
  const [favTools, setFavTools] = useState<ToolCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const query = searchParams?.query || '';

  const { toolCategory } = useToolCategoryStore((state) => state);
  const { currentUserId, setCurrentUserId } = useCurrentUserStore((state) => state);


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

  useEffect(() => {
    const fetchAllTools = async () => {
      try {

        const response = await fetch(`/api/search?query=${query}`);

        const data: ToolCard[] = await response.json();

        setAllTools(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tools:', error);
        setLoading(false);
      }
    };
    const fetchFavTools = async () => {
      try {
        const response = await fetch(`/api/wishlist/${currentUserId}`);
        const data: ToolCard[] = await response.json();
        data.forEach((el) => {
          el.liked = true;
        });

        setFavTools(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tools:', error);
        setLoading(false);
      }
    };

    fetchAllTools();
    fetchFavTools();

  }, [query, currentUserId]);

  useEffect(() => {
    const updatedTools = uniqBy([...favTools, ...allTools], 'id');
    setTools(updatedTools);
  }, [favTools, allTools]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto px-2 py-2'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-scroll mb-16'>
        { toolCategory === '' ?
          tools
            .map((tool) => (
              <div key={tool.id} className='tool-item'>
                <ToolCardComponent tool={tool} />
              </div>
            )) :
          tools
            .filter((tool) => tool.toolCategoryId === toolCategory)
            .map((tool) => (
              <div key={tool.id} className='tool-item'>
                <ToolCardComponent tool={tool} />
              </div>
            ))}
      </div>
    </div>
  );
};
export default ToolsPage;
