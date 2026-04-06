import { Status } from "@/lib/services/put-order-status";

export interface OrderItem {
  id: number;
  quantity: number;
  food?: { name: string };
}

export interface Order {
  id: number;
  status: Status;
  createdAt: string;
  totalPrice: number | string;
  userId: number;
  user?: { email: string; address: string };
  orderItems?: OrderItem[];
}

export interface DateRange {
  from: string;
  to: string;
}