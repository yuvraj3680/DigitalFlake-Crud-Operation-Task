/*
  Warnings:

  - You are about to drop the column `username` on the `userdetails` table. All the data in the column will be lost.
  - Added the required column `name` to the `UserDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userdetails` DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
