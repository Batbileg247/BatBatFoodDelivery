"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/services/sign-in";

const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<{ email?: string; auth?: string }>(
    {},
  );

  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (errorInfo.auth) setErrorInfo((prev) => ({ ...prev, auth: "" }));

    if (value === "") {
      setErrorInfo((prev) => ({ ...prev, email: "Мэйл хаягаа оруулна уу" }));
    } else if (!validateEmail.test(value)) {
      setErrorInfo((prev) => ({ ...prev, email: "Зөв мэйл хаяг оруулна уу" }));
    } else {
      setErrorInfo((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || errorInfo.email) return;

    setIsLoading(true);
    setErrorInfo((prev) => ({ ...prev, auth: "" }));

    try {
      const res = await signIn({ email, password });

      if (res?.success) {
        router.push("/food-menu");
      } else {
        setErrorInfo((prev) => ({
          ...prev,
          auth: res?.message ?? "Нэвтрэх мэдээлэл буруу байна",
        }));
      }
    } catch (err) {
      setErrorInfo((prev) => ({
        ...prev,
        auth: "Системийн алдаа гарлаа. Дахин оролдоно уу.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex absolute z-10 pt-20 justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-104 p-6 border rounded-xl shadow-sm bg-white"
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Log in</h1>
          <p className="text-base text-muted-foreground">
            Log in to enjoy your favorite dishes.
          </p>
        </div>

        {errorInfo.auth && (
          <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-md">
            <p className="text-destructive text-sm text-center font-medium">
              {errorInfo.auth}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Email address"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                className={`h-10 pl-10 ${errorInfo.email ? "border-destructive" : ""}`}
              />
            </div>
            {errorInfo.email && (
              <p className="text-destructive text-[12px] font-medium ml-1">
                {errorInfo.email}
              </p>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 pl-10"
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full font-semibold"
          disabled={!email || !password || !!errorInfo.email || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Let's Go"
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <span
              className="text-primary cursor-pointer hover:underline font-medium"
              onClick={() => router.push("/sign-up")}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};
