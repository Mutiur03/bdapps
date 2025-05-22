-- AlterTable
ALTER TABLE "Investor" ALTER COLUMN "investmentFocus" DROP NOT NULL,
ALTER COLUMN "investmentFocus" DROP DEFAULT,
ALTER COLUMN "investmentFocus" SET DATA TYPE TEXT,
ALTER COLUMN "preferredStages" DROP NOT NULL,
ALTER COLUMN "preferredStages" DROP DEFAULT,
ALTER COLUMN "preferredStages" SET DATA TYPE TEXT;
