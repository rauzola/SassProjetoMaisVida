/*
  Warnings:

  - The primary key for the `Evento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigo` on the `Evento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inscricao" DROP CONSTRAINT "Inscricao_eventoId_fkey";

-- DropIndex
DROP INDEX "Evento_codigo_key";

-- AlterTable
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_pkey",
DROP COLUMN "codigo",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Evento_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Evento_id_seq";

-- AlterTable
ALTER TABLE "Inscricao" ALTER COLUMN "eventoId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Inscricao" ADD CONSTRAINT "Inscricao_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
