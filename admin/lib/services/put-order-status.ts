"use server";

import { cookies } from "next/headers";

export const putOrderStatus = async ({
  id,
  status,
}: {
  id: number;
  status: Status;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`https://batbatfooddeliveryx.onrender.com/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("getOrders failed:", res.status, res.statusText);
    return { order: [] };
  }
};

export type Status = "Pending" | "Delivered" | "Cancelled";
