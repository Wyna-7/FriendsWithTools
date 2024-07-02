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

const CategoriesCarousel = () => {
  const { categories } = useCategoriesStore((state) => state);

  // const [toolCategory, setToolCategory] = useState('');
  const { toolCategory, setToolCategory, resetToolCategory } = useToolCategoryStore((state) => state);
  console.log('hello', toolCategory);
  const handleCategory = (categoryId: string) => {
    console.log('category id', categoryId);
    setToolCategory(categoryId);
  };

  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach((category) => console.log(category.categoryName));
    }
  }, [categories]);

  return (
    <div>
      <button onClick={resetToolCategory} className='mb-4 p-2 bg-red-500 text-white'>
        Reset Category
      </button>
      <Carousel className='w-full'>
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem
              className='text-darkGreen font-semibold  sm:basis-3/3 md:basis-1/2 lg:basis-1/3  cursor-pointer'
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
