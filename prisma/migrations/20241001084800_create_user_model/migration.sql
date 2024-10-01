-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('ru');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "languageCode" "Languages" NOT NULL,
    "role" "Roles" NOT NULL,
    "isBot" BOOLEAN NOT NULL,
    "isPremium" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
