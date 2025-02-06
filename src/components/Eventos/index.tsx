// /components/Eventos/index.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Evento {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  horaInicio: string;
  horaFim: string;
  local: string;
}

export function EventosListar() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEventos() {
      try {
        const response = await fetch("/api/eventos");
        const data = await response.json();
        if (data.success) {
          setEventos(data.eventos);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        setErro("Erro ao carregar eventos. Tente novamente mais tarde.");
      }
    }

    fetchEventos();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md m-4">
      <h1 className="text-2xl font-bold mb-6">Eventos</h1>

      {erro && <p className="text-red-500">{erro}</p>}

      <ul>
        {eventos.map((evento) => (
          <li key={evento.id} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-100">
            <Link href={`/eventos/${evento.id}`} className="block">
              <h2 className="text-xl font-semibold hover:underline">{evento.nome}</h2>
            </Link>
            <p className="text-gray-700">{evento.descricao}</p>
            <p className="text-sm text-gray-600">
              📅 {new Date(evento.dataInicio).toLocaleDateString()} | ⏰ {evento.horaInicio} - {evento.horaFim}
            </p>
            <p className="text-sm text-gray-600">📍 {evento.local}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
