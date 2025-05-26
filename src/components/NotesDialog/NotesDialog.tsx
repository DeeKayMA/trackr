import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
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
          <div className="my-4 text-muted-foreground text-sm">
            <p className="mb-4 font-bold"> No notes yet.</p>
            <p> You can add notes by clicking <b>Edit Job</b> and filling in the <b>Notes</b> field.</p>
          </div>
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
