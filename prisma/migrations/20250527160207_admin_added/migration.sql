-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profile_picture" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'admin';
