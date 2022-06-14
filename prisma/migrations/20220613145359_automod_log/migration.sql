/*
  Warnings:

  - You are about to drop the column `defaultLogChannel` on the `Automod` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Automod" DROP COLUMN "defaultLogChannel",
ADD COLUMN     "logChannel" TEXT NOT NULL DEFAULT E'';
