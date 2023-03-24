-- CreateEnum
CREATE TYPE "Crypto" AS ENUM ('XBT', 'BCH', 'ETH');

-- CreateEnum
CREATE TYPE "Fiat" AS ENUM ('USD', 'EUR', 'CAD', 'JPY', 'GBP', 'CHF', 'AUD');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Valet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Valet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "pairId" INTEGER NOT NULL,
    "valetId" INTEGER NOT NULL,
    "count" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyPair" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "crypto" "Crypto" NOT NULL,
    "fiat" "Fiat" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CurrencyPair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Valet_userId_key" ON "Valet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_pairId_key" ON "Asset"("pairId");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_valetId_key" ON "Asset"("valetId");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyPair_name_key" ON "CurrencyPair"("name");

-- AddForeignKey
ALTER TABLE "Valet" ADD CONSTRAINT "Valet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_pairId_fkey" FOREIGN KEY ("pairId") REFERENCES "CurrencyPair"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_valetId_fkey" FOREIGN KEY ("valetId") REFERENCES "Valet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
