'use client';
import React from 'react';
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

  return (

    <Carousel className='w-full '>
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem
            className= {'mt-1.5 text-darkGreen font-semibold cursor-pointer sm: basis-4/4 md:basis-2/8 lg:basis-4/8  pl-8'}
            key={category.id}
            onClick={() => handleCategory(category.id)}
          >
            <div className= {`px-2 rounded-sm ${category.id === toolCategory ? 'bg-green-100' : ''}`}>
              {category.categoryName}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CategoriesCarousel;
