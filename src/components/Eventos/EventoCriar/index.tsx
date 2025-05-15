// /components/Eventos/EventoCriar/index.tsx
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin, Map } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const formSchema = z.object({
  eventName: z
    .string()
    .min(3, { message: "Nome do evento deve ter pelo menos 3 caracteres" })
    .max(100, { message: "Nome do evento não pode exceder 100 caracteres" }),
  description: z
    .string()
    .min(10, { message: "Descrição deve ter pelo menos 10 caracteres" })
    .max(1000, { message: "Descrição não pode exceder 1000 caracteres" }),
  eventDate: z.date({
    required_error: "Data do evento é obrigatória",
  }),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Formato de hora inválido. Use HH:MM",
    }),
  endTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Formato de hora inválido. Use HH:MM",
    }),
  location: z
    .string()
    .min(3, { message: "Local deve ter pelo menos 3 caracteres" })
    .max(200, { message: "Local não pode exceder 200 caracteres" }),
});

const predefinedLocations = [
  "Mosteiro Projeto Mais Vida",
  "Dona Guilhermina",
  "Catedral - Maringá",
  "Fazenda Astroga"
];

const EventoCriar = () => {
  const { toast } = useToast();
  const router = useRouter();  // Add router
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomLocation, setShowCustomLocation] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      description: "",
      startTime: "",
      endTime: "",
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsSubmitting(true);
      
      try {
        const eventData = {
          nome: values.eventName,
          descricao: values.description,
          dataInicio: format(values.eventDate, "yyyy-MM-dd"),
          horaInicio: values.startTime,
          horaFim: values.endTime,
          local: values.location,
        };
  
        const response = await axios.post("/api/eventos", eventData);
  
        if (response.status === 201) {
          toast({
            title: "Evento criado com sucesso!",
            description: `${values.eventName} foi agendado para ${format(values.eventDate, "dd/MM/yyyy")}`,
            variant: "default",
          });
          router.push("/eventos");  // Add redirect
        }
      } catch (error) {
        console.error("Erro ao criar evento:", error);
        toast({
          title: "Erro ao criar evento",
          description: "Ocorreu um erro ao tentar criar o evento. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }

  const handleLocationSelect = (value: string) => {
    if (value === "custom") {
      setShowCustomLocation(true);
      form.setValue("location", "");
    } else {
      setShowCustomLocation(false);
      form.setValue("location", value);
      form.clearErrors("location");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">Criar Novo Evento</h1>
          <p className="text-slate-600 max-w-xl mx-auto">Preencha os detalhes abaixo para criar seu evento incrível. Todos os campos são obrigatórios.</p>
        </div>
        
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg p-8">
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <span>Detalhes do Evento</span>
            </CardTitle>
            <CardDescription className="text-indigo-100 text-lg mt-2">
              Crie memórias inesquecíveis
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-8 pb-2 px-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="eventName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-900 font-semibold text-lg">Nome do Evento</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Workshop de Design" 
                          className="border-indigo-200 border-[1px] border-solid focus:border-indigo-500 rounded-lg text-lg p-6" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-indigo-400">
                        Um título claro e atrativo para seu evento
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-900 font-semibold text-lg">Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva os detalhes do seu evento..." 
                          className="border-indigo-200 border-[1px] border-solid focus:border-indigo-500 min-h-[150px] rounded-lg text-base p-6" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-indigo-400">
                        Forneça informações relevantes sobre o evento
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-indigo-900 font-semibold text-lg">Data do Evento</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal border-indigo-200 border-[1px] border-solid hover:bg-indigo-50 h-14 rounded-lg",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                              className="bg-white rounded-lg shadow-lg pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                        <FormDescription className="text-indigo-400 mt-1">
                          Data em que o evento acontecerá
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-900 font-semibold text-lg">Hora de Início</FormLabel>
                          <div className="flex items-center">
                            <FormControl>
                              <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
                                <Input
                                  type="time"
                                  className="border-indigo-200 border-[1px] border-solid focus:border-indigo-500 pl-10 h-14 rounded-lg"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-900 font-semibold text-lg">Hora de Término</FormLabel>
                          <div className="flex items-center">
                            <FormControl>
                              <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
                                <Input
                                  type="time"
                                  className="border-indigo-200 border-[1px] border-solid focus:border-indigo-500 pl-10 h-14 rounded-lg"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-900 font-semibold text-lg">Local do Evento</FormLabel>
                      <div className="space-y-4">
                        <Select onValueChange={handleLocationSelect}>
                          <SelectTrigger className="border-indigo-200 border-[1px] border-solid focus:border-indigo-500 h-14 rounded-lg">
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-5 w-5 text-indigo-500" />
                              <SelectValue placeholder="Selecione um local" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="bg-white rounded-lg shadow-lg">
                            {predefinedLocations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                            <SelectItem value="custom">Outro local...</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {showCustomLocation && (
                          <FormControl>
                            <div className="relative">
                              <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
                              <Input
                                placeholder="Digite o endereço completo"
                                className="border-indigo-200 border-[1px] border-solid focus:border-indigo-500 pl-10 h-14 rounded-lg"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        )}
                      </div>
                      <FormDescription className="text-indigo-400 mt-1">
                        Endereço completo onde o evento será realizado
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-white text-lg py-7 rounded-xl shadow-md hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Criando evento...
                      </div>
                    ) : "Criar Evento"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          
          {/* <CardFooter className="border-t border-indigo-100 border-solid py-6 flex justify-center px-8">
            <Button 
              variant="outline" 
              className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 border-indigo-200 border-[1px] border-solid hover:border-indigo-300 px-8 py-5 rounded-xl"
              // onClick={() => navigate("/")}
            >
              Cancelar e Voltar
            </Button>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
};

export default EventoCriar;