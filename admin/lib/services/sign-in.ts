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

// Define a type for what the Client Component expects
export type ActionResponse = {
  success: boolean;
  message: string;
};

export const signIn = async (
  credentials: Credentials,
): Promise<ActionResponse> => {
  const cookieStore = await cookies();

  try {
    const response = await fetch(
      "https://batbatfooddeliveryx.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );

    const data = (await response.json()) as SignInResponse;

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Нэвтрэх мэдээлэл буруу байна",
      };
    }

    cookieStore.set("token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return {
      success: true,
      message: "Амжилттай нэвтэрлээ",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Сервертэй холбогдоход алдаа гарлаа",
    };
  }
};
