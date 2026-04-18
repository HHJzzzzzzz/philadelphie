export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateSchema = z.object({
  nom: z.string().min(1).optional(),
  prenom: z.string().min(1).optional(),
  dateNaissance: z.string().nullable().optional(),
  sexe: z.enum(["M", "F"]).optional(),
  grade: z.string().min(1).optional(),
  jourPermanence: z.string().min(1).optional(),
  poste: z.string().min(1).optional(),
  imageUrl: z.string().nullable().optional(),
  observation: z.string().nullable().optional(),
  membreChorale: z.boolean().optional(),
});

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const fidele = await prisma.fidele.findUnique({ where: { id } });
  if (!fidele) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json(fidele);
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const fidele = await prisma.fidele.update({
    where: { id },
    data: {
      ...(data.nom !== undefined && { nom: data.nom }),
      ...(data.prenom !== undefined && { prenom: data.prenom }),
      ...(data.dateNaissance !== undefined && {
        dateNaissance: data.dateNaissance ? new Date(data.dateNaissance) : null,
      }),
      ...(data.sexe !== undefined && { sexe: data.sexe }),
      ...(data.grade !== undefined && { grade: data.grade }),
      ...(data.jourPermanence !== undefined && { jourPermanence: data.jourPermanence }),
      ...(data.poste !== undefined && { poste: data.poste }),
      ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
      ...(data.observation !== undefined && { observation: data.observation }),
      ...(data.membreChorale !== undefined && { membreChorale: data.membreChorale }),
    },
  });

  return NextResponse.json(fidele);
}

export async function DELETE(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id } = await ctx.params;
  await prisma.fidele.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
