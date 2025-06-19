"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotesDialog } from "@/components/NotesDialog/NotesDialog";
import { UpdateJobDialog } from "@/components/CRUD/UpdateJobDialog/UpdateJobDialog";
import { DeleteJobDialog } from "@/components/CRUD/DeleteJobDialog/DeleteJobDialog";

export function JobRowActions({ row }: { row: any }) {
  const [openNote, setOpenNote] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const values = row.original;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenNote(true)}>
            View Note
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialogs */}
      <div className="hidden">
        <NotesDialog
          note={values.notes}
          company={values.company}
          position={values.position}
          open={openNote}
          onOpenChange={setOpenNote}
        />
        <UpdateJobDialog
          open={openEdit}
          onOpenChange={setOpenEdit}
          {...values}
        />
        <DeleteJobDialog
          open={openDelete}
          onOpenChange={setOpenDelete}
          id={values.id}
          company={values.company}
          position={values.position}
        />
      </div>
    </>
  );
}
