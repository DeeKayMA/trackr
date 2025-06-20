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

import { Button } from "../ui/button";

type NotesDialogProps = {
  note: string;
  position: string;
  company: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NotesDialog = ({
  open,
  onOpenChange,
  note,
  position,
  company,
}: NotesDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Note</DialogTitle>
          <DialogDescription>
            {position} at {company}
          </DialogDescription>
        </DialogHeader>
        {note ? (
          <p className={"my-4"}>{note}</p>
        ) : (
           <p className="my-4 text-sm"> <span className="text-lg mb-2 font-semibold">No notes yet.</span><br/> You can add notes by clicking <span className="font-medium">&quot;Edit Job&quot;</span> and filling in the <span className="font-medium">&quot;Notes&quot;</span> field.</p>
        )}

        {/* <p className={'my-4'}>{note || "No notes for this role"}</p> */}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
