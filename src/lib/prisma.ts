import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrisma() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    // Ne pas jeter d'erreur au build time - utiliser une URL factice
    if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
      throw new Error("DATABASE_URL manquant");
    }
    // URL factice pour le build - sera remplacée à runtime sur Vercel
    const connectionString = process.env.DATABASE_URL || "postgresql://user:password@localhost/db";
    return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  }
  return new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
