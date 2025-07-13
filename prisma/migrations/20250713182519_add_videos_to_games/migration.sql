-- AlterTable
ALTER TABLE "games" ADD COLUMN     "videos" TEXT[] DEFAULT ARRAY[]::TEXT[];
