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
    <main className="flex min-h-screen flex items-center flex-col">
      {/* Hero Section */}
      <section
        className="w-full flex pt-10 gap-8 items-center flex-col mb-0"
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
        <div className="w-full max-w-3xl px-4">
          <LandingHeader className="" />
        </div>
        <div className="flex flex-col gap-8 items-center px-4 text-center">
          <h1 className="mt-8 text-neutral-950 text-center text-balance">
            <span className=" lg:text-2xl text-lg">The smartest way to</span> <br />{" "}
            <span className="font-bold lg:text-6xl text-4xl">Track Your Job Hunt</span>
          </h1>
          <h2 className="font-normal text-neutral-800 text-md lg:text-lg ">
            Your all-in-one job application tracker.
          </h2>

          <Button
            asChild
            className="my-8 animate-bounce-slow outline outline-[2px] outline-dashed outline-white outline-offset-4 text-white font-semibold bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-colors duration-200"
          >
            <Link href="/login">Start Tracking Jobs</Link>
          </Button>
        </div>
        {/* Companies  */}

        <div className=" px-4 text-center items-center flex flex-col  gap-2 w-full text-neutral-950">
          <p className="">Track job applications from</p>
          <div className="flex flex-row gap-8 w-full items-center justify-center max-w-xl mx-4">
            <IndeedLogo className="h-10 w-20 " />
            <LinkedInLogo className="h-10 w-20 " />
            <GlassdoorLogo className="h-10 w-20 " />
          </div>
        </div>
        {/* Colour Divider */}
        <div className="w-full h-12 relative overflow-hidden ">
          <div className="absolute inset-0 bg-background clip-diagonal-bl-to-tr" />
        </div>
      </section>
      {/* Problem Section */}
      <section className="py-16 px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-neutral-900 mb-6">
          Job hunting shouldn't feel like this
        </h2>
        <ul className="text-neutral-700 space-y-4 text-lg">
          <li>😩 Lost track of where you applied</li>
          <li>📅 Forgot to follow up on time</li>
          <li>📊 No clue how your job hunt is going</li>
          <li>🧮 Spreadsheets, notes, and tabs everywhere</li>
        </ul>
      </section>
      {/* Key features */}
      <section className="py-16 px-4 max-w-5xl text-center">
        <h2 className="text-3xl font-semibold text-neutral-900 mb-10">
          Everything you need to stay organised
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="font-semibold text-lg text-neutral-900">
              📁 Track applications
            </h3>
            <p className="text-neutral-700">
              Log roles, statuses, notes, and deadlines — all in one place.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-neutral-900">
              📅 Daily/Weekly goals
            </h3>
            <p className="text-neutral-700">
              Set targets and keep your momentum going.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-neutral-900">
              📊 Visual analytics
            </h3>
            <p className="text-neutral-700">
              See your streaks, activity, and response rates over time.
            </p>
          </div>
        </div>
      </section>
      {/* Images */}
      <section>Screenshot</section>
      {/* Testimoial */}
      <section className="py-16 px-4 max-w-3xl text-center">
        <h2 className="text-2xl font-semibold mb-8">Loved by early users</h2>
        <blockquote className="text-neutral-800 italic">
          “I finally stopped using Google Sheets. This is exactly what I
          needed.”
          <footer className="mt-4 text-sm text-neutral-500">
            – Early Beta User
          </footer>
        </blockquote>
      </section>
      {/* Final CTA */}
      <section className="py-20 px-4 bg-purple-50 w-full text-center">
        <h2 className="text-3xl font-bold mb-4 text-neutral-900">
          Ready to take control of your job search?
        </h2>
        <p className="text-neutral-700 mb-6">
          Track your progress, stay motivated, and get hired faster.
        </p>
        <Button
          asChild
          className="text-white font-semibold bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
        >
          <Link href="/login">Start Tracking for Free</Link>
        </Button>
      </section>
    </main>
  );
}
