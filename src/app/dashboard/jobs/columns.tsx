// (client component) will contain our column definitions.
"use client";

import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { UpdateJobDialog } from "@/components/UpdateJobDialog/UpdateJobDialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge"

import { 
  ArrowUpDown,  
  ExternalLink,
  CheckCircle2Icon,
  LoaderIcon,
   PhoneCallIcon,
   HandshakeIcon,
   XCircleIcon,
   BookmarkIcon,
   MoreHorizontal
} from "lucide-react";


import { Checkbox } from "@/components/ui/checkbox"



export type Job = {
  id: string;
  company: string;
  position: string;
  status: string;
  date_applied: string | null;
  location: string | null
  work_model: string | null;
  job_type: string | null;
  url: string | null ;
  notes: string | null 
  salary_min: number | null
  salary_max: number | null 
};

const arrowUpDown = "h-2 w-2"


const statusMap = {
  Saved: {icon: <BookmarkIcon className="text-slate-500 dark:text-slate-400" />},
  Applied: { icon: <CheckCircle2Icon className="text-blue-500 dark:text-blue-400" /> },
  Interview: { icon: <PhoneCallIcon className="text-yellow-500 dark:text-yellow-400" /> },
  Offer: { icon: <HandshakeIcon className="text-green-500 dark:text-green-400" /> },
  Rejected: { icon: <XCircleIcon className="text-red-500 dark:text-red-400" /> },
}

type StatusKey = keyof typeof statusMap;

function isStatusKey(status: string): status is StatusKey {
  return status in statusMap;
}

function toPascalCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const columns: ColumnDef<Job>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
  // Company
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
        <p>Company</p>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          
          <ArrowUpDown className={arrowUpDown} />
        </Button>
        </div>
      );
    },
  },
  //Position
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
        <p>Position</p>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          
          <ArrowUpDown className={arrowUpDown} />
        </Button>
        </div>
      );
    },
  },
  //Job Type
  {
    accessorKey: "job_type",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
        <p>Job Type</p>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          
          <ArrowUpDown className={arrowUpDown} />
        </Button>
        </div>
      );
    },
  },
  //Work Model
  {
    accessorKey: "work_model",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
        <p>Work Model</p>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          
          <ArrowUpDown className={arrowUpDown} />
        </Button>
        </div>
      );
    },
  },
  //Location
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
        <p>Location</p>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          
          <ArrowUpDown className={arrowUpDown} />
        </Button>
        </div>
      );
    },
  },
  //Salary
  {
    accessorKey: "salary_min",
    
    header: ({ column }) => {
      return (
        <div className="flex items-center">
        <p>Salary</p>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          
          <ArrowUpDown className={arrowUpDown} />
        </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const salaryMin = Math.round(parseFloat(row.getValue("salary_min"))/1000);
      const salaryMax = row.original.salary_min && row.original.salary_max !== null ? Math.round(row.original.salary_max / 1000) : null;


      return <div>{salaryMax ? `£${salaryMin}–${salaryMax}k` : `£${salaryMin}k`}</div>; //can add text centre class here
    },
  },
  //Status
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
        <p>Status</p>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          
          <ArrowUpDown className={arrowUpDown} />
        </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-4"
      >
        {isStatusKey(row.original.status) ?
        statusMap[row.original.status]?.icon : <LoaderIcon />}
        {row.original.status}
      </Badge>
    ),
  },
   //Notes
   {
    accessorKey: "notes",
    header: "Notes",
      cell: ({ row }) => {
        const notes = row.getValue<string>("notes");
        return notes ? (
          <span>{notes}</span>
        ) : (
          <span></span>
        );
      },
  },
  //Date Applied
  {
    accessorKey: "date_applied",
    header: ({ column }) => {
        return (
        <div className="flex items-center">
        <p>Date Applied</p>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          
          <ArrowUpDown className={arrowUpDown} />
        </Button>
        </div>
        );
      },
  },
   //Link
   {
    accessorKey: "url",
    header: "URL",
      cell: ({ row }) => {
        let url = row.getValue<string>("url");
        if (!url) return <span>No Link</span>

        if (!/^https?:\/\//i.test(url)) {
          url = `https://${url}`;
        }

        return(
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 flex flex-row items-center"
          >
            View ↗ 
            {/* <ExternalLink className="ml-2 h-4 w-4" /> */}
          </a>
          )
      },
  },
  //Actions
  {
    id: "actions",
    cell: ({ row }) => {
      //Pass these into the UpdateJob Dialog, then pass them into JobForm as default values if the ID is the same
      const id = row.getValue<string>("id");
      const company = row.getValue<string>("company");
      const position = row.getValue<string>("position");
      const status = row.getValue<string>("status");
      const date_applied = row.getValue<string>("date_applied");
      const location = row.getValue<string>("location");
      const work_model = row.getValue<string>("work_model");
      const job_type = row.getValue<string>("job_type");
      const salary_min = row.getValue<number>("salary_min");
      const salary_max = row.getValue<number>("salary_max");
      const notes = row.getValue<string>("notes");
      const url = row.getValue<string>("url");

      const [open, setOpen] = useState(false);

      return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className={arrowUpDown} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem  onClick={() => {
              setOpen(true)
              
              }}>
              Edit
              {/* Open the edit dialog for the specific job */}
            </DropdownMenuItem>
            <DropdownMenuItem>
              Delete
              {/* Delete the specific job with an onclick function 
               it must call remove on supabase 
               it must do toast sonner to say that the job has been deleted
               it must refresh the datatable
              */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden">
          <UpdateJobDialog
          open={open}
          onOpenChange={setOpen}
          />
        </div>
        
        </>
      );
    },
  },
];
