import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(){
    try {
        const count = await prisma.word.count(); // Get the total count of words
        const randomIndex = Math.floor(Math.random() * count); // Generate a random index
    
        let randomWord = await prisma.word.findFirst({
            skip: randomIndex // Skip to the randomly generated index
        });
        if(randomWord)
            randomWord.word = randomWord.word.toUpperCase()
        return NextResponse.json(randomWord)
    } 
    finally {
        await prisma.$disconnect();
    }
}

