'use client'

import { JobForm } from "@/components/JobForm/JobForm";
import { Button } from "@/components/ui/button";
import { supabase, supabaseBrowser } from "@/lib/supabase/supabase";
import { useRef } from "react";
import { toast } from "sonner"
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { useEffect, useState } from "react";



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
};



export const AddJobDialog = ({  }: AddJobDialogProps) => {
    const closeRef = useRef<HTMLButtonElement>(null);
     const { refresh, setRefresh } = useRefreshStore();

      const [userId, setUserId] = useState<string | null>(null);

      useEffect(() => {
        const fetchUser = async () => {
          const { data: { user }, error } = await supabaseBrowser.auth.getUser();
          if (user) setUserId(user.id);
          else console.log('No user logged in', error);
        };

        fetchUser();
      }, []);





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

              const patch = {
                  ...values,
                  user_id: userId, // Add the user ID to the values
                  salary_min: values.salary_min === "" ? null : Number(values.salary_min),
                  salary_max: values.salary_max === "" ? null : Number(values.salary_max),
                };
  

                const { data, error } = await supabaseBrowser
                .from ("Job Applications")
                .insert([patch]); 

                if(error){
                    console.log(error)
                } else {
                    console.log("Job added!", data)
                    closeRef.current?.click(); // Close the dialog
                    toast("Job Added", {
                        description: values.position + " at " + values.company,
                    }) // Success message
                    // onJobAdded?.(); //Refresh the datatable 
                    setRefresh(true)
                }
            }}
            
            
            />
          </div>
          <DialogClose ref={closeRef} className="hidden" />
        </DialogContent>
      </Dialog>
      </div>
    )
}