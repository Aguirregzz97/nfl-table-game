/*
  Warnings:

  - You are about to drop the column `gameName` on the `TableGame` table. All the data in the column will be lost.
  - Added the required column `gameDate` to the `TableGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamA` to the `TableGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamB` to the `TableGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TableGame" DROP COLUMN "gameName",
ADD COLUMN     "gameDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "teamA" TEXT NOT NULL,
ADD COLUMN     "teamB" TEXT NOT NULL;
