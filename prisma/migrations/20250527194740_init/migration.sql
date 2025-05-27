-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "supabase_uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "display_name" TEXT,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "credits" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "current_period_ends" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "features" TEXT[],
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverUrl" TEXT,
    "releaseDate" TIMESTAMP(3),
    "developer" TEXT,
    "publisher" TEXT,
    "genres" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platforms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "iconUrl" TEXT,
    "siteUrl" TEXT,

    CONSTRAINT "platforms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_games" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,
    "platformSpecificId" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "platform_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_games" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playtimeMinutes" INTEGER DEFAULT 0,
    "lastPlayed" TIMESTAMP(3),
    "isInstalled" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "rating" INTEGER,

    CONSTRAINT "user_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deals" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "platformGameId" INTEGER,
    "title" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "discountPercent" DOUBLE PRECISION,
    "originalPrice" DOUBLE PRECISION,
    "url" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "isFreebie" BOOLEAN NOT NULL DEFAULT false,
    "discoveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconUrl" TEXT,
    "criteria" TEXT NOT NULL,
    "xpReward" INTEGER NOT NULL DEFAULT 0,
    "creditsReward" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_achievements" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "achievementId" INTEGER NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist_items" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_supabase_uid_key" ON "users"("supabase_uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_user_id_key" ON "account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "platforms_name_key" ON "platforms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "platforms_slug_key" ON "platforms"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "platform_games_gameId_platformId_key" ON "platform_games"("gameId", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "platform_games_platformId_platformSpecificId_key" ON "platform_games"("platformId", "platformSpecificId");

-- CreateIndex
CREATE UNIQUE INDEX "user_games_userId_gameId_key" ON "user_games"("userId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "achievements_name_key" ON "achievements"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_achievements_userId_achievementId_key" ON "user_achievements"("userId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_items_userId_gameId_key" ON "wishlist_items"("userId", "gameId");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_games" ADD CONSTRAINT "platform_games_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platform_games" ADD CONSTRAINT "platform_games_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deals" ADD CONSTRAINT "deals_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deals" ADD CONSTRAINT "deals_platformGameId_fkey" FOREIGN KEY ("platformGameId") REFERENCES "platform_games"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
