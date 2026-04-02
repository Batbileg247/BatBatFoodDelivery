"use server";

import { cookies } from "next/headers";

export const getOrders = async (): Promise<GetOrderType> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const res = await fetch(`http://localhost:3001/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export interface GetOrderType {
  order: Order[];
}

export interface Order {
  id: number;
  userId: number;
  totalPrice: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
