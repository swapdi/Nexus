-- AlterTable
ALTER TABLE "deals" ALTER COLUMN "gameId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "steamId" TEXT;
