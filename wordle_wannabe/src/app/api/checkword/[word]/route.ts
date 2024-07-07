import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, context: any){
    const {params} = context;
    try {
        const word = await prisma.word.findUnique({
            where: { word: params.word },
        });
        if(word)
            return NextResponse.json(true)
        else
            return NextResponse.json(false)
    } 
    finally {
        await prisma.$disconnect();
    }
}

