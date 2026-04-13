export interface Food {
  id: number;
  name: string;
  price: string;
  image: string;
  ingredients: string;
  foodCatId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  foods: Food[];
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

export interface User {
  id: number;
  email: string;
  phoneNumber: string;
  address: string;
  isVerified: boolean;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export type OrderItem = {
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
};
