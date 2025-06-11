"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBreakdownChart } from "@/components/Analytics/BreakdownCharts/StatusBreakdownChart";
import { JobTypeBreakdownChart } from "@/components/Analytics/BreakdownCharts/JobTypeBreakdownChart";
import { WorkModelBreakdownChart } from "@/components/Analytics/BreakdownCharts/WorkModelBreakdownChart";


export const BreakdownChartsTabs = () => {
  return (
    <Tabs defaultValue="Status" className="w-full">
      <TabsList>
        <TabsTrigger value="Status">Status</TabsTrigger>
        <TabsTrigger value="WorkModel">Work Model</TabsTrigger>
        <TabsTrigger value="JobType">Job Type</TabsTrigger>
        
      </TabsList>
      <TabsContent value="Status">
        <StatusBreakdownChart className=""/>
      </TabsContent>
      <TabsContent value="WorkModel">
        <WorkModelBreakdownChart className=""/>
      </TabsContent>
      <TabsContent value="JobType">
        <JobTypeBreakdownChart className=""/>
      </TabsContent>
      
      
    </Tabs>
  );
};
