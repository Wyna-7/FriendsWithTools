'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { ToolCategory, ToolCard } from '../../lib/types';
import { v4 as uuidv4 } from 'uuid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const Form = () => {
  const [input, setInput] = useState<ToolCard>({
    name: '',
    description: '',
    location: '',
    dailyRate: 0,
    picture: '', // Added for picture state
    liked: false,
    available: true,
    ownerId: '04e55ea7-642c-46f3-8e51-3a09edb2ded2', // Replace with the actual user ID
    id: uuidv4(),
    reviews: [],
    toolCategoryId: '',
    toolrequests: [],
    wishlists: []

  });
  const [categories, setCategories] = useState<ToolCategory[]>([]);
  //const [image, setImage] = useState<File | null>(null); // State to store the selected image file
  const router= useRouter();
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: ToolCategory[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategory();
  }, []);

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

        // setImage(file); // Set the file to state for later use if needed

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
        ownerId: '04e55ea7-642c-46f3-8e51-3a09edb2ded2', // Replace with the actual 
        id: uuidv4(),
        reviews: [],
        toolCategoryId: '',
        toolrequests: [],
        wishlists: []
      });
      router.push('/rented');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <header className='flex justify-start pt-4 pl-5  border-grey h-20 shadow-md mb-5 bg-slate-200 '>
        <Link href='/rented'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>
        {/*<Link href='/rented'>
            <ChevronLeftIcon className='h-4 w-4' />         Use this icon as a back button everywhere in app?
          </Link>*/}
      </header>
      <div className='flex justify-center items-center  h-200'>

        <div className='w-full max-w-xs'>

          <form
            onSubmit={handleSubmit}
            className='flex flex-col bg-white shadow-md rounded px-8 pt-1 pb-8 mt-6 '
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
