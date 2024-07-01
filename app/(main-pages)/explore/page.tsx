'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { ToolCard } from '../../lib/types';
import ToolCardComponent from '../../components/ToolCard';
import uniqBy from 'lodash/uniqBy';
import { ToolCategory } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

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

  // const searchParamTest = useSearchParams();
  const query = searchParams?.query || '';
  const category = searchParams?.category || '';
  console.log(query);
  console.log('categories',category);
  // const search = searchParamTest.get('query');
  // console.log('search', query);


  useEffect(() => {
    const fetchAllTools = async () => {
      try {
        // const response = await fetch(`/api/search?query=${search}`);
        const response = await fetch(`/api/search?query=${query}`);
        console.log(response);
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

    // const fetchCategory = async () => {
    //   try {
    //     const response = await fetch('/api/category={category}');
    //     const data: ToolCard[] = await response.json();
    //     setToolCategory(data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Failed to fetch tools:', error);
    //     setLoading(false);
    //   }
    // };


    fetchAllTools();
    fetchFavTools();
    // fetchCategory();

  }, [query, category]);



  useEffect(() => {
    const updatedTools = uniqBy([...favTools, ...allTools], 'id');
    setTools(updatedTools);
  }, [favTools, allTools]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto px-2 py-2'>
      <h1 className='text-2xl font-bold mb-4 text-center'>
        Discover Your Ideal Tool Here!
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-scroll mb-16'>
        {tools
          .filter((tool) =>  tool.toolCategoryId === '0804c1b1-249e-4103-8065-cfbc7e2515dd')
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
