// This stays server-side — NO 'use client'
import LoginTabs from "./LoginTabs";
import { LoginForm } from "@/components/Forms/login-form";
import { SignUpForm } from "@/components/Forms/singup-form";

export default function LoginPage() {
  return (
    <LoginTabs 
      loginForm={<LoginForm />} 
      signupForm={<SignUpForm />} 
    />
  );
}
