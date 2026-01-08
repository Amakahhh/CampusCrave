import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('⚒️  Running Manual DDL Update...');
  try {
    // Add password column to users table
    // PostgreSQL table names are case-sensitive if quoted, usually lowercase plural in Supabase/Prisma defaults
    await prisma.$executeRawUnsafe('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT;');
    console.log('✅ Column "password" added to "User" table (if it didn\'t exist).');
  } catch (error) {
    console.log('⚠️ Failed to update "User" table, trying "users" table...');
    try {
      await prisma.$executeRawUnsafe('ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "password" TEXT;');
      console.log('✅ Column "password" added to "users" table.');
    } catch (err2) {
      console.error('❌ Manual DDL failed:', err2.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
