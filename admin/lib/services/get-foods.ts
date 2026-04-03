import { cookies } from "next/headers";

export interface FoodItem {
  id: number;
  name: string;
  price: string;
  image: string;
  ingredients: string;
  foodCatId: number;
  createdAt: string;
  updatedAt: string;
}
export interface FoodApiResponse {
  food: FoodItem[];
}
export const getFoods = async (): Promise<FoodApiResponse> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const res = await fetch(`https://batbatfooddeliveryx.onrender.com/food`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch foods");

  const data = await res.json();
  return data;
};
