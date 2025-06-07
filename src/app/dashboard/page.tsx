// Analytics page on the dashboard
import Header from "@/components/Header/Header";
import { TempCard } from "@/components/temp/TempCard";
import { Button } from "@/components/ui/button";

export default function Analytics() {
  return (
    <div className="flex flex-col w-full">
      <Header title="Home" />
      <div className=" flex flex-col gap-4 px-4 py-8 lg:px-6 max-w-7xl mx-auto w-full">
        {/* Stat Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-3 gap-4">
          <TempCard cardName="Apps Today" className=""/>
          <TempCard cardName="Apps This Week" className=""/>
          <TempCard cardName="Streak" className=""/>
        </section>

        {/* Mini Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TempCard cardName="Apps Per Day" className=""/>
          <TempCard cardName="Status Breakdown" className=""/>
        </section>

        {/* Gamified XP & Badges Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TempCard cardName="XP progress" className=""/>
          <TempCard cardName="Badges" className=""/>
        </section>

        {/* Call to Action */}
        <section className="">
          <TempCard cardName="CTA - You're X away from keeping your streak alive" className=""/>
        </section>

        {/* Quick Navigation  */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TempCard cardName="Jobs" className=""/>
          <TempCard cardName="Analytics" className=""/>
          <TempCard cardName="Resources" className=""/>
        </section>
      </div>
    </div>
  );
}
