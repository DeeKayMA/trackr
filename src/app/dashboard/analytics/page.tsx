// Analytics page on the dashboard
import Header from "../../../components/Header/Header";
import { TempCard } from "@/components/temp/TempCard";
import { TotalAppsCard } from "./components/TotalAppsCard";
import { TotalInterviewsCard } from "./components/TotalInterviewsCard";
import { TotalOffersCard } from "./components/TotalOffersCard";
export default function Analytics() {
  return (
    <div className="flex flex-col w-full min-h-full">
      <Header title="Analytics" />
      <main className="max-w-[1500px] justify-center h-full grid grid-cols-3 grid-rows-5 gap-4 my-4 mx-auto px-4">
        {/* Realtime Stats */}
        <TotalAppsCard/>
        <TotalInterviewsCard/>
        <TotalOffersCard/>

        {/* Status Breakdown - Pie chart or bar chart  - full width of screeen */}
        {/* <div className="col-span-2">Application Status Breakdown</div> */}
        <TempCard className="col-span-2 row-span-2" cardName="Application Status breakdown"/>
        

        {/* Conversion rates - radial charts */}
        <TempCard className="col-span-1 row-span-2" cardName="Conversion Rates: App -> Int, Int -> Offer, App -> Offer"/>
  

        {/* Days since last application - Stat card */}
        {/* <div>Days since last application</div> */}
        <TempCard className="col-start-1" cardName="Days since last app"/>

        {/* Line chart or area chart */}
        {/* <div>Applications submitted over time, weekly,monthly</div> */}
        <TempCard className="col-start-2 col-span-2" cardName="Applications submitted over time, weekly,monthly"/>

       

        {/* MEDIUM PRIORITY DATA, maybe put behind show more */}

        {/* Bar chart */}
        <TempCard className="" cardName="Top: Job Titles, Companies, Location"/>


        {/* Stat Card */}
        <TempCard className="" cardName="Avg Salary"/>

        {/* Pie chart */}
        <TempCard className="" cardName="Apps by: Job Type, Work Type, Locatio"/>
        
      </main>
    </div>
  );
}
