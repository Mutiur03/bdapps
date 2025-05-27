/*
  Warnings:

  - The values [investor] on the enum `MessageRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `receiverInvestorId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderInvestorId` on the `Message` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MessageRole_new" AS ENUM ('user', 'admin');
ALTER TABLE "Message" ALTER COLUMN "senderType" TYPE "MessageRole_new" USING ("senderType"::text::"MessageRole_new");
ALTER TABLE "Message" ALTER COLUMN "receiverType" TYPE "MessageRole_new" USING ("receiverType"::text::"MessageRole_new");
ALTER TYPE "MessageRole" RENAME TO "MessageRole_old";
ALTER TYPE "MessageRole_new" RENAME TO "MessageRole";
DROP TYPE "MessageRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverInvestorId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderInvestorId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "receiverInvestorId",
DROP COLUMN "senderInvestorId",
ADD COLUMN     "receiverAdminId" INTEGER,
ADD COLUMN     "senderAdminId" INTEGER,
ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderAdminId_fkey" FOREIGN KEY ("senderAdminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverAdminId_fkey" FOREIGN KEY ("receiverAdminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
