import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db';

export async function POST (request: NextRequest) {
  console.log('chat/api')
  try {
    console.log('chat/api')
    const { userId, toolOwnerId } = await request.json();

    let conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            AND: [
              { senderId: userId },
              { receiverId: toolOwnerId },
            ],
          },
          {
            AND: [
              { senderId: toolOwnerId },
              { receiverId: userId },
            ],
          },
        ],
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          senderId: userId,
          receiverId: toolOwnerId,
        },
      });
    }

    return NextResponse.json(conversation, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
  }
}
