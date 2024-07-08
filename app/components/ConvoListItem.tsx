'use client';

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Link from 'next/link';

import { Conversation } from '../lib/types';
import { format } from 'date-fns';

export interface ConversationProps {
  convo: Conversation
};


//TODO: Deconstruct props outside so ternary operators do not take so much space
//TODO: Style so avatar, last msg and time show at the same distance

const ConvoListItem = ({ convo }: ConversationProps) => {

  return (
    <>
      {/* <Link href='/chat' convo={convo}> */}
      <Link href={`/chat/${convo.id}`}>
        <div className='flex row-span-1 row py-[1.25rem] px-[1rem]  border rounded border-solid border-zinc-400 items-center justify-between mb-1'>
          <Avatar className='mr-5'>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='sender-info p-2'>
            <p className='name font-bold'>{convo.sender.name}</p>
            <p className='last-msg text-xs text-slate-500'>{ convo.messages?.findLast(el => el)?.content? convo.messages?.findLast(el => el)?.content : 'Hello!'  }</p>
          </div>
          <div className='last-msg-time text-xs text-slate-400 p-2 text-right ml-12'>{ convo.messages?.findLast(el => el)?.createdAt ? format(convo.messages?.findLast(el => el)?.createdAt, 'H\':\'mm') : '' }</div>
        </div>
      </Link>
    </>
  );
};

export default ConvoListItem;