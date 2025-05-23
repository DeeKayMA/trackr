'use client'

import { JobForm } from "@/components/JobForm/JobForm";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/supabase";
import { useRef, useEffect, useState, use } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner"



import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";



type UpdateJobDialogProps = {
  onJobUpdated?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};



export const UpdateJobDialog = ({ onJobUpdated, open, onOpenChange }: UpdateJobDialogProps) => {
    const closeRef = useRef<HTMLButtonElement>(null);
    const { id } = useParams();
    // const [job, setJob] = useState<Job | null>(null);

      useEffect(() => {
        if (!open || !id) return; // Only fetch when dialog is open and id is available
        const fetchJobs = async () => {
          const { data, error } = await supabase
          .from("Job Applications")
          .select()
          .eq("id", id)
          .single()
    
          if(error) {
            console.log(error)
          }
    
          if (data){
            // setJob(data as Job);
          }
        }
    
        fetchJobs()
    
      }, [open, id])





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
            onSubmit={ async values => {
                console.log(values);
                //Must push to supabase
                const { data, error } = await supabase
                .from ("Job Applications")
                .update([values])
                .eq("id", id);

                if(error){
                    console.log(error)
                } else {
                    console.log("Job Updated!", data)
                    closeRef.current?.click(); // Close the dialog
                    toast("Job Updated", {
                        description: values.position + " at " + values.company,
                    }) // Success message
                    onJobUpdated?.(); //Refresh the datatable
                    onOpenChange(false);
                }

            }}/>
            
          </div>
          <DialogClose ref={closeRef} className="hidden" />
        </DialogContent>
      </Dialog>
      </div>
    )
}