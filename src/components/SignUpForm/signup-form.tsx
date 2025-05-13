"use client";
import {useRouter} from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
import { toast } from "sonner"

import { signUpWithEmail } from "@/lib/supabase/supabase-auth";



export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter()


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data: any) => {
    try {
      const { error } = await signUpWithEmail(data.email, data.password);
      if (error) throw new Error(error.message);
  
      router.push("/dashboard"); // Only runs if no error
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  //PASSWORD STRENGTH
  const password = watch("password") || ""; //checks the value of password

  const getPasswordStrength = (password: string) => {
    let score = 0;

    if (password.length >= 8) score++; //At least 8 characters
    if (/[A-Z]/.test(password)) score++; //Uppercase
    if (/[a-z]/.test(password)) score++; //Lowercase
    if (/\d/.test(password)) score++; //Has number
    if (/[^A-Za-z0-9]/.test(password)) score++; //Has special character

    return score;
  };

  const strengthLabels = ["Too Weak", "Weak", "Okay", "Good", "Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-emerald-600",
  ];

  const score = getPasswordStrength(password);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Sign up with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              {/* External Login */}
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Apple
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </div>
              {/* Internal Login */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or join with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="joe.bloggs@mail.com"
                    {...register("email", {
                      required: true,
                      validate: (value) =>
                        value.includes("@") || "Please enter a valid email",
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: true,
                      validate: {
                        minLength: (v) =>
                          v.length >= 8 ||
                          "Password must be at least 8 characters",
                        hasUpper: (v) =>
                          /[A-Z]/.test(v) ||
                          "Password must contain an uppercase letter",
                        hasLower: (v) =>
                          /[a-z]/.test(v) ||
                          "Password must contain an lowercase letter",
                        hasNumber: (v) =>
                          /\d/.test(v) || "Password must contain a number",
                        hasSpecial: (v) =>
                          /[^A-Za-z0-9]/.test(v) ||
                          "Password must contain a special character",
                      },
                    })}
                  />
                  {/* Password strength */}
                  {password && (
                    <div className="mt-2">
                      <div className="h-2 w-full rounded bg-muted">
                        <div
                          className={`h-2 rounded transition-all ${
                            strengthColors[score - 1]
                          }`}
                          style={{ width: `${(score / 5) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs mt-1 text-muted-foreground">
                        {strengthLabels[score - 1] || "Too Short"}
                      </p>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                      required: "Passwords must match",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword.message as string}
                    </p>
                  )}
                </div>
                {/* <div>
                    Passwords do not match
                </div> */}
                <Button type="submit" className="w-full">
                  Join
                </Button>
              </div>
              {/* <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="underline underline-offset-4 hover:text-blue-500"
                >
                  Login
                </Link>
              </div> */}
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
