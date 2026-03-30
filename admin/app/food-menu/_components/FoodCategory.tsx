"use client";

import { Category } from "@/app/api/get-categories";
import { Button } from "@/components/ui/button";
import { AddCategory } from "./AddCategory";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryFunction } from "./CategoryFunction";
import { Badge } from "@/components/ui/badge";

export const FoodCategory = ({
  categories,
  foodLength,
}: {
  categories: Category[];
  foodLength: number;
}) => {
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get("categoryId") || "all";
  const pathname = usePathname();
  const router = useRouter();

  const handleCategoryClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id === "all") {
      params.delete("categoryId");
    } else {
      params.set("categoryId", id);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-6 flex flex-col gap-4 w-full rounded-xl bg-white">
      <h1 className="font-semibold text-xl">Dishes category</h1>
      <div className="flex gap-3 flex-wrap w-full">
        <Button
          onClick={() => handleCategoryClick("all")}
          className={`group flex items-center border-2 capitalize gap-2 font-semibold px-4 py-4 w-fit rounded-full ${
            activeCategoryId === "all" ? "border-[#EF4444]" : "border-[#929292]"
          }`}
          variant="ghost"
        >
          <p>All Dishes</p>
          <Badge className="bg-black rounded-full h-6 min-w-8 font-bold text-white">
            <p className="">{foodLength}</p>
          </Badge>
        </Button>
        {categories.map((p) => {
          const isActive = Number(activeCategoryId) === p.id;
          return (
            <Badge
              key={p.id}
              onClick={() => handleCategoryClick(String(p.id))}
              className={`group flex items-center capitalize gap-2 border-2 font-semibold px-4 py-4 w-fit rounded-full ${
                isActive ? "border-[#EF4444]" : "border-[#929292]"
              }`}
              variant="ghost"
            > 
              <p>{p.categoryName}</p>
              <CategoryFunction category={p} isActive={isActive} />
            </Badge>
          );
        })}
        <AddCategory />
      </div>
    </div>
  );
};
