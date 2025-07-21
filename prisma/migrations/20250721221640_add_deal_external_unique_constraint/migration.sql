/*
  Warnings:

  - A unique constraint covering the columns `[externalId,source]` on the table `deals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "deals_externalId_source_key" ON "deals"("externalId", "source");
