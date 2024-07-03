import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db';

export async function GET (request: NextRequest, { params }: { params: { currentUserId: string } }) {
  try {
    const {currentUserId} = params;
    console.log('currentUserId from MyTools API', currentUserId);
    const tools = await prisma.toolCard.findMany({
      where: {
        ownerId: currentUserId,
      },
      include: {
        owner: true,
        ToolCategory: true,
        reviews: true,
      },
    });

    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}
