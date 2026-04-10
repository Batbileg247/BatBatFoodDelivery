import { cookies } from "next/headers";

export const getCategories = async (): Promise<FoodCategories> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const res = await fetch(
    `https://batbatfooddeliveryx.onrender.com/categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
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
