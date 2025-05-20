// (client component) will contain our column definitions.
"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";

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

export type JobStatus =
  | "Saved"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";


export type Job = {
  id: string;
  company: string;
  position: string;
  status: string;
  date_applied: string;
  location: string | null 
  job_type: string;
  //   source: string;
  url: string | null ;
  notes: string | null 
  salary_min: number | null
  salary_max: number | null 
  //   contact: string | null 
  //   followUpDate: string | null 
  //   interviewRounds: number | null 
  //   lastUpdated: string | null 
};


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
          
          <ArrowUpDown className="h-4 w-4" />
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
          
          <ArrowUpDown className="h-4 w-4" />
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
          
          <ArrowUpDown className="h-4 w-4" />
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
          
          <ArrowUpDown className="h-4 w-4" />
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
          
          <ArrowUpDown className="h-4 w-4" />
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
          
          <ArrowUpDown className="h-4 w-4" />
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
          <span>No Notes</span>
        );
      },
  },
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
          
          <ArrowUpDown className="h-4 w-4" />
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
        const URL = row.getValue<string>("url");
        return URL ? (
          <a
            href={URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 flex flex-row items-center"
          >
            View ↗ 
            {/* <ExternalLink className="ml-2 h-4 w-4" /> */}
          </a>
        ) : (
          <span>No Link</span>
        );
      },
  },
  //Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy payment ID
                </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
