type Credentials = {
  email: string;
  password: string;
};

type SignInResponse = {
  accessToken: string;
};

export const signIn = async (credentials: Credentials) => {
  const response = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = (await response.json()) as SignInResponse;
  return data;
};
