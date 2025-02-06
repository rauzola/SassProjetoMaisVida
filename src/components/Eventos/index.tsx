// /components/Perfil/index.tsx

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";



export function Eventos() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md m-4">
      <h1 className="text-2xl font-bold mb-6">Evento</h1>

      <Tabs defaultValue="perfil">
        <TabsList>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="saude">Saúde</TabsTrigger>
          <TabsTrigger value="comunidade">Comunidade</TabsTrigger>
        </TabsList>
        <TabsContent value="perfil">
         fdfgfgfg
        </TabsContent>

        <TabsContent value="saude">
          fgfgfg
        </TabsContent>

        <TabsContent value="comunidade">
          gfgfgfg
        </TabsContent>
      </Tabs>
    </div>
  );
}
