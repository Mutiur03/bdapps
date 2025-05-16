/*
  Warnings:

  - You are about to drop the column `socail_links` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "socail_links",
ADD COLUMN     "social_links" JSONB;
