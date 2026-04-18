export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { startOfDayUtc } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const saveSchema = z.object({
  date: z.string(),
  scope: z.enum(["CHORALE", "PAROISSE"]),
  rows: z.array(
    z.object({
      fideleId: z.string(),
      status: z.enum(["PRESENT", "ABSENT", "PERMISSIONNAIRE", "IMPURE"]),
    }),
  ),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = saveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const day = startOfDayUtc(new Date(parsed.data.date));
  const { scope, rows } = parsed.data;

  await prisma.$transaction(
    rows.map((row) =>
      prisma.attendance.upsert({
        where: {
          date_scope_fideleId: {
            date: day,
            scope,
            fideleId: row.fideleId,
          },
        },
        create: {
          date: day,
          scope,
          fideleId: row.fideleId,
          status: row.status,
        },
        update: { status: row.status },
      }),
    ),
  );

  return NextResponse.json({ ok: true, count: rows.length });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");
  const scope = searchParams.get("scope") as "CHORALE" | "PAROISSE" | null;
  if (!dateStr || !scope || !["CHORALE", "PAROISSE"].includes(scope)) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  const day = startOfDayUtc(new Date(dateStr));
  const rows = await prisma.attendance.findMany({
    where: { date: day, scope },
  });

  return NextResponse.json({ rows });
}
