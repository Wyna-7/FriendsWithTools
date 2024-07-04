import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/db';

export async function GET (request: NextRequest, { params }: { params: { currentUserId: string } }) {
  try {
    const {currentUserId} = params;
    const requests = await prisma.toolRequest.findMany({
      where: {
        userId: currentUserId,
      },
    });
    console.log('hello here', requests);

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch requests:', error);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}