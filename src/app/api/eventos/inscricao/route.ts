import { PrismaGetInstance } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = PrismaGetInstance();

export async function POST(req: NextRequest) {
  try {
    const { eventoId, userId } = await req.json();

    const inscricao = await prisma.inscricao.create({
      data: {
        eventoId,
        userId,
      },
    });

    return NextResponse.json({ success: true, inscricao }, { status: 201 });
  } catch (error) {
    console.error("Erro ao inscrever usuário:", error);
    return NextResponse.json({ success: false, error: "Erro ao inscrever usuário" }, { status: 500 });
  }
}
