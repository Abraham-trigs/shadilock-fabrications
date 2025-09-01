// lib/prisma.ts
import type { PrismaClient as PrismaClientType } from "@prisma/client"; // type-only import
import { PrismaClient } from "@prisma/client"; // value import

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClientType | undefined;
}

// Use globalThis to avoid multiple instances in dev
const prisma: PrismaClientType = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
