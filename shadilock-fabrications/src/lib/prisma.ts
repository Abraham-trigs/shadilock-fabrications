// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Extend globalThis to include prisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Use existing prisma instance or create a new one
const prisma = globalThis.prisma || new PrismaClient();

// Only assign to global in development to avoid multiple instances
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
