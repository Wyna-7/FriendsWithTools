'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { ToolCard } from '../../lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useCategoriesStore } from '@/app/lib/providers/categories-store-provider';
import { useCurrentUserStore } from '@/app/lib/stores/test-store';
const Form = () => {

  const {categories} = useCategoriesStore(
    (state) => state,
  );

  const { currentUserId } = useCurrentUserStore((state) => state);
  const [input, setInput] = useState<Partial <ToolCard>>({
    name: '',
    description: '',
    location: '',
    dailyRate: 0,
    picture: '', // Added for picture state
    liked: false,
    available: true,
    ownerId: currentUserId, // actual owner id
    reviews: [],
    toolCategoryId: '',
    toolrequests: [],
    wishlists: [],
    active: true
  });

  const router= useRouter();
  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach(category => console.log(category.categoryName));
    }
    console.log(categories);

  }, [categories]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setInput((prevData) => ({
      ...prevData,
      [name]:
        name === 'dailyRate' || name === 'weeklyRate' || name === 'monthlyRate'
          ? value
            ? parseInt(value)
            : 0
          : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask;
        const mediaUrl = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('Firebase MediaURL', mediaUrl);

        setInput((prevData) => ({
          ...prevData,
          picture: mediaUrl,
        }));

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('Invalid file type. Please select an image.');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('input', input);
    const data = {
      ...input,
    };


    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('API response:', responseData);
      setInput({
        name: '',
        description: '',
        location: '',
        dailyRate: 0,
        weeklyRate: 0,
        monthlyRate: 0,
        liked: false,
        available: true,
        ownerId: currentUserId,
        reviews: [],
        toolCategoryId: '',
        toolrequests: [],
        wishlists: [],
        active: true
      });
      router.push('/rented');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <header className=' flex items-center justify-center inset-x-0 top-0 border-t  border-grey h-20 shadow-md mb-1 bg-darkGreen'>
        <h1 className='text-center text-xl font-bold text-white'>Post a new tool</h1>
      </header>
      <div className='flex h-[90%] justify-center max-h-screen' >

        <div className='md:w-2/3 lg: max-w-lg '>

          <form
            onSubmit={handleSubmit}
            className='flex flex-col bg-white  px-8 pt-8 pb-8 mt-10 mb-20 lg:mt-40
            '
          >
            <label htmlFor='name' className='mb-1 mt-1'>
            Product Name
            </label>
            <input
              className='mb-4 border-b-2'
              id='name'
              name='name'
              type='text'
              placeholder='What do you wish to rent?'
              value={input.name}
              onChange={handleChange}
              required
            />
            <label htmlFor='description' className='mb-1 mt-1'>
            Product Description
            </label>
            <input
              className='mb-4 border-b-2'
              id='description'
              name='description'
              type='text'
              placeholder='Describe your product'
              value={input.description}
              onChange={handleChange}
              required
            />
            <label htmlFor='location' className='mb-1 mt-1'>
            Pick up address
            </label>
            <input
              className='mb-4 border-b-2'
              id='location'
              name='location'
              type='text'
              placeholder='Where to pick up your tool?'
              value={input.location}
              onChange={handleChange}
              required
            />
            <div className='flex flex-row justify-between'>
              <label htmlFor='dailyRate' className='mb-1 mt-1'>
              Daily rate
              </label>
              <input
                className='mb-4 border-b-2 w-20 mt-1'
                id='dailyRate'
                name='dailyRate'
                type='number'
                placeholder='€'
                value={input.dailyRate}
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-row justify-between'>
              <label htmlFor='weeklyRate' className='mb-1 mt-1'>
              Weekly rate
              </label>
              <input
                className='mb-4 border-b-2 w-20 mt-1'
                id='weeklyRate'
                name='weeklyRate'
                type='number'
                placeholder='€'
                value={input.weeklyRate || ''}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-row justify-between mt-1'>
              <label htmlFor='monthlyRate' className='mb-1'>
              Monthly rate
              </label>
              <input
                className='mb-4 border-b-2 w-20 '
                id='monthlyRate'
                name='monthlyRate'
                type='number'
                placeholder='€'
                value={input.monthlyRate || ''}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col justify-between'>
              <label htmlFor='image' className='mb-4'>
              Product image
              </label>
              <Input id="picture" type="file" onChange={handleFileChange} className='bg-darkGreen p-2 text-white text-sm rounded-md pl-8'/>
            </div>
            <div className='flex flex-row justify-between mt-4 mb-10'>
              <label htmlFor='category' className='mb-1 mt-5'>
              Category
              </label>

              <Select
                onValueChange={(value) =>
                  handleSelectChange('toolCategoryId', value)
                }
                name='toolCategoryId'
                value={input.toolCategoryId}
              >
                <SelectTrigger className='w-45 mt-3'>
                  <SelectValue placeholder='Select a category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center justify-center  '>
              <button
                type='submit'
                className='bg-darkGreen pt-4 pb-4 pl-20 pr-20 text-white text-sm rounded-md'
              >
              Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
