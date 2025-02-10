// /components/Eventos/EventoDetalhes/index.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Evento {
  id: string;
  nome: string;
  descricao: string;
  dataInicio: string;
  horaInicio: string;
  horaFim: string;
  local: string;
}

export default function EventoDetalhes() {
  const { id } = useParams();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvento = async () => {
      setLoading(true); // Garante que o estado de carregamento seja atualizado no início
      try {
        if (!id) {
          throw new Error("ID do evento não foi fornecido");
        }

        console.log("Buscando evento com ID:", id);

        const response = await fetch(`/api/eventos/${id}`);
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simula um pequeno delay (opcional)

        if (!response.ok) {
          throw new Error("Erro ao carregar evento");
        }

        const data = await response.json();
        console.log("Evento recebido:", data);
        setEvento(data.evento);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id]);

  if (loading) {
    return <Skeleton className="h-40 w-full" />;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  if (!evento) {
    return <p>Evento não encontrado</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{evento.nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Descrição:</strong> {evento.descricao}</p>
        <p><strong>Data:</strong> {new Date(evento.dataInicio).toLocaleDateString()}</p>
        <p><strong>Hora de Início:</strong> {new Date(evento.horaInicio).toLocaleTimeString()}</p>
        <p><strong>Hora de Término:</strong> {new Date(evento.horaFim).toLocaleTimeString()}</p>
        <p><strong>Local:</strong> {evento.local}</p>
      </CardContent>
    </Card>
  );
}
