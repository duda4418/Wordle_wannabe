import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(){
    try {
        const count = await prisma.word.count(); 
        const randomIndex = Math.floor(Math.random() * count); 
    
        let randomWord = await prisma.word.findFirst({
            skip: randomIndex 
        });
        if(randomWord)
            randomWord.word = randomWord.word.toUpperCase()
        return NextResponse.json(randomWord)
    } 
    finally {
        await prisma.$disconnect();
    }
}

