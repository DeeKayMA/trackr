'use client'

import { JobForm } from "@/components/JobForm/JobForm";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/supabase";
import { useRef } from "react";
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

type AddJobDialogProps = {
  onJobAdded?: () => void;
};



export const AddJobDialog = ({ onJobAdded }: AddJobDialogProps) => {
    const closeRef = useRef<HTMLButtonElement>(null);

    return(
        <div className="px-4 lg:px-6">
        <Dialog>
        <DialogTrigger asChild>
          <Button>Add Job</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-h-[90vh] w-full max-w-2xl overflow-auto">
          <DialogHeader>
            <DialogTitle>Add Job</DialogTitle>
            <DialogDescription>
              Add job applications to your dashboard
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <JobForm 
            submitName="Add Job"
            onSubmit={ async values => {
                console.log(values);
                //Must push to supabase
                const { data, error } = await supabase
                .from ("Job Applications")
                .insert([values]); 

                if(error){
                    console.log(error)
                } else {
                    console.log("Job added!", data)
                    closeRef.current?.click(); // Close the dialog
                    toast("Job Added", {
                        description: values.position + " at " + values.company,
                    }) // Success message
                    onJobAdded?.(); //Refresh the datatable 
                }

                
                
    
            }}/>
          </div>
          <DialogClose ref={closeRef} className="hidden" />
          {/* <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
      </div>
    )
}