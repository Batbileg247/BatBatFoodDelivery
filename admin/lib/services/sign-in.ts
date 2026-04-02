"use server";

import { cookies } from "next/headers";

type Credentials = {
  email: string;
  password: string;
};

type SignInResponse = {
  message: string;
  accessToken: string;
};

export const signIn = async (credentials: Credentials) => {
  const cookieStore = await cookies();

  try {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = (await response.json()) as SignInResponse;

    cookieStore.set("token", data.accessToken);
  } catch (error) {
    console.log(error);
  }
};
