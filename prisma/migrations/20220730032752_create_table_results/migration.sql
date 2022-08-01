/*
  Warnings:

  - You are about to drop the column `eventOwnerId` on the `TableGame` table. All the data in the column will be lost.
  - Added the required column `gameName` to the `TableGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableGameOwnerId` to the `TableGame` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TableGame" DROP CONSTRAINT "TableGame_eventOwnerId_fkey";

-- AlterTable
ALTER TABLE "TableGame" DROP COLUMN "eventOwnerId",
ADD COLUMN     "gameName" TEXT NOT NULL,
ADD COLUMN     "tableGameOwnerId" TEXT NOT NULL,
ADD COLUMN     "xRow" INTEGER[],
ADD COLUMN     "yRow" INTEGER[];

-- CreateTable
CREATE TABLE "TableSelection" (
    "id" TEXT NOT NULL,
    "xSelection" INTEGER NOT NULL,
    "ySelection" INTEGER NOT NULL,
    "tableGameId" TEXT NOT NULL,

    CONSTRAINT "TableSelection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TableGame" ADD CONSTRAINT "TableGame_tableGameOwnerId_fkey" FOREIGN KEY ("tableGameOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableSelection" ADD CONSTRAINT "TableSelection_tableGameId_fkey" FOREIGN KEY ("tableGameId") REFERENCES "TableGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
