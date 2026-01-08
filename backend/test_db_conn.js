import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Testing Database Connection...');
  console.log('Database URL:', process.env.DATABASE_URL?.replace(/:([^:@]+)@/, ':****@')); // Hide password

  try {
    const start = Date.now();
    await prisma.$connect();
    console.log('✅ Connection Successful! (took ' + (Date.now() - start) + 'ms)');
    
    const userCount = await prisma.user.count();
    console.log('📊 Current User Count:', userCount);
    
  } catch (error) {
    console.error('❌ Connection Failed!');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    
    if (error.message.includes('6543')) {
      console.log('\n💡 Suggestion: Port 6543 (PgBouncer) might be blocked or unreachable.');
      console.log('Try switching to the direct connection port (5432) or adding ?pgbouncer=true to the URL.');
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
