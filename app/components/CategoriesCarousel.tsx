'use client';
import React, { useEffect } from 'react';
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


  // useEffect(() => {
  //   if (categories.length > 0) {
  //     categories.forEach((category) => console.log(category.categoryName));
  //   }
  // }, [categories]);

  return (

    <Carousel className='w-full '>
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem
            className=' mt-1.5 text-darkGreen font-semibold cursor-pointer sm: basis-4/4 md:basis-2/8 lg:basis-4/8 pl-8'
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
  );
};

export default CategoriesCarousel;
