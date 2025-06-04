import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TempCard } from "@/components/temp/TempCard";

import { Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"

export const ConversionRatesCard = () => {
  return (
    <Tabs defaultValue="applicationsToInterviews" className="w-full col-span-1 row-span-2">
      <TabsList>
        <Tooltip>
            <TooltipTrigger><TabsTrigger value="applicationsToInterviews">App → Int</TabsTrigger></TooltipTrigger>
            <TooltipContent>
                <p>Applications to Interviews</p>
            </TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger><TabsTrigger value="interviewsToOffer">Int → Offer</TabsTrigger></TooltipTrigger>
            <TooltipContent>
                <p>Interviews to Offers</p>
            </TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger><TabsTrigger value="applicationToOffer">App → Offer</TabsTrigger></TooltipTrigger>
            <TooltipContent>
                <p>Applications to Offers</p>
            </TooltipContent>
        </Tooltip>




        
        
        
      </TabsList>
      <TabsContent value="applicationsToInterviews">
        <TempCard className="" cardName="App ⟶ Interview: Radial Chart"/>
      </TabsContent>
      <TabsContent value="interviewsToOffer">
        <TempCard className="" cardName="Interview ⟶ Offer: Radial Chart"/>
      </TabsContent>
      <TabsContent value="applicationToOffer">
        <TempCard className="" cardName="App ⟶ Offer: Radial Chart"/>
      </TabsContent>
    </Tabs>

    
  );
};
