import { signup } from '@/app/login/actions'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CircleSmall } from 'lucide-react';

const passwordRequirements = [
  "At least 8 characters",
  "At least one uppercase letter",
  "At least one lowercase letter",
  "At least one number",
  "At least one special character",
]

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Sign up with your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
            {/* SIGN UP FORM */}
              <div className="grid gap-6">
                {/* EMAIL */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                {/* PASSWORD */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {/* <a
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a> */}
                  </div>
                  <Tooltip>
                     <TooltipTrigger>
                        <Input id="password" type="password" name="password" required />
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>Password requirements:</p>
                        <ul className="list-disc pl-5">
                          {passwordRequirements.map((req, index) => (
                            <li key={index} className="text-sm">
                              <CircleSmall className="inline mr-1" />
                              {req}
                            </li>
                          ))}
                        </ul>
                     </TooltipContent>
                  </Tooltip>
                </div>
                {/* BUTTON */}
                <Button formAction={signup} className="w-full">
                  Sign up
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  )
}
