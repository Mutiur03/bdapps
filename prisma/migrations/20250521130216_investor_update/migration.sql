/*
  Warnings:

  - You are about to drop the column `linkedin` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Investor` table. All the data in the column will be lost.
  - The `maxInvestment` column on the `Investor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `minInvestment` column on the `Investor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Investor" DROP COLUMN "linkedin",
DROP COLUMN "twitter",
DROP COLUMN "website",
DROP COLUMN "maxInvestment",
ADD COLUMN     "maxInvestment" INTEGER,
DROP COLUMN "minInvestment",
ADD COLUMN     "minInvestment" INTEGER;
