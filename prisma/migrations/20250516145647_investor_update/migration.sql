/*
  Warnings:

  - Added the required column `password` to the `Investor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Investor" ADD COLUMN     "company_description" TEXT,
ADD COLUMN     "company_name" TEXT,
ADD COLUMN     "company_website" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "profile_picture" TEXT;
