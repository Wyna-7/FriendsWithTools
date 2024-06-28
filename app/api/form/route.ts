import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db';

export async function POST (request: NextRequest) {
  try {
    const addedTool = await request.json();
    const {
      id,
      name,
      description,
      location,
      dailyRate,
      weeklyRate,
      monthlyRate,
      picture,
      liked,
      available,
      ownerId,
      toolCategoryId,
    } = addedTool;
    
    const newTool = await prisma.toolCard.create({
      data: {
        id,
        name,
        description,
        location,
        dailyRate,
        weeklyRate,
        monthlyRate,
        picture,
        liked,
        available,
        ownerId,
        toolCategoryId,
      },
    });
    return NextResponse.json({ data: newTool }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
