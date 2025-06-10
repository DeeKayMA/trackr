// Analytics page on the dashboard
import Header from "@/components/Header/Header";
import { TempCard } from "@/components/temp/TempCard";
import { AppsPerDayChart7 } from "@/components/Analytics/AppsPerDay/AppsPerDayChart(7)";
import { AppsPerDayChart30 } from "@/components/Analytics/AppsPerDay/AppsPerDayChart(30)";
import { StatusBreakdownChart } from "@/components/Analytics/BreakdownCharts/StatusBreakdownChart";
import { StreakCard } from "@/components/Analytics/StreakCard";
import { DailyTargetCard } from "@/components/Analytics/DailyTargetCard";
import { WeeklyTargetCard } from "@/components/Analytics/WeeklyTargetCard";
import { TotalAppsStatCard } from "@/components/Analytics/TotalAppsStatCard";
import { UpcomingInterviewsCard } from "@/components/Analytics/UpcomingInterviewsCard";
import { CurrentOffersCard } from "@/components/Analytics/CurrentOffersCard";
import { TotalRejectionsCard } from "@/components/Analytics/TotalRejectionsCard";
import { AppsPerDayTabs } from "@/components/Analytics/AppsPerDay/AppsPerDayTabs";
import { BreakdownChartsTabs } from "@/components/Analytics/BreakdownCharts/BreakdownChartTabs";


export default function Analytics() {
  return (
    <div className="flex flex-col w-full">
      <Header title="Analytics" />
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
        <section className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <TempCard className="" cardName="Badges Earned & XP " />
          {/* <TempCard className="" cardName="XP & Level progress" /> */}
        </section>


        {/*  Goals Progress */}
        {/* <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StreakCard className="" />
          <DailyTargetCard className="" />
          <WeeklyTargetCard className="" />
        </section> */}

        
        {/* Historical Stats / Filters */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TempCard className="" cardName="Longest Streak" />
          <TempCard className="" cardName="Most active week" />
          <TempCard className="" cardName="Avg apps per week" />
        </section>

        {/* Insight Highlights */}
        <section className="grid grid-cols-1 gap-4">
          <TempCard
            className=""
            cardName="Insights - you get the most offers from x"
          />
        </section>
      </div>
    </div>
  );
}
