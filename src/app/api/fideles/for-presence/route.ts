import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const scope = req.nextUrl.searchParams.get("scope");
  if (scope !== "CHORALE" && scope !== "PAROISSE") {
    return NextResponse.json({ error: "scope invalide" }, { status: 400 });
  }

  const items =
    scope === "CHORALE"
      ? await prisma.fidele.findMany({
          where: { membreChorale: true },
          orderBy: [{ nom: "asc" }, { prenom: "asc" }],
        })
      : await prisma.fidele.findMany({
          orderBy: [{ nom: "asc" }, { prenom: "asc" }],
        });

  return NextResponse.json({ items });
}
