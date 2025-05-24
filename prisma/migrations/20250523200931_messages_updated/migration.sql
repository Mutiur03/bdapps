-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "invesrorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_invesrorId_fkey" FOREIGN KEY ("invesrorId") REFERENCES "Investor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
