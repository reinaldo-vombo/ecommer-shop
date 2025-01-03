/*
  Warnings:

  - The primary key for the `customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(191)`.
  - You are about to alter the column `password` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(191)`.
  - You are about to alter the column `address` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(191)`.
  - A unique constraint covering the columns `[email]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_customerId_fkey`;

-- DropIndex
DROP INDEX `orders_customerId_fkey` ON `orders`;

-- DropIndex
DROP INDEX `reviews_customerId_fkey` ON `reviews`;

-- AlterTable
ALTER TABLE `categorys` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `customers` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `avatar` TEXT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `orders` MODIFY `customerId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `customerId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `brands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `customers_email_key` ON `customers`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `customers_password_key` ON `customers`(`password`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
