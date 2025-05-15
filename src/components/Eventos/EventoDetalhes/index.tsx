// /components/Eventos/EventoDetalhes/index.tsx

"use client";

"use client";

import { JSX, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Evento {
  id: string;
  nome: string;
  descricao: string;
  dataInicio: Date;
  horaInicio: Date;
  horaFim: Date;
  local: string;
  status: string;
}

interface EventoDetalhesProps {
  eventoId: string;
  userId: string;
}

export default function EventoDetalhes({
  eventoId,
  userId,
}: EventoDetalhesProps): JSX.Element {
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const fetchEvento = async (): Promise<void> => {
      setLoading(true);
      try {
        if (!eventoId) {
          throw new Error("ID do evento não foi fornecido");
        }

        const response = await fetch(`/api/eventos/${eventoId}`);
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (!response.ok) {
          throw new Error("Erro ao carregar evento");
        }

        const data = await response.json();
        setEvento(data.evento);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
        toast({
          title: "Erro",
          description: "Falha ao carregar evento",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [eventoId, toast]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInscricao = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/eventos/${eventoId}/inscrever`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao realizar inscrição");
      }

      toast({
        title: "Inscrição realizada",
        description: "Você foi inscrito no evento com sucesso.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <EventoSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-700">
        <h3 className="text-lg font-semibold mb-2">Não foi possível carregar o evento</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 text-amber-700">
        <h3 className="text-lg font-semibold">Evento não encontrado</h3>
      </div>
    );
  }

  // Formata a data para exibição
  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Formata a hora para exibição
  const formatarHora = (hora: Date) => {
    return new Date(hora).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Determina o status do evento para exibição visual
  const getStatusBadge = () => {
    switch (evento.status.toLowerCase()) {
      case 'aberto':
        return <Badge className="bg-green-500 hover:bg-green-600">Aberto</Badge>;
      case 'encerrado':
        return <Badge className="bg-red-500 hover:bg-red-600">Encerrado</Badge>;
      case 'completo':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Lotado</Badge>;
      default:
        return <Badge>{evento.status}</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-24 sm:h-40 w-full"></div>
      
      <CardHeader className="relative -mt-12 sm:-mt-16 mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{evento.nome}</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                {getStatusBadge()}
                <div className="flex items-center ml-4">
                  <Users size={16} className="mr-1" />
                  <span>Evento Público</span>
                </div>
              </div>
            </div>
            {/* <Button 
              onClick={handleInscricao} 
              disabled={isSubmitting} 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              size="lg"
            >
              {isSubmitting ? "Inscrevendo..." : "Inscrever-se"}
            </Button> */}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Sobre este evento</h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {evento.descricao}
              </p>
            </section>
          </div>

          <div className="md:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5">
              <h3 className="font-semibold mb-4">Detalhes</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CalendarIcon className="mr-3 h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Data</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatarData(evento.dataInicio)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="mr-3 h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Horário</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatarHora(evento.horaInicio)} - {formatarHora(evento.horaFim)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Local</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {evento.local}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="mt-4">
                <Button 
                  onClick={handleInscricao} 
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isSubmitting ? "Inscrevendo..." : "Inscrever-se"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente de esqueleto para carregamento
function EventoSkeleton() {
  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <Skeleton className="h-24 sm:h-40 w-full" />
      
      <div className="relative -mt-12 sm:-mt-16 mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div className="w-3/4">
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-5 w-1/2" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      <div className="px-4 pb-6 pt-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Skeleton className="h-6 w-48 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="md:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5">
              <Skeleton className="h-6 w-24 mb-4" />
              
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start">
                    <Skeleton className="h-5 w-5 mr-3" />
                    <div className="w-full">
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                  </div>
                ))}
              </div>

              <Skeleton className="h-px w-full my-4" />
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}