'use client';
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useCategoriesStore } from '../lib/providers/categories-store-provider';
import { useToolCategoryStore } from '../lib/stores/toolCategory-store';
import { ToolCard } from '../lib/types';

const CategoriesCarousel = () => {
  const { categories } = useCategoriesStore((state) => state);

  // const [toolCategory, setToolCategory] = useState('');
  const { toolCategory, setToolCategory} = useToolCategoryStore((state) => state);
  console.log('hello', toolCategory);
  const handleCategory = (categoryId: string) => {
    console.log('category id', categoryId);
    if (toolCategory === categoryId) {
      setToolCategory('');
    } else {
      setToolCategory(categoryId);
    }
  };


  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach((category) => console.log(category.categoryName));
    }
  }, [categories]);

  return (
    <div>
      <Carousel className='w-full '>
        <CarouselContent className="-ml-2 md:ml-10">
          {categories.map((category) => (
            <CarouselItem
              className='text-darkGreen font-semibold pl-1  md:basis-1/3 lg:basis-1/3  cursor-pointer'
              key={category.id}
              onClick={() => handleCategory(category.id)}
            >
              {category.categoryName}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoriesCarousel;
