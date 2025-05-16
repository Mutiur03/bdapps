-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "cover_image" TEXT,
ADD COLUMN     "documents" TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "pitch_video" TEXT,
ADD COLUMN     "profile_picture" TEXT,
ADD COLUMN     "start_date" TEXT;
