'use client';
import React, {useEffect, useState} from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useCategoriesStore } from '../lib/providers/categories-store-provider';



const CategoriesCarousel = () => {
  const {categories} = useCategoriesStore(
    (state) => state,
  );

  const [toolCategory, setToolCategory] = useState('');

  const handleCategory = (categoryId) => {
    console.log('category:', categoryId);
    setToolCategory(categoryId);
  };


  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach(category => console.log(category.categoryName));
    }
  }, [categories]);



  return (
    <div>
      <Carousel className="w-full"
      >
        <CarouselContent>
          {
            categories.map((category) =>(
              <CarouselItem className="text-darkGreen font-semibold  sm:basis-2/3 md:basis-1/2 lg:basis-1/3  cursor-pointer"
                key={category.id} onClick={() => handleCategory(category.id)}>
                {category.categoryName}</CarouselItem>

            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoriesCarousel;