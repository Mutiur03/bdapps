/*
  Warnings:

  - You are about to drop the `CentraAdmin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CentraAdmin";

-- CreateTable
CREATE TABLE "CentralAdmin" (
    "id" SERIAL NOT NULL,
    "raised_amount" INTEGER DEFAULT 0,
    "relesed_amount" INTEGER DEFAULT 0,

    CONSTRAINT "CentralAdmin_pkey" PRIMARY KEY ("id")
);
