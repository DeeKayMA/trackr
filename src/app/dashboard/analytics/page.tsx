// Analytics page on the dashboard
import Header from "../../../components/Header/Header";
import { TempCard } from "@/components/temp/TempCard";
import { TotalAppsCard } from "./components/TotalAppsCard";
import { TotalInterviewsCard } from "./components/TotalInterviewsCard";
import { TotalOffersCard } from "./components/TotalOffersCard";
import { AverageSalaryCard } from "./components/AverageSalarayCard";
import { DaysSinceLastAppCard } from "./components/DaysSinceLastApp";
import { ApplicationDistributionCard } from "@/app/dashboard/analytics/components/ApplicationDistributionCard";
import { ApplicationRankingCard } from "@/app/dashboard/analytics/components/ApplicationRankingCard";
import { ConversionRatesCard } from "@/app/dashboard/analytics/components/ConversionRates/ConversionRatesCard";








export default function Analytics() {
  return (
    <div className="flex flex-col w-full">
      <Header title="Analytics" />
      <main className=" w-full justify-center grid grid-cols-3 auto-rows-[minmax(150px,_auto)] gap-4 my-4 mx-auto px-4">
        {/* Realtime Stats */}
        <TotalAppsCard/>
        <TotalInterviewsCard/>
        <TotalOffersCard/>

        {/* Status Breakdown - Pie chart or bar chart  - full width of screeen */}
        {/* <div className="col-span-2">Application Status Breakdown</div> */}
        <TempCard className="col-span-2 row-span-2" cardName="Application Status breakdown"/>
        

        {/* Conversion rates - radial charts */}
        {/* <TempCard className="col-span-1 row-span-2" cardName="Conversion Rates: App -> Int, Int -> Offer, App -> Offer"/> */}
        <ConversionRatesCard/>
  

        {/* Days since last application - Stat card */}
        {/* <div>Days since last application</div> */}
        <DaysSinceLastAppCard/>

        {/* Line chart or area chart */}
        {/* <div>Applications submitted over time, weekly,monthly</div> */}
        <TempCard className="col-start-2 col-span-2" cardName="Applications submitted over time, weekly,monthly"/>

       

        {/* MEDIUM PRIORITY DATA, maybe put behind show more */}

        {/* Bar chart */}
        <ApplicationRankingCard/>

        {/* Stat Card */}
        <AverageSalaryCard/>

        {/* Pie chart */}
        <ApplicationDistributionCard/>
        
      </main>
    </div>
  );
}
