// /components/Eventos/index.tsx

"use client";
import { useState } from "react";
import axios from "axios";

export function Eventos() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [local, setLocal] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/eventos", {
        nome,
        descricao,
        dataInicio,
        horaInicio,
        horaFim,
        local,
      });
      alert("Evento criado com sucesso!");
    } catch {
      alert("Erro ao criar evento");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md m-4">
      <h1 className="text-2xl font-bold mb-6">Criar Evento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="time"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="time"
          value={horaFim}
          onChange={(e) => setHoraFim(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Local"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Criar Evento
        </button>
      </form>
    </div>
  );
}
