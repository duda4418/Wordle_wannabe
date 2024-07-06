
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'data.json');
  const rawData = fs.readFileSync(filePath);
  const words = JSON.parse(rawData);

  for (const word of words) {
    await prisma.word.create({
      data: {
        word: word.word,
        length: word.length
      }
    });
  }

  console.log('Data imported successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
