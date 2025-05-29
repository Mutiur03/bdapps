/*
  Warnings:

  - You are about to drop the column `relesed_amount` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `relesed_amount` on the `CentralAdmin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "relesed_amount",
ADD COLUMN     "released_amount" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "CentralAdmin" DROP COLUMN "relesed_amount",
ADD COLUMN     "released_amount" INTEGER DEFAULT 0;
