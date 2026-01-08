import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Inspecting User Table Schema...');
  try {
    // Attempt to query the password field specifically
    const users = await prisma.user.findMany({
      take: 1,
      select: { id: true, phone: true }
    });
    console.log('✅ Basic query worked.');
    
    try {
      await prisma.user.findMany({
        take: 1,
        select: { password: true }
      });
      console.log('✅ Password column exists!');
    } catch (e) {
      console.error('❌ Password column check failed:', e.message);
    }

  } catch (error) {
    console.error('❌ Schema inspection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
