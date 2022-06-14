-- CreateEnum
CREATE TYPE "GuildType" AS ENUM ('NORMAL', 'PREMIUM');

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "guildId" TEXT,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Automod" (
    "id" TEXT NOT NULL,
    "settingsId" TEXT,
    "defaultLogChannel" TEXT NOT NULL DEFAULT E'',
    "ignoredChannels" TEXT[],
    "ignoredRoles" TEXT[],
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "bannedWords" JSONB NOT NULL DEFAULT '[]',
    "invites" JSONB NOT NULL DEFAULT '[]',
    "massMentions" JSONB NOT NULL DEFAULT '[]',
    "autoActionTime" INTEGER NOT NULL DEFAULT 600000,
    "violationCount" INTEGER NOT NULL DEFAULT 4,

    CONSTRAINT "Automod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responses" (
    "id" TEXT NOT NULL,
    "settingsId" TEXT,
    "badWords" TEXT NOT NULL DEFAULT E'Please refrain from using the blacklisted word',
    "badLink" TEXT NOT NULL DEFAULT E'That link is not allowed.',
    "massMentions" TEXT NOT NULL DEFAULT E'Please stop mass mentioning users.',

    CONSTRAINT "Responses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Automod" ADD CONSTRAINT "Automod_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
