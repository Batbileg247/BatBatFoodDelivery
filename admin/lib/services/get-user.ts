"use server";

import { cookies } from "next/headers";

export const getUser = async (): Promise<GetUser> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const res = await fetch(`http://localhost:3001/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export type GetUser = {
  user: User[];
};

export type User = {
  id: number;
  email: string;
  phoneNumber: string;
  address: string;
  isVerified: boolean;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
};
