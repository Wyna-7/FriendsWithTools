import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db';

export async function GET (request: NextRequest) {
  try {
    const conversation = await prisma.conversation.findMany({include: {messages: true, sender: true}});
    return NextResponse.json(conversation);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  console.log('Received POST request');
  try {
    const { content, authorId, conversationId } = await request.json();

    const newMessage = await prisma.message.create({
      data: {
        content,
        authorId,
        conversationId,
      },
    });

    return NextResponse.json({ data: newMessage }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}