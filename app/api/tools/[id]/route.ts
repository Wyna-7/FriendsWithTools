import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/db'; 

export async function GET (request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
  }

  try {
    const tool = await prisma.toolCard.findUnique({
      where: { id },
      include: {
        reviews: true,
        owner: true,
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



export async function PATCH (request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const updatedTool = await prisma.toolCard.update({
      where: { id },
      data: { active: false },
    });

    return NextResponse.json({ data: updatedTool }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

