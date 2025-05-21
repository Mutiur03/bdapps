-- AlterTable
ALTER TABLE "Investor" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "customSocials" JSONB DEFAULT '{"links":[]}',
ADD COLUMN     "experienceYears" TEXT,
ADD COLUMN     "investmentFocus" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "maxInvestment" TEXT,
ADD COLUMN     "minInvestment" TEXT,
ADD COLUMN     "preferredStages" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "website" TEXT;
