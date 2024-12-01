-- CreateTable
CREATE TABLE "StalcraftTPItem" (
    "itemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,

    CONSTRAINT "StalcraftTPItem_pkey" PRIMARY KEY ("itemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "StalcraftTPItem_itemId_key" ON "StalcraftTPItem"("itemId");
