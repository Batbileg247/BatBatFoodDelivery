"use server";

import { cookies } from "next/headers";

export const postFood = async ({
  postBody,
}: {
  postBody: {
    name: string;
    price: string;
    foodCatId: number;
    ingredients: string;
    image: string;
  };
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`https://batbatfooddeliveryx.onrender.com/food`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postBody),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("getOrders failed:", res.status, res.statusText);
    return { order: [] };
  }
};
