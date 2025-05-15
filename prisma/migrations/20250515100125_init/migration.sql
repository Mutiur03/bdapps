/*
  Warnings:

  - You are about to drop the column `activation_otp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `activation_otp_expire_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isactivated` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Investor` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activation_otp",
DROP COLUMN "activation_otp_expire_at",
DROP COLUMN "created_at",
DROP COLUMN "isactivated",
DROP COLUMN "phone",
DROP COLUMN "updated_at",
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Investor";
