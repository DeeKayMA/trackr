'use client'

import { JobForm } from "@/components/Forms/JobForm";
import { Button } from "@/components/ui/button";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { convertToUTC } from "@/lib/utils/dateutils";
import { useMediaQuery } from "@react-hook/media-query";
import { useRef } from "react";
import { toast } from "sonner";


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";



type UpdateJobDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  company: string;
  position: string;
  status: string;
  date_applied: string;
  closing_date: string;
  location: string;
  work_model: string;
  job_type: string;
  salary_min: number;
  salary_max: number;
  frequency: string;
  notes: string;
  url: string;
};



export const UpdateJobDialog = ({ open, onOpenChange, id, company, position, status, date_applied, closing_date, location, work_model, job_type, salary_min, salary_max, frequency, notes, url }: UpdateJobDialogProps) => {
    const closeRef = useRef<HTMLButtonElement>(null);
    const { setRefresh } = useRefreshStore();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
      return(
        <div className="px-4 lg:px-6">
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md max-h-[90vh] w-full max-w-2xl overflow-auto">
          <DialogHeader>
            <DialogTitle>Update Job</DialogTitle>
            <DialogDescription>
              Update your job application details
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <JobForm 
            submitName="Update Job"
            id={id}
            company={company}
            position={position}
            status={status}
            date_applied={date_applied}
            closing_date={closing_date}
            location={location}
            work_model={work_model}
            job_type={job_type}
            // salary_min={salary_min?.toString() ?? ""}
            // salary_max={salary_max?.toString() ?? ""}
            salary_min={salary_min}
            salary_max={salary_max}
            frequency={frequency}
            notes={notes}
            url={url}
            
            onSubmit={ async values => {
                console.log(values);
                const patch = {
                  ...values,
                  salary_min: values.salary_min === "" ? null : Number(values.salary_min),
                  salary_max: values.salary_max === "" ? null : Number(values.salary_max),
                  date_applied: convertToUTC(values.date_applied),
                  closing_date: convertToUTC(values.closing_date),
                };
                //Must push to supabase
                const { data, error } = await supabaseBrowser
                .from ("Job Applications")
                .update([patch])
                .eq("id", id);

                if(error){
                    console.log(error)
                } else {
                    console.log("Job Updated!", data)
                    closeRef.current?.click(); // Close the dialog
                    toast("Job Updated", {
                        description: values.position + " at " + values.company,
                    }) 
                    //Refresh the datatable
                    setRefresh(true)
                    onOpenChange(false);
                }

            }}/>
            
          </div>
          <DialogClose ref={closeRef} className="hidden" />
        </DialogContent>
      </Dialog>
      </div>
    )

    } else {
      return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <Button>Update Job</Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh] px-4 py-6">
          <DialogHeader className="mt-4">
            <DialogTitle>Update Job</DialogTitle>
            <DialogDescription>
              Add job applications to your dashboard
            </DialogDescription>
          </DialogHeader>
          <div className="mt-8 overflow-auto">
            <JobForm 
            submitName="Update Job"
            id={id}
            company={company}
            position={position}
            status={status}
            date_applied={date_applied}
            closing_date={closing_date}
            location={location}
            work_model={work_model}
            job_type={job_type}
            // salary_min={salary_min?.toString() ?? ""}
            // salary_max={salary_max?.toString() ?? ""}
            salary_min={salary_min}
            salary_max={salary_max}
            frequency={frequency}
            notes={notes}
            url={url}
            
            onSubmit={ async values => {
                console.log(values);
                const patch = {
                  ...values,
                  salary_min: values.salary_min === "" ? null : Number(values.salary_min),
                  salary_max: values.salary_max === "" ? null : Number(values.salary_max),
                  date_applied: convertToUTC(values.date_applied),
                  closing_date: convertToUTC(values.closing_date),
                };
                //Must push to supabase
                const { data, error } = await supabaseBrowser
                .from ("Job Applications")
                .update([patch])
                .eq("id", id);

                if(error){
                    console.log(error)
                } else {
                    console.log("Job Updated!", data)
                    closeRef.current?.click(); // Close the dialog
                    toast("Job Updated", {
                        description: values.position + " at " + values.company,
                    }) 
                    //Refresh the datatable
                    setRefresh(true)
                    onOpenChange(false);
                }

            }}/>
          </div>
          <DrawerClose ref={closeRef} className="hidden" />
        </DrawerContent>
      </Drawer>
    );
    }

    
}