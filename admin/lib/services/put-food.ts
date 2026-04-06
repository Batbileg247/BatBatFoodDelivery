"use server";

import { cookies } from "next/headers";

export const putFood = async ({
  putBody,
  id
}: {
  putBody: {
    name: string;
    price: string;
    foodCatId: number;
    ingredients: string;
    image: string;
  };
  id: string
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`https://batbatfooddeliveryx.onrender.com/food/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(putBody),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("getOrders failed:", res.status, res.statusText);
    return { order: [] };
  }
};
