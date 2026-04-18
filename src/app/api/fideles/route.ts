export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createSchema = z.object({
  nom: z.string().min(1),
  prenom: z.string().min(1),
  dateNaissance: z.string().optional(),
  sexe: z.enum(["M", "F"]),
  grade: z.string().min(1),
  jourPermanence: z.string().min(1),
  poste: z.string().min(1),
  imageUrl: z.string().optional().nullable(),
  observation: z.string().optional().nullable(),
  membreChorale: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(50, Math.max(5, parseInt(searchParams.get("limit") ?? "10", 10)));
  const search = (searchParams.get("search") ?? "").trim();

  const where = search
    ? {
        OR: [
          { nom: { contains: search } },
          { prenom: { contains: search } },
          { poste: { contains: search } },
        ],
      }
    : {};

  const [total, items] = await Promise.all([
    prisma.fidele.count({ where }),
    prisma.fidele.findMany({
      where,
      orderBy: [{ nom: "asc" }, { prenom: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const dateNaissance = data.dateNaissance
    ? new Date(data.dateNaissance)
    : null;

  const fidele = await prisma.fidele.create({
    data: {
      nom: data.nom,
      prenom: data.prenom,
      dateNaissance,
      sexe: data.sexe,
      grade: data.grade,
      jourPermanence: data.jourPermanence,
      poste: data.poste,
      imageUrl: data.imageUrl ?? null,
      observation: data.observation ?? null,
      membreChorale: data.membreChorale ?? false,
    },
  });

  return NextResponse.json(fidele, { status: 201 });
}
