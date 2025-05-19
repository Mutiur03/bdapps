-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "progress" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'planned';
