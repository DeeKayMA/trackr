// Analytics page on the dashboard
import Header from "@/components/Header/Header";
import { TempCard } from "@/components/temp/TempCard";
import { TotalAppsCard } from "@/app/dashboard/analytics/components/TotalAppsCard";
import { TotalInterviewsCard } from "@/app/dashboard/analytics/components/TotalInterviewsCard";
import { TotalOffersCard } from "@/app/dashboard/analytics/components/TotalOffersCard";
import { Button } from "@/components/ui/button";
import { QuoteCard } from "@/app/dashboard/analytics/components/QuoteCard";
import { QuickLinks } from "@/app/dashboard/analytics/components/QuickLinks";

export default function Analytics() {
  return (
    <div className="flex flex-col w-full">
      <Header title="Home" />
      <main className=" w-full justify-center grid grid-col-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(150px,_auto)] gap-4 my-4 mx-auto px-4">
        {/* Realtime Stats */}
        <TotalAppsCard />
        <TotalInterviewsCard />
        <TotalOffersCard />
        {/* <TempCard className="row-span-1" cardName="Quote" /> */}
        <QuoteCard />
        <TempCard className="" cardName="Streak" />
        <QuickLinks/>
        <TempCard
          className="lg:col-span-2 lg:row-span-2"
          cardName="This Months Activity"
        />
        <TempCard className="lg:row-span-2 " cardName="Recent Job Applications" />
      </main>
    </div>
  );
}
