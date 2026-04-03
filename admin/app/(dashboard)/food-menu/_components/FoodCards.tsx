"use client";

import { Category } from "@/lib/services/get-categories";
import { AddFood } from "./AddFood";
import { CardsFunction } from "./CardsFunction";
import { useSearchParams } from "next/navigation";

export const FoodCards = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();

  const selectedCategoryId = searchParams.get("categoryId");

  const filteredCategories = selectedCategoryId
    ? categories.filter((cat) => cat.id === Number(selectedCategoryId))
    : categories;

  return (
    <div className="flex gap-5 flex-col w-full">
      {filteredCategories.map((category) => {
        return (
          <div
            key={category.id}
            className="flex flex-col p-5 gap-4 rounded-xl bg-white w-full"
          >
            <div className="flex gap-2 text-xl font-semibold items-center">
              <h1 className="capitalize">{category.categoryName}</h1>
              <p>({category.foods.length})</p>
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
              <AddFood categoryName={category.categoryName} id={category.id} />
              {category.foods.map((food) => {
                return (
                  <CardsFunction
                    category={categories}
                    key={food.id}
                    food={food}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
