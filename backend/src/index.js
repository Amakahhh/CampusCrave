import http from 'http';
import app from './app.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Socket.io setup (placeholder)
// import { setupSocket } from './socket/handlers.js';
// setupSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 CampusCrave API running on http://localhost:${PORT}`);
  console.log(`📊 Database connected`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n📛 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
