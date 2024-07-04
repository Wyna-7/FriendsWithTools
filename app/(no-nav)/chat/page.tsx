'use client';
import React from 'react';
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Conversation } from '@/app/lib/types';

interface ConversationProps {
  convo: Conversation;
}
//TODO Modify Conversation type & schema to add FK for the tool.
//toolId should give access to the tool's
//picture, name, dailyrate etc
//TODO write POST method for messages, when posted the chatview messages should re-render to show the new message
const ChatView = ({ convo }: ConversationProps) => {
  const postMessage = () => {};

  return (
    <>
      <header className=' flex items-center justify-start inset-x-0 top-0  bg-darkGreen h-20 shadow-md mb-1 '>
        <Link href='/inbox'>
          <ChevronLeftIcon className='h-9 w-9 m-4 text-white' />
        </Link>
        <img
          src='https://picsum.photos/50'
          className='rounded'
          alt={'tool picture'}
        />
        <div className='chat-info flex-col ml-6 text-white'>
          <p className='font-bold'>Daily rate here</p>
          <p>Tool name here</p>
        </div>
      </header>
      <div className='chat-view flex-col overflow-scroll h-[43rem] w-full p-2'>
        <div className='flex justify-end'>
          {' '}
          {/* messages from logged user authorId here */}
          <div className='message-right w-fit min-w-[10rem] rounded-md bg-green-100 m-4 p-2'>
            Hello
          </div>
        </div>
        <div className='flex justify-start'>
          {' '}
          {/* messages from other user authorId here */}
          <div className='message-left  w-fit min-w-[10rem] rounded-md bg-blue-100 m-4 p-2'>
            Hello
          </div>
        </div>
      </div>
      <footer className=' fixed bg-white inset-x-0 bottom-0 border-t  border-grey h-20 shadow-md p-2'>
        <div className='flex w-full max-w-sm items-center space-x-2 mt-3'>
          <Input type='message' placeholder='Write something' />
          <Button type='submit' onSubmit={postMessage}>
            <PaperAirplaneIcon className='h-5 w-5' />
          </Button>
        </div>
      </footer>
    </>
  );
};

export default ChatView;
