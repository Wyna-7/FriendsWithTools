import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';


const prisma = new PrismaClient();

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
  try {
    const { toolId, userId, status } = await request.json();
    console.log(toolId, userId, status);

    const newRequest = await prisma.toolRequest.create({
      data: {
        id: uuidv4(),
        status,
        createdAt: new Date(),
        toolId,
        userId,
      },
    });

    return NextResponse.json({ data: newRequest }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
