// /app/api/eventos/[id]/inscrever/route.ts

import { PrismaGetInstance } from "@/lib/prisma";
import { NextResponse } from "next/server";

const prisma = PrismaGetInstance();


export async function POST(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { userId } = await request.json();
    const eventoId = params.id;

    if (!userId || !eventoId) {
      return NextResponse.json(
        { success: false, error: "Dados incompletos" },
        { status: 400 }
      );
    }

    // Verifica se o evento existe
    const evento = await prisma.evento.findUnique({
      where: { id: eventoId },
    });

    if (!evento) {
      return NextResponse.json(
        { success: false, error: "Evento não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se o usuário já está inscrito no evento
    const inscricaoExistente = await prisma.inscricao.findFirst({
      where: {
        userId,
        eventoId,
      },
    });

    if (inscricaoExistente) {
      return NextResponse.json(
        { success: false, error: "Usuário já inscrito no evento" },
        { status: 400 }
      );
    }

    // Cria a inscrição
    const inscricao = await prisma.inscricao.create({
      data: {
        userId,
        eventoId,
        status: "pendente",
      },
    });

    return NextResponse.json({ success: true, inscricao }, { status: 200 });
  } catch (error) {
    console.error("Erro ao realizar inscrição:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao realizar inscrição" },
      { status: 500 }
    );
  }
}