import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TempCard } from "@/components/temp/TempCard";

export const ApplicationRankingCard = () => {
  return (
    <Tabs defaultValue="jobTitle" className="w-full">
      <TabsList>
        <TabsTrigger value="jobTitle">Job Title</TabsTrigger>
        <TabsTrigger value="company">Company</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
      </TabsList>
      <TabsContent value="jobTitle">
        <TempCard className="" cardName="Job Title: Bar Chart"/>
      </TabsContent>
      <TabsContent value="company">
        <TempCard className="" cardName="Work Type: Bar Chart"/>
      </TabsContent>
      <TabsContent value="location">
        <TempCard className="" cardName="Location: Bar Chart / Map"/>
      </TabsContent>
    </Tabs>
  );
};
