import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db';
import { currentUser } from '@clerk/nextjs/server';

export async function GET (request: NextRequest ) {
  try {
    console.log('inside get log user');
    const clerkUser = await currentUser();
    console.log('clerkUser',clerkUser?.id);
    const user = await prisma.user.findUnique({where: {clerkId: clerkUser.id }});//.then((data) => console.log(JSON.stringify(data)));

    console.log('user from Prisma', user);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch logged user' }, { status: 500 });
  }
}
