/*
  Warnings:

  - Added the required column `command` to the `CustomPerms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomPerms" ADD COLUMN     "command" TEXT NOT NULL;
