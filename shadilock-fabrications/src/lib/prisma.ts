// lib/prisma.ts
import pkg from "@prisma/client";

// Cast PrismaClient as the correct type
const PrismaClient = pkg.PrismaClient as unknown as { new (): pkg.PrismaClient };

declare global {
  // eslint-disable-next-line no-var
  var prisma: pkg.PrismaClient | undefined;
}

// Use global prisma to prevent multiple instances during hot reload
const prisma: pkg.PrismaClient = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
