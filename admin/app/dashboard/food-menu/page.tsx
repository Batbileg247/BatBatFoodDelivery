import { getCategories } from "@/lib/services/get-categories";
import { FoodCards } from "./_components/FoodCards";
import { FoodCategory } from "./_components/FoodCategory";
import { getFoods } from "@/lib/services/get-foods";

const FoodMenuPage = async () => {
  const { categories } = await getCategories();
  const data = await getFoods();
  const totalLength = data.food.length;
  return (
    <div className="m-6 gap-6 flex flex-col items-center">
      <FoodCategory categories={categories} foodLength={totalLength} />
      <FoodCards categories={categories} />
    </div>
  );
};

export default FoodMenuPage;
