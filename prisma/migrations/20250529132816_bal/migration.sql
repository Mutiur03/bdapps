-- DropForeignKey
ALTER TABLE "ProjectInvestor" DROP CONSTRAINT "ProjectInvestor_investorId_fkey";

-- AlterTable
ALTER TABLE "Investor" ADD COLUMN     "company_role" TEXT;
