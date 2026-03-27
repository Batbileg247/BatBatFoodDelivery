import { getCategories } from "@/app/api/get-categories";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddCategory } from "./AddCategory";

export const FoodCategory = async () => {
  const isOn = true;
  const { categories } = await getCategories();
  return (
    <div className="p-6 flex flex-col gap-4 w-full rounded-xl bg-white">
      <h1 className="font-semibold text-xl">Dishes category</h1>
      <div className="flex gap-3 flex-wrap w-full">
        {categories.map((p) => (
          <Button
            key={p.id}
            className={`flex items-center capitalize gap-2 font-semibold px-4 py-4 border w-fit rounded-full ${
              isOn ? "border-[#929292]" : "border-[#EF4444]"
            }`}
            variant="ghost"
          >
            <p>{p.categoryName}</p>
            <Badge className="bg-black font-bold text-white">
              {p.foods.length}
            </Badge>
          </Button>
        ))}
        <AddCategory />
      </div>
    </div>
  );
};
