import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TempCard } from "@/components/temp/TempCard";

export const ApplicationDistributionCard = () => {
  return (
    <Tabs defaultValue="jobType" className="w-full">
      <TabsList>
        <TabsTrigger value="jobType">Job Type</TabsTrigger>
        <TabsTrigger value="workType">Work Type</TabsTrigger>
      </TabsList>
      <TabsContent value="jobType">
        <TempCard className="" cardName="Job Type: Pie Chart"/>
      </TabsContent>
      <TabsContent value="workType">
        <TempCard className="" cardName="Work Type: Pie Chart"/>
      </TabsContent>
    </Tabs>
  );
};
