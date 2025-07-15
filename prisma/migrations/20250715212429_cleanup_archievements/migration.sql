/*
  Warnings:

  - You are about to drop the column `platformIds` on the `deals` table. All the data in the column will be lost.
  - You are about to drop the column `ageRatings` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `aggregatedRating` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `aggregatedRatingCount` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `externalGames` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `gameModes` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `themes` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `totalRatingCount` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `platformIds` on the `user_games` table. All the data in the column will be lost.
  - You are about to drop the `achievements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_achievements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_achievements" DROP CONSTRAINT "user_achievements_achievementId_fkey";

-- DropForeignKey
ALTER TABLE "user_achievements" DROP CONSTRAINT "user_achievements_userId_fkey";

-- AlterTable
ALTER TABLE "deals" DROP COLUMN "platformIds",
ADD COLUMN     "platformDRM" INTEGER;

-- AlterTable
ALTER TABLE "games" DROP COLUMN "ageRatings",
DROP COLUMN "aggregatedRating",
DROP COLUMN "aggregatedRatingCount",
DROP COLUMN "externalGames",
DROP COLUMN "gameModes",
DROP COLUMN "keywords",
DROP COLUMN "themes",
DROP COLUMN "totalRatingCount";

-- AlterTable
ALTER TABLE "user_games" DROP COLUMN "platformIds",
ADD COLUMN     "platformDRMs" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "epicConnect" BOOLEAN DEFAULT false,
ADD COLUMN     "gogConnect" BOOLEAN DEFAULT false;

-- DropTable
DROP TABLE "achievements";

-- DropTable
DROP TABLE "user_achievements";
