/*
  Warnings:

  - You are about to alter the column `mrp` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `mrp` DOUBLE NOT NULL;
