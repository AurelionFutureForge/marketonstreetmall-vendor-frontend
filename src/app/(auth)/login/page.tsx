"use client";

import Link from "next/link";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { LoginUserFieldValues, loginUserSchema } from "@/schema/cmsUserSchema";
import { ModeToggle } from "@/components/mode-toggle";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFieldValues>({
    resolver: zodResolver(loginUserSchema),
  });

  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const submitCredentials = async (data: LoginUserFieldValues) => {
    console.log(data);
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-between h-screen">
      <div></div>
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-xl text-center">Street Mall Admin</p>
        <Card className="mx-auto max-w-sm ">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(submitCredentials)}
              className="grid gap-4"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm col-span-4 text-sm">{`${errors.email.message}`}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative flex items-center w-full gap-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    required
                    {...register("password")}
                  />
                  <div
                    className="absolute right-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm col-span-4">{`${errors.password.message}`}</p>
                )}
              </div>
              {isLoading ? (
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button disabled={isLoading} type="submit" className="w-full">
                  Login
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between w-full px-10 py-3">
        <div></div>
        <ModeToggle />
      </div>
    </div>
  );
}
