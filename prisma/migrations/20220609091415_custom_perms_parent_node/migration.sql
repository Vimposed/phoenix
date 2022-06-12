/*
  Warnings:

  - You are about to drop the column `inherit` on the `CustomPerms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomPerms" DROP COLUMN "inherit",
ADD COLUMN     "parent" TEXT;
