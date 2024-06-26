import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const ChatView = () => {
  return (
    <>
      <Link href='/inbox'>
        <ChevronLeftIcon className="h-4 w-4" />
      </Link>
      <div>ChatView</div>
    </>
  );
};

export default ChatView;