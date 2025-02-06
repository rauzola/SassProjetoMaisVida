// /app/eventos/[id]/page.tsx

"use client";

import { AppSidebar } from "@/components/Menu/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, MapPin } from "lucide-react"; // Ícones para melhorar a apresentação
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // <-- Importa o hook useParams

interface Evento {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  horaInicio: string;
  horaFim: string;
  local: string;
  status: string;
}

async function getEvento(id: string): Promise<Evento | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/eventos/${id}`,
    {
      cache: "no-store", // Garante que os dados sejam sempre atualizados
    }
  );

  if (!response.ok) return null;
  const data = await response.json();
  return data.success ? data.evento : null;
}

export default function EventoPage() {
  const { id } = useParams();
  const [evento, setEvento] = useState<Evento | null>(null);

  useEffect(() => {
    if (!id) return;

    // Verifica se o id é um array e, se for, pega o primeiro elemento
    const eventoId = Array.isArray(id) ? id[0] : id;

    const loadEvento = async () => {
      const eventoData = await getEvento(eventoId);
      setEvento(eventoData);
    };

    loadEvento();
  }, [id]);

  return (
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
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/eventos">Evento</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{evento?.nome}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md m-4">
              {/* Skeleton de Carregamento */}
              {!evento ? (
                <>
                  <Skeleton className="h-10 w-1/2 mb-4" />
                  <Skeleton className="h-6 w-full mb-6" />
                  <div className="space-y-4 mb-6">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-6 w-2/3" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold mb-4">{evento.nome}</h1>
                  <p className="text-gray-700 mb-6">{evento.descricao}</p>

                  {/* Detalhes do Evento */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <p className="text-sm text-gray-600">
                        {new Date(evento.dataInicio).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <p className="text-sm text-gray-600">
                        <span className="font-bold">Horário de Início:</span>{" "}
                        {new Date(evento.horaInicio).toLocaleTimeString(
                          "pt-BR",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }
                        )}{" "}
                        - <span className="font-bold">Horário de Termino:</span>{" "}
                        {new Date(evento.horaFim).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <p className="text-sm text-gray-600">{evento.local}</p>
                    </div>
                  </div>

                  {/* Botão de Inscrição */}
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Inscrever-se
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
