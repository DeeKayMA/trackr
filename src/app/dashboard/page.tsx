// Analytics page on the dashboard
import Header from "@/components/Global/Header/Header";
import { TempCard } from "@/components/temp/TempCard";
import { TotalAppsCard } from "@/components/Analytics/TotalAppsCard";
import { TotalInterviewsCard } from "@/components/Analytics/TotalInterviewsCard";
import { TotalOffersCard } from "@/components/Analytics/TotalOffersCard";
import { Button } from "@/components/ui/button";
import { QuoteCard } from "@/components/Analytics/QuoteCard";
import { QuickLinks } from "@/components/Analytics/QuickLinks";

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
