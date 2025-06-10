"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppsPerDayChart7 } from "@/components/Analytics/AppsPerDay/AppsPerDayChart(7)";
import { AppsPerDayChart30 } from "@/components/Analytics/AppsPerDay/AppsPerDayChart(30)";

export const AppsPerDayTabs = () => {
  return (
    <Tabs defaultValue="30-day" className="w-full">
      <TabsList>
        <TabsTrigger value="30-day">Last 30 Days</TabsTrigger>
        <TabsTrigger value="7-day">Last 7 Days</TabsTrigger>
      </TabsList>
      <TabsContent value="30-day">
        <AppsPerDayChart30 className=""/>
      </TabsContent>
      <TabsContent value="7-day">
        <AppsPerDayChart7 className=""/>
      </TabsContent>
    </Tabs>
  );
};
