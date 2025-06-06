import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TempCard } from "@/components/temp/TempCard";

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider} from "@/components/ui/tooltip"
import { AppToInterviewRadial } from "@/components/Analytics/ConversionRates/AppToIntRadial";
import { IntToOfferRadial } from "@/components/Analytics/ConversionRates/IntToOfferRadial";
import { AppToOfferRadial } from "@/components/Analytics/ConversionRates/AppToOfferRadial";

export const ConversionRatesCard = () => {
  return (
    <TooltipProvider>
        <Tabs defaultValue="applicationsToInterviews" className="w-full col-span-1 row-span-2">
        <TabsList>
            <Tooltip>
                <TabsTrigger asChild value="applicationsToInterviews"><TooltipTrigger >App → Int</TooltipTrigger></TabsTrigger>
                <TooltipContent>
                    <p>Application to Interview</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TabsTrigger asChild value="interviewsToOffer"><TooltipTrigger>Int → Offer</TooltipTrigger></TabsTrigger>
                <TooltipContent>
                    <p>Interview to Offer</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TabsTrigger asChild value="applicationToOffer"><TooltipTrigger>App → Offer</TooltipTrigger></TabsTrigger>
                <TooltipContent>
                    <p>Application to Offer</p>
                </TooltipContent>
            </Tooltip> 
        </TabsList>
        <TabsContent value="applicationsToInterviews">
            <AppToInterviewRadial/>
        </TabsContent>
        <TabsContent value="interviewsToOffer">
            <IntToOfferRadial/>
        </TabsContent>
        <TabsContent value="applicationToOffer">
            <AppToOfferRadial/>
        </TabsContent>
        </Tabs>
    </TooltipProvider>

    
  );
};
