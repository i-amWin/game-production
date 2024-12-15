/*
  Warnings:

  - Added the required column `uploaded_by` to the `banners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banners" ADD COLUMN     "uploaded_by" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "banners" ADD CONSTRAINT "banners_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
