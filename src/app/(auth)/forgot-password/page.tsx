"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPasswordApi } from "@/services/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        email: z
          .string()
          .email("Enter a valid email")
          .min(1, "Enter a valid email"),
      })
    ),
  });
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  
  const handleForgotPassword = async (data: any) => {
    setIsLoading(true)
    try {
      const response = await forgotPasswordApi(data);
      if (response) {
        toast.success("Password reset link has been sent to your email");
        router.push("/login");
      } else {
        toast.error("Some error occurred. Please try again later");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try later.");
      }
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <div className="flex flex-col h-screen items-center justify-between">
      <div></div>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="flex flex-col gap-2"
      >
        <p className="font-semibold text-xl text-center">Street Mall Vendor</p>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email below to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vendor@example.com"
                required
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message as string}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {isLoading ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full">Send Reset Link</Button>
            )}
          </CardFooter>
        </Card>
      </form>
      <div className="flex justify-between w-full px-10 py-3">
        <div></div>
        <ModeToggle />
      </div>
    </div>
  );
}
