"use client";

import { Category } from "@/lib/services/get-categories";
import { useSearchParams } from "next/navigation";
import { FoodCard } from "./FoodCard";

export const MenuItems = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();

  const selectedCategoryId = searchParams.get("categoryId");

  const filteredCategories = selectedCategoryId
    ? categories.filter((cat) => cat.id === Number(selectedCategoryId))
    : categories;

  return (
    <div className="flex p-22 gap-5 flex-col w-full">
      {filteredCategories.map((category) => {
        return (
          <div
            key={category.id}
            className="flex flex-col p-5 gap-13.5 rounded-xl w-full"
          >
            <div className="flex gap-2 text-xl font-semibold items-center">
              <h1 className="capitalize">{category.categoryName}</h1>
            </div>

            <div className="gap-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
              {category.foods.map((food) => {
                return <FoodCard key={food.id} food={food} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
