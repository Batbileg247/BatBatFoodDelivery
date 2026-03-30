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

// 1. Define the response as an object containing the food array
export interface FoodApiResponse {
  food: FoodItem[];
}

// 2. Remove the extra [] from the Promise return type
export const getFoods = async (): Promise<FoodApiResponse> => {
  const res = await fetch(`http://localhost:3001/food`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to fetch foods");

  const data = await res.json();
  return data; // This is { food: [...] }
};
