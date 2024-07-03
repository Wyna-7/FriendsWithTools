import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/db';
import { v4 as uuidv4 } from 'uuid';


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
