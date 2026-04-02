export const getCategories = async (): Promise<FoodCategories> => {
  const res = await fetch(`http://localhost:3001/categories`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export interface FoodCategories {
  categories: Category[];
}

export interface Category {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  foods: Food[];
}

export interface Food {
  id: number;
  name: string;
  price: string;
  image: string;
  ingredients: string;
  foodCatId: number;
  createdAt: string;
  updatedAt: string;
}
