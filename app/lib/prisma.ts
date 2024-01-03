// lib/prisma.ts
import { PrismaClient } from '@prisma/client/edge';

let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // Use the Prisma Client as a global singleton in production
  db = new PrismaClient();
} else {
  // In development, recreate the Prisma Client on each request
  db = new PrismaClient({
    log: ['query', 'info', 'warn'],
  });
}

// const prisma = new PrismaClient()

export default db;
