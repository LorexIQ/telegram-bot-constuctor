-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('ru');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "BusSetting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ermOrigin" TEXT NOT NULL,
    "clockerOrigin" TEXT NOT NULL,
    "ermToken" TEXT NOT NULL,
    "clockerToken" TEXT NOT NULL,
    "isReady" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BusSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "languageCode" "Languages" NOT NULL,
    "role" "Roles" NOT NULL,
    "isBot" BOOLEAN NOT NULL,
    "isPremium" BOOLEAN NOT NULL,
    "lastName" TEXT,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LastUserMessage" (
    "messageId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,

    CONSTRAINT "LastUserMessage_pkey" PRIMARY KEY ("messageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "LastUserMessage_messageId_key" ON "LastUserMessage"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "LastUserMessage_chatId_key" ON "LastUserMessage"("chatId");

-- AddForeignKey
ALTER TABLE "BusSetting" ADD CONSTRAINT "BusSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
