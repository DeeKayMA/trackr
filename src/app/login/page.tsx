// Login form (Supabase)
"use client";

import { Crosshair } from "lucide-react";
import { LoginForm } from "@/components/LoginForm/login-form";
import { SignupForm } from "@/components/SignUpForm/signup-form";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-top gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Crosshair className="size-4" />
          </div>
          Trackr
        </a>
        <Tabs defaultValue="login" className="max-w-[400px]">
          <TabsList className="w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm/>
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
