import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LandingHeader from "@/components/Header/LandingHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  IndeedLogo,
  LinkedInLogo,
  GlassdoorLogo,
} from "@/CompanyLogos/CompanyLogos";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect logged-in users to /dashboard
  if (user) {
    redirect("/dashboard");
  }

  // Show homepage for guests
  return (
    <main className="light flex min-h-screen flex items-center flex-col">
      {/* Hero Section */}
      <section
        className="w-full flex py-10 gap-8 items-center flex-col mb-0"
        style={{
          backgroundColor: "hsla(267,0%,100%,1)",
          backgroundImage: `
            radial-gradient(at 40% 20%, hsla(269,94%,66%,0.6) 0px, transparent 50%),
            radial-gradient(at 78% 5%, hsla(265,100%,85%,0.4) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsla(274,100%,40%,0.5) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(249,100%,80%,0.3) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsla(320,100%,70%,0.4) 0px, transparent 50%),
            radial-gradient(at 64% 29%, hsla(229,89%,60%,0.3) 0px, transparent 50%)
         `,
        }}
      >
        <div className="w-full max-w-3xl px-4 sticky top-4 z-50">
          <LandingHeader className="shadow-md" />
        </div>
        <div className="flex flex-col gap-8 items-center px-4 text-center w-full">
          <h1 className="mt-8 text-neutral-950 text-center text-balance">
            <span className=" lg:text-2xl text-lg">The smartest way to</span>{" "}
            <br />{" "}
            <span className="font-bold lg:text-6xl text-4xl">
              Track Your Job Hunt
            </span>
          </h1>
          <h2 className="font-normal text-neutral-950 text-md lg:text-lg ">
            Your all-in-one job application tracker.
          </h2>

          <Button
            asChild
            className="my-8 animate-bounce-slow outline outline-[2px] outline-dashed outline-white outline-offset-4 text-white font-semibold bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 transition-colors duration-200"
          >
            <Link href="/login?tab=signup">Start Tracking Jobs</Link>
          </Button>

          <div className="w-full max-w-[1000px] relative rounded-lg shadow-2xl overflow-visible ">
            {/* Browser Topbar */}
            <div className="bg-neutral-800 w-full flex flex-row items-center py-2 px-2 gap-2 rounded-t-lg">
              <div className="rounded-full h-2 w-2 bg-red-500" />
              <div className="rounded-full h-2 w-2 bg-amber-500" />
              <div className="rounded-full h-2 w-2 bg-green-500" />
            </div>

            {/* Screenshot */}
            <Image
              src="/Jobora Screenshot.png"
              alt="Jobora Screenshot"
              width={2880}
              height={1558}
              className="w-full rounded-b-lg"
              quality={100}
            />

            {/* Floating Feature Cards */}
            <Card
              role="region"
              aria-label="Track Applications feature"
              className=" hidden lg:flex absolute border-none gap-2 z-10 top-[50%] -left-6 w-56 p-4 shadow-xl outline outline-[2px] outline-dashed outline-neutral-500 outline-offset-4 text-left bg-gradient-to-r from-neutral-50 to-neutral-200 text-neutral-950 "
            >
              <CardTitle className="text-sm font-semibold">
                ✅ Track Applications
              </CardTitle>
              <CardDescription className="text-xs w-full text-neutral-600">
                Log roles, statuses, and deadlines in one place.
              </CardDescription>
            </Card>

            <Card
              role="region"
              aria-label="Set goals feature"
              className=" hidden lg:flex absolute gap-2 z-10 border-none top-[28%] -right-16 w-56 p-4 shadow-xl outline outline-[2px] outline-dashed outline-neutral-500 outline-offset-4 text-left bg-gradient-to-r from-neutral-50 to-neutral-200 text-neutral-950"
            >
              <CardTitle className="text-sm font-semibold">🔥 Set Goals</CardTitle>
              <CardDescription className="text-xs w-full text-neutral-600">
                Stay consistent and remain accountable with daily or weekly
                targets.
              </CardDescription>
            </Card>

            <Card
              role="region"
              aria-label="Analytics feature"
              className=" hidden lg:flex absolute gap-2 z-10 -bottom-10 left-[45%] w-56 p-4 shadow-xl border-none outline outline-[2px] outline-dashed outline-neutral-500 outline-offset-4 text-left bg-gradient-to-r from-neutral-50 to-neutral-200 text-neutral-950"
            >
              <CardTitle className="text-sm font-semibold">
                📈 Get Analytics
              </CardTitle>
              <CardDescription className="text-xs w-full text-neutral-600">
                See your progress with clean, easy-to-read charts and graphs.
              </CardDescription>
            </Card>
          </div>

          {/* Social Proof  */}

          <div className="mt-20 px-4 text-center items-center flex flex-col  gap-2 w-full text-neutral-950">
            <p className="">Track job applications from</p>
            <div className="flex flex-row gap-8 w-full items-center justify-center max-w-xl mx-4">
              <IndeedLogo className="h-10 w-20 " />
              <LinkedInLogo className="h-10 w-20 " />
              <GlassdoorLogo className="h-10 w-20 " />
            </div>
          </div>
        </div>

        {/* Colour Divider */}
        {/* <div className="w-full h-12 relative overflow-hidden ">
          <div className="absolute inset-0 bg-background clip-diagonal-bl-to-tr" />
        </div> */}
      </section>
    </main>
  );
}
