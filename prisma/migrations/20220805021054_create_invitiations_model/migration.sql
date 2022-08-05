-- CreateTable
CREATE TABLE "InvitationsOnTableGames" (
    "userId" TEXT NOT NULL,
    "tableGameId" TEXT NOT NULL,

    CONSTRAINT "InvitationsOnTableGames_pkey" PRIMARY KEY ("userId","tableGameId")
);

-- AddForeignKey
ALTER TABLE "InvitationsOnTableGames" ADD CONSTRAINT "InvitationsOnTableGames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitationsOnTableGames" ADD CONSTRAINT "InvitationsOnTableGames_tableGameId_fkey" FOREIGN KEY ("tableGameId") REFERENCES "TableGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
