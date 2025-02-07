// /app/api/eventos/[id]route.ts

import { PrismaGetInstance } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = PrismaGetInstance();

export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  try {
    const { id } = params; // Extraindo o id corretamente

    if (!id) {
      return NextResponse.json({ success: false, error: "ID do evento não fornecido" }, { status: 400 });
    }

    const evento = await prisma.evento.findUnique({
      where: { id },
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
