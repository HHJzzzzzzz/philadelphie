import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > 4 * 1024 * 1024) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 4 Mo)" }, { status: 400 });
  }

  const ext = (file as File).name?.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;
  const dir = path.join(process.cwd(), "public", "uploads", "fideles");
  await mkdir(dir, { recursive: true });
  const full = path.join(dir, name);
  await writeFile(full, buf);

  const url = `/uploads/fideles/${name}`;
  return NextResponse.json({ url });
}
