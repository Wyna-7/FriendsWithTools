// Assuming 'use client'; is a typo and it should be 'use strict';
'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ToolCategory, ToolCard } from '../../lib/types';
import { v4 as uuidv4 } from 'uuid';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Form: React.FC = () => {
  const [input, setInput] = useState<ToolCard>({
    name: '',
    description: '',
    location: '',
    dailyRate: 0,
    picture: '', // Added for picture state
    liked: false,
    available: true,
    ownerId: 'f4bb67e8-bcc9-4498-ade3-7cce2b8d65ce',
    id: uuidv4(),
    reviews: [],
    toolCategoryId: '5d20758d-db49-45b6-a9a6-fff4085d5804',
  });
  const [categories, setCategories] = useState<ToolCategory[]>([]);

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
          ? parseInt(value)
          : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const responseData = await response.json();
      console.log('API response:', responseData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const UploadMedia: React.FC<{ onUpload: (url: string) => void }> = ({
    onUpload,
  }) => {
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setMediaFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    };

    const handleFileUpload = () => {
      if (mediaFile) {
        const storageRef = ref(storage, `files/${mediaFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, mediaFile);

        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.error('Upload failed:', error);
          },
          async () => {
            try {
              const mediaUrl = await getDownloadURL(uploadTask.snapshot.ref);
              onUpload(mediaUrl);
              clearUpload();
            } catch (error) {
              console.error('Error getting download URL:', error);
            }
          }
        );
      }
    };

    const clearUpload = () => {
      setMediaFile(null);
      setPreviewUrl('');
    };

    return (
      <div className='file-input-wrapper'>
				        {previewUrl && (
          <div className='media-preview'>
            {mediaFile?.type.startsWith('image/') ? (
              <img
                src={previewUrl}
                className="w-20 h-18 object-cover"
                alt="Preview"
              />
            ) : (
              <video controls width='170px' height='170px'>
                <source src={previewUrl} type={mediaFile?.type || ''} />
              </video>
            )}
          </div>
        )}
        <input
          type='file'
          id='fileInput'
          name='fileInput'
          accept='image/*,video/*'
          onChange={handleFileChange}
          className='hidden'
        />
        <label
          htmlFor="fileInput"
          className="bg-darkGreen p-2 text-white rounded-md cursor-pointer"
        >
								Upload
        </label>

        {mediaFile && (
          <button
            type='button'
            className='bg-darkGreen p-2 text-white text-sm rounded-md'
            onClick={handleFileUpload}
          >
            Upload
          </button>
        )}
      </div>
    );
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='w-full max-w-xs'>
        <div>
          <Link href='/rented'>
            <ChevronLeftIcon className='h-4 w-4' />
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <label htmlFor='name' className='mb-1'>
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
          <label htmlFor='description' className='mb-1'>
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
          <label htmlFor='location' className='mb-1'>
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
            <label htmlFor='dailyRate' className='mb-1'>
              Daily rate
            </label>
            <input
              className='mb-4 border-b-2 w-20'
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
            <label htmlFor='weeklyRate' className='mb-1'>
              Weekly rate
            </label>
            <input
              className='mb-4 border-b-2 w-20'
              id='weeklyRate'
              name='weeklyRate'
              type='number'
              placeholder='€'
              value={input.weeklyRate || ''}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-row justify-between'>
            <label htmlFor='monthlyRate' className='mb-1'>
              Monthly rate
            </label>
            <input
              className='mb-4 border-b-2 w-20'
              id='monthlyRate'
              name='monthlyRate'
              type='number'
              placeholder='€'
              value={input.monthlyRate || ''}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-row justify-between'>
            <label htmlFor='image' className='mb-1'>
              Product image
            </label>
            <UploadMedia
              onUpload={(mediaUrl) => setInput((prevData) => ({ ...prevData, picture: mediaUrl }))}
            />
          </div>
          <div className='flex flex-row justify-between'>
            <label htmlFor='category' className='mb-1'>
              Category
            </label>
            <Select
              onValueChange={(value) => handleSelectChange('toolCategoryId', value)}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Pick a category' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <button
              type='submit'
              className='bg-darkGreen p-2 text-white text-sm rounded-md'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
