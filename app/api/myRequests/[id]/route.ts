import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/db';

export async function DELETE (request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const deletedRequest = await prisma.toolRequest.delete({
      where: { id },
    });

    return NextResponse.json({ data: deletedRequest }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    const updatedRequest = await prisma.toolRequest.update({
      where: { id: String(id) },
      data: { status },
    });

    return NextResponse.json({ data: updatedRequest }, { status: 200 });
  } catch (error) {
    console.error('Error updating request status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}