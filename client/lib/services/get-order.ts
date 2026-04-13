import { Order, OrderItem, User } from "../types";


export type OrderWithUser = Order & {
  user?: User;
  foodOrderItems?: OrderItem[];
};

export const getOrders = async (): Promise<OrderWithUser[]> => {
  try {
    const res = await fetch("https://batbatfooddeliveryx.onrender.com/order", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("getOrders failed:", res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data.order) ? data.order : [];
  } catch (err) {
    console.error("getOrders error:", err);
    return [];
  }
};
