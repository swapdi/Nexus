/*
  Warnings:

  - You are about to drop the column `platformDRM` on the `deals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deals" DROP COLUMN "platformDRM",
ADD COLUMN     "rating" DOUBLE PRECISION;
