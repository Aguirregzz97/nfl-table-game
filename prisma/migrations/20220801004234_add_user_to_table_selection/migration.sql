/*
  Warnings:

  - Added the required column `userId` to the `TableSelection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TableSelection" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TableSelection" ADD CONSTRAINT "TableSelection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
