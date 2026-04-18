import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL manquant");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

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
