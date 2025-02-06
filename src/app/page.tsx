// /app/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PrismaGetInstance } from "@/lib/prisma";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Menu/app-sidebar";

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
     <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                 Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" >dsdsds</div>
          <div className="aspect-video rounded-xl bg-muted/50" >sdsdsd</div>
          <div className="aspect-video rounded-xl bg-muted/50" >sdsdlzcxçcç.</div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >sdsdsdsdsa</div>
      </div>
    </SidebarInset>
  </SidebarProvider>
    </>
  );
}
