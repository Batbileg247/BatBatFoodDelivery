import { getCategories } from "@/app/api/get-categories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddFood } from "./AddFood";

export const FoodCards = async () => {
  const { categories } = await getCategories();
  return (
    <div className="flex gap-5 flex-col w-full">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col category-6 p-5 gap-4 rounded-xl bg-white w-full"
        >
          <div className="flex gap-2 text-xl font-semibold items-center">
            <h1 className="capitalize">{category.categoryName}</h1>
            <p>({category.foods.length})</p>
          </div>

          <div className="gap-4 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
            <AddFood categoryName={category.categoryName} />
            {category.foods.map((food) => {
              return (
                <Card
                  key={food.id}
                  className="w-full aspect-4/3 flex items-center"
                >
                  {food.name}
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
