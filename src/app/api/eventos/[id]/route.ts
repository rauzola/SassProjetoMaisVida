// /app/api/eventos/[id]/route.ts

import { PrismaGetInstance } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = PrismaGetInstance();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const evento = await prisma.evento.findUnique({
      where: { id: Number(params.id) },
    });

    if (!evento) {
      return NextResponse.json({ success: false, error: "Evento não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, evento }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    return NextResponse.json({ success: false, error: "Erro ao buscar evento" }, { status: 500 });
  }
}
