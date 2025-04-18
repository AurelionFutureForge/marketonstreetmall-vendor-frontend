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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { resetPasswordApi } from "@/services/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });
  
  const params = useParams();
  const token = params.token as string;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleResetPassword = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await resetPasswordApi({
        new_password: data.password,
        token: token,
      });
      if (response) {
        toast.success("Password has been reset successfully");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error("An unexpected error occurred. Please try again later");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("error", error.message);
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-screen items-center justify-between">
      <div></div>
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="flex flex-col gap-2"
      >
        <p className="font-semibold text-xl text-center">Street Mall Vendor</p>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>Enter your new password.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative flex items-start w-full gap-2 flex-col">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  required
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message as string}
                  </p>
                )}
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative flex items-start w-full gap-2 flex-col">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  required
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message as string}
                  </p>
                )}
                <div
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Eye /> : <EyeOff />}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {isLoading ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full">Reset Password</Button>
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
