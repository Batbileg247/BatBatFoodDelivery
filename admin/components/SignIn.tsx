"use client";

import { signIn } from "@/lib/services/sign-in";
import { Input } from "@base-ui/react";
import { useState } from "react";
import { Button } from "./ui/button";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const credentials = {
      email,
      password,
    };
    try {
      await signIn(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Input
        placeholder="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Sign In</Button>
    </div>
  );
};
