import { PrismaGetInstance } from "@/lib/prisma";
import { NextResponse } from "next/server";

const prisma = PrismaGetInstance();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("ID recebido na API:", params.id);

    if (!params.id) {
      return NextResponse.json(
        { success: false, error: "ID do evento não foi fornecido" },
        { status: 400 }
      );
    }

    // Busca o evento no banco de dados
    const evento = await prisma.evento.findUnique({
      where: { id: params.id },
    });

    console.log("Evento encontrado:", evento);

    if (!evento) {
      return NextResponse.json(
        { success: false, error: "Evento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, evento }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    return NextResponse.json(
      { success: false, error: `Erro ao buscar evento:` },
      { status: 500 }
    );
  }
}
