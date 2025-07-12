/*
  Warnings:

  - You are about to drop the column `platformGameId` on the `deals` table. All the data in the column will be lost.
  - You are about to drop the column `steamAppId` on the `games` table. All the data in the column will be lost.
  - You are about to drop the `platform_games` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "deals" DROP CONSTRAINT "deals_platformGameId_fkey";

-- DropForeignKey
ALTER TABLE "platform_games" DROP CONSTRAINT "platform_games_gameId_fkey";

-- DropForeignKey
ALTER TABLE "platform_games" DROP CONSTRAINT "platform_games_platformId_fkey";

-- AlterTable
ALTER TABLE "deals" DROP COLUMN "platformGameId",
ADD COLUMN     "platformIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "games" DROP COLUMN "steamAppId";

-- AlterTable
ALTER TABLE "user_games" ADD COLUMN     "platformIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- DropTable
DROP TABLE "platform_games";
