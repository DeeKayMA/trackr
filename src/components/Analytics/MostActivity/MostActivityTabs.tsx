"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MostActiveDay } from "@/components/Analytics/MostActivity/MostActiveDay";
import { MostActiveWeek } from "@/components/Analytics/MostActivity/MostActiveWeek";
import { MostActiveMonth } from "@/components/Analytics/MostActivity/MostActiveMonth";


export const MostActivityTabs = () => {
  return (
    <Tabs defaultValue="Day" className="w-full">
      <TabsList>
        <TabsTrigger value="Day">Day</TabsTrigger>
        <TabsTrigger value="Week">Week</TabsTrigger>
        <TabsTrigger value="Month">Month</TabsTrigger>
        
      </TabsList>
      <TabsContent value="Day">
        <MostActiveDay className="h-full"/>
      </TabsContent>
      <TabsContent value="Week">
        <MostActiveWeek className="h-full"/>
      </TabsContent>
      <TabsContent value="Month">
        <MostActiveMonth className="h-full"/>
      </TabsContent>
      
      
    </Tabs>
  );
};
