'use client'

import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from 'next/link'

const ConvoListItem = () => {


  return (
    <>
      <Link href='/chat'>
        <div className='flex row-span-1 row py-[1.25rem] px-[1rem]  border rounded border-solid border-zinc-400 items-center justify-center mb-1'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='sender-info p-2'>
            <p className='name font-bold'>Morty</p>
            <p className='last-msg text-xs text-slate-500'>I am interested in renting.......</p>
          </div>
          <div className='last-msg-time text-xs text-slate-400 p-2 text-center ml-12'>12:30pm</div>
        </div>
      </Link>
      <Link href='/chat'>
        <div className='flex row-span-1 row py-[1.25rem] px-[1rem]  border rounded border-solid border-zinc-400 items-center justify-center mb-1' >
          <Avatar>
            <AvatarImage src="https://picsum.photos/100" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='sender-info p-2'>
            <p className='name font-bold'>Bob</p>
            <p className='last-msg text-xs text-slate-500'>The red drill tomorrow morning</p>
          </div>
          <div className='last-msg-time text-xs text-slate-400 p-2 text-center ml-12'>12:45pm</div>
        </div>
      </Link>
      <Link href='/chat'>
        <div className='flex row-span-1 row py-[1.25rem] px-[1rem]  border rounded border-solid border-zinc-400 items-center justify-center mb-1' >
          <Avatar>
            <AvatarImage src="https://picsum.photos/123" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='sender-info p-2'>
            <p className='name font-bold'>Carla</p>
            <p className='last-msg text-xs text-slate-500'>The red drill tomorrow afternnon?</p>
          </div>
          <div className='last-msg-time text-xs text-slate-400 p-2 text-center ml-12'>10:45pm</div>
        </div>
      </Link>
    
    </>
  )
}

export default ConvoListItem