-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_foodCatId_fkey";

-- DropForeignKey
ALTER TABLE "FoodOrderItems" DROP CONSTRAINT "FoodOrderItems_foodId_fkey";

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_foodCatId_fkey" FOREIGN KEY ("foodCatId") REFERENCES "FoodCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodOrderItems" ADD CONSTRAINT "FoodOrderItems_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
