"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saudeSchema, SaudeFormData } from "./types";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SaudeForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<SaudeFormData>({
    resolver: zodResolver(saudeSchema),
  });

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await fetch("/api/saude");
        const data = await response.json();
        reset(data); // Certifique-se de que os dados estão no formato correto
      } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
      }
    };

    fetchPerfil();
  }, [reset]);

  const onSubmit = async (data: SaudeFormData) => {
    console.log("Dados do formulário:", data); // Verifique se os dados estão corretos

    try {
      const response = await fetch("/api/saude", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Dados de saúde atualizados com sucesso!");
      } else {
        console.error("Erro ao atualizar dados de saúde");
      }
    } catch (error) {
      console.error("Erro ao enviar dados de saúde:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Campos do formulário com tratamento de erros */}
      <div>
        <Label htmlFor="portadorDoenca">Portador de Doença?</Label>
        <Select
          onValueChange={(value) => setValue("portadorDoenca", value === "true")}
          defaultValue={watch("portadorDoenca") ? "true" : "false"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Sim</SelectItem>
            <SelectItem value="false">Não</SelectItem>
          </SelectContent>
        </Select>
        {errors.portadorDoenca && (
          <p className="text-sm text-red-500">{errors.portadorDoenca.message}</p>
        )}
      </div>

      {/* Repita para os outros campos */}

      <div className="flex justify-end">
        <Button type="submit">Salvar Alterações</Button>
      </div>
    </form>
  );
};