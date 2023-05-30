import { PrismaClient } from '@prisma/client';

export const prismaQuery = new PrismaClient({
   log: ['query'],
});
