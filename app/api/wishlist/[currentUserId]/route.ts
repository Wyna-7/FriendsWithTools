import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/db';
import { WishList } from '../../../lib/types';


export async function GET (request: NextRequest, { params }: { params: { currentUserId: string } }) {


  try {
    const {currentUserId} = params;
    const wishList: WishList= await prisma.wishList.findFirst({ where: { ownerId: currentUserId}, include: {list: {include: {owner: true}}} });


    return NextResponse.json(wishList.list);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch favorite tools' }, { status: 500 });
  }
}

export async function POST (request: NextRequest, { params }: { params: { currentUserId: string } }) { //?
  let favedTool = await request.json();



  try {
    const {currentUserId} = params;
    console.log('currentUsderId from the route', currentUserId);
    const wishlist: Partial<WishList> = await prisma.wishList.upsert({
      where: {
        ownerId: currentUserId,
      },
      update: {
        list: {
          ...!favedTool.liked ? { disconnect: [{ id: favedTool.id }] }
            :
            { connect: [{ id: favedTool.id }] }
        }
      },
      create: {
        ownerId: currentUserId,
        list: {
          connect: [{id: favedTool.id}]
        }
      },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}

