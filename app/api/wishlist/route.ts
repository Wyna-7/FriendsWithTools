import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/db'; 
import { WishList } from '../../lib/types';


export async function GET (request: NextRequest) {
 
  try {
    const wishList: WishList= await prisma.wishList.findFirst({ where: { ownerId: process.env.CURRENT_USERID }, include: {list: true} });

    
    return NextResponse.json(wishList.list);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch favorited tools' }, { status: 500 });
  }
}

export async function POST (request: NextRequest) { //?
  let favedTool = await request.json();
  


  try {
    const wishlist: Partial<WishList> = await prisma.wishList.upsert({
      where: {
        ownerId: process.env.CURRENT_USERID,
      },
      update: {
        list: {
          ...!favedTool.liked ? { disconnect: [{ id: favedTool.id }] }
            :
            { connect: [{ id: favedTool.id }] }
        }
      },
      create: {
        ownerId: process.env.CURRENT_USERID,
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

