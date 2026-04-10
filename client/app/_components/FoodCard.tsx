"use client";

import { Food } from "@/lib/services/get-categories";
import { Card } from "@/components/ui/card";

export function FoodCard({ food }: { food: Food }) {
  return (
    <Card
      key={food.id}
      className="w-full bg-white text-black p-4 aspect-4/3 flex flex-col hover:brightness-95 cursor-pointer items-center"
    >
      <div className="flex w-full flex-col">
        {food.image === "" ? (
          <p>Image is not found</p>
        ) : (
          <img
            src={food.image}
            alt=""
            className="aspect-2/1 object-cover mb-4 rounded-xl w-full h-full"
          />
        )}
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="text-[18px] text-[#EF4444] font-semibold capitalize">
              {food.name}
            </h1>
            <p className="font-medium text-base">₮{food.price}</p>
          </div>
          <p className="text-[16px]">{food.ingredients}</p>
        </div>
      </div>
    </Card>
  );
}
