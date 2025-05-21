/*
  Warnings:

  - The `investmentFocus` column on the `Investor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `preferredStages` column on the `Investor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Investor" DROP COLUMN "investmentFocus",
ADD COLUMN     "investmentFocus" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "preferredStages",
ADD COLUMN     "preferredStages" TEXT[] DEFAULT ARRAY[]::TEXT[];
