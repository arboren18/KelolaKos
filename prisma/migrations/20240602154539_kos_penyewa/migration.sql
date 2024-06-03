/*
  Warnings:

  - You are about to drop the `Upload` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Upload";

-- CreateTable
CREATE TABLE "Kos" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penyewa" (
    "id" TEXT NOT NULL,
    "idKos" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nomorKamar" INTEGER NOT NULL,
    "statusPembayaran" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penyewa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Penyewa" ADD CONSTRAINT "Penyewa_idKos_fkey" FOREIGN KEY ("idKos") REFERENCES "Kos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
