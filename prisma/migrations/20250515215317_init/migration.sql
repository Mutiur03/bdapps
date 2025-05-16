-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "profile_picture" TEXT,
    "university" TEXT,
    "department" TEXT,
    "year_of_study" TEXT,
    "graduation_year" TEXT,
    "cgpa" DOUBLE PRECISION,
    "student_id" TEXT,
    "student_id_front" TEXT,
    "student_id_back" TEXT,
    "nid_front" TEXT,
    "nid_back" TEXT,
    "university_email" TEXT,
    "date_of_birth" TEXT,
    "address" TEXT,
    "bio" TEXT,
    "skills" TEXT,
    "interests" TEXT,
    "socail_links" TEXT[],
    "career_goals" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'investor',
    "isActivated" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_university_email_key" ON "User"("university_email");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_email_key" ON "Investor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_phone_key" ON "Investor"("phone");
