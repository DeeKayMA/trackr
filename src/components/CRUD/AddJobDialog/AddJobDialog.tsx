'use client'

import { JobForm } from "@/components/Forms/JobForm";
import { Button } from "@/components/ui/button";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { supabaseBrowser } from "@/lib/supabase/supabase";
import { convertToUTC } from "@/lib/utils/dateutils";
import { useMediaQuery } from "@react-hook/media-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";


const AddJobDialog = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { setRefresh } = useRefreshStore();
  const [userId, setUserId] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabaseBrowser.auth.getUser();
      if (user) setUserId(user.id);
      else console.log("No user logged in", error);
    };

    fetchUser();
  }, []);

  if (isDesktop) {
    return (
      <div className="mr-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-colors duration-200">Add Job</Button>
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
                onSubmit={async (values) => {
                  const patch = {
                    ...values,
                    user_id: userId, // Add the user ID to the values
                    salary_min:values.salary_min === "" ? null : Number(values.salary_min),
                    salary_max: values.salary_max === "" ? null : Number(values.salary_max),
                    date_applied: convertToUTC(values.date_applied),
                    closing_date: convertToUTC(values.closing_date),
                  };

                  const { data, error } = await supabaseBrowser
                    .from("Job Applications")
                    .insert([patch]);

                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Job added!", data);
                    closeRef.current?.click(); // Close the dialog
                    toast("Job Added", {
                      description: values.position + " at " + values.company,
                    }); // Success message
                    // onJobAdded?.(); //Refresh the datatable
                    setRefresh(true);
                  }
                }}
              />
            </div>
            <DialogClose ref={closeRef} className="hidden" />
          </DialogContent>
        </Dialog>
      </div>
    );
  } else {
    return (
      <Drawer>
        <DrawerTrigger className="mr-4" asChild >
          <Button className="font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-colors duration-200">Add Job</Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh] px-4 py-6">
          <DialogHeader className="mt-4">
            <DialogTitle>Add Job</DialogTitle>
            <DialogDescription>
              Add job applications to your dashboard
            </DialogDescription>
          </DialogHeader>
          <div className="mt-8 overflow-auto">
            <JobForm
              submitName="Add Job"
              onSubmit={async (values) => {

                const patch = {
                  ...values,
                  user_id: userId, // Add the user ID to the values
                  salary_min:values.salary_min === "" ? null : Number(values.salary_min),
                  salary_max: values.salary_max === "" ? null : Number(values.salary_max),
                  date_applied: convertToUTC(values.date_applied),
                  closing_date: convertToUTC(values.closing_date),
                };

                const { data, error } = await supabaseBrowser
                  .from("Job Applications")
                  .insert([patch]);

                if (error) {
                  console.log(error);
                } else {
                  console.log("Job added!", data);
                  closeRef.current?.click(); // Close the dialog
                  toast("Job Added", {
                    description: values.position + " at " + values.company,
                  }); 
                  setRefresh(true);
                  
                }
              }}
            />
          </div>
          <DrawerClose ref={closeRef} className="hidden" />
        </DrawerContent>
      </Drawer>
    );
  }
};

export default AddJobDialog;
