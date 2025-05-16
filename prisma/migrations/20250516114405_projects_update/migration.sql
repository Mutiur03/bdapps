/*
  Warnings:

  - You are about to drop the column `deadline` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Project` table. All the data in the column will be lost.
  - Added the required column `raised_amount` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "deadline",
DROP COLUMN "location",
ADD COLUMN     "completed_at" TEXT,
ADD COLUMN     "raised_amount" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'active';
