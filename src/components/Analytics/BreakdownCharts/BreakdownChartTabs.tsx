"use client";

import { JobTypeBreakdownChart } from "@/components/Analytics/BreakdownCharts/JobTypeBreakdownChart";
import { StatusBreakdownChart } from "@/components/Analytics/BreakdownCharts/StatusBreakdownChart";
import { WorkModelBreakdownChart } from "@/components/Analytics/BreakdownCharts/WorkModelBreakdownChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export const BreakdownChartsTabs = () => {
  return (
    <Tabs defaultValue="Status" className="w-full h-full">
      <TabsList>
        <TabsTrigger value="Status">Status</TabsTrigger>
        <TabsTrigger value="WorkModel">Work Model</TabsTrigger>
        <TabsTrigger value="JobType">Job Type</TabsTrigger>
        
      </TabsList>
      <TabsContent value="Status">
        <StatusBreakdownChart className="h-full"/>
      </TabsContent>
      <TabsContent value="WorkModel">
        <WorkModelBreakdownChart className="h-full"/>
      </TabsContent>
      <TabsContent value="JobType">
        <JobTypeBreakdownChart className="h-full"/>
      </TabsContent>
      
      
    </Tabs>
  );
};
