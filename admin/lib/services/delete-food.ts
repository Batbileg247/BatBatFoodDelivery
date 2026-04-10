"use server";

import { cookies } from "next/headers";

export const deleteFood = async ({ id }: { id: string }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `https://batbatfooddeliveryx.onrender.com/food/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error("getOrders failed:", res.status, res.statusText);
    return { order: [] };
  }
};
