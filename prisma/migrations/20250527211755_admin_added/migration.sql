/*
  Warnings:

  - You are about to drop the column `invesrorId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_invesrorId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "invesrorId",
ADD COLUMN     "adminId" INTEGER;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
