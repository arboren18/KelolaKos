-- DropForeignKey
ALTER TABLE "Penyewa" DROP CONSTRAINT "Penyewa_idKos_fkey";

-- AddForeignKey
ALTER TABLE "Penyewa" ADD CONSTRAINT "Penyewa_idKos_fkey" FOREIGN KEY ("idKos") REFERENCES "Kos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
