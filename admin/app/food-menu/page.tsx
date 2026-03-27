import { FoodCards } from "./_components/FoodCards";
import { FoodCategory } from "./_components/FoodCategory";

const FoodMenuPage = () => {
  return (
    <div className="m-6 gap-6 flex flex-col items-center">
      <FoodCategory />
      <FoodCards />
    </div>
  );
};

export default FoodMenuPage;
