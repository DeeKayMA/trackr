"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { useJobStore } from "@/lib/store/useJobStore";
import { useRefreshStore } from "@/lib/store/useRefreshStore";
import { supabaseBrowser } from "@/lib/supabase/supabase";

import { Trash2 } from "lucide-react";

type DeleteSelectedJobs = {
  ids: number[];
};

export const DeleteSelectedJobs = ({ ids }: DeleteSelectedJobs) => {
  const { setRefresh } = useRefreshStore();
  const { setSelectedJobIds } = useJobStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {ids.length === 0 ? (
          <Button
            className=" hidden bg-red-500/10 hover:bg-red-500/30 text-red-500 transition-all duration-150 ease-in-out"
            size="icon"
          >
            <Trash2 />
          </Button>
        ) : (
          //Button active and red
          <Button
            className=" visible bg-red-500/10 hover:bg-red-500/30 text-red-500 transition-all duration-150 ease-in-out"
            size="icon"
          >
            <Trash2 />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            The will permmanently delete the selected job entries.
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            className={"bg-red-500 hover:bg-red-600 text-white"}
            type="button"
            onClick={async () => {
              const { data, error } = await supabaseBrowser
                .from("Job Applications")
                .delete()
                .in("id", ids); // batch delete

              if (error) {
                console.error("Error deleting jobs:", error);
                toast("Error", {
                  description: "Something went wrong while deleting.",
                });
              } else {
                console.log("Jobs deleted:", data);
                if (ids.length === 1) {
                  toast("Jobs Deleted", {
                    description: `1 job removed successfully.`,
                  });
                } else {
                  toast("Jobs Deleted", {
                    description: `${ids.length} jobs removed successfully.`,
                  });
                }

                setRefresh(true);
                setSelectedJobIds([0]);
              }
            }}
          >
            Delete
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
