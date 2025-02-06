/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Evento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "codigo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Evento_codigo_key" ON "Evento"("codigo");
