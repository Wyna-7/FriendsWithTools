import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/db'; 

export async function GET (request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
  }

  try {
    const tool = await prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: {
          include: {
            author: true, 
            conversation: {
              include: {
                sender: true,
                receiver: true,
              }
            },
          },
        },
        sender: true, 
      },
    });

    if (!tool) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    return NextResponse.json(tool);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tool' }, { status: 500 });
  }
}

