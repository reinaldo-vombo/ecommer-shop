-- AlterTable
ALTER TABLE `customers` ADD COLUMN `cart` JSON NULL,
    ADD COLUMN `wishlist` JSON NULL;
