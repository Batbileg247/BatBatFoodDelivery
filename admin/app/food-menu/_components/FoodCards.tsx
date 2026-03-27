import { getCategories } from "@/app/api/get-categories";
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

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
            <AddFood categoryName={category.categoryName} id={category.id} />
            {category.foods.map((food) => {
              return (
                <Card
                  key={food.id}
                  className="w-full p-4 aspect-4/3 flex flex-col hover:brightness-95 cursor-pointer items-center"
                >
                  <div className="flex flex-col">
                    <img
                      src="https://media.istockphoto.com/id/637790866/photo/100-lamb-greek-burger.jpg?s=612x612&w=0&k=20&c=cYxRAfU7OdjJCK4M7dbH4YUIk7SGqETlDvONBEOATuw="
                      alt=""
                      className="aspect-2/1 object-cover mb-4 rounded-xl"
                    />
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <h1 className="text-[18px] text-[#EF4444] font-semibold capitalize">
                          {food.name}
                        </h1>
                        <p className="font-medium text-base">${food.price}</p>
                      </div>
                      <p className="text-[16px]">{food.ingredients}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
