// /app/autenticado/route.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PrismaGetInstance } from "@/lib/prisma";
import { Menu } from "@/components/Menu"; // Importando o Menu (componente cliente)

export default async function Autenticado() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth-session");

  if (!authCookie?.value) {
    redirect("/login");
  }

  const sessionToken = authCookie.value;
  const prisma = PrismaGetInstance();
  const session = await prisma.sessions.findFirst({
    where: { token: sessionToken },
  });

  if (!session || !session.valid || session.expiresAt < new Date()) {
    redirect("/login");
  }

  return (
    <>
      <Menu /> {/* Renderiza o componente Menu (cliente) */}
    </>
  );
}
