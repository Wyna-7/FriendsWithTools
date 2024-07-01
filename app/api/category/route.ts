import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db';

export async function GET (request: NextRequest) {
  const url = new URL(request.url);

  const category = url.searchParams.get('category');

  try {
    const tools = await prisma.toolCard.findMany({
      where: {
        name: {
          contains: category || '',
          mode: 'insensitive',
        },
      },
    });

    return NextResponse.json(tools);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}
