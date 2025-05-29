-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "relesed_amount" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "CentraAdmin" (
    "id" SERIAL NOT NULL,
    "raised_amount" INTEGER DEFAULT 0,
    "relesed_amount" INTEGER DEFAULT 0,

    CONSTRAINT "CentraAdmin_pkey" PRIMARY KEY ("id")
);
