"use client"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner"

import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { supabase, supabaseBrowser } from "@/lib/supabase/supabase";
import { useRef } from "react";

type DeleteJobDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  company?: string;
  position?: string;
};

export const DeleteJobDialog = ({ open, onOpenChange, id, company, position}: DeleteJobDialogProps) => {
    const { refresh, setRefresh } = useRefreshStore();
    const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            The will permmanently delete the job entry for <span className="font-semibold">{position}</span> at <span className="font-semibold">{company}</span>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start ">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button 
          className={'bg-red-500 hover:bg-red-600 text-white'}
          type="button"
          onClick={async () => {
                const { data, error } = await supabaseBrowser
                .from ("Job Applications")
                .delete()
                .eq("id", id);

                if(error){
                    console.log(error)
                } else {
                    console.log("Job Deleted!", data)
                    closeRef.current?.click(); // Close the dialog
                    toast("Job Deleted", {
                        description: position + " at " + company,
                    }) 
                    //Refresh the datatable
                    setRefresh(true)
                    onOpenChange(false);
                }}
            } >Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
