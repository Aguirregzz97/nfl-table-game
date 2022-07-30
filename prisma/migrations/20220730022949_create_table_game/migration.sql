-- CreateTable
CREATE TABLE "TableGame" (
    "id" TEXT NOT NULL,
    "eventOwnerId" TEXT NOT NULL,

    CONSTRAINT "TableGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnTableGames" (
    "userId" TEXT NOT NULL,
    "tableGameId" TEXT NOT NULL,

    CONSTRAINT "UsersOnTableGames_pkey" PRIMARY KEY ("userId","tableGameId")
);

-- AddForeignKey
ALTER TABLE "TableGame" ADD CONSTRAINT "TableGame_eventOwnerId_fkey" FOREIGN KEY ("eventOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnTableGames" ADD CONSTRAINT "UsersOnTableGames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnTableGames" ADD CONSTRAINT "UsersOnTableGames_tableGameId_fkey" FOREIGN KEY ("tableGameId") REFERENCES "TableGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
