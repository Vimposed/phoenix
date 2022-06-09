-- CreateTable
CREATE TABLE "CustomPerms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "perms" TEXT[],
    "inherit" BOOLEAN,
    "guildId" TEXT,

    CONSTRAINT "CustomPerms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomPerms" ADD CONSTRAINT "CustomPerms_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;
