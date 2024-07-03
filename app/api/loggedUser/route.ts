import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db';
import { currentUser } from '@clerk/nextjs/server';

export async function GET (request: NextRequest, {params}: {params: {id:string}} ) {
  try {
    const clerkUser = await currentUser();
    const user = prisma.user.findUnique({where: {clerkId: clerkUser?.id }});;
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}
