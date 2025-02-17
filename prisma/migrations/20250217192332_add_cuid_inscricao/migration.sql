/*
  Warnings:

  - The primary key for the `Inscricao` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Presenca" DROP CONSTRAINT "Presenca_inscricaoId_fkey";

-- AlterTable
ALTER TABLE "Inscricao" DROP CONSTRAINT "Inscricao_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Inscricao_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Inscricao_id_seq";

-- AlterTable
ALTER TABLE "Presenca" ALTER COLUMN "inscricaoId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_inscricaoId_fkey" FOREIGN KEY ("inscricaoId") REFERENCES "Inscricao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
