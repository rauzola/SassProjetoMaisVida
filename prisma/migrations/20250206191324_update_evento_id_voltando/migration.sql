/*
  Warnings:

  - The primary key for the `Evento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Evento` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `eventoId` on the `Inscricao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Inscricao" DROP CONSTRAINT "Inscricao_eventoId_fkey";

-- AlterTable
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Evento_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Inscricao" DROP COLUMN "eventoId",
ADD COLUMN     "eventoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Inscricao" ADD CONSTRAINT "Inscricao_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
