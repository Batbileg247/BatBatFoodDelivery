/*
  Warnings:

  - The values [pending,canceled,delivered] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('Pending', 'Cancelled', 'Delivered');
ALTER TABLE "public"."FoodOrder" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "FoodOrder" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "FoodOrder" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;

-- AlterTable
ALTER TABLE "FoodOrder" ALTER COLUMN "status" SET DEFAULT 'Pending';
