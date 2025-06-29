// Analytics page on the dashboard
import { AppsPerDayTabs } from "@/components/Analytics/AppsPerDay/AppsPerDayTabs";
import { BreakdownChartsTabs } from "@/components/Analytics/BreakdownCharts/BreakdownChartTabs";
import { CurrentOffersCard } from "@/components/Analytics/CurrentOffersCard";
import { MostActivityTabs } from "@/components/Analytics/MostActivity/MostActivityTabs";
import { LongestStreakCard } from "@/components/Analytics/Streaks/LongestStreakCard";
import { StreakCard } from "@/components/Analytics/Streaks/StreakCard";
import { TotalAppsStatCard } from "@/components/Analytics/TotalAppsStatCard";
import { UpcomingInterviewsCard } from "@/components/Analytics/UpcomingInterviewsCard";


export default function Analytics() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4 px-4 py-8 lg:px-6 max-w-7xl mx-auto w-full">
        {/* Summary Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
          <TotalAppsStatCard className="flex"/>
          <UpcomingInterviewsCard className=""/>
          <CurrentOffersCard className=""/>
        </section>

        {/* Application Trends & Status Breakdown */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AppsPerDayTabs/>
          <BreakdownChartsTabs/>
          
        </section>

        {/* Gamification */}
        {/* <section className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <TempCard className="" cardName="Badges Earned & XP " />
          <TempCard className="" cardName="XP & Level progress" />
        </section> */}


        {/*  Streaks & Activity */}
        <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          <LongestStreakCard className=""/>
          <StreakCard className="" />
          <MostActivityTabs/>
        </section>

        


        {/* Insight Highlights */}
        {/* <section className="grid grid-cols-1 gap-4">
          <TempCard
            className=""
            cardName="Insights - you get the most offers from x"
          />
        </section> */}
      </div>
    </div>
  );
}
