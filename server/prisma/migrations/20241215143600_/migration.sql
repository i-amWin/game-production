/*
  Warnings:

  - You are about to drop the column `uploaded_by` on the `banners` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "banners" DROP CONSTRAINT "banners_uploaded_by_fkey";

-- AlterTable
ALTER TABLE "banners" DROP COLUMN "uploaded_by";
