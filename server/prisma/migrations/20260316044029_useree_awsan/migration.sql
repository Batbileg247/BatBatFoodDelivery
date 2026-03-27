/*
  Warnings:

  - You are about to drop the column `user` on the `FoodOrder` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "FoodOrder_user_key";

-- AlterTable
ALTER TABLE "FoodOrder" DROP COLUMN "user";
