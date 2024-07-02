'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { ToolCard } from '../../lib/types';
import ToolCardComponent from '../../components/ToolCard';
import uniqBy from 'lodash/uniqBy';


const ToolsPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };

}) => {
  const [tools, setTools] = useState<ToolCard[]>([]);
  const [allTools, setAllTools] = useState<ToolCard[]>([]);
  const [favTools, setFavTools] = useState<ToolCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const query = searchParams?.query || '';



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
        const response = await fetch('/api/wishlist');
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
    
  }, [query]);
  
  
  useEffect(() => { 
    const updatedTools = uniqBy([...favTools, ...allTools], 'id');
    setTools(updatedTools);
  }, [favTools, allTools]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto px-2 py-2'>
      <div className='explore-list grid z-20 grid-cols-1 sm:grid-cols-2 
                      md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20 mb-20'>
        {tools.map((tool) => (
          <div key={tool.id} className='tool-item'>
            <ToolCardComponent tool={tool} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ToolsPage;
