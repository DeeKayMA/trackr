// Analytics page on the dashboard
import Header from "../../../components/Header/Header";
import { TempCard } from "@/components/temp/TempCard";

export default function Analytics() {
  return (
    <div className="flex flex-col w-full">
      <Header title="Analytics" />
      <div className="flex flex-col gap-4 px-4 py-8 lg:px-6 max-w-7xl mx-auto w-full">
        {/* Summary Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TempCard className="" cardName="Total Applications" />
          <TempCard className="" cardName="Total Intervies" />
          <TempCard className="" cardName="Total Offers" />
          <TempCard className="" cardName="Total Rejections" />
        </section>

        {/* Application Trends */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TempCard className="" cardName="Weekly Applications Cahrt " />
          <TempCard className="" cardName="Applications Over Time " />
        </section>

        {/* Status & Breakdown */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TempCard className="" cardName="Status Pie Chart" />
          <TempCard className="" cardName="Job Type / Work Model breakdown" />
        </section>

        {/*  Goals Progress */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TempCard className="" cardName="Weekly progress" />
          <TempCard className="" cardName="Daily streak tracker" />
        </section>

        {/* 🎮 Gamification */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TempCard className="" cardName="Badges Earned " />
          <TempCard className="" cardName="XP & Level progress" />
        </section>

        {/* Insight Highlights */}
        <section className="grid grid-cols-1 gap-4">
          <TempCard
            className=""
            cardName="Insights - you get the most offers from x"
          />
        </section>

        {/* Historical Stats / Filters */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TempCard className="" cardName="Longest Streak" />
          <TempCard className="" cardName="Most active week" />
          <TempCard className="" cardName="Avg apps per week" />
        </section>
      </div>
    </div>
  );
}
