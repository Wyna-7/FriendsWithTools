import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db';
import { ToolRequest } from '@/app/lib/types';


export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
    const requests = await prisma.toolRequest.findMany({
      where: {
        userId: userId,
      },
    });
    console.log('hello here', requests);

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch requests:', error);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}



export async function POST (request: NextRequest) {
  console.log('fgfffffff', await request.json())
  try {
    const { toolId, userId, status } = await request.json();
    
    const newRequest: Partial<ToolRequest> = await prisma.toolRequest.create({
      data: {
        status,
        toolId,
        userId,
      },
    });
    
    console.log('hello')
    return NextResponse.json({ data: newRequest }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
