"use server";

import { cookies } from "next/headers";

export const getOrders = async (): Promise<GetOrderType> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`https://batbatfooddeliveryx.onrender.com/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("getOrders failed:", res.status, res.statusText);
    return { order: [] };
  }

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
  user?: {
    id: number;
    email: string;
    address: string;
    phoneNumber: string;
  };
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  foodId: number;
  foodOrderId: number;
  food: {
    id: number;
    name: string;
    price: string;
    image: string;
  };
}
