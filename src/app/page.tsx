"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div></div>

      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Click below to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-between w-full px-10 py-3">
        <div></div>
        <ModeToggle />
      </div>
    </div>
  );
}
