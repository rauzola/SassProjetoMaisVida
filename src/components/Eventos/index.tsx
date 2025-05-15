// /components/Eventos/index.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Evento {
  id: string;
  nome: string;
  descricao: string;
  dataInicio: string;
  horaInicio: string;
  horaFim: string;
  local: string;
}

export function EventosListar() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [filteredEventos, setFilteredEventos] = useState<Evento[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchEventos() {
      try {
        const response = await fetch("/api/eventos");
        if (!response.ok) {
          throw new Error("Erro ao carregar eventos");
        }
        const data = await response.json();
        setEventos(data.eventos);
        setFilteredEventos(data.eventos);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    fetchEventos();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEventos(eventos);
    } else {
      const filtered = eventos.filter(
        (evento) =>
          evento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          evento.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          evento.local.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEventos(filtered);
    }
  }, [searchTerm, eventos]);

  const formatDateTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      return format(parseISO(timeString), "HH:mm", { locale: ptBR });
    } catch (e) {
      return timeString;
    }
  };

  if (loading) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Listar Eventos</CardTitle>
          <CardDescription className="text-white/90">Carregando eventos...</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Erro</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-lg text-red-600 mb-4">Não foi possível carregar os eventos</p>
            <p className="text-gray-600">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-lg animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Listar Eventos</CardTitle>
            <CardDescription className="text-white/90">
              {filteredEventos.length} {filteredEventos.length === 1 ? "evento encontrado" : "eventos encontrados"}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-white/20 text-white border-none px-3 py-1.5">
            <Calendar className="h-4 w-4 mr-1" />
            Eventos
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar eventos por nome, descrição ou local..."
            className="pl-10 bg-gray-50 border-gray-200 border-[1px] border-solid"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredEventos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum evento encontrado</p>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden border border-gray-100 border-solid">
            <Table>
              <TableCaption className="mt-4 text-gray-500">Lista de eventos cadastrados no sistema.</TableCaption>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-medium">Nome</TableHead>
                  <TableHead className="font-medium">Descrição</TableHead>
                  <TableHead className="font-medium">Data</TableHead>
                  <TableHead className="font-medium">Horário</TableHead>
                  <TableHead className="font-medium">Local</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEventos.map((evento) => (
                  <TableRow 
                    key={evento.id} 
                    className="cursor-pointer transition-colors hover:bg-blue-50" 
                    onClick={() => router.push(`/eventos/${evento.id}`)}
                  >
                    <TableCell className="font-medium">{evento.nome}</TableCell>
                    <TableCell className="text-gray-600 max-w-xs truncate">
                      {evento.descricao}
                    </TableCell>
                    <TableCell>{formatDateTime(evento.dataInicio)}</TableCell>
                    <TableCell>
                      {formatTime(evento.horaInicio)} às {formatTime(evento.horaFim)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-100 text-gray-800">
                        {evento.local}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}