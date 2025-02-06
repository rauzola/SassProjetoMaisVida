/*
  Warnings:

  - The primary key for the `Evento` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Inscricao" DROP CONSTRAINT "Inscricao_eventoId_fkey";

-- AlterTable
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Evento_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Evento_id_seq";

-- AlterTable
ALTER TABLE "Inscricao" ALTER COLUMN "eventoId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Saude" ALTER COLUMN "portadorDoenca" SET DEFAULT false,
ALTER COLUMN "alergias" SET DEFAULT false,
ALTER COLUMN "medicacao" SET DEFAULT false,
ALTER COLUMN "planoSaude" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Inscricao" ADD CONSTRAINT "Inscricao_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
