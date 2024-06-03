/*
  Warnings:

  - A unique constraint covering the columns `[idKos,nomorKamar]` on the table `Penyewa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Penyewa_idKos_nomorKamar_key" ON "Penyewa"("idKos", "nomorKamar");
