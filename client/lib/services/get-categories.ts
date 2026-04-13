import { Category } from "../types";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(
      `https://batbatfooddeliveryx.onrender.com/categories`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      console.error("getCategories failed:", res.status);
      return [];
    }

    const data = await res.json();
    console.log(data);
    return data.categories ?? [];
  } catch (err) {
    console.error("getCategories error:", err);
    return [];
  }
};
