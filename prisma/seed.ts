import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { hash } from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL manquant");

const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Supprimer tous les utilisateurs existants
  await prisma.user.deleteMany();

  const email = "philadelphie@gmail.com";
  const password = await hash("12345678", 12);
  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      password,
      name: "Administrateur",
    },
    update: { password },
  });
  console.log("Utilisateur seed :", email, "/ 12345678");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
